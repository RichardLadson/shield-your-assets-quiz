
/**
 * Medicaid eligibility assessment functionality
 */
import { StateRule, getStateRules } from "@/data/stateRules";
import { isMillerTrustRequired } from "./incomeCalculations";

/**
 * Assess Medicaid eligibility by classifying assets, calculating spend-down,
 * and determining monthly copay estimates and overall planning urgency.
 */
export const medicaidEligibilityAssessment = (
  clientInfo: any, 
  assets: Record<string, number>, 
  income: Record<string, number>, 
  maritalStatus: string, 
  state: string, 
  age: number, 
  healthStatus: string,
  isCrisis = false
) => {
  // Get state-specific rules
  const stateRules = getStateRules(state);
  
  // Determine appropriate resource limit based on marital status
  let resourceLimit;
  if (maritalStatus === 'married-both') {
    resourceLimit = stateRules.resourceLimitCoupleSharing;
  } else if (maritalStatus === 'married-one') {
    resourceLimit = stateRules.resourceLimitMarried;
  } else {
    resourceLimit = stateRules.resourceLimitSingle;
  }
  
  // Classify assets into countable and non-countable categories
  const countableAssets = Object.entries(assets)
    .filter(([asset]) => !['home', 'vehicle', 'burial_plot', 'life_insurance'].includes(asset))
    .reduce((sum, [_, value]) => sum + value, 0);
  
  const nonCountableAssets = Object.entries(assets)
    .filter(([asset]) => ['home', 'vehicle', 'burial_plot', 'life_insurance'].includes(asset))
    .reduce((sum, [_, value]) => sum + value, 0);
  
  const spenddownAmount = Math.max(0, countableAssets - resourceLimit);
  const totalIncome = Object.values(income).reduce((sum, value) => sum + value, 0);
  
  // For married applicants, determine patient income after preserving spousal income
  let patientIncome;
  if (maritalStatus === 'married-one') {
    // Use state-specific spousal impoverishment protections
    const spousalIncomeNeeds = Math.min(
      stateRules.spousalImpoverishmentIncome.maximumMonthlyMaintenanceNeeds,
      Math.max(stateRules.spousalImpoverishmentIncome.minimumMonthlyMaintenanceNeeds, totalIncome)
    );
    patientIncome = Math.max(0, totalIncome - spousalIncomeNeeds);
  } else {
    patientIncome = totalIncome;
  }
  
  // Check if Miller Trust is required
  const millerTrustRequired = isMillerTrustRequired(stateRules, patientIncome);
  
  // Estimate monthly copay after subtracting a personal expense allowance
  const copayEstimate = Math.max(0, patientIncome - stateRules.personalNeedsAllowance);
  
  // Home equity considerations
  const homeValue = assets.home || 0;
  const homeEquityExemption = Math.min(homeValue, stateRules.homeEquityLimit);
  const homeEquityExcess = Math.max(0, homeValue - stateRules.homeEquityLimit);
  
  // Determine planning urgency based on age, health status, and crisis flag
  let urgency;
  if (isCrisis || healthStatus === 'critical' || age >= 80) {
    urgency = "High - Immediate crisis planning required";
  } else if (healthStatus === 'declining' || age >= 70) {
    urgency = "Medium - Begin pre-planning soon";
  } else {
    urgency = "Low - Good candidate for long-term pre-planning";
  }
  
  // Calculate how many years until the next review (based on age)
  const yearsTo65 = Math.max(0, 65 - age);
  const yearsToReview = Math.min(5, Math.max(1, Math.floor(yearsTo65 / 2)));
  
  let recommendedApproach;
  if (spenddownAmount <= 0) {
    recommendedApproach = "No asset spend-down needed. Focus on application and verification process.";
  } else if (spenddownAmount > 500000) {
    recommendedApproach = "Consider self-funding strategy. Restructure portfolio to maximize income.";
  } else {
    recommendedApproach = "Develop asset protection plan for Medicaid eligibility.";
  }
  
  return {
    totalAssets: countableAssets + nonCountableAssets,
    countableAssets,
    nonCountableAssets,
    spenddownAmount,
    estimatedMonthlyCopay: copayEstimate,
    recommendedApproach,
    planningUrgency: urgency,
    yearsToReview,
    millerTrustRequired,
    homeEquityExcess,
    stateSpecificDetails: {
      state,
      homeEquityExemption,
      homeEquityLimit: stateRules.homeEquityLimit,
      personalNeedsAllowance: stateRules.personalNeedsAllowance,
      lookBackPeriod: stateRules.lookBackPeriod,
      penaltyDivisor: stateRules.penaltyDivisor,
      averageNursingHomeCost: stateRules.averageNursingHomeCost
    }
  };
};

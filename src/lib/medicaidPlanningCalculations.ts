
/**
 * Medicaid Planning Calculations
 * Adapted from Python logic to TypeScript for web application use
 * Refactored into multiple files for better organization
 */
import { getStateRules } from "@/data/stateRules";
import { parseNumber } from "./utils/medicaidUtils";
import { assessMedicareCoverage } from "./medicaid/medicareCoverage";
import { assessFacilityMedicaidCompatibility } from "./medicaid/facilityAssessment";
import { calculateSpendDown, calculateTransferPenalty } from "./medicaid/assetCalculations";
import { isMillerTrustRequired } from "./medicaid/incomeCalculations";
import { medicaidEligibilityAssessment } from "./medicaid/eligibilityAssessment";

// Re-export functions that were previously directly in this file
export {
  assessMedicareCoverage,
  assessFacilityMedicaidCompatibility,
  calculateSpendDown,
  calculateTransferPenalty,
  isMillerTrustRequired,
  medicaidEligibilityAssessment
};

/**
 * Integrated Medicaid planning algorithm.
 */
export const medicaidPlanningAlgorithm = (
  formData: any
) => {
  // Parse essential client info
  const clientInfo = {
    name: formData.firstName,
    age: parseNumber(formData.age),
    recentHospitalStay: false, // This would come from form data in a real implementation
    requiresSkilledCare: false, // This would come from form data in a real implementation
    healthStatus: 'stable' // Default value, would be from form in real implementation
  };

  // Parse assets from form data
  const assets: Record<string, number> = {
    bank_accounts: parseNumber(formData.liquidAssets),
    investments: 0, // Could further break down liquid assets in future versions
    home: formData.ownsHome ? parseNumber(formData.homeValue) : 0,
    vehicle: formData.hasVehicles ? parseNumber(formData.vehiclesValue) : 0,
    retirement: formData.hasRetirementAccounts ? parseNumber(formData.retirementValue) : 0,
    spouseRetirement: formData.hasSpouseRetirementAccounts ? parseNumber(formData.spouseRetirementValue) : 0,
    lifeInsurance: formData.hasLifeInsurance ? parseNumber(formData.lifeInsuranceValue) : 0,
    additionalProperty: formData.ownsAdditionalProperty ? parseNumber(formData.additionalPropertyValue) : 0
  };

  // Parse income from form data
  const income: Record<string, number> = {
    monthly: parseNumber(formData.monthlyIncome),
    spouseMonthly: parseNumber(formData.spouseMonthlyIncome)
  };

  // Set marital status
  const maritalStatus = formData.maritalStatus || 'single';
  
  // Get state-specific rules
  const state = formData.state?.toLowerCase() || 'default';
  const stateRules = getStateRules(state);

  // Step 1: Eligibility Assessment
  const eligibility = medicaidEligibilityAssessment(
    clientInfo, 
    assets, 
    income, 
    maritalStatus, 
    state, 
    clientInfo.age,
    clientInfo.healthStatus,
    false // isCrisis - could be determined by form responses
  );
  
  // Step 2: Assess Medicare Coverage (simplified version)
  const medicare = assessMedicareCoverage(clientInfo);
  
  // Step 3: Calculate Spend-Down Amount
  const spendDown = calculateSpendDown(assets, stateRules, maritalStatus);
  
  // Step 4: Determine Overall Planning Approach
  let planningApproach;
  if (medicare.eligibleForMedicare) {
    planningApproach = "Utilize Medicare coverage before transitioning to Medicaid.";
  } else if (spendDown > 0) {
    planningApproach = "Develop spend-down strategy to reach Medicaid eligibility.";
  } else {
    planningApproach = "Proceed with Medicaid application.";
  }
  
  // Create a planning timeline
  const planningTimeline = [
    "Complete detailed asset and income verification.",
    "Develop and implement spend-down strategies (if needed).",
    "Verify Medicare coverage details (if eligible).",
    "Confirm facility Medicaid certification and bed availability.",
    "Prepare and file Medicaid application.",
    "Undergo Medicaid verification process.",
    "Follow up post-eligibility for estate planning review."
  ];

  // Calculate protection estimates (similar to existing logic)
  const { totalAssets, countableAssets } = eligibility;
  const minProtectionRate = 0.6;
  const maxProtectionRate = 0.7;
  
  const minProtection = Math.round(countableAssets * minProtectionRate);
  const maxProtection = Math.round(countableAssets * maxProtectionRate);
  
  // Add Miller Trust check
  const millerTrustRequired = isMillerTrustRequired(
    stateRules, 
    parseNumber(formData.monthlyIncome) + parseNumber(formData.spouseMonthlyIncome)
  );
  
  return {
    // Basic calculations from existing report
    totalAssets,
    countableAssets,
    minProtection,
    maxProtection,
    minPercentage: Math.round(minProtectionRate * 100),
    maxPercentage: Math.round(maxProtectionRate * 100),
    
    // Enhanced details with new state rules
    eligibilityAssessment: eligibility,
    medicareCoverage: medicare,
    spendDownAmount: spendDown,
    planningApproach,
    planningTimeline,
    
    millerTrustRequired,
    penaltyDivisor: stateRules.penaltyDivisor,
    
    // Calculate more detailed asset protection strategy
    detailedProtectionPlan: {
      // Half-a-loaf strategy protection (similar to existing)
      halfLoafProtection: Math.round(spendDown * 0.5),
      // Annuity protection estimates
      minAnnuityProtection: Math.round(spendDown * 0.1),
      maxAnnuityProtection: Math.round(spendDown * 0.2),
    },
    
    // Include state-specific rules used in calculations
    stateRules: {
      state: formData.state || 'Unknown',
      resourceLimitSingle: stateRules.resourceLimitSingle,
      resourceLimitMarried: stateRules.resourceLimitMarried,
      resourceLimitCoupleSharing: stateRules.resourceLimitCoupleSharing,
      homeEquityLimit: stateRules.homeEquityLimit,
      lookBackPeriod: stateRules.lookBackPeriod,
      penaltyDivisor: stateRules.penaltyDivisor,
      averageNursingHomeCost: stateRules.averageNursingHomeCost
    }
  };
};

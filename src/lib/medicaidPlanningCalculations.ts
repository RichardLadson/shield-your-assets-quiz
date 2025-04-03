
/**
 * Medicaid Planning Calculations
 * Adapted from Python logic to TypeScript for web application use
 */
import { getStateRules, StateRule } from "@/data/stateRules";

// Helper function to parse number from form data (reused from reportCalculations.ts)
const parseNumber = (value: string): number => {
  if (!value) return 0;
  if (value === "unknown") return 0;
  
  // Remove any non-numeric characters except decimal points
  const sanitizedValue = value.replace(/[^0-9.]/g, '');
  return parseFloat(sanitizedValue) || 0;
};

/**
 * Assess whether the client is eligible for Medicare coverage.
 * Eligibility is based on having had a recent hospital stay and requiring skilled care.
 */
export const assessMedicareCoverage = (clientInfo: any) => {
  if (clientInfo.recentHospitalStay && clientInfo.requiresSkilledCare) {
    return {
      eligibleForMedicare: true,
      potentialCoverageDays: 100,
      fullCoverageDays: 20,
      coInsuranceDays: 80,
      coInsuranceRate: 200  // Example rate; update annually as needed
    };
  }
  return { eligibleForMedicare: false };
};

/**
 * Check whether the chosen facility is Medicaid-certified and determine
 * if it has available Medicaid beds along with any private pay requirements.
 */
export const assessFacilityMedicaidCompatibility = (facilityInfo: any) => {
  if (!facilityInfo) {
    return { warning: "Facility information not provided. Unable to assess Medicaid compatibility." };
  }
  
  return {
    isMedicaidCertified: facilityInfo.isMedicaidCertified || false,
    hasAvailableMedicaidBed: facilityInfo.hasAvailableMedicaidBed || false,
    privatePayRequirement: facilityInfo.privatePayRequirement || 0  // in months
  };
};

/**
 * Calculate the spend-down amount required to reach Medicaid eligibility.
 * Countable assets exclude exempt assets such as home, vehicle, burial plot, and life insurance.
 */
export const calculateSpendDown = (assets: Record<string, number>, stateRules: StateRule, maritalStatus: string): number => {
  const countableAssets = Object.entries(assets)
    .filter(([asset]) => !['home', 'vehicle', 'burial_plot', 'life_insurance'].includes(asset))
    .reduce((sum, [_, value]) => sum + value, 0);
  
  const resourceLimit = maritalStatus === 'single' ? 
    stateRules.resourceLimitSingle : stateRules.resourceLimitMarried;
  
  return Math.max(0, countableAssets - resourceLimit);
};

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
  
  const resourceLimit = maritalStatus === 'single' ? 
    stateRules.resourceLimitSingle : stateRules.resourceLimitMarried;
  
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
  if (maritalStatus === 'married') {
    // Use state-specific spousal impoverishment protections
    const spousalIncomeNeeds = Math.min(
      stateRules.spousalImpoverishmentIncome.maximumMonthlyMaintenanceNeeds,
      Math.max(stateRules.spousalImpoverishmentIncome.minimumMonthlyMaintenanceNeeds, totalIncome)
    );
    patientIncome = Math.max(0, totalIncome - spousalIncomeNeeds);
  } else {
    patientIncome = totalIncome;
  }
  
  // Estimate monthly copay after subtracting a personal expense allowance
  const copayEstimate = Math.max(0, patientIncome - stateRules.personalNeedsAllowance);
  
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
  
  // Additional state-specific considerations
  const homeEquityExemptionLimit = stateRules.homeEquityLimit;
  const homeValue = assets.home || 0;
  const homeEquityExemption = Math.min(homeValue, homeEquityExemptionLimit);
  
  return {
    totalAssets: countableAssets + nonCountableAssets,
    countableAssets,
    nonCountableAssets,
    spenddownAmount,
    estimatedMonthlyCopay: copayEstimate,
    recommendedApproach,
    planningUrgency: urgency,
    yearsToReview,
    stateSpecificDetails: {
      state,
      homeEquityExemption,
      homeEquityLimit: stateRules.homeEquityLimit,
      personalNeedsAllowance: stateRules.personalNeedsAllowance,
      lookBackPeriod: stateRules.lookBackPeriod,
      averageNursingHomeCost: stateRules.averageNursingHomeCost
    }
  };
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
  const maritalStatus = formData.maritalStatus === 'married' ? 'married' : 'single';
  
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
  
  return {
    // Basic calculations from existing report
    totalAssets,
    countableAssets,
    minProtection,
    maxProtection,
    minPercentage: Math.round(minProtectionRate * 100),
    maxPercentage: Math.round(maxProtectionRate * 100),
    
    // New detailed assessment
    eligibilityAssessment: eligibility,
    medicareCoverage: medicare,
    spendDownAmount: spendDown,
    planningApproach,
    planningTimeline,
    
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
      homeEquityLimit: stateRules.homeEquityLimit,
      lookBackPeriod: stateRules.lookBackPeriod,
      averageNursingHomeCost: stateRules.averageNursingHomeCost
    }
  };
};

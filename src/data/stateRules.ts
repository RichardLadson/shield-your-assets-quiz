
// State-specific Medicaid rules for 2024
// Source: Medicaid eligibility guidelines vary by state

export interface StateRule {
  // Resource/Asset Limits
  resourceLimitSingle: number;     // Asset limit for single applicants
  resourceLimitMarried: number;    // Asset limit for married applicants (community spouse)
  resourceLimitCoupleSharing: number; // Asset limit when both spouses apply

  // Home and Property Limits
  homeEquityLimit: number;         // Maximum exempt home equity
  homeExemptPeriod: number;        // Period home remains exempt when in facility (months)
  
  // Income Thresholds
  monthlyIncomeLimit: number;      // Monthly income limit for eligibility
  
  // Spousal Impoverishment Protections
  spousalImpoverishmentIncome: {
    minimumMonthlyMaintenanceNeeds: number;
    maximumMonthlyMaintenanceNeeds: number;
  };
  
  // Community Spouse Resource Allowance
  spousalResourceAllowance: {
    minimum: number;
    maximum: number;
  };
  
  // Policy Parameters
  lookBackPeriod: number;          // Look-back period in months (typically 60 months)
  penaltyDivisor: number;          // Penalty divisor for transfer calculations
  personalNeedsAllowance: number;  // Personal needs allowance
  
  // Long-Term Care Costs
  averageNursingHomeCost: number;  // Average monthly nursing home cost in the state
  
  // Miller Trust / QIT
  requiresMillerTrust: boolean;    // Whether state requires Miller Trust/QIT
  millerTrustThreshold: number;    // Income threshold for Miller Trust requirement
}

export const stateRules: Record<string, StateRule> = {
  "alabama": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    resourceLimitCoupleSharing: 3000,
    homeEquityLimit: 656000,
    homeExemptPeriod: 6,
    monthlyIncomeLimit: 2742,
    spousalImpoverishmentIncome: {
      minimumMonthlyMaintenanceNeeds: 2288.75,
      maximumMonthlyMaintenanceNeeds: 3715.50
    },
    spousalResourceAllowance: {
      minimum: 29724,
      maximum: 148620
    },
    lookBackPeriod: 60,
    penaltyDivisor: 6810,
    personalNeedsAllowance: 30,
    averageNursingHomeCost: 7118,
    requiresMillerTrust: true,
    millerTrustThreshold: 2742
  },
  "alaska": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    resourceLimitCoupleSharing: 3000,
    homeEquityLimit: 984000,
    homeExemptPeriod: 6,
    monthlyIncomeLimit: 2742,
    spousalImpoverishmentIncome: {
      minimumMonthlyMaintenanceNeeds: 2288.75,
      maximumMonthlyMaintenanceNeeds: 3715.50
    },
    spousalResourceAllowance: {
      minimum: 29724,
      maximum: 148620
    },
    lookBackPeriod: 60,
    penaltyDivisor: 15817,
    personalNeedsAllowance: 200,
    averageNursingHomeCost: 33994,
    requiresMillerTrust: true,
    millerTrustThreshold: 2742
  },
  "arizona": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    resourceLimitCoupleSharing: 3000,
    homeEquityLimit: 656000,
    homeExemptPeriod: 6,
    monthlyIncomeLimit: 2742,
    spousalImpoverishmentIncome: {
      minimumMonthlyMaintenanceNeeds: 2288.75,
      maximumMonthlyMaintenanceNeeds: 3715.50
    },
    spousalResourceAllowance: {
      minimum: 29724,
      maximum: 148620
    },
    lookBackPeriod: 60,
    penaltyDivisor: 9284,
    personalNeedsAllowance: 116.25,
    averageNursingHomeCost: 8111,
    requiresMillerTrust: true,
    millerTrustThreshold: 2742
  },
  "arkansas": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    resourceLimitCoupleSharing: 3000,
    homeEquityLimit: 656000,
    homeExemptPeriod: 6,
    monthlyIncomeLimit: 2742,
    spousalImpoverishmentIncome: {
      minimumMonthlyMaintenanceNeeds: 2288.75,
      maximumMonthlyMaintenanceNeeds: 3715.50
    },
    spousalResourceAllowance: {
      minimum: 29724,
      maximum: 148620
    },
    lookBackPeriod: 60,
    penaltyDivisor: 5950,
    personalNeedsAllowance: 40,
    averageNursingHomeCost: 6370,
    requiresMillerTrust: false,
    millerTrustThreshold: 0
  },
  "california": {
    resourceLimitSingle: 130000,
    resourceLimitMarried: 195000,
    resourceLimitCoupleSharing: 195000,
    homeEquityLimit: 1000000,
    homeExemptPeriod: 6,
    monthlyIncomeLimit: 1583,
    spousalImpoverishmentIncome: {
      minimumMonthlyMaintenanceNeeds: 2288.75,
      maximumMonthlyMaintenanceNeeds: 3715.50
    },
    spousalResourceAllowance: {
      minimum: 29724,
      maximum: 148620
    },
    lookBackPeriod: 30,  // California uses a 30-month look-back period
    penaltyDivisor: 10933,
    personalNeedsAllowance: 35,
    averageNursingHomeCost: 10798,
    requiresMillerTrust: false,
    millerTrustThreshold: 0
  },
  // Add more states here as needed...
  
  // This is a default fallback for states not explicitly defined
  "default": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    resourceLimitCoupleSharing: 3000,
    homeEquityLimit: 656000,
    homeExemptPeriod: 6,
    monthlyIncomeLimit: 2742,
    spousalImpoverishmentIncome: {
      minimumMonthlyMaintenanceNeeds: 2288.75,
      maximumMonthlyMaintenanceNeeds: 3715.50
    },
    spousalResourceAllowance: {
      minimum: 29724,
      maximum: 148620
    },
    lookBackPeriod: 60,
    penaltyDivisor: 8517,
    personalNeedsAllowance: 60,
    averageNursingHomeCost: 8517,
    requiresMillerTrust: false,
    millerTrustThreshold: 0
  }
};

// Helper function to get state rules (handles case sensitivity and default fallback)
export const getStateRules = (state: string): StateRule => {
  const normalizedState = state?.toLowerCase().trim() || '';
  return stateRules[normalizedState] || stateRules.default;
};


// State-specific Medicaid rules for 2024
// Source: Medicaid eligibility guidelines vary by state

export interface StateRule {
  resourceLimitSingle: number;     // Asset limit for single applicants
  resourceLimitMarried: number;    // Asset limit for married applicants (community spouse)
  homeEquityLimit: number;         // Maximum exempt home equity
  monthlyIncomeLimit: number;      // Monthly income limit 
  spousalImpoverishmentIncome: {   // Spousal impoverishment protections
    minimumMonthlyMaintenanceNeeds: number;
    maximumMonthlyMaintenanceNeeds: number;
  };
  spousalResourceAllowance: {      // Community spouse resource allowance
    minimum: number;
    maximum: number;
  };
  lookBackPeriod: number;          // Look-back period in months (typically 60 months)
  personalNeedsAllowance: number;  // Personal needs allowance
  averageNursingHomeCost: number;  // Average monthly nursing home cost in the state
}

export const stateRules: Record<string, StateRule> = {
  "alabama": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    homeEquityLimit: 656000,
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
    personalNeedsAllowance: 30,
    averageNursingHomeCost: 7118
  },
  "alaska": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    homeEquityLimit: 984000,
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
    personalNeedsAllowance: 200,
    averageNursingHomeCost: 33994
  },
  "arizona": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    homeEquityLimit: 656000,
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
    personalNeedsAllowance: 116.25,
    averageNursingHomeCost: 8111
  },
  // Add more states here as needed...
  
  // This is a default fallback for states not explicitly defined
  "default": {
    resourceLimitSingle: 2000,
    resourceLimitMarried: 3000,
    homeEquityLimit: 656000,
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
    personalNeedsAllowance: 60,
    averageNursingHomeCost: 8517
  }
};

// Helper function to get state rules (handles case sensitivity and default fallback)
export const getStateRules = (state: string): StateRule => {
  const normalizedState = state?.toLowerCase().trim() || '';
  return stateRules[normalizedState] || stateRules.default;
};

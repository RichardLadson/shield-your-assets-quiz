
/**
 * Medicaid asset-related calculations
 */
import { StateRule } from "@/data/stateRules";

/**
 * Calculate the spend-down amount required to reach Medicaid eligibility.
 * Countable assets exclude exempt assets such as home, vehicle, burial plot, and life insurance.
 */
export const calculateSpendDown = (assets: Record<string, number>, stateRules: StateRule, maritalStatus: string): number => {
  const countableAssets = Object.entries(assets)
    .filter(([asset]) => !['home', 'vehicle', 'burial_plot', 'life_insurance'].includes(asset))
    .reduce((sum, [_, value]) => sum + value, 0);
  
  let resourceLimit;
  
  if (maritalStatus === 'married-both') {
    // Both spouses applying for Medicaid
    resourceLimit = stateRules.resourceLimitCoupleSharing;
  } else if (maritalStatus === 'married-one') {
    // Only one spouse applying, use the married resource limit
    resourceLimit = stateRules.resourceLimitMarried;
  } else {
    // Single applicant (includes single, widowed, divorced)
    resourceLimit = stateRules.resourceLimitSingle;
  }
  
  return Math.max(0, countableAssets - resourceLimit);
};

/**
 * Calculate penalty period for improper transfers during lookback period.
 */
export const calculateTransferPenalty = (
  transferAmount: number, 
  stateRules: StateRule
): number => {
  if (transferAmount <= 0) return 0;
  const months = transferAmount / stateRules.penaltyDivisor;
  return Math.ceil(months * 100) / 100; // Round up to 2 decimal places
};

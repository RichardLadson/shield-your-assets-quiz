
/**
 * Medicaid income-related calculations
 */
import { StateRule } from "@/data/stateRules";

/**
 * Determine if a Miller Trust (Qualified Income Trust) is required
 * based on state requirements and applicant's income.
 */
export const isMillerTrustRequired = (stateRules: StateRule, monthlyIncome: number): boolean => {
  return stateRules.requiresMillerTrust && monthlyIncome > stateRules.millerTrustThreshold;
};

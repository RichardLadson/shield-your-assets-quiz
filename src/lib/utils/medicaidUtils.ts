
/**
 * Shared utility functions for Medicaid planning calculations
 */

// Helper function to parse number from form data 
export const parseNumber = (value: string): number => {
  if (!value) return 0;
  if (value === "unknown") return 0;
  
  // Remove any non-numeric characters except decimal points
  const sanitizedValue = value.replace(/[^0-9.]/g, '');
  return parseFloat(sanitizedValue) || 0;
};

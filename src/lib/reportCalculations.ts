
// Helper function to parse number from form data
const parseNumber = (value: string): number => {
  if (!value) return 0;
  if (value === "unknown") return 0;
  
  // Remove any non-numeric characters except decimal points
  const sanitizedValue = value.replace(/[^0-9.]/g, '');
  return parseFloat(sanitizedValue) || 0;
};

export const calculateAssetData = (formData: any) => {
  // Calculate total assets
  const homeValue = parseNumber(formData.homeValue);
  const mortgageBalance = formData.mortgageStatus === 'yes' ? parseNumber(formData.mortgageBalance) : 0;
  const homeEquity = homeValue - mortgageBalance;
  
  const liquidAssets = parseNumber(formData.liquidAssets);
  const retirementValue = formData.hasRetirementAccounts ? parseNumber(formData.retirementValue) : 0;
  const spouseRetirementValue = formData.hasSpouseRetirementAccounts ? parseNumber(formData.spouseRetirementValue) : 0;
  const lifeInsuranceValue = formData.hasLifeInsurance && formData.lifeInsuranceValue !== 'unknown' ? parseNumber(formData.lifeInsuranceValue) : 0;
  
  const additionalPropertyValue = formData.ownsAdditionalProperty ? parseNumber(formData.additionalPropertyValue) : 0;
  const additionalPropertyMortgageBalance = formData.additionalPropertyMortgage === 'yes' ? parseNumber(formData.additionalPropertyMortgageBalance) : 0;
  const additionalPropertyEquity = additionalPropertyValue - additionalPropertyMortgageBalance;
  
  const vehiclesValue = formData.hasVehicles ? parseNumber(formData.vehiclesValue) : 0;

  // Calculate total assets
  const totalAssets = homeEquity + liquidAssets + retirementValue + spouseRetirementValue + 
                      lifeInsuranceValue + additionalPropertyEquity + vehiclesValue;
  
  // Calculate countable assets (exclude primary home up to state limits and one vehicle)
  // For simplicity, we assume the home and primary car are exempt
  const countableAssets = liquidAssets + retirementValue + spouseRetirementValue + 
                          lifeInsuranceValue + additionalPropertyEquity + vehiclesValue;
  
  // Calculate estimates for asset protection
  const minProtection = Math.round(countableAssets * 0.6);
  const maxProtection = Math.round(countableAssets * 0.7);
  
  const minPercentage = 60;
  const maxPercentage = 70;

  return {
    totalAssets,
    countableAssets,
    minProtection,
    maxProtection,
    minPercentage,
    maxPercentage
  };
};

export const calculateDetailedAssetData = (formData: any) => {
  // Basic calculations
  const basicData = calculateAssetData(formData);
  const { totalAssets, countableAssets } = basicData;
  
  // Additional calculations for detailed report
  const assetLimit = 2000; // Standard Medicaid asset limit for single individual
  const excessAssets = Math.max(0, countableAssets - assetLimit);
  
  // Reverse Half-a-Loaf strategy (protect roughly half)
  const halfLoafProtection = Math.round(excessAssets * 0.5);
  
  // Medicaid-compliant annuity protection (additional 10-20% of excess)
  const minAnnuityProtection = Math.round(excessAssets * 0.1);
  const maxAnnuityProtection = Math.round(excessAssets * 0.2);
  
  // Total protection estimates
  const minProtection = halfLoafProtection + minAnnuityProtection;
  const maxProtection = halfLoafProtection + maxAnnuityProtection;
  
  // Percentage of countable assets protected
  const minPercentage = Math.round((minProtection / countableAssets) * 100);
  const maxPercentage = Math.round((maxProtection / countableAssets) * 100);
  
  // Asset breakdown for visual representation
  const homeValue = parseNumber(formData.homeValue);
  const mortgageBalance = formData.mortgageStatus === 'yes' ? parseNumber(formData.mortgageBalance) : 0;
  const homeEquity = homeValue - mortgageBalance;
  
  const assetBreakdown = [
    {
      name: "Primary Residence",
      value: homeEquity,
      exempt: true
    },
    {
      name: "Liquid Assets (Cash, Savings, Investments)",
      value: parseNumber(formData.liquidAssets),
      exempt: false
    }
  ];
  
  if (formData.hasRetirementAccounts) {
    assetBreakdown.push({
      name: "Retirement Accounts",
      value: parseNumber(formData.retirementValue),
      exempt: false
    });
  }
  
  if (formData.hasSpouseRetirementAccounts) {
    assetBreakdown.push({
      name: "Spouse's Retirement Accounts",
      value: parseNumber(formData.spouseRetirementValue),
      exempt: false
    });
  }
  
  if (formData.hasLifeInsurance && formData.lifeInsuranceValue !== 'unknown') {
    assetBreakdown.push({
      name: "Life Insurance (Cash Value)",
      value: parseNumber(formData.lifeInsuranceValue),
      exempt: false
    });
  }
  
  if (formData.ownsAdditionalProperty) {
    const additionalPropertyValue = parseNumber(formData.additionalPropertyValue);
    const additionalPropertyMortgageBalance = formData.additionalPropertyMortgage === 'yes' 
      ? parseNumber(formData.additionalPropertyMortgageBalance) 
      : 0;
    const additionalPropertyEquity = additionalPropertyValue - additionalPropertyMortgageBalance;
    
    assetBreakdown.push({
      name: "Additional Property",
      value: additionalPropertyEquity,
      exempt: false
    });
  }
  
  assetBreakdown.push({
    name: "Primary Vehicle",
    value: 0, // Assumed value, typically exempt
    exempt: true
  });
  
  if (formData.hasVehicles) {
    assetBreakdown.push({
      name: "Additional Vehicles/RV/Boat",
      value: parseNumber(formData.vehiclesValue),
      exempt: false
    });
  }
  
  return {
    ...basicData,
    excessAssets,
    halfLoafProtection,
    minAnnuityProtection,
    maxAnnuityProtection,
    assetBreakdown
  };
};

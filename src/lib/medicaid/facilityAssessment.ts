
/**
 * Medicaid facility compatibility assessment
 */

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


/**
 * Medicaid Planning Integration Helper
 * This file provides helper functions to integrate the Medicaid API
 * with your React frontend.
 */

import MedicaidAPI from './medicaid-api-client';

interface ClientInfo {
  name?: string;
  age?: number;
  maritalStatus?: string;
  healthStatus?: string;
}

interface FormData {
  [key: string]: any;
}

interface EligibilityResult {
  status?: string;
  countableAssets?: number;
  resourceLimit?: number;
  spenddownAmount?: number;
  isResourceEligible?: boolean;
  isIncomeEligible?: boolean;
  urgency?: string;
  planStrategies?: string[];
  [key: string]: any;
}

interface ReportResult {
  content?: string;
  [key: string]: any;
}

/**
 * Initialize the API with your deployment URL
 * @param {string} apiUrl - The API base URL
 * @param {string} ghlApiKey - The GoHighLevel API key (optional)
 */
function initializeAPI(apiUrl: string, ghlApiKey?: string): void {
  MedicaidAPI.setBaseUrl(apiUrl);
  if (ghlApiKey) {
    MedicaidAPI.setGhlApiKey(ghlApiKey);
  }
  console.log(`Medicaid Planning API initialized with ${apiUrl}`);
}

/**
 * Process a quiz submission for eligibility assessment
 * @param {FormData} formData - The form data from the quiz
 * @returns {Promise<{eligibilityResult: EligibilityResult, reportResult: ReportResult}>} - Results
 */
async function processQuizSubmission(formData: FormData): Promise<{
  eligibilityResult: EligibilityResult;
  reportResult: ReportResult;
}> {
  try {
    console.log('Processing quiz submission:', formData);
    
    // Assess eligibility
    const eligibilityResult = await MedicaidAPI.assessEligibility(formData);
    
    if (eligibilityResult.status === 'error') {
      throw new Error(eligibilityResult.error);
    }
    
    // Format client info for report generation
    const clientInfo: ClientInfo = {
      name: formData.fullName || formData.name || 'Client',
      age: parseInt(String(formData.age) || '0'),
      maritalStatus: formData.maritalStatus || 'single',
      healthStatus: formData.healthStatus || 'good'
    };
    
    // Generate a report
    const reportResult = await MedicaidAPI.generateReport(
      eligibilityResult,
      clientInfo,
      formData.state
    );
    
    return {
      eligibilityResult,
      reportResult
    };
  } catch (error: any) {
    console.error('Error processing quiz submission:', error);
    throw error;
  }
}

export {
  initializeAPI,
  processQuizSubmission,
};

export default {
  initializeAPI,
  processQuizSubmission,
};

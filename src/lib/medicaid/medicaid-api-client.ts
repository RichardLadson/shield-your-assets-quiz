/**
 * Medicaid Planning API Client
 * This file provides integration with the Medicaid Planning backend API
 */

interface ClientInfo {
  name?: string;
  age?: number;
  maritalStatus?: string;
  healthStatus?: string;
}

interface Assets {
  savings?: number;
  investments?: number;
  home?: number;
  vehicle?: number;
  life_insurance?: number;
  retirement?: number;
  other_assets?: number;
}

interface Income {
  social_security?: number;
  pension?: number;
  retirement_income?: number;
  other_income?: number;
}

interface FormData {
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: string | number;
  state?: string;
  maritalStatus?: string;
  healthStatus?: string;
  savings?: string | number;
  bankAccounts?: string | number;
  investments?: string | number;
  homeValue?: string | number;
  home?: string | number;
  vehicleValue?: string | number;
  vehicle?: string | number;
  lifeInsurance?: string | number;
  retirement?: string | number;
  retirementIncome?: string | number;
  otherAssets?: string | number;
  socialSecurity?: string | number;
  pension?: string | number;
  otherIncome?: string | number;
  needsCareSoon?: string | boolean;
  isCrisis?: boolean;
  expenses?: any;
  mortgage?: number;
  address?: string;
  city?: string;
  zipCode?: string;
  [key: string]: any;
}

const MedicaidAPI = {
  baseUrl: 'https://your-aws-url.elasticbeanstalk.com/api',
  ghl: {
    apiUrl: 'https://rest.gohighlevel.com/v1/contacts/',
    apiKey: 'YOUR_GHL_API_KEY'
  },

  setBaseUrl(url: string): void {
    this.baseUrl = url;
    console.log(`API base URL set to: ${url}`);
  },

  setGhlApiKey(apiKey: string): void {
    this.ghl.apiKey = apiKey;
    console.log('GoHighLevel API key set');
  },

  handleApiError(error: any): { status: string; error: string } {
    console.error('API Error:', error);
    return {
      status: 'error',
      error: error.message || 'An unknown error occurred'
    };
  },

  async assessEligibility(formData: FormData): Promise<any> {
    try {
      const apiData = this.formatQuizDataForApi(formData);
      const response = await fetch(`${this.baseUrl}/eligibility/assess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to assess eligibility');
      this.sendLeadToCRM(formData, data);
      return data;
    } catch (error) {
      return this.handleApiError(error);
    }
  },

  formatQuizDataForApi(formData: FormData): { clientInfo: ClientInfo; assets: Assets; income: Income; state: string; isCrisis: boolean } {
    return {
      clientInfo: {
        name: formData.fullName || formData.name || 'Anonymous Client',
        age: parseInt(String(formData.age) || '0'),
        maritalStatus: formData.maritalStatus || 'single',
        healthStatus: formData.healthStatus || 'good'
      },
      assets: {
        savings: parseFloat(String(formData.savings) || String(formData.bankAccounts) || '0'),
        investments: parseFloat(String(formData.investments) || '0'),
        home: parseFloat(String(formData.homeValue) || String(formData.home) || '0'),
        vehicle: parseFloat(String(formData.vehicleValue) || String(formData.vehicle) || '0'),
        life_insurance: parseFloat(String(formData.lifeInsurance) || '0'),
        retirement: parseFloat(String(formData.retirement) || '0'),
        other_assets: parseFloat(String(formData.otherAssets) || '0')
      },
      income: {
        social_security: parseFloat(String(formData.socialSecurity) || '0'),
        pension: parseFloat(String(formData.pension) || '0'),
        retirement_income: parseFloat(String(formData.retirementIncome) || '0'),
        other_income: parseFloat(String(formData.otherIncome) || '0')
      },
      state: formData.state || '',
      isCrisis: formData.needsCareSoon === 'yes' || formData.isCrisis === true
    };
  },

  async generateReport(eligibilityResult: any, clientInfo: ClientInfo, state: string, reportType = 'client-friendly'): Promise<any> {
    try {
      const planningResults = { initialAssessment: { eligibility: eligibilityResult } };
      const response = await fetch(`${this.baseUrl}/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planningResults, clientInfo, state, reportType, outputFormat: 'html' })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate report');
      return data;
    } catch (error) {
      return this.handleApiError(error);
    }
  },

  async sendLeadToCRM(formData: FormData, eligibilityResult: any): Promise<boolean> {
    try {
      if (!formData.email && !formData.phone) {
        console.warn('Missing email or phone, cannot send to CRM');
        return false;
      }
      const crmData = {
        firstName: formData.fullName ? String(formData.fullName).split(' ')[0] : '',
        lastName: formData.fullName ? String(formData.fullName).split(' ').slice(1).join(' ') : '',
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
        customField: {
          countableAssets: eligibilityResult.countableAssets,
          resourceLimit: eligibilityResult.resourceLimit,
          spenddownAmount: eligibilityResult.spenddownAmount,
          isEligible: eligibilityResult.isEligible ? 'Yes' : 'No',
          urgency: eligibilityResult.urgency
        },
        tags: ['Medicaid Quiz Lead']
      };
      if (!this.ghl.apiKey) {
        console.warn('Missing GoHighLevel API key, cannot send to CRM');
        return false;
      }
      const response = await fetch(this.ghl.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.ghl.apiKey}`
        },
        body: JSON.stringify(crmData)
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Error sending lead to CRM:', data);
        return false;
      }
      console.log('Lead successfully sent to CRM');
      return true;
    } catch (error) {
      console.error('Error sending lead to CRM:', error);
      return false;
    }
  },

  async processAssetPlanning(formData: FormData): Promise<any> {
    try {
      const apiData = this.formatQuizDataForApi(formData);
      const response = await fetch(`${this.baseUrl}/planning/asset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientInfo: apiData.clientInfo, assets: apiData.assets, state: apiData.state })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to process asset planning');
      return data;
    } catch (error) {
      return this.handleApiError(error);
    }
  },

  async processIncomePlanning(formData: FormData): Promise<any> {
    try {
      const apiData = this.formatQuizDataForApi(formData);
      const response = await fetch(`${this.baseUrl}/planning/income`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientInfo: apiData.clientInfo, income: apiData.income, expenses: formData.expenses || {}, state: apiData.state })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to process income planning');
      return data;
    } catch (error) {
      return this.handleApiError(error);
    }
  },

  async processComprehensivePlanning(formData: FormData): Promise<any> {
    try {
      const apiData = this.formatQuizDataForApi(formData);
      const response = await fetch(`${this.baseUrl}/planning/comprehensive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientInfo: apiData.clientInfo,
          assets: apiData.assets,
          income: apiData.income,
          expenses: formData.expenses || {},
          homeInfo: { value: apiData.assets.home, mortgage: formData.mortgage || 0 },
          state: apiData.state
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to process comprehensive planning');
      return data;
    } catch (error) {
      return this.handleApiError(error);
    }
  }
};

export default MedicaidAPI;

import React from 'react';

interface MedicaidResultsProps {
  eligibilityResult: any;
  reportResult?: any;
}

export function MedicaidResults({ eligibilityResult, reportResult }: MedicaidResultsProps) {
  if (!eligibilityResult) return null;
  
  // Format currency values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD'
    }).format(amount);
  };
  
  // Determine eligibility status
  const isEligible = eligibilityResult.isResourceEligible && eligibilityResult.isIncomeEligible;
  const statusClass = isEligible ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  const statusText = isEligible ? 'Eligible' : 'Not Eligible';
  
  return (
    <div className="medicaid-results">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Medicaid Eligibility Results</h2>
        <div className={`px-4 py-2 rounded-md font-semibold ${statusClass}`}>
          {statusText}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-600">Countable Assets:</div>
            <div className="font-semibold">{formatCurrency(eligibilityResult.countableAssets || 0)}</div>
          </div>
          <div>
            <div className="text-gray-600">Resource Limit:</div>
            <div className="font-semibold">{formatCurrency(eligibilityResult.resourceLimit || 0)}</div>
          </div>
          <div>
            <div className="text-gray-600">Spend-down Required:</div>
            <div className="font-semibold">{formatCurrency(eligibilityResult.spenddownAmount || 0)}</div>
          </div>
          <div>
            <div className="text-gray-600">Planning Urgency:</div>
            <div className="font-semibold">{eligibilityResult.urgency || 'Medium'}</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Planning Strategies</h3>
        <ul className="list-disc pl-5 space-y-1">
          {(eligibilityResult.planStrategies || []).length > 0 ? (
            eligibilityResult.planStrategies.map((strategy: string, index: number) => (
              <li key={index}>{strategy}</li>
            ))
          ) : (
            <li>No specific strategies identified</li>
          )}
        </ul>
      </div>
      
      {reportResult && reportResult.content && (
        <div className="border border-gray-200 rounded-md p-4 my-6">
          <h3 className="text-xl font-semibold mb-2">Your Detailed Report</h3>
          <div className="report-content" dangerouslySetInnerHTML={{ __html: reportResult.content }} />
        </div>
      )}
      
      <div className="text-center bg-blue-50 p-6 rounded-md my-8">
        <h3 className="text-xl font-semibold mb-2">Ready to Take the Next Step?</h3>
        <p className="mb-4">Schedule a consultation with our team to discuss your Medicaid planning options.</p>
        <button 
          className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => window.open('https://calendly.com/your-scheduling-link', '_blank')}
        >
          Schedule a Consultation
        </button>
      </div>
    </div>
  );
}
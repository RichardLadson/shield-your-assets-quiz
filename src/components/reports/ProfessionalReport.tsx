
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateDetailedAssetData } from "@/lib/reportCalculations";
import { medicaidPlanningAlgorithm } from "@/lib/medicaidPlanningCalculations";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, DollarSign, PieChart, ArrowRight } from "lucide-react";

interface ProfessionalReportProps {
  formData: any;
}

const ProfessionalReport = ({ formData }: ProfessionalReportProps) => {
  const { firstName, lastName, state, completingFor } = formData;
  const displayName = firstName || "Client";
  
  // Determine who the report is about
  const isForSelf = completingFor === "myself";
  const subjectPronoun = isForSelf ? "Your" : `${firstName}'s`;
  const objectPronoun = isForSelf ? "your" : "their";
  
  // Use our new medicaid planning algorithm
  const {
    totalAssets,
    countableAssets,
    minProtection,
    maxProtection,
    minPercentage,
    maxPercentage,
    detailedProtectionPlan,
    spendDownAmount,
    planningApproach,
    planningTimeline,
    eligibilityAssessment
  } = medicaidPlanningAlgorithm(formData);
  
  const { halfLoafProtection, minAnnuityProtection, maxAnnuityProtection } = detailedProtectionPlan;
  
  // Create asset breakdown from previous implementation for continuity
  const assetBreakdown = [
    {
      name: "Primary Residence",
      value: formData.ownsHome ? parseFloat(formData.homeValue) || 0 : 0,
      exempt: true
    },
    {
      name: "Liquid Assets (Cash, Savings, Investments)",
      value: parseFloat(formData.liquidAssets) || 0,
      exempt: false
    }
  ];
  
  if (formData.hasRetirementAccounts) {
    assetBreakdown.push({
      name: "Retirement Accounts",
      value: parseFloat(formData.retirementValue) || 0,
      exempt: false
    });
  }
  
  if (formData.hasSpouseRetirementAccounts) {
    assetBreakdown.push({
      name: "Spouse's Retirement Accounts",
      value: parseFloat(formData.spouseRetirementValue) || 0,
      exempt: false
    });
  }
  
  if (formData.hasLifeInsurance && formData.lifeInsuranceValue !== 'unknown') {
    assetBreakdown.push({
      name: "Life Insurance (Cash Value)",
      value: parseFloat(formData.lifeInsuranceValue) || 0,
      exempt: false
    });
  }
  
  if (formData.ownsAdditionalProperty) {
    const additionalPropertyValue = parseFloat(formData.additionalPropertyValue) || 0;
    const additionalPropertyMortgageBalance = formData.additionalPropertyMortgage === 'yes' 
      ? parseFloat(formData.additionalPropertyMortgageBalance) || 0
      : 0;
    const additionalPropertyEquity = additionalPropertyValue - additionalPropertyMortgageBalance;
    
    assetBreakdown.push({
      name: "Additional Property",
      value: additionalPropertyEquity,
      exempt: false
    });
  }
  
  // Add primary vehicle as exempt
  assetBreakdown.push({
    name: "Primary Vehicle",
    value: 0, // Assumed value, typically exempt
    exempt: true
  });
  
  if (formData.hasVehicles) {
    assetBreakdown.push({
      name: "Additional Vehicles/RV/Boat",
      value: parseFloat(formData.vehiclesValue) || 0,
      exempt: false
    });
  }

  return (
    <div className="space-y-6 print:text-black">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-800">Detailed Asset Protection Estimate for {displayName}</h1>
        <p className="text-gray-500 mt-2">Professional Medicaid Planning Analysis</p>
      </div>

      <Card className="shadow-md">
        <CardHeader className="bg-gray-50 pb-2">
          <CardTitle className="text-xl text-purple-800 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Asset Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold">Total Assets:</span>
              <span className="text-xl font-bold">${totalAssets.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold">Countable Assets:</span>
              <span className="text-xl font-bold">${countableAssets.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-semibold">Excess Assets:</span>
              <span className="text-xl font-bold">${spendDownAmount.toLocaleString()}</span>
            </div>
            
            <p className="text-sm text-gray-600">
              After accounting for the Medicaid asset limit for a {formData.maritalStatus} person,
              {isForSelf ? " you have" : ` ${firstName} has`} ${spendDownAmount.toLocaleString()} in excess countable assets 
              that must be managed to achieve Medicaid eligibility.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="bg-gray-50 pb-2">
          <CardTitle className="text-xl text-purple-800 flex items-center">
            <PieChart className="mr-2 h-5 w-5" /> Asset Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetBreakdown.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>${asset.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    {asset.exempt ? (
                      <span className="text-green-600 font-semibold">Exempt</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Countable</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold text-purple-800 mt-8">Estimated Protection Strategies Breakdown</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader className="bg-blue-50 pb-2">
            <CardTitle className="text-lg text-blue-700">
              1. Reverse Half-a-Loaf Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold mb-2">${halfLoafProtection.toLocaleString()}</p>
            <p className="text-gray-600 text-sm">
              By using the Reverse Half-a-Loaf strategy, {isForSelf ? "you" : displayName} can gift half of the countable 
              assets and use the remaining half to cover the costs during the penalty period.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="bg-blue-50 pb-2">
            <CardTitle className="text-lg text-blue-700">
              2. Medicaid-Compliant Annuity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold mb-2">
              ${minAnnuityProtection.toLocaleString()} - ${maxAnnuityProtection.toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm">
              By purchasing a Medicaid-compliant annuity, {isForSelf ? "you" : displayName} can protect an additional 
              10-20% of the countable assets.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md mt-6">
        <CardHeader className="bg-green-50 pb-2">
          <CardTitle className="text-lg text-green-700 flex items-center">
            <CheckCircle className="mr-2 h-5 w-5" /> Summary of Estimated Protected Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Minimum Protection Estimate:</span>
              <span className="text-xl font-bold text-green-700">${minProtection.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600 ml-4">
              This includes using the Reverse Half-a-Loaf strategy and converting 10% of the excess assets 
              into a Medicaid-compliant annuity.
            </p>
            
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold">Maximum Protection Estimate:</span>
              <span className="text-xl font-bold text-green-700">${maxProtection.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600 ml-4">
              This includes using the Reverse Half-a-Loaf strategy and converting 20% of the excess assets 
              into a Medicaid-compliant annuity.
            </p>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between items-center">
              <span className="font-semibold">Percentage of Assets Protected:</span>
              <span className="text-xl font-bold text-green-700">{minPercentage}%-{maxPercentage}%</span>
            </div>
            <p className="text-sm text-gray-600 ml-4">
              Of the countable assets.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md mt-6">
        <CardHeader className="bg-purple-50 pb-2">
          <CardTitle className="text-lg text-purple-700 flex items-center">
            <ArrowRight className="mr-2 h-5 w-5" /> Recommended Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 mb-4">{planningApproach}</p>
          
          {eligibilityAssessment && (
            <div className="mt-4 pt-4 border-t">
              <p className="font-semibold">Planning Urgency: 
                <span className={`ml-2 ${eligibilityAssessment.planningUrgency.includes("High") ? "text-red-600" : 
                  eligibilityAssessment.planningUrgency.includes("Medium") ? "text-yellow-600" : "text-green-600"}`}>
                  {eligibilityAssessment.planningUrgency}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Next recommended review: {eligibilityAssessment.yearsToReview} {eligibilityAssessment.yearsToReview === 1 ? "year" : "years"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Recommended Action Steps:</h2>
        
        <div className="space-y-6">
          {planningTimeline.map((step, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-purple-700" /> 
                {step}
              </h3>
              <p className="text-gray-600 ml-7">
                {index === 0 ? "Begin by gathering all financial statements, property deeds, and income documentation." : 
                 index === 1 ? "Work with your advisor to prioritize which assets to protect first." :
                 ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500 italic">
          Disclaimer: The above estimates are based on the general Medicaid rules and planning 
          strategies. The actual amount of assets that can be protected will depend on the specific 
          details of your situation, state-specific Medicaid regulations, and how the strategies are 
          executed with the help of a Certified Medicaid Planner and Elder Law Attorney.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalReport;

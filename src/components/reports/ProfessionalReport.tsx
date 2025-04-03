
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateDetailedAssetData } from "@/lib/reportCalculations";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, DollarSign, PieChart, ArrowRight } from "lucide-react";

interface ProfessionalReportProps {
  formData: any;
}

const ProfessionalReport = ({ formData }: ProfessionalReportProps) => {
  const { firstName, lastName, state } = formData;
  const displayName = firstName || "Client";
  
  const {
    totalAssets,
    countableAssets,
    excessAssets,
    halfLoafProtection,
    minAnnuityProtection,
    maxAnnuityProtection,
    minProtection,
    maxProtection,
    minPercentage,
    maxPercentage,
    assetBreakdown
  } = calculateDetailedAssetData(formData);

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
              <span className="text-xl font-bold">${excessAssets.toLocaleString()}</span>
            </div>
            
            <p className="text-sm text-gray-600">
              After accounting for the Medicaid asset limit for a single person ($2,000), 
              {displayName} has ${excessAssets.toLocaleString()} in excess countable assets 
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
              By using the Reverse Half-a-Loaf strategy, {displayName} can gift half of the countable 
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
              By purchasing a Medicaid-compliant annuity, {displayName} can protect an additional 
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Recommended Strategies and Actions:</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-700" /> 
              Reverse Half-a-Loaf Strategy
            </h3>
            <p className="text-gray-600 ml-7">
              Gifting half of the countable assets and preparing for a penalty period.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-700" /> 
              Medicaid-Compliant Annuity
            </h3>
            <p className="text-gray-600 ml-7">
              Setting up an annuity that complies with Medicaid regulations, ensuring it's 
              irrevocable, non-assignable, and actuarially sound.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-700" /> 
              Consultation with Elder Law Attorney
            </h3>
            <p className="text-gray-600 ml-7">
              Coordinate all strategies with a professional attorney to ensure compliance 
              with {state || "your state"}'s Medicaid rules.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center">
              <ArrowRight className="mr-2 h-5 w-5 text-purple-700" /> 
              Documentation
            </h3>
            <p className="text-gray-600 ml-7">
              Maintain detailed documentation of every transaction, especially for annuity 
              and asset conversion strategies, to ensure the eligibility application is clear 
              and fully supported.
            </p>
          </div>
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

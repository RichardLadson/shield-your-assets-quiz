
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAssetData } from "@/lib/reportCalculations";
import { Badge } from "@/components/ui/badge";
import { InfoCircle, ShieldCheck, AlertCircle } from "lucide-react";

interface LeadMagnetReportProps {
  formData: any;
}

const LeadMagnetReport = ({ formData }: LeadMagnetReportProps) => {
  const { firstName, lastName } = formData;
  const displayName = firstName || "Friend";
  
  const {
    totalAssets,
    countableAssets,
    minProtection,
    maxProtection,
    minPercentage,
    maxPercentage
  } = calculateAssetData(formData);

  return (
    <div className="space-y-6 print:text-black">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-800">Medicaid Planning Snapshot for {displayName}</h1>
        <p className="text-gray-500 mt-2">Your personalized asset protection analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="pb-2 bg-blue-50">
            <CardTitle className="text-blue-700 flex items-center text-lg">
              <InfoCircle className="mr-2 h-5 w-5" /> Total Assets
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-bold">${totalAssets.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">
              {displayName} has accumulated significant assets, including their home, savings, and investments. Understanding 
              the value of these assets is crucial in determining how to protect them effectively while planning for Medicaid.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2 bg-red-50">
            <CardTitle className="text-red-700 flex items-center text-lg">
              <AlertCircle className="mr-2 h-5 w-5" /> Assets At Risk
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-bold">${countableAssets.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">
              Out of {displayName}'s total assets, ${countableAssets.toLocaleString()} are considered countable and at risk of 
              impacting Medicaid eligibility. These assets are subject to Medicaid's spend-down requirements unless properly managed.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2 bg-green-50">
            <CardTitle className="text-green-700 flex items-center text-lg">
              <ShieldCheck className="mr-2 h-5 w-5" /> Potential Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-bold">
              ${minProtection.toLocaleString()} - ${maxProtection.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              With the right Medicaid planning strategies, {displayName} could potentially protect 
              {minPercentage}% to {maxPercentage}% of their countable assets.*
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-purple-800 mb-4">Recommended Next Steps:</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Badge className="mt-1 bg-purple-700">1</Badge>
            <div className="ml-4">
              <h3 className="font-semibold">Act Quickly</h3>
              <p className="text-gray-600">Time is a critical factor. Implement these strategies as soon as possible to protect the maximum amount of assets.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Badge className="mt-1 bg-purple-700">2</Badge>
            <div className="ml-4">
              <h3 className="font-semibold">Consult with a Certified Medicaid Planner</h3>
              <p className="text-gray-600">Speak with a Certified Medicaid Planner who can guide you through the specific steps needed to protect {displayName}'s assets.</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Badge className="mt-1 bg-purple-700">3</Badge>
            <div className="ml-4">
              <h3 className="font-semibold">Document All Actions</h3>
              <p className="text-gray-600">Proper documentation is key to ensure compliance and maximize asset protection.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500 italic">
          *Disclaimer: The exact amount of assets that can be protected will depend on several factors, including 
          the specific facts of your case, the Medicaid laws in your state, and the strategies that are implemented 
          by both your Certified Medicaid Planner and Elder Law Attorney.
        </p>
      </div>
    </div>
  );
};

export default LeadMagnetReport;

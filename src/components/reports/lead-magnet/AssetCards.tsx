
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ShieldCheck, AlertCircle } from "lucide-react";

interface AssetCardsProps {
  totalAssets: number;
  countableAssets: number;
  minProtection: number;
  maxProtection: number;
  minPercentage: number;
  maxPercentage: number;
  isForSelf: boolean;
  firstName: string;
  objectPronoun: string;
  subjectPronoun: string;
}

export const AssetCards = ({
  totalAssets,
  countableAssets,
  minProtection,
  maxProtection,
  minPercentage,
  maxPercentage,
  isForSelf,
  firstName,
  objectPronoun,
  subjectPronoun
}: AssetCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2 bg-blue-50 h-16 flex items-center">
          <CardTitle className="text-blue-700 flex items-center text-lg">
            <Info className="mr-2 h-5 w-5" /> Total Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-3xl font-bold">${totalAssets.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">
            {isForSelf 
              ? "You have accumulated significant assets, including your home, savings, and investments."
              : `${firstName} has accumulated significant assets, including ${objectPronoun} home, savings, and investments.`
            } Understanding the value of these assets is crucial in determining how to protect them effectively while planning for Medicaid.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2 bg-red-50 h-16 flex items-center">
          <CardTitle className="text-red-700 flex items-center text-lg">
            <AlertCircle className="mr-2 h-5 w-5" /> Assets At Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-3xl font-bold">${countableAssets.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">
            Out of {subjectPronoun.toLowerCase()} total assets, ${countableAssets.toLocaleString()} are considered countable and at risk of 
            impacting Medicaid eligibility. These assets are subject to Medicaid's spend-down requirements unless properly managed.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2 bg-green-50 h-16 flex items-center">
          <CardTitle className="text-green-700 flex items-center text-lg">
            <ShieldCheck className="mr-2 h-5 w-5" /> Potential Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-3xl font-bold">
            ${minProtection.toLocaleString()} - ${maxProtection.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            With the right Medicaid planning strategies, {isForSelf ? "you" : firstName} could potentially protect 
            {minPercentage}% to {maxPercentage}% of {isForSelf ? "your" : objectPronoun} countable assets.*
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

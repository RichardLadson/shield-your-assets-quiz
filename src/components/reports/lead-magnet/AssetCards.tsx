
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ShieldCheck } from "lucide-react";

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
  // Calculate the non-countable assets (assets not at risk)
  const nonCountableAssets = totalAssets - countableAssets;
  
  // Calculate the total amount that can be sheltered (non-countable assets + potential protection)
  const minTotalShelter = nonCountableAssets + minProtection;
  const maxTotalShelter = nonCountableAssets + maxProtection;
  
  // Calculate percentage of total assets that can be sheltered
  const minTotalPercentage = Math.round((minTotalShelter / totalAssets) * 100);
  const maxTotalPercentage = Math.round((maxTotalShelter / totalAssets) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
            } Understanding the value of these assets is crucial in determining how to shelter them effectively while planning for Medicaid.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2 bg-green-50 h-16 flex items-center">
          <CardTitle className="text-green-700 flex items-center text-lg">
            <ShieldCheck className="mr-2 h-5 w-5" /> Total Potential Shelter
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-3xl font-bold">
            ${minTotalShelter.toLocaleString()} - ${maxTotalShelter.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            With the right Medicaid planning strategies, {isForSelf ? "you" : firstName} could potentially shelter 
            {minTotalPercentage}% to {maxTotalPercentage}% of {isForSelf ? "your" : objectPronoun} total assets.*
          </p>
          <p className="text-xs text-gray-500 mt-2">
            *This includes assets already exempt under Medicaid rules combined with additional assets that can be 
            protected through proper planning strategies.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

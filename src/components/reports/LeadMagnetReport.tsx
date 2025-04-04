
import { medicaidPlanningAlgorithm } from "@/lib/medicaidPlanningCalculations";
import { AssetCards } from "./lead-magnet/AssetCards";
import { RecommendedApproach } from "./lead-magnet/RecommendedApproach";

interface LeadMagnetReportProps {
  formData: any;
}

const LeadMagnetReport = ({ formData }: LeadMagnetReportProps) => {
  const { firstName, lastName, completingFor, email } = formData;
  const displayName = firstName || "Friend";
  
  // Determine who the report is about
  const isForSelf = completingFor === "myself";
  const subjectPronoun = isForSelf ? "Your" : `${firstName}'s`;
  const objectPronoun = isForSelf ? "your" : "their";
  const reflexivePronoun = isForSelf ? "yourself" : "themselves";
  
  // Use the new medicaid planning algorithm for more detailed calculations
  const {
    totalAssets,
    countableAssets,
    minProtection,
    maxProtection,
    minPercentage,
    maxPercentage,
    planningApproach
  } = medicaidPlanningAlgorithm(formData);
  
  return (
    <div className="space-y-6 print:text-black">
      <div id="lead-magnet-pdf-content">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-800">
            {isForSelf ? "Your" : `${firstName}'s`} Medicaid Planning Snapshot
          </h1>
          <p className="text-gray-500 mt-2">
            {isForSelf ? "Your" : "A"} personalized asset protection analysis
          </p>
        </div>

        <AssetCards 
          totalAssets={totalAssets}
          countableAssets={countableAssets}
          minProtection={minProtection}
          maxProtection={maxProtection}
          minPercentage={minPercentage}
          maxPercentage={maxPercentage}
          isForSelf={isForSelf}
          firstName={firstName}
          objectPronoun={objectPronoun}
          subjectPronoun={subjectPronoun}
        />

        <RecommendedApproach
          planningApproach={planningApproach}
          isForSelf={isForSelf}
          firstName={firstName}
          objectPronoun={objectPronoun}
        />

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 italic">
            *Disclaimer: The exact amount of assets that can be protected will depend on several factors, including 
            the specific facts of your case, the Medicaid laws in your state, and the strategies that are implemented 
            by both your Certified Medicaid Planner and Elder Law Attorney.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnetReport;

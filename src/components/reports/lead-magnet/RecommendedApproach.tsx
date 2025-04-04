
import { Badge } from "@/components/ui/badge";

interface RecommendedApproachProps {
  planningApproach: string;
  isForSelf: boolean;
  firstName: string;
  objectPronoun: string;
}

export const RecommendedApproach = ({
  planningApproach,
  isForSelf,
  firstName,
  objectPronoun
}: RecommendedApproachProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-purple-800 mb-4">Recommended Approach:</h2>
      <p className="text-gray-700 mb-4">
        {planningApproach}
      </p>
      
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
            <p className="text-gray-600">
              Speak with a Certified Medicaid Planner who can guide {isForSelf ? "you" : "you both"} through the specific steps needed to protect {isForSelf ? "your" : `${firstName}'s`} assets.
            </p>
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
  );
};


import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step9Props {
  email: string;
  firstName?: string;
  completingFor: string;
  lovedOneName?: string;
  onChange: (data: Partial<{
    email: string;
  }>) => void;
}

const Step9WrapUp = ({ email, firstName, completingFor, lovedOneName, onChange }: Step9Props) => {
  const isForSelf = completingFor === "yourself";
  const subjectName = isForSelf ? firstName : lovedOneName || "your loved one";
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Almost Done!</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            {isForSelf && firstName 
              ? `Please provide your email address so we can share your personalized Medicaid plan, ${firstName}.` 
              : isForSelf 
                ? "Please provide your email address so we can share your personalized Medicaid plan." 
                : `Please provide your email address so we can share ${subjectName}'s personalized Medicaid plan.`}
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="your@email.com"
            className="w-full"
            required
          />
          <p className="text-sm text-gray-500">Required to generate your report</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
        <h3 className="text-lg font-medium text-purple-800 mb-2">Disclaimer</h3>
        <p className="text-sm text-gray-700">
          By submitting this form, you understand that the resulting Medicaid eligibility and spend-down calculation 
          is only an estimate and is not binding. Results depend on actual circumstances, state-specific rules, 
          and the recommendations of your Certified Medicaid Planner and Elder Law Attorney. The information provided 
          is for general educational purposes and does not constitute legal or financial advice.
        </p>
      </div>

      <p className="text-lg text-purple-700 mt-4">
        {isForSelf && firstName
          ? `Thank you so much for taking the time to provide all this information, ${firstName}! 🎉 You're on the path to protecting your assets and getting the best Medicaid plan possible.`
          : isForSelf
            ? "Thank you so much for taking the time to provide all this information! 🎉 You're on the path to protecting your assets and getting the best Medicaid plan possible."
            : `Thank you so much for taking the time to provide all this information for ${subjectName}! 🎉 You're on the path to protecting ${subjectName}'s assets and getting the best Medicaid plan possible.`}
      </p>
    </div>
  );
};

export default Step9WrapUp;

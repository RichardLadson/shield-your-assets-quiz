
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step9Props {
  email: string;
  firstName: string;
  onChange: (data: Partial<{
    email: string;
  }>) => void;
}

const Step9WrapUp = ({ email, firstName, onChange }: Step9Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Almost Done!</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            {firstName 
              ? `Can you provide your email address so we can share your personalized Medicaid plan, ${firstName}?` 
              : "Can you provide your email address so we can share your personalized Medicaid plan?"}
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="your@email.com (optional)"
            className="w-full"
          />
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

      {firstName && (
        <p className="text-lg text-purple-700 mt-4">
          Thank you so much for taking the time to provide all this information, {firstName}! 🎉 
          You're on the path to protecting your assets and getting the best Medicaid plan possible.
        </p>
      )}
    </div>
  );
};

export default Step9WrapUp;

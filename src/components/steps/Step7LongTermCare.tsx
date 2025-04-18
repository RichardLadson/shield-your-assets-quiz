
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Step7Props {
  hasLongTermCare: boolean;
  longTermCareAmount: string;
  firstName: string;
  completingFor: string;
  lovedOneName?: string;
  onChange: (data: Partial<{
    hasLongTermCare: boolean;
    longTermCareAmount: string;
  }>) => void;
}

const Step7LongTermCare = ({ 
  hasLongTermCare, 
  longTermCareAmount, 
  firstName, 
  completingFor, 
  lovedOneName,
  onChange 
}: Step7Props) => {
  const isForSelf = completingFor === "myself";
  const subjectName = isForSelf ? firstName : lovedOneName || "your loved one";
  const possessive = isForSelf ? "you" : `${subjectName}`;
  const doesDo = isForSelf ? "Do you" : `Does ${subjectName}`;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Long-Term Care Insurance</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="has-long-term-care">{doesDo} have long-term care insurance?</Label>
        <Switch
          id="has-long-term-care"
          checked={hasLongTermCare}
          onCheckedChange={(checked) => onChange({ 
            hasLongTermCare: checked,
            longTermCareAmount: checked ? longTermCareAmount : ""
          })}
        />
      </div>
      
      {hasLongTermCare && (
        <div className="space-y-2">
          <Label htmlFor="long-term-care-amount">Daily benefit amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input
              id="long-term-care-amount"
              type="text"
              value={longTermCareAmount}
              onChange={(e) => onChange({ longTermCareAmount: e.target.value })}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>
      )}

      <p className="text-lg text-purple-700 mt-4">
        {isForSelf 
          ? `You're almost there, ${firstName}! We're just collecting a few more details.` 
          : `We're almost done with ${lovedOneName || "your loved one"}'s assessment! Just a few more details to collect.`}
      </p>
    </div>
  );
};

export default Step7LongTermCare;

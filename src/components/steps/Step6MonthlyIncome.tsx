
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step6Props {
  monthlyIncome: string;
  spouseMonthlyIncome: string;
  maritalStatus: string;
  firstName: string;
  onChange: (data: Partial<{
    monthlyIncome: string;
    spouseMonthlyIncome: string;
  }>) => void;
}

const Step6MonthlyIncome = ({ monthlyIncome, spouseMonthlyIncome, maritalStatus, firstName, onChange }: Step6Props) => {
  const isMarried = maritalStatus.startsWith('married');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Monthly Income</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="monthly-income">
            {firstName ? `What's your monthly income, ${firstName}?` : "What's your monthly income?"}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input
              id="monthly-income"
              type="text"
              value={monthlyIncome}
              onChange={(e) => onChange({ monthlyIncome: e.target.value })}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>
        
        {isMarried && (
          <div className="space-y-2">
            <Label htmlFor="spouse-monthly-income">How about your spouse's monthly income?</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="spouse-monthly-income"
                type="text"
                value={spouseMonthlyIncome}
                onChange={(e) => onChange({ spouseMonthlyIncome: e.target.value })}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step6MonthlyIncome;

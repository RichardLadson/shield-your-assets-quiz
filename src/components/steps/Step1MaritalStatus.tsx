
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step1Props {
  value: string;
  onChange: (value: string) => void;
}

const Step1MaritalStatus = ({ value, onChange }: Step1Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Marital Status</h2>
      <p className="text-gray-600">Please select your current marital status.</p>
      <div className="space-y-2">
        <Label htmlFor="marital-status">Marital Status</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="marital-status" className="w-full">
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married-one">Married, spouse not applying for Medicaid</SelectItem>
            <SelectItem value="married-both">Married, both spouses applying for Medicaid</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Step1MaritalStatus;

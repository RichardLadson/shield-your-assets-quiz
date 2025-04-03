
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step2Props {
  value: string;
  onChange: (value: string) => void;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const Step2StateResidence = ({ value, onChange }: Step2Props) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">State of Residence</h2>
      <p className="text-gray-600">Please select your current state of residence.</p>
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="state" className="w-full">
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((state) => (
              <SelectItem key={state} value={state.toLowerCase()}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Step2StateResidence;

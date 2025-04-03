
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step2Props {
  state: string;
  age: string;
  maritalStatus: string;
  firstName: string;
  onChange: (data: Partial<{
    state: string;
    age: string;
    maritalStatus: string;
  }>) => void;
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

const Step2BasicDetails = ({ state, age, maritalStatus, firstName, onChange }: Step2Props) => {
  const personalizedGreeting = firstName ? `${firstName}, which` : "Which";
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Basic Details</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">{personalizedGreeting} state do you currently live in?</Label>
          <Select value={state} onValueChange={(value) => onChange({ state: value })}>
            <SelectTrigger id="state" className="w-full">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((stateName) => (
                <SelectItem key={stateName} value={stateName.toLowerCase()}>
                  {stateName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">
            {firstName ? `How old are you, ${firstName}?` : "How old are you?"}
          </Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            value={age}
            onChange={(e) => onChange({ age: e.target.value })}
            placeholder="Enter your age"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus">What's your marital status?</Label>
          <Select value={maritalStatus} onValueChange={(value) => onChange({ maritalStatus: value })}>
            <SelectTrigger id="maritalStatus" className="w-full">
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married-one">Married, spouse not applying for Medicaid</SelectItem>
              <SelectItem value="married-both">Married, both spouses applying for Medicaid</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Step2BasicDetails;

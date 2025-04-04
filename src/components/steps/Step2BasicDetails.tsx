
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stateRules } from "@/data/stateRules";

interface Step2Props {
  state: string;
  age: string;
  maritalStatus: string;
  firstName: string;
  completingFor: string;
  lovedOneName?: string;
  onChange: (data: Partial<{
    state: string;
    age: string;
    maritalStatus: string;
  }>) => void;
}

// Create a sorted list of states from our stateRules
const AVAILABLE_STATES = Object.keys(stateRules)
  .filter(state => state !== "default")
  .sort()
  .map(state => ({
    value: state,
    label: state.charAt(0).toUpperCase() + state.slice(1)
  }));

// Full list of US States for reference (we'll use AVAILABLE_STATES instead)
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

const Step2BasicDetails = ({ state, age, maritalStatus, firstName, completingFor, lovedOneName, onChange }: Step2Props) => {
  const isForSelf = completingFor === "myself";
  const subjectName = isForSelf ? firstName : lovedOneName || "your loved one";
  const possessive = isForSelf ? "your" : `${subjectName}'s`;
  const pronoun = isForSelf ? "you" : subjectName;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Basic Details</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">Which state does {pronoun} currently live in?</Label>
          <Select value={state} onValueChange={(value) => onChange({ state: value })}>
            <SelectTrigger id="state" className="w-full">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_STATES.map((stateObj) => (
                <SelectItem key={stateObj.value} value={stateObj.value}>
                  {stateObj.label}
                </SelectItem>
              ))}
              <SelectItem value="default">Other States (Default Rules)</SelectItem>
            </SelectContent>
          </Select>
          {state && state !== "default" && stateRules[state] ? (
            <p className="text-sm text-gray-500 mt-1">
              Using specific Medicaid rules for {state.charAt(0).toUpperCase() + state.slice(1)}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">
              Specific rules not available for this state. Using default guidelines.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">
            How old is {pronoun}?
          </Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            value={age}
            onChange={(e) => onChange({ age: e.target.value })}
            placeholder="Enter age"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maritalStatus">What's {possessive} marital status?</Label>
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

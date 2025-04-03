
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step1Props {
  firstName: string;
  lastName: string;
  completingFor: string;
  onChange: (data: Partial<{
    firstName: string;
    lastName: string;
    completingFor: string;
  }>) => void;
}

const Step1Introduction = ({ firstName, lastName, completingFor, onChange }: Step1Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Welcome! Let's Get Started</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Hi there! 👋 What's your first name?</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className="w-full"
          />
        </div>

        {firstName && (
          <div className="space-y-2">
            <Label htmlFor="lastName">{firstName}, thanks for being here today! What's your last name?</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              placeholder="Enter your last name"
              className="w-full"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="completingFor">
            {firstName ? `${firstName}, are` : "Are"} you completing this form for yourself or for someone else?
          </Label>
          <Select value={completingFor} onValueChange={(value) => onChange({ completingFor: value })}>
            <SelectTrigger id="completingFor" className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="myself">For myself</SelectItem>
              <SelectItem value="loved-one">For a loved one</SelectItem>
              <SelectItem value="client">For a friend or client</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {firstName && (
          <p className="text-lg text-purple-700 mt-4">
            Thank you, {firstName}. We're here to make this process easy and to help protect your assets for the future.
          </p>
        )}
      </div>
    </div>
  );
};

export default Step1Introduction;

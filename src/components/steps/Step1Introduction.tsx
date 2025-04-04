
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
  lovedOneName: string;
  lovedOneGender: string;
  lovedOneRelation: string;
  onChange: (data: Partial<{
    firstName: string;
    lastName: string;
    completingFor: string;
    lovedOneName: string;
    lovedOneGender: string;
    lovedOneRelation: string;
  }>) => void;
}

const Step1Introduction = ({ 
  firstName, 
  lastName, 
  completingFor, 
  lovedOneName, 
  lovedOneGender, 
  lovedOneRelation, 
  onChange 
}: Step1Props) => {
  const showLovedOneFields = completingFor === "someone-else";
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Welcome! Let's Get Started</h2>

      <div className="flex items-start space-x-4 mb-6">
        <Avatar className="h-16 w-16 border-2 border-purple-200">
          <AvatarImage src="/lovable-uploads/a4580117-1664-4485-8726-47c1f0c0471e.png" alt="Medicaid Planning Specialist" />
          <AvatarFallback className="bg-purple-100 text-purple-600 text-lg">MP</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-gray-700 text-lg">
            Hi there! I'm your Medicaid planning specialist. The information you provide helps me personalize 
            this assessment specifically for your situation.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">What's your first name?</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="Enter your first name"
            className="w-full"
            autoFocus
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
            {firstName ? `${firstName}, who` : "Who"} is this Medicaid planning assessment for?
          </Label>
          <Select 
            value={completingFor} 
            onValueChange={(value) => onChange({ 
              completingFor: value,
              // Reset the loved one fields if switching to "yourself"
              lovedOneName: value === "yourself" ? "" : lovedOneName,
              lovedOneGender: value === "yourself" ? "" : lovedOneGender,
              lovedOneRelation: value === "yourself" ? "" : lovedOneRelation
            })}
          >
            <SelectTrigger id="completingFor" className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yourself">For yourself</SelectItem>
              <SelectItem value="someone-else">For someone else</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-1">
            This helps us personalize the questions throughout the assessment.
          </p>
        </div>

        {showLovedOneFields && (
          <>
            <div className="space-y-2">
              <Label htmlFor="lovedOneName">What's their first name?</Label>
              <Input
                id="lovedOneName"
                value={lovedOneName}
                onChange={(e) => onChange({ lovedOneName: e.target.value })}
                placeholder="Enter their first name"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lovedOneGender">What is their gender?</Label>
              <Select value={lovedOneGender} onValueChange={(value) => onChange({ lovedOneGender: value })}>
                <SelectTrigger id="lovedOneGender" className="w-full">
                  <SelectValue placeholder="Select their gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lovedOneRelation">What is your relation to them?</Label>
              <Select value={lovedOneRelation} onValueChange={(value) => onChange({ lovedOneRelation: value })}>
                <SelectTrigger id="lovedOneRelation" className="w-full">
                  <SelectValue placeholder="Select your relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {firstName && (
          <p className="text-lg text-purple-700 mt-4">
            Thank you, {firstName}. We're here to make this process easy and to help protect {completingFor === "yourself" ? "your" : lovedOneName ? `${lovedOneName}'s` : "your loved one's"} assets for the future.
          </p>
        )}
      </div>
    </div>
  );
};

export default Step1Introduction;

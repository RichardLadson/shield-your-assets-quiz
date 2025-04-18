
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Step5Props {
  hasVehicles: boolean;
  vehiclesValue: string;
  firstName?: string;
  completingFor: string;
  lovedOneName?: string;
  onChange: (data: Partial<{
    hasVehicles: boolean;
    vehiclesValue: string;
  }>) => void;
}

const Step5VehiclesAssets = ({ 
  hasVehicles, 
  vehiclesValue, 
  firstName, 
  completingFor,
  lovedOneName,
  onChange 
}: Step5Props) => {
  const isForSelf = completingFor === "myself";
  const subjectName = isForSelf ? firstName : lovedOneName || "your loved one";
  const possessive = isForSelf ? "you" : `${subjectName}`;
  const doesDo = isForSelf ? "Do you" : `Does ${subjectName}`;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Vehicles and Other Assets</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="has-vehicles">{doesDo} own any other vehicles like a second car, an RV, or a boat?</Label>
        <Switch
          id="has-vehicles"
          checked={hasVehicles}
          onCheckedChange={(checked) => onChange({ 
            hasVehicles: checked,
            vehiclesValue: checked ? vehiclesValue : ""
          })}
        />
      </div>
      
      {hasVehicles && (
        <div className="space-y-2">
          <Label htmlFor="vehicles-value">Combined value (minus any loans)</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input
              id="vehicles-value"
              type="text"
              value={vehiclesValue}
              onChange={(e) => onChange({ vehiclesValue: e.target.value })}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>
      )}
      
      <p className="text-lg text-purple-700 mt-4">
        {isForSelf 
          ? `You're making great progress${firstName ? `, ${firstName}` : ''}! Just a few more questions to go.` 
          : `We're making great progress on ${subjectName}'s assessment! Just a few more questions to go.`}
      </p>
    </div>
  );
};

export default Step5VehiclesAssets;

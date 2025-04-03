
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Step5Props {
  hasVehicles: boolean;
  vehiclesValue: string;
  onChange: (data: Partial<{
    hasVehicles: boolean;
    vehiclesValue: string;
  }>) => void;
}

const Step5VehiclesAssets = ({ hasVehicles, vehiclesValue, onChange }: Step5Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Vehicles and Other Assets</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="has-vehicles">Do you own any other vehicles like a second car, an RV, or a boat?</Label>
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
    </div>
  );
};

export default Step5VehiclesAssets;

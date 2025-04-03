
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step3Props {
  ownsHome: boolean;
  homeValue: string;
  mortgageStatus: string;
  mortgageBalance: string;
  firstName: string;
  onChange: (data: Partial<{
    ownsHome: boolean;
    homeValue: string;
    mortgageStatus: string;
    mortgageBalance: string;
  }>) => void;
}

const Step3PrimaryResidence = ({ ownsHome, homeValue, mortgageStatus, mortgageBalance, firstName, onChange }: Step3Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Primary Residence</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="owns-home">{firstName ? `${firstName}, do` : "Do"} you own your home?</Label>
        <Switch
          id="owns-home"
          checked={ownsHome}
          onCheckedChange={(checked) => onChange({ ownsHome: checked })}
        />
      </div>

      {ownsHome && (
        <>
          <div className="space-y-2">
            <Label htmlFor="home-value">What's the estimated value of your home?</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="home-value"
                type="text"
                value={homeValue}
                onChange={(e) => onChange({ homeValue: e.target.value })}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mortgage-status">Do you have a mortgage on your home?</Label>
            <Select value={mortgageStatus} onValueChange={(value) => onChange({ mortgageStatus: value })}>
              <SelectTrigger id="mortgage-status">
                <SelectValue placeholder="Select mortgage status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No Mortgage</SelectItem>
                <SelectItem value="yes">Have a Mortgage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mortgageStatus === "yes" && (
            <div className="space-y-2">
              <Label htmlFor="mortgage-balance">Outstanding Mortgage Balance</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                  id="mortgage-balance"
                  type="text"
                  value={mortgageBalance}
                  onChange={(e) => onChange({ mortgageBalance: e.target.value })}
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Step3PrimaryResidence;

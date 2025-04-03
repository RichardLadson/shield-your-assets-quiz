
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Step8Props {
  hasTransferredAssets: boolean;
  transferredAssetsValue: string;
  firstName: string;
  onChange: (data: Partial<{
    hasTransferredAssets: boolean;
    transferredAssetsValue: string;
  }>) => void;
}

const Step8AssetTransfers = ({ hasTransferredAssets, transferredAssetsValue, firstName, onChange }: Step8Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Gifts or Asset Transfers</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="has-transferred-assets">Have you given away or transferred any assets in the past 60 months?</Label>
        <Switch
          id="has-transferred-assets"
          checked={hasTransferredAssets}
          onCheckedChange={(checked) => onChange({ 
            hasTransferredAssets: checked,
            transferredAssetsValue: checked ? transferredAssetsValue : ""
          })}
        />
      </div>
      
      {hasTransferredAssets && (
        <div className="space-y-2">
          <Label htmlFor="transferred-assets-value">Total value of transfers</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input
              id="transferred-assets-value"
              type="text"
              value={transferredAssetsValue}
              onChange={(e) => onChange({ transferredAssetsValue: e.target.value })}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>
      )}

      {firstName && (
        <p className="text-lg text-purple-700 mt-4">
          Awesome work, {firstName}! These details are super important to get a complete picture of your eligibility and plan.
        </p>
      )}
    </div>
  );
};

export default Step8AssetTransfers;

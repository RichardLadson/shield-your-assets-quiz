
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface Step8Props {
  hasTransferredAssets: boolean;
  transferredAssetsValue: string;
  firstName?: string;
  completingFor: string;
  lovedOneName?: string;
  onChange: (data: Partial<{
    hasTransferredAssets: boolean;
    transferredAssetsValue: string;
  }>) => void;
}

const Step8AssetTransfers = ({ 
  hasTransferredAssets, 
  transferredAssetsValue, 
  firstName, 
  completingFor, 
  lovedOneName,
  onChange 
}: Step8Props) => {
  const isForSelf = completingFor === "myself";
  const subjectName = isForSelf ? firstName : lovedOneName || "your loved one";
  const doesDo = isForSelf ? "Have you" : `Has ${subjectName}`;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Gifts or Asset Transfers</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="has-transferred-assets">{doesDo} given away or transferred any assets in the past 60 months?</Label>
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

      <p className="text-lg text-purple-700 mt-4">
        {isForSelf 
          ? `Awesome work${firstName ? `, ${firstName}` : ''}! These details are super important to get a complete picture of your eligibility and plan.` 
          : `Awesome work! These details are super important to get a complete picture of ${subjectName}'s eligibility and plan.`}
      </p>
    </div>
  );
};

export default Step8AssetTransfers;

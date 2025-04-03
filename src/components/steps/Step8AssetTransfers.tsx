
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
  const possessive = isForSelf ? "you" : `${subjectName}`;
  const haveHas = isForSelf ? "Have you" : `Has ${subjectName}`;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Asset Transfers</h2>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="has-transferred-assets">
          {haveHas} given away or sold any assets for less than fair market value in the past 5 years?
        </Label>
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
          <Label htmlFor="transferred-assets-value">Total approximate value of all transferred assets:</Label>
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
      
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
        <p className="text-sm text-amber-700">
          <span className="font-medium">Note:</span> Medicaid has a "look-back period" that reviews asset transfers. 
          Transferring assets during this period may affect {isForSelf ? "your" : `${subjectName}'s`} Medicaid eligibility 
          and could trigger a penalty period.
        </p>
      </div>
      
      <p className="text-lg text-purple-700 mt-4">
        {isForSelf 
          ? `Almost done${firstName ? `, ${firstName}` : ''}! Just one more step to complete your assessment.` 
          : `Almost done with ${subjectName}'s assessment! Just one more step to complete.`}
      </p>
    </div>
  );
};

export default Step8AssetTransfers;

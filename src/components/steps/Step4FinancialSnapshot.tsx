
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

interface Step4Props {
  liquidAssets: string;
  hasRetirementAccounts: boolean;
  retirementValue: string;
  hasSpouseRetirementAccounts: boolean;
  spouseRetirementValue: string;
  hasLifeInsurance: boolean;
  lifeInsuranceValue: string;
  ownsAdditionalProperty: boolean;
  additionalPropertyValue: string;
  additionalPropertyMortgage: string;
  additionalPropertyMortgageBalance: string;
  firstName: string;
  maritalStatus: string;
  onChange: (data: Partial<{
    liquidAssets: string;
    hasRetirementAccounts: boolean;
    retirementValue: string;
    hasSpouseRetirementAccounts: boolean;
    spouseRetirementValue: string;
    hasLifeInsurance: boolean;
    lifeInsuranceValue: string;
    ownsAdditionalProperty: boolean;
    additionalPropertyValue: string;
    additionalPropertyMortgage: string;
    additionalPropertyMortgageBalance: string;
  }>) => void;
}

const Step4FinancialSnapshot = ({ 
  liquidAssets, 
  hasRetirementAccounts, 
  retirementValue, 
  hasSpouseRetirementAccounts,
  spouseRetirementValue,
  hasLifeInsurance,
  lifeInsuranceValue,
  ownsAdditionalProperty,
  additionalPropertyValue,
  additionalPropertyMortgage,
  additionalPropertyMortgageBalance,
  firstName,
  maritalStatus,
  onChange 
}: Step4Props) => {
  
  const isMarried = maritalStatus.startsWith('married');
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Financial Snapshot</h2>
      
      <div className="space-y-5">
        <h3 className="text-xl font-medium text-gray-800">Liquid Assets</h3>
        
        <div className="space-y-2">
          <Label htmlFor="liquid-assets">
            {firstName ? `Let's talk about your savings, ${firstName}.` : "Let's talk about your savings."} What's the total value of your savings, checking, stocks, bonds, CDs, money market funds, and mutual funds?
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input
              id="liquid-assets"
              type="text"
              value={liquidAssets}
              onChange={(e) => onChange({ liquidAssets: e.target.value })}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-gray-800 pt-2">Retirement Accounts</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="has-retirement">Do you have any retirement accounts like IRAs or 401(k)s?</Label>
          <Switch
            id="has-retirement"
            checked={hasRetirementAccounts}
            onCheckedChange={(checked) => onChange({ 
              hasRetirementAccounts: checked,
              retirementValue: checked ? retirementValue : ""
            })}
          />
        </div>
        
        {hasRetirementAccounts && (
          <div className="space-y-2">
            <Label htmlFor="retirement-value">Total value of your retirement accounts</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="retirement-value"
                type="text"
                value={retirementValue}
                onChange={(e) => onChange({ retirementValue: e.target.value })}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>
        )}
        
        {isMarried && (
          <>
            <div className="flex items-center justify-between">
              <Label htmlFor="spouse-has-retirement">How about your spouse's retirement accounts?</Label>
              <Switch
                id="spouse-has-retirement"
                checked={hasSpouseRetirementAccounts}
                onCheckedChange={(checked) => onChange({ 
                  hasSpouseRetirementAccounts: checked,
                  spouseRetirementValue: checked ? spouseRetirementValue : "" 
                })}
              />
            </div>
            
            {hasSpouseRetirementAccounts && (
              <div className="space-y-2">
                <Label htmlFor="spouse-retirement-value">Total value of your spouse's retirement accounts</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                  <Input
                    id="spouse-retirement-value"
                    type="text"
                    value={spouseRetirementValue}
                    onChange={(e) => onChange({ spouseRetirementValue: e.target.value })}
                    className="pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </>
        )}
        
        <h3 className="text-xl font-medium text-gray-800 pt-2">Life Insurance and Additional Property</h3>
        
        <div className="space-y-2">
          <Label htmlFor="has-life-insurance">Do you have a life insurance policy with a face value over $1,500?</Label>
          <Select 
            value={hasLifeInsurance ? "yes" : hasLifeInsurance === false ? "no" : ""} 
            onValueChange={(value) => onChange({ 
              hasLifeInsurance: value === "yes" || value === "yes-unknown",
              lifeInsuranceValue: value === "yes-unknown" ? "unknown" : (value === "yes" ? lifeInsuranceValue : "") 
            })}
          >
            <SelectTrigger id="has-life-insurance">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes, I know the cash surrender value</SelectItem>
              <SelectItem value="yes-unknown">Yes, but cash surrender value is unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {hasLifeInsurance && lifeInsuranceValue !== "unknown" && (
          <div className="space-y-2">
            <Label htmlFor="life-insurance-value">Cash surrender value</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="life-insurance-value"
                type="text"
                value={lifeInsuranceValue}
                onChange={(e) => onChange({ lifeInsuranceValue: e.target.value })}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Label htmlFor="owns-additional-property">Do you own any property other than your primary residence?</Label>
          <Switch
            id="owns-additional-property"
            checked={ownsAdditionalProperty}
            onCheckedChange={(checked) => onChange({ 
              ownsAdditionalProperty: checked,
              additionalPropertyValue: checked ? additionalPropertyValue : "",
              additionalPropertyMortgage: checked ? additionalPropertyMortgage : "no",
              additionalPropertyMortgageBalance: checked ? additionalPropertyMortgageBalance : ""
            })}
          />
        </div>
        
        {ownsAdditionalProperty && (
          <>
            <div className="space-y-2">
              <Label htmlFor="additional-property-value">Total Value</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                  id="additional-property-value"
                  type="text"
                  value={additionalPropertyValue}
                  onChange={(e) => onChange({ additionalPropertyValue: e.target.value })}
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additional-property-mortgage">Do you have a mortgage on this additional property?</Label>
              <Select 
                value={additionalPropertyMortgage} 
                onValueChange={(value) => onChange({ 
                  additionalPropertyMortgage: value,
                  additionalPropertyMortgageBalance: value === "yes" ? additionalPropertyMortgageBalance : "" 
                })}
              >
                <SelectTrigger id="additional-property-mortgage">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No Mortgage</SelectItem>
                  <SelectItem value="yes">Have a Mortgage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {additionalPropertyMortgage === "yes" && (
              <div className="space-y-2">
                <Label htmlFor="additional-property-mortgage-balance">Outstanding Mortgage Balance</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                  <Input
                    id="additional-property-mortgage-balance"
                    type="text"
                    value={additionalPropertyMortgageBalance}
                    onChange={(e) => onChange({ additionalPropertyMortgageBalance: e.target.value })}
                    className="pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {firstName && (
        <p className="text-lg text-purple-700 mt-4">
          Thanks, {firstName}! You're doing great, and this information helps us protect as much as we can for you.
        </p>
      )}
    </div>
  );
};

export default Step4FinancialSnapshot;

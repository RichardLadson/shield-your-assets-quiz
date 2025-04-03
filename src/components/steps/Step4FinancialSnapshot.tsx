
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

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
  firstName?: string;
  maritalStatus: string;
  completingFor: string;
  lovedOneName?: string;
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
  completingFor,
  lovedOneName,
  onChange 
}: Step4Props) => {
  const isForSelf = completingFor === "myself";
  const subjectName = isForSelf ? firstName : lovedOneName || "your loved one";
  const possessive = isForSelf ? "your" : `${subjectName}'s`;
  const doesDo = isForSelf ? "do you" : `does ${subjectName}`;
  const hasHave = isForSelf ? "have" : "has";
  
  const isMarried = maritalStatus === "married";
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Financial Snapshot</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="liquid-assets">
            How much {doesDo} have in cash, checking, savings, CDs, and non-retirement investments?
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
          <p className="text-sm text-gray-500">Include stocks, bonds, mutual funds that aren't in retirement accounts</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="has-retirement">{doesDo} have any retirement accounts (IRA, 401k, 403b, etc.)?</Label>
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
            <div className="space-y-2 pl-6 border-l-2 border-purple-100">
              <Label htmlFor="retirement-value">Total value of all retirement accounts:</Label>
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
        </div>

        {isMarried && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="spouse-retirement">Does {isForSelf ? "your spouse" : `${subjectName}'s spouse`} have retirement accounts?</Label>
              <Switch
                id="spouse-retirement"
                checked={hasSpouseRetirementAccounts}
                onCheckedChange={(checked) => onChange({ 
                  hasSpouseRetirementAccounts: checked,
                  spouseRetirementValue: checked ? spouseRetirementValue : "" 
                })}
              />
            </div>
            
            {hasSpouseRetirementAccounts && (
              <div className="space-y-2 pl-6 border-l-2 border-purple-100">
                <Label htmlFor="spouse-retirement-value">Total value of spouse's retirement accounts:</Label>
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
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="has-life-insurance">{doesDo} have any life insurance policies with cash value?</Label>
            <Switch
              id="has-life-insurance"
              checked={hasLifeInsurance}
              onCheckedChange={(checked) => onChange({ 
                hasLifeInsurance: checked,
                lifeInsuranceValue: checked ? lifeInsuranceValue : "" 
              })}
            />
          </div>
          
          {hasLifeInsurance && (
            <div className="space-y-2 pl-6 border-l-2 border-purple-100">
              <Label htmlFor="life-insurance-value">Cash value amount (if known):</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <Input
                  id="life-insurance-value"
                  type="text"
                  value={lifeInsuranceValue}
                  onChange={(e) => onChange({ lifeInsuranceValue: e.target.value })}
                  className="pl-7"
                  placeholder="0.00 or 'unknown'"
                />
              </div>
              <p className="text-sm text-gray-500">This refers to whole life or universal life policies, not term insurance</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="owns-additional-property">{doesDo} own any additional properties besides {possessive} primary residence?</Label>
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
            <div className="space-y-4 pl-6 border-l-2 border-purple-100">
              <div className="space-y-2">
                <Label htmlFor="additional-property-value">What's the estimated total market value of additional properties?</Label>
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
                <Label>Is there a mortgage on any additional property?</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="additional-mortgage-yes"
                      name="additional-mortgage"
                      checked={additionalPropertyMortgage === "yes"}
                      onChange={() => onChange({ additionalPropertyMortgage: "yes" })}
                      className="h-4 w-4 text-purple-600"
                    />
                    <Label htmlFor="additional-mortgage-yes" className="text-sm font-normal">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="additional-mortgage-no"
                      name="additional-mortgage"
                      checked={additionalPropertyMortgage === "no"}
                      onChange={() => onChange({ additionalPropertyMortgage: "no" })}
                      className="h-4 w-4 text-purple-600"
                    />
                    <Label htmlFor="additional-mortgage-no" className="text-sm font-normal">No</Label>
                  </div>
                </div>
              </div>
              
              {additionalPropertyMortgage === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="additional-mortgage-balance">Total remaining mortgage balance:</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                    <Input
                      id="additional-mortgage-balance"
                      type="text"
                      value={additionalPropertyMortgageBalance}
                      onChange={(e) => onChange({ additionalPropertyMortgageBalance: e.target.value })}
                      className="pl-7"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <p className="text-lg text-purple-700 mt-4">
        {isForSelf 
          ? `Great job${firstName ? `, ${firstName}` : ''}! This financial information helps us understand your Medicaid planning options.` 
          : `Thank you for providing this financial information about ${subjectName}. It helps us understand the Medicaid planning options.`}
      </p>
    </div>
  );
};

export default Step4FinancialSnapshot;

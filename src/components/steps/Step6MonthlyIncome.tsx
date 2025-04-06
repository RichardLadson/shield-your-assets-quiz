
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface Step6Props {
  monthlyIncome: string;
  spouseMonthlyIncome: string;
  maritalStatus: string;
  firstName?: string;
  completingFor: string;
  lovedOneName?: string;
  hasDisabledChildren?: boolean;
  disabledChildrenNames?: string;
  livesInNursingHome?: boolean;
  nursingHomeRate?: string;
  onChange: (data: Partial<{
    monthlyIncome: string;
    spouseMonthlyIncome: string;
    hasDisabledChildren: boolean;
    disabledChildrenNames: string;
    livesInNursingHome: boolean;
    nursingHomeRate: string;
  }>) => void;
}

const Step6MonthlyIncome = ({ 
  monthlyIncome, 
  spouseMonthlyIncome, 
  maritalStatus, 
  firstName, 
  completingFor, 
  lovedOneName,
  hasDisabledChildren = false,
  disabledChildrenNames = "",
  livesInNursingHome = false,
  nursingHomeRate = "",
  onChange 
}: Step6Props) => {
  const isMarried = maritalStatus.startsWith('married');
  const isForSelf = completingFor === "myself";

  // Who the questions are about
  const subjectName = isForSelf ? firstName : lovedOneName || "your loved one";
  const possessive = isForSelf ? "your" : `${subjectName}'s`;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Monthly Income</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="monthly-income">
            {isForSelf 
              ? "What's your monthly income from all sources (excluding LTC insurance payments)?" 
              : `What's ${subjectName}'s monthly income from all sources (excluding LTC insurance payments)?`}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <Input
              id="monthly-income"
              type="text"
              value={monthlyIncome}
              onChange={(e) => onChange({ monthlyIncome: e.target.value })}
              className="pl-7"
              placeholder="0.00"
            />
          </div>
        </div>
        
        {isMarried && (
          <div className="space-y-2">
            <Label htmlFor="spouse-monthly-income">
              {isForSelf 
                ? "How about your spouse's monthly income from all sources (excluding LTC insurance payments)?" 
                : `How about ${subjectName}'s spouse's monthly income from all sources (excluding LTC insurance payments)?`}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="spouse-monthly-income"
                type="text"
                value={spouseMonthlyIncome}
                onChange={(e) => onChange({ spouseMonthlyIncome: e.target.value })}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <Label>
            {isForSelf 
              ? "Do you currently live in a nursing home?" 
              : `Does ${subjectName} currently live in a nursing home?`}
          </Label>
          <RadioGroup 
            value={livesInNursingHome ? "yes" : "no"}
            onValueChange={(value) => {
              onChange({ livesInNursingHome: value === "yes" });
              if (value === "no") {
                onChange({ nursingHomeRate: "" });
              }
            }}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="nursing-home-yes" />
              <Label htmlFor="nursing-home-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="nursing-home-no" />
              <Label htmlFor="nursing-home-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {livesInNursingHome && (
          <div className="space-y-2">
            <Label htmlFor="nursing-home-rate">
              What is the monthly nursing home rate?
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                id="nursing-home-rate"
                type="text"
                value={nursingHomeRate}
                onChange={(e) => onChange({ nursingHomeRate: e.target.value })}
                className="pl-7"
                placeholder="0.00"
              />
            </div>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <Label>
            {isForSelf 
              ? "Do you have any disabled children?" 
              : `Does ${subjectName} have any disabled children?`}
          </Label>
          <RadioGroup 
            value={hasDisabledChildren ? "yes" : "no"}
            onValueChange={(value) => {
              onChange({ hasDisabledChildren: value === "yes" });
              if (value === "no") {
                onChange({ disabledChildrenNames: "" });
              }
            }}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="disabled-children-yes" />
              <Label htmlFor="disabled-children-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="disabled-children-no" />
              <Label htmlFor="disabled-children-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {hasDisabledChildren && (
          <div className="space-y-2">
            <Label htmlFor="disabled-children-names">
              Please list the names of the disabled children:
            </Label>
            <Textarea
              id="disabled-children-names"
              value={disabledChildrenNames}
              onChange={(e) => onChange({ disabledChildrenNames: e.target.value })}
              placeholder="Enter the names of the disabled children"
              className="min-h-[80px]"
            />
          </div>
        )}
      </div>

      <p className="text-lg text-purple-700 mt-4">
        {isForSelf 
          ? `You're doing great${firstName ? `, ${firstName}` : ''}! Just a few more questions to go.` 
          : `We're making good progress on ${subjectName}'s assessment. Just a few more questions to go.`}
      </p>
    </div>
  );
};

export default Step6MonthlyIncome;

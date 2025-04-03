
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Step1Introduction from "./steps/Step1Introduction";
import Step2BasicDetails from "./steps/Step2BasicDetails";
import Step3PrimaryResidence from "./steps/Step3PrimaryResidence";
import Step4FinancialSnapshot from "./steps/Step4FinancialSnapshot";
import Step5VehiclesAssets from "./steps/Step5VehiclesAssets";
import Step6MonthlyIncome from "./steps/Step6MonthlyIncome";
import Step7LongTermCare from "./steps/Step7LongTermCare";
import Step8AssetTransfers from "./steps/Step8AssetTransfers";
import Step9WrapUp from "./steps/Step9WrapUp";

const TOTAL_STEPS = 9;

interface QuizFormProps {
  onProgressUpdate: (progress: number) => void;
  onComplete: (firstName: string) => void;
}

const QuizForm = ({ onProgressUpdate, onComplete }: QuizFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Introduction
    firstName: "",
    lastName: "",
    completingFor: "myself",
    
    // Step 2: Basic Details
    state: "",
    age: "",
    maritalStatus: "",
    
    // Step 3: Primary Residence
    ownsHome: false,
    homeValue: "",
    mortgageStatus: "no",
    mortgageBalance: "",
    
    // Step 4: Financial Snapshot
    liquidAssets: "",
    hasRetirementAccounts: false,
    retirementValue: "",
    hasSpouseRetirementAccounts: false,
    spouseRetirementValue: "",
    hasLifeInsurance: false,
    lifeInsuranceValue: "",
    ownsAdditionalProperty: false,
    additionalPropertyValue: "",
    additionalPropertyMortgage: "no",
    additionalPropertyMortgageBalance: "",
    
    // Step 5: Vehicles and Other Assets
    hasVehicles: false,
    vehiclesValue: "",
    
    // Step 6: Monthly Income
    monthlyIncome: "",
    spouseMonthlyIncome: "",
    
    // Step 7: Long-Term Care
    hasLongTermCare: false,
    longTermCareAmount: "",
    
    // Step 8: Asset Transfers
    hasTransferredAssets: false,
    transferredAssetsValue: "",
    
    // Step 9: Wrap-up
    email: ""
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      onProgressUpdate((currentStep / TOTAL_STEPS) * 100);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      onProgressUpdate(((currentStep - 2) / TOTAL_STEPS) * 100);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onComplete(formData.firstName);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Introduction 
          firstName={formData.firstName}
          lastName={formData.lastName}
          completingFor={formData.completingFor}
          onChange={(data) => updateFormData(data)}
        />;
      case 2:
        return <Step2BasicDetails 
          state={formData.state}
          age={formData.age}
          maritalStatus={formData.maritalStatus}
          firstName={formData.firstName}
          onChange={(data) => updateFormData(data)}
        />;
      case 3:
        return <Step3PrimaryResidence 
          ownsHome={formData.ownsHome}
          homeValue={formData.homeValue}
          mortgageStatus={formData.mortgageStatus}
          mortgageBalance={formData.mortgageBalance}
          firstName={formData.firstName}
          onChange={(data) => updateFormData(data)}
        />;
      case 4:
        return <Step4FinancialSnapshot 
          liquidAssets={formData.liquidAssets}
          hasRetirementAccounts={formData.hasRetirementAccounts}
          retirementValue={formData.retirementValue}
          hasSpouseRetirementAccounts={formData.hasSpouseRetirementAccounts}
          spouseRetirementValue={formData.spouseRetirementValue}
          hasLifeInsurance={formData.hasLifeInsurance}
          lifeInsuranceValue={formData.lifeInsuranceValue}
          ownsAdditionalProperty={formData.ownsAdditionalProperty}
          additionalPropertyValue={formData.additionalPropertyValue}
          additionalPropertyMortgage={formData.additionalPropertyMortgage}
          additionalPropertyMortgageBalance={formData.additionalPropertyMortgageBalance}
          firstName={formData.firstName}
          maritalStatus={formData.maritalStatus}
          onChange={(data) => updateFormData(data)}
        />;
      case 5:
        return <Step5VehiclesAssets 
          hasVehicles={formData.hasVehicles}
          vehiclesValue={formData.vehiclesValue}
          onChange={(data) => updateFormData(data)}
        />;
      case 6:
        return <Step6MonthlyIncome 
          monthlyIncome={formData.monthlyIncome}
          spouseMonthlyIncome={formData.spouseMonthlyIncome}
          maritalStatus={formData.maritalStatus}
          firstName={formData.firstName}
          onChange={(data) => updateFormData(data)}
        />;
      case 7:
        return <Step7LongTermCare 
          hasLongTermCare={formData.hasLongTermCare}
          longTermCareAmount={formData.longTermCareAmount}
          firstName={formData.firstName}
          onChange={(data) => updateFormData(data)}
        />;
      case 8:
        return <Step8AssetTransfers 
          hasTransferredAssets={formData.hasTransferredAssets}
          transferredAssetsValue={formData.transferredAssetsValue}
          firstName={formData.firstName}
          onChange={(data) => updateFormData(data)}
        />;
      case 9:
        return <Step9WrapUp 
          email={formData.email}
          firstName={formData.firstName}
          onChange={(data) => updateFormData(data)}
        />;
      default:
        return <div>Error loading form step</div>;
    }
  };

  const isLastStep = currentStep === TOTAL_STEPS;

  return (
    <Card className="p-6">
      {renderStep()}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2" />
          Previous
        </Button>
        {isLastStep ? (
          <Button
            onClick={handleSubmit}
            className="flex items-center bg-purple-600 hover:bg-purple-700"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={nextStep}
            className="flex items-center bg-purple-600 hover:bg-purple-700"
          >
            Next
            <ChevronRight className="ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default QuizForm;

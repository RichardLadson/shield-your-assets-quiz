
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Step1MaritalStatus from "./steps/Step1MaritalStatus";
import Step2StateResidence from "./steps/Step2StateResidence";
import Step3PrimaryResidence from "./steps/Step3PrimaryResidence";

const TOTAL_STEPS = 12;

const QuizForm = ({ onProgressUpdate }: { onProgressUpdate: (progress: number) => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    maritalStatus: "",
    state: "",
    ownsHome: false,
    homeValue: "",
    mortgageStatus: "no",
    mortgageBalance: "",
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      onProgressUpdate((currentStep / TOTAL_STEPS) * 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      onProgressUpdate(((currentStep - 2) / TOTAL_STEPS) * 100);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1MaritalStatus value={formData.maritalStatus} onChange={(value) => updateFormData({ maritalStatus: value })} />;
      case 2:
        return <Step2StateResidence value={formData.state} onChange={(value) => updateFormData({ state: value })} />;
      case 3:
        return <Step3PrimaryResidence 
          ownsHome={formData.ownsHome}
          homeValue={formData.homeValue}
          mortgageStatus={formData.mortgageStatus}
          mortgageBalance={formData.mortgageBalance}
          onChange={(data) => updateFormData(data)}
        />;
      default:
        return <div>More steps coming soon...</div>;
    }
  };

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
        <Button
          onClick={nextStep}
          disabled={currentStep === TOTAL_STEPS}
          className="flex items-center bg-purple-600 hover:bg-purple-700"
        >
          Next
          <ChevronRight className="ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default QuizForm;

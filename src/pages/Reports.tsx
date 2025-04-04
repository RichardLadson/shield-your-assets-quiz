
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Steps, Step } from "@/components/ui/steps";
import { medicaidPlanningAlgorithm } from "@/lib/medicaidPlanningCalculations";
import { ReportHeader } from "@/components/reports/ReportHeader";
import { ReportTabs } from "@/components/reports/ReportTabs";
import { ReportSteps } from "@/components/reports/ReportSteps";

const Reports = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<string>("lead-magnet");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const totalSteps = 3;

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!formData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading reports...</p>
      </div>
    );
  }

  const handleBackToQuiz = () => {
    navigate("/");
  };

  const handleEmail = async () => {
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "An email address is needed to send the report.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSendingEmail(true);
    try {
      // Implementation for sending email would go here
      toast({
        title: "Report Sent",
        description: `The report has been sent to ${formData.email}`,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send the report via email.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const scheduleAppointment = () => {
    toast({
      title: "Scheduling",
      description: "Opening scheduling calendar...",
    });
  };
  
  const { firstName, completingFor, lovedOneName } = formData;
  const isForSelf = completingFor === "myself";
  const displayName = isForSelf ? firstName : (lovedOneName || "Your loved one");
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ReportTabs 
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            displayName={displayName}
            formData={formData}
            handleBackToQuiz={handleBackToQuiz}
            nextStep={nextStep}
          />
        );
      case 2:
      case 3:
        return (
          <ReportSteps
            currentStep={currentStep}
            prevStep={prevStep}
            nextStep={nextStep}
            handleBackToQuiz={handleBackToQuiz}
            scheduleAppointment={scheduleAppointment}
            displayName={displayName}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ReportHeader
          handleBackToQuiz={handleBackToQuiz}
          handleEmail={handleEmail}
          isSendingEmail={isSendingEmail}
          formData={formData}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {displayName}'s Medicaid Planning Reports
          </h1>
          <p className="text-gray-600 mt-2">
            Based on the information provided, we've created reports to help {isForSelf ? "you" : displayName} understand {isForSelf ? "your" : "their"} 
            Medicaid eligibility and potential asset protection strategies.
          </p>
        </div>

        <div className="mb-8">
          <Steps currentStep={currentStep} totalSteps={totalSteps}>
            <Step title="Review Report" />
            <Step title="Schedule Consultation" />
            <Step title="Prepare Documents" />
          </Steps>
        </div>
        
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Reports;

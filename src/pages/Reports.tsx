
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Steps, Step } from "@/components/ui/steps";
import { generatePDF } from "@/lib/pdfUtils";
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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
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

  const handleDownloadLeadMagnet = async () => {
    setIsGeneratingPDF(true);
    const fileName = `${formData?.firstName || 'Client'}_Lead_Magnet_Report.pdf`;
    
    try {
      const pdfBlob = await generatePDF("lead-magnet-report", fileName);
      if (pdfBlob) {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Success!",
          description: "Lead magnet report downloaded successfully.",
        });
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownload = async () => {
    setIsGeneratingPDF(true);
    const elementId = currentTab === "lead-magnet" ? "lead-magnet-report" : "professional-report";
    const reportType = currentTab === "lead-magnet" ? "Lead Magnet" : "Professional";
    const fileName = `${formData.firstName || 'Client'}_${reportType}_Report.pdf`;
    
    try {
      const pdfBlob = await generatePDF(elementId, fileName);
      if (pdfBlob) {
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Success!",
          description: `${reportType} report downloaded successfully.`,
        });
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
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
    const elementId = currentTab === "lead-magnet" ? "lead-magnet-report" : "professional-report";
    const reportType = currentTab === "lead-magnet" ? "Lead Magnet" : "Professional";
    const fileName = `${formData.firstName || 'Client'}_${reportType}_Report.pdf`;
    
    try {
      await generatePDF(elementId, fileName);
      toast({
        title: "Report Sent",
        description: `The ${reportType.toLowerCase()} report has been sent to ${formData.email}`,
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

  const handleBackToQuiz = () => {
    navigate("/");
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
  
  const planningData = medicaidPlanningAlgorithm(formData);
  
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
            handleDownloadLeadMagnet={handleDownloadLeadMagnet}
            isGeneratingPDF={isGeneratingPDF}
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
          handleDownload={handleDownload}
          handleDownloadLeadMagnet={handleDownloadLeadMagnet}
          handleEmail={handleEmail}
          isGeneratingPDF={isGeneratingPDF}
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

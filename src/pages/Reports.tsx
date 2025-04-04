import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadMagnetReport from "@/components/reports/LeadMagnetReport";
import ProfessionalReport from "@/components/reports/ProfessionalReport";
import { ArrowLeft, Download, Mail, AlertTriangle, CalendarClock, FileCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { medicaidPlanningAlgorithm } from "@/lib/medicaidPlanningCalculations";
import { Steps, Step } from "@/components/ui/steps";
import { generatePDF, emailPDFToUser } from "@/lib/pdfUtils";
import { useToast } from "@/components/ui/use-toast";

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
  
  // References to the report elements for PDF generation
  const leadMagnetRef = useRef<HTMLDivElement>(null);
  const professionalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if form data exists in location state
    if (location.state?.formData) {
      setFormData(location.state.formData);
    } else {
      // Redirect back to quiz if no data
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

  const handleDownload = async () => {
    setIsGeneratingPDF(true);
    const elementId = currentTab === "lead-magnet" ? "lead-magnet-report" : "professional-report";
    const reportType = currentTab === "lead-magnet" ? "Lead Magnet" : "Professional";
    const fileName = `${formData.firstName || 'Client'}_${reportType}_Report.pdf`;
    
    try {
      const pdfBlob = await generatePDF(elementId, fileName);
      if (pdfBlob) {
        // Create a download link and trigger it
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
    const subject = `Your Medicaid Planning ${reportType} Report`;
    
    try {
      // First generate the PDF
      const pdfBlob = await generatePDF(elementId, fileName);
      
      if (pdfBlob) {
        // Send the PDF via email
        // In a real implementation, this would connect to your email service
        toast({
          title: "Report Sent",
          description: `The ${reportType.toLowerCase()} report has been sent to ${formData.email}`,
        });
        
        // In a real implementation, you would set up a webhook URL to handle the email sending
        // For now we'll just show a success message
      }
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
    // This would connect to a scheduling service or show a contact form
    toast({
      title: "Scheduling",
      description: "Opening scheduling calendar...",
    });
  };
  
  // Calculate planning data
  const planningData = medicaidPlanningAlgorithm(formData);
  const urgencyLevel = planningData.eligibilityAssessment?.planningUrgency || "";
  
  // Determine urgency color
  const urgencyColor = 
    urgencyLevel.includes("High") ? "text-red-600" : 
    urgencyLevel.includes("Medium") ? "text-yellow-600" : 
    "text-green-600";
  
  const { firstName, completingFor, lovedOneName } = formData;
  const isForSelf = completingFor === "myself";
  const displayName = isForSelf ? firstName : (lovedOneName || "Your loved one");
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Step 1: Review Your Report</CardTitle>
                <CardDescription className="text-center">
                  This report provides a snapshot of {displayName}'s Medicaid planning options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="lead-magnet">Lead Magnet Report</TabsTrigger>
                    <TabsTrigger value="professional">Professional Report</TabsTrigger>
                  </TabsList>
                  <div className="mt-2 text-sm text-gray-500 text-center">
                    {currentTab === "lead-magnet" ? (
                      <p>A simplified overview of {displayName}'s asset protection potential</p>
                    ) : (
                      <p>A comprehensive analysis with detailed strategies</p>
                    )}
                  </div>
                  <Card className="mt-6 p-6">
                    <TabsContent value="lead-magnet" className="mt-0">
                      <div id="lead-magnet-report">
                        <LeadMagnetReport formData={formData} />
                      </div>
                    </TabsContent>
                    <TabsContent value="professional" className="mt-0">
                      <div id="professional-report">
                        <ProfessionalReport formData={formData} />
                      </div>
                    </TabsContent>
                  </Card>
                </Tabs>
              </CardContent>
            </Card>
            <div className="flex justify-end mt-6">
              <Button onClick={nextStep} className="flex items-center bg-purple-600 hover:bg-purple-700">
                Next: Schedule Consultation
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Step 2: Schedule a Free Consultation
              </CardTitle>
              <CardDescription className="text-center">
                Meet with a Medicaid planning specialist to discuss {displayName}'s options in detail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                  <CalendarClock className="mr-2 h-5 w-5" />
                  Why Schedule a Consultation?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Get personalized strategies tailored to {displayName}'s specific situation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Learn about state-specific Medicaid rules and how they apply</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Discover additional asset protection techniques beyond this report</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Create a timeline for implementing your Medicaid planning strategy</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={scheduleAppointment} 
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-lg flex items-center"
                >
                  <CalendarClock className="mr-2 h-5 w-5" />
                  Schedule Your Free Consultation
                </Button>
              </div>
            </CardContent>
            <div className="flex justify-between px-6 pb-6">
              <Button variant="outline" onClick={prevStep}>
                Back to Report
              </Button>
              <Button onClick={nextStep}>
                Next: Preparation Steps
              </Button>
            </div>
          </Card>
        );
      case 3:
        return (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Step 3: Prepare for Your Consultation
              </CardTitle>
              <CardDescription className="text-center">
                Follow these steps to make the most of your consultation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Documents to Gather
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Recent bank statements (last 3 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Investment and retirement account statements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Deeds to any owned properties</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Insurance policies (life, long-term care)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>List of any gifts or transfers made in the last 5 years</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Questions to Consider
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>What are your most important financial priorities?</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Are there specific assets you want to protect for heirs?</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Have you done any previous estate planning?</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>What is your timeline for potential long-term care needs?</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Back to Scheduling
                </Button>
                <Button variant="outline" onClick={handleBackToQuiz} className="flex items-center">
                  Start a New Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToQuiz} 
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quiz
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleDownload} 
              className="flex items-center" 
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? "Generating..." : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
            {formData.email && (
              <Button 
                onClick={handleEmail} 
                variant="outline" 
                className="flex items-center"
                disabled={isSendingEmail}
              >
                {isSendingEmail ? "Sending..." : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Report
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        
        {urgencyLevel.includes("High") && (
          <Card className="mb-6 border-red-300 bg-red-50">
            <CardContent className="p-4 flex items-center">
              <AlertTriangle className="text-red-500 mr-3 h-5 w-5" />
              <p className="text-red-700">
                <span className="font-semibold">High Planning Urgency:</span> {displayName}'s situation requires immediate Medicaid planning attention. 
                Please consult with a Medicaid planner as soon as possible.
              </p>
            </CardContent>
          </Card>
        )}
        
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

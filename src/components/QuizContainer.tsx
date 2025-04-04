
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import QuizForm from "./QuizForm";
import Hero from "./Hero";
import LeadMagnetReport from "./reports/LeadMagnetReport";
import { CheckCircle, ArrowLeft, ArrowRight, CalendarClock, FileCheck, CheckCircle2, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";

interface QuizContainerProps {
  initialStage?: "hero" | "quiz";
  crmWebhookUrl?: string;
  pdfWebhookUrl?: string;
}

const QuizContainer = ({ 
  initialStage = "hero", 
  crmWebhookUrl = "",
  pdfWebhookUrl = "" 
}: QuizContainerProps) => {
  const [showQuiz, setShowQuiz] = useState(initialStage === "quiz");
  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [currentCompletedStep, setCurrentCompletedStep] = useState(1);
  const totalCompletedSteps = 3;

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizComplete = (data: any) => {
    setQuizCompleted(true);
    setFormData(data);
    setCurrentCompletedStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startNewQuiz = () => {
    setQuizCompleted(false);
    setShowQuiz(false);
    setProgress(0);
    setFormData(null);
    setCurrentCompletedStep(1);
  };
  
  const nextStep = () => {
    if (currentCompletedStep < totalCompletedSteps) {
      setCurrentCompletedStep(currentCompletedStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const prevStep = () => {
    if (currentCompletedStep > 1) {
      setCurrentCompletedStep(currentCompletedStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const scheduleAppointment = () => {
    alert("This would open a scheduling calendar in a real application.");
  };

  const renderCompletedStep = () => {
    const { firstName, completingFor, lovedOneName } = formData || {};
    const isForSelf = completingFor === "yourself";
    const displayName = isForSelf ? firstName || "you" : lovedOneName || "your loved one";
    
    switch (currentCompletedStep) {
      case 1:
        return (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Step 1: Review Your Report</CardTitle>
              <CardDescription className="text-center">
                This report provides a snapshot of {displayName}'s Medicaid planning options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <LeadMagnetReport formData={formData} pdfWebhookUrl={pdfWebhookUrl} />
              
              <div className="flex justify-end">
                <Button onClick={nextStep} className="flex items-center bg-purple-600 hover:bg-purple-700">
                  Next: Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="shadow-md">
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
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep} className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Report
                </Button>
                <Button onClick={nextStep} className="flex items-center">
                  Next: Preparation Steps
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="shadow-md">
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
                <Button variant="outline" onClick={prevStep} className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Scheduling
                </Button>
                <Button variant="outline" onClick={startNewQuiz} className="flex items-center">
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
    <div className="min-h-screen">
      {!showQuiz ? (
        <Hero onStartQuiz={startQuiz} />
      ) : quizCompleted ? (
        <div className="max-w-3xl mx-auto p-4 py-8">
          <div className="mb-8">
            <Steps currentStep={currentCompletedStep} totalSteps={totalCompletedSteps}>
              <Step title="Review Report" />
              <Step title="Schedule Consultation" />
              <Step title="Prepare Documents" />
            </Steps>
          </div>
          
          {renderCompletedStep()}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-4 py-8">
          <Progress value={progress} className="mb-8" />
          <QuizForm 
            onProgressUpdate={setProgress} 
            onComplete={(data) => {
              if (crmWebhookUrl && data) {
                import('@/lib/pdfUtils').then(module => {
                  module.sendToGoHighLevel(data, crmWebhookUrl);
                });
              }
              handleQuizComplete(data);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default QuizContainer;

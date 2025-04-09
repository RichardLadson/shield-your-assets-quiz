
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import QuizForm from "./QuizForm";
import Hero from "./Hero";
import { Steps, Step } from "@/components/ui/steps";
import { CompletedStep } from "./quiz-results/CompletedStep";
import { processQuizSubmission } from "@/lib/medicaid/medicaid-integration";
import { toast } from "@/hooks/use-toast";
import MedicaidResults from "./MedicaidResults";

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
  const [loading, setLoading] = useState(false);
  const [medicaidResults, setMedicaidResults] = useState<any>(null);

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizComplete = async (data: any) => {
    setLoading(true);
    setFormData(data);
    
    try {
      // Process the quiz submission using our integration
      const results = await processQuizSubmission(data);
      setMedicaidResults(results);
      
      // If using the CRM webhook
      if (crmWebhookUrl && data) {
        import('@/lib/pdfUtils').then(module => {
          module.sendToGoHighLevel(data, crmWebhookUrl);
        });
      }
      
      setQuizCompleted(true);
      setCurrentCompletedStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      toast({
        title: "Error Processing Results",
        description: error.message || "There was a problem processing your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startNewQuiz = () => {
    setQuizCompleted(false);
    setShowQuiz(false);
    setProgress(0);
    setFormData(null);
    setMedicaidResults(null);
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
    // Open Calendly or your scheduling system
    window.open('https://calendly.com/your-scheduling-link', '_blank');
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
          
          {currentCompletedStep === 1 && medicaidResults ? (
            <MedicaidResults 
              eligibilityResult={medicaidResults.eligibilityResult}
              reportResult={medicaidResults.reportResult}
            />
          ) : (
            <CompletedStep 
              currentStep={currentCompletedStep}
              formData={formData}
              nextStep={nextStep}
              prevStep={prevStep}
              startNewQuiz={startNewQuiz}
              scheduleAppointment={scheduleAppointment}
            />
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-4 py-8">
          <Progress value={progress} className="mb-8" />
          {loading ? (
            <div id="loading-indicator" className="text-center my-8">
              <p>Processing your information...</p>
              <div className="spinner w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full mx-auto mt-4 animate-spin"></div>
            </div>
          ) : (
            <QuizForm 
              onProgressUpdate={setProgress} 
              onComplete={handleQuizComplete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizContainer;

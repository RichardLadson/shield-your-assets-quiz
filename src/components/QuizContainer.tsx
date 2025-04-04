
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import QuizForm from "./QuizForm";
import Hero from "./Hero";
import { Steps, Step } from "@/components/ui/steps";
import { CompletedStep } from "./quiz-results/CompletedStep";

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
          
          <CompletedStep 
            currentStep={currentCompletedStep}
            formData={formData}
            nextStep={nextStep}
            prevStep={prevStep}
            startNewQuiz={startNewQuiz}
            scheduleAppointment={scheduleAppointment}
            pdfWebhookUrl={pdfWebhookUrl}
          />
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


import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import QuizForm from "./QuizForm";
import Hero from "./Hero";
import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

const QuizContainer = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [firstName, setFirstName] = useState("");

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuizComplete = (name: string) => {
    setQuizCompleted(true);
    setFirstName(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startNewQuiz = () => {
    setQuizCompleted(false);
    setShowQuiz(false);
    setProgress(0);
    setFirstName("");
  };

  return (
    <div className="min-h-screen">
      {!showQuiz ? (
        <Hero onStartQuiz={startQuiz} />
      ) : quizCompleted ? (
        <div className="max-w-2xl mx-auto p-4 py-12 text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Thank you, {firstName || "Friend"}!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            We've received your information and will analyze your Medicaid planning options. A personalized report will be emailed to you shortly.
          </p>
          <Button onClick={startNewQuiz} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 text-lg rounded-full">
            Start a New Assessment
          </Button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-4 py-8">
          <Progress value={progress} className="mb-8" />
          <QuizForm 
            onProgressUpdate={setProgress} 
            onComplete={handleQuizComplete}
          />
        </div>
      )}
    </div>
  );
};

export default QuizContainer;

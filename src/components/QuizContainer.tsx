
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import QuizForm from "./QuizForm";
import Hero from "./Hero";

const QuizContainer = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState(0);

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {!showQuiz ? (
        <Hero onStartQuiz={startQuiz} />
      ) : (
        <div className="max-w-2xl mx-auto p-4 py-8">
          <Progress value={progress} className="mb-8" />
          <QuizForm onProgressUpdate={setProgress} />
        </div>
      )}
    </div>
  );
};

export default QuizContainer;

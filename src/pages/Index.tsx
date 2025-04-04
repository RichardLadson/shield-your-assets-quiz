
import { useState } from "react";
import LandingPage from "@/components/landing/LandingPage";
import QuizContainer from "@/components/QuizContainer";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  
  // This will be called from the Hero component through props
  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  if (showQuiz) {
    return <QuizContainer initialStage="quiz" />;
  }
  
  return <LandingPage onStartQuiz={startQuiz} />;
};

export default Index;

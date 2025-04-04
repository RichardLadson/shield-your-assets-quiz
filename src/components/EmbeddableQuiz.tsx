
import { useState } from "react";
import QuizContainer from "@/components/QuizContainer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface EmbeddableQuizProps {
  buttonText?: string;
  buttonClassName?: string;
}

const EmbeddableQuiz = ({ 
  buttonText = "Free Consultation",
  buttonClassName = "bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300 hover:shadow-lg"
}: EmbeddableQuizProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  if (showQuiz) {
    return <QuizContainer initialStage="quiz" />;
  }
  
  return (
    <Button 
      className={buttonClassName}
      onClick={startQuiz}
    >
      {buttonText}
      <ArrowRight className="ml-2" />
    </Button>
  );
};

export default EmbeddableQuiz;

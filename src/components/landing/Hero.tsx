
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import QuizContainer from "@/components/QuizContainer";
import { useState } from "react";

const Hero = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showQuiz) {
    return <QuizContainer initialStage="quiz" />;
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-white px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Protect Your Assets with Expert Medicaid Planning
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          Navigate the complex world of Medicaid eligibility without losing your life savings. 
          Our specialized planning helps families preserve their wealth while qualifying for 
          the care they need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300 hover:shadow-lg"
            onClick={startQuiz}
          >
            Free Consultation
            <ArrowRight className="ml-2" />
          </Button>
          <Button 
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 rounded-full text-lg transition-all duration-300"
          >
            Learn Our Process
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-500">No pressure • No obligation • Just answers</p>
      </div>
    </div>
  );
};

export default Hero;

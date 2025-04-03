
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = ({ onStartQuiz }: { onStartQuiz: () => void }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
        Medicaid Planning Made Simple
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-center mb-8">
        Discover how much of your assets you can protect with our Medicaid Shelter Calculator. Get a personalized estimate in minutes.
      </p>
      <Button 
        onClick={onStartQuiz}
        className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300 hover:shadow-lg"
      >
        Start Your Assessment
        <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
      </Button>
    </div>
  );
};

export default Hero;

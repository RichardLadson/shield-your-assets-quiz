
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Framework from "./Framework";

interface LandingPageProps {
  onStartQuiz: () => void;
}

const LandingPage = ({ onStartQuiz }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto">
        {/* Hero Section */}
        <Hero onStartQuiz={onStartQuiz} />
        
        {/* Framework Section */}
        <Framework />
        
        {/* About Me Section */}
        <AboutMe />
      </div>
    </div>
  );
};

export default LandingPage;

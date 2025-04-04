
import { useState } from "react";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Framework from "./Framework";
import QuizContainer from "@/components/QuizContainer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Hero />
      <AboutMe />
      <Framework />
    </div>
  );
};

export default LandingPage;


import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Framework = () => {
  const steps = [
    {
      title: "Step 1: Alzheimer's & Medicaid",
      description: "Discover how Medicaid can help pay for long-term Alzheimer's care — even if your family has savings, a home, or income.",
      link: "#"
    },
    {
      title: "Step 2: Alzheimer's Care Planning",
      description: "Define your loved one's care needs, roles within the family, and set goals that align with Medicaid strategy.",
      link: "#"
    },
    {
      title: "Step 3: Alzheimer's Document Preparation",
      description: "Gather the right documents to assess eligibility and avoid paperwork mistakes that delay approval.",
      link: "#"
    },
    {
      title: "Step 4: Alzheimer's Medicaid Assessment",
      description: "Find out if you qualify and what you can do to protect assets before applying.",
      link: "#"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            The Alzheimer's Medicaid Planning Blueprint
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A 4-step strategy designed to help families qualify for Medicaid, protect their assets, 
            and get peace of mind — even while navigating long-term Alzheimer's care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-purple-700">{step.title}</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">{step.description}</p>
              <a 
                href={step.link} 
                className="text-blue-600 font-medium hover:underline flex items-center"
              >
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg transition-all duration-300 hover:shadow-lg"
          >
            Start Your Medicaid Planning Journey
            <ArrowRight className="ml-2" />
          </Button>
          <p className="mt-4 text-sm text-gray-500">No pressure • No obligation • Just answers</p>
        </div>
      </div>
    </section>
  );
};

export default Framework;

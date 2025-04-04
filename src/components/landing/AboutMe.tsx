
import { Card } from "@/components/ui/card";

const AboutMe = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            {/* Replace with your actual image */}
            <div className="bg-gradient-to-br from-purple-200 to-blue-100 h-96 flex items-center justify-center text-gray-400">
              <span className="text-lg">Your Photo Here</span>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Hi, I'm <span className="text-purple-600">Your Name</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              With over 20 years of experience in Medicaid planning, I've helped hundreds of families protect 
              their assets while securing the care their loved ones need. My specialized focus on Alzheimer's 
              care planning has made me a trusted advisor in this complex field.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              I understand that each family's situation is unique, which is why I've developed a proven 
              10-step process that can be customized to your specific needs and goals.
            </p>
            
            <Card className="bg-purple-50 border-purple-200 p-6">
              <blockquote className="italic text-gray-700">
                "My mission is to help families navigate the complicated Medicaid system with confidence, 
                ensuring they don't have to sacrifice their financial security to get quality care."
              </blockquote>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

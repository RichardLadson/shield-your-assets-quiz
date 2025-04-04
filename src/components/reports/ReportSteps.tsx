
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarClock, FileCheck, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

interface ReportStepsProps {
  currentStep: number;
  prevStep: () => void;
  nextStep: () => void;
  handleBackToQuiz: () => void;
  scheduleAppointment: () => void;
  displayName: string;
}

export const ReportSteps = ({
  currentStep,
  prevStep,
  nextStep,
  handleBackToQuiz,
  scheduleAppointment,
  displayName
}: ReportStepsProps) => {
  switch (currentStep) {
    case 2:
      return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Step 2: Schedule a Free Consultation
            </CardTitle>
            <CardDescription className="text-center">
              Meet with a Medicaid planning specialist to discuss {displayName}'s options in detail
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <CalendarClock className="mr-2 h-5 w-5" />
                Why Schedule a Consultation?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Get personalized strategies tailored to {displayName}'s specific situation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Learn about state-specific Medicaid rules and how they apply</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Discover additional asset protection techniques beyond this report</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Create a timeline for implementing your Medicaid planning strategy</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={scheduleAppointment} 
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-lg flex items-center"
              >
                <CalendarClock className="mr-2 h-5 w-5" />
                Schedule Your Free Consultation
              </Button>
            </div>
          </CardContent>
          <div className="flex justify-between px-6 pb-6">
            <Button variant="outline" onClick={prevStep}>
              Back to Report
            </Button>
            <Button onClick={nextStep}>
              Next: Preparation Steps
            </Button>
          </div>
        </Card>
      );
    case 3:
      return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Step 3: Prepare for Your Consultation
            </CardTitle>
            <CardDescription className="text-center">
              Follow these steps to make the most of your consultation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <FileCheck className="mr-2 h-5 w-5" />
                Documents to Gather
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Recent bank statements (last 3 months)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Investment and retirement account statements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Deeds to any owned properties</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Insurance policies (life, long-term care)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>List of any gifts or transfers made in the last 5 years</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Questions to Consider
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>What are your most important financial priorities?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Are there specific assets you want to protect for heirs?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Have you done any previous estate planning?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>What is your timeline for potential long-term care needs?</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back to Scheduling
              </Button>
              <Button variant="outline" onClick={handleBackToQuiz} className="flex items-center">
                Start a New Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
};

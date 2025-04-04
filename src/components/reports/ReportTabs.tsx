import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LeadMagnetReport from "./LeadMagnetReport";
import ProfessionalReport from "./ProfessionalReport";

interface ReportTabsProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  displayName: string;
  formData: any;
  handleBackToQuiz: () => void;
  nextStep: () => void;
}

export const ReportTabs = ({
  currentTab,
  setCurrentTab,
  displayName,
  formData,
  handleBackToQuiz,
  nextStep
}: ReportTabsProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Step 1: Review Your Report</CardTitle>
        <CardDescription className="text-center">
          This report provides a snapshot of {displayName}'s Medicaid planning options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lead-magnet">Lead Magnet Report</TabsTrigger>
            <TabsTrigger value="professional">Professional Report</TabsTrigger>
          </TabsList>
          <div className="mt-2 text-sm text-gray-500 text-center">
            {currentTab === "lead-magnet" ? (
              <p>A simplified overview of {displayName}'s asset protection potential</p>
            ) : (
              <p>A comprehensive analysis with detailed strategies</p>
            )}
          </div>
          <Card className="mt-6 p-6">
            <TabsContent value="lead-magnet" className="mt-0">
              <div id="lead-magnet-report">
                <LeadMagnetReport formData={formData} />
              </div>
            </TabsContent>
            <TabsContent value="professional" className="mt-0">
              <div id="professional-report">
                <ProfessionalReport formData={formData} />
              </div>
            </TabsContent>
          </Card>
        </Tabs>
      </CardContent>
      <div className="flex justify-between px-6 pb-6">
        <Button variant="outline" onClick={handleBackToQuiz} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quiz
        </Button>
        <Button onClick={nextStep} className="flex items-center bg-purple-600 hover:bg-purple-700">
          Next: Schedule Consultation
        </Button>
      </div>
    </Card>
  );
};

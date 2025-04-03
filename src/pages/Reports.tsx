
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadMagnetReport from "@/components/reports/LeadMagnetReport";
import ProfessionalReport from "@/components/reports/ProfessionalReport";
import { ArrowLeft, Download, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

const Reports = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<string>("lead-magnet");

  useEffect(() => {
    // Check if form data exists in location state
    if (location.state?.formData) {
      setFormData(location.state.formData);
    } else {
      // Redirect back to quiz if no data
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!formData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Loading reports...</p>
      </div>
    );
  }

  const handleDownload = () => {
    window.print();
  };

  const handleEmail = () => {
    // This would connect to a backend service to email the report
    alert(`Report would be emailed to: ${formData.email || "No email provided"}`);
  };

  const handleBackToQuiz = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToQuiz} 
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Quiz
          </Button>
          
          <div className="flex space-x-2">
            <Button onClick={handleDownload} className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            {formData.email && (
              <Button onClick={handleEmail} variant="outline" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Email Report
              </Button>
            )}
          </div>
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lead-magnet">Lead Magnet Report</TabsTrigger>
            <TabsTrigger value="professional">Professional Report</TabsTrigger>
          </TabsList>
          <Card className="mt-6 p-6">
            <TabsContent value="lead-magnet" className="mt-0">
              <LeadMagnetReport formData={formData} />
            </TabsContent>
            <TabsContent value="professional" className="mt-0">
              <ProfessionalReport formData={formData} />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;

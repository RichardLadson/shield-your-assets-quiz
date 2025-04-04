
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAssetData } from "@/lib/reportCalculations";
import { medicaidPlanningAlgorithm } from "@/lib/medicaidPlanningCalculations";
import { Badge } from "@/components/ui/badge";
import { Info, ShieldCheck, AlertCircle, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { generatePDF, emailPDFToUser } from "@/lib/pdfUtils";

interface LeadMagnetReportProps {
  formData: any;
  pdfWebhookUrl?: string;
}

const LeadMagnetReport = ({ formData, pdfWebhookUrl }: LeadMagnetReportProps) => {
  const { firstName, lastName, completingFor, email } = formData;
  const displayName = firstName || "Friend";
  const { toast } = useToast();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  // Determine who the report is about
  const isForSelf = completingFor === "myself";
  const subjectPronoun = isForSelf ? "Your" : `${firstName}'s`;
  const objectPronoun = isForSelf ? "your" : "their";
  const reflexivePronoun = isForSelf ? "yourself" : "themselves";
  
  // Use the new medicaid planning algorithm for more detailed calculations
  const {
    totalAssets,
    countableAssets,
    minProtection,
    maxProtection,
    minPercentage,
    maxPercentage,
    planningApproach
  } = medicaidPlanningAlgorithm(formData);
  
  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const fileName = `${firstName || 'Client'}_Lead_Magnet_Report.pdf`;
      const pdfBlob = await generatePDF("lead-magnet-pdf-content", fileName);
      
      if (pdfBlob) {
        // Create a download link
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Success!",
          description: "Lead magnet report downloaded successfully.",
        });
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  
  const handleEmailPDF = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "An email address is needed to send the report.",
        variant: "destructive",
      });
      return;
    }
    
    if (!pdfWebhookUrl) {
      toast({
        title: "Configuration Required",
        description: "Email sending is not configured.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSendingEmail(true);
    try {
      const pdfBlob = await generatePDF("lead-magnet-pdf-content", `${firstName || 'Client'}_Lead_Magnet_Report.pdf`);
      if (pdfBlob) {
        // Send the PDF via webhook
        const success = await emailPDFToUser(
          pdfBlob,
          email,
          `Your Medicaid Planning Report for ${firstName || 'You'}`,
          pdfWebhookUrl
        );
        
        if (success) {
          toast({
            title: "Report Sent",
            description: `The report has been sent to ${email}`,
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to send the report. Please try again later.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send the report via email.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="space-y-6 print:text-black">
      <div id="lead-magnet-pdf-content">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-800">
            {isForSelf ? "Your" : `${firstName}'s`} Medicaid Planning Snapshot
          </h1>
          <p className="text-gray-500 mt-2">
            {isForSelf ? "Your" : "A"} personalized asset protection analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-blue-50">
              <CardTitle className="text-blue-700 flex items-center text-lg">
                <Info className="mr-2 h-5 w-5" /> Total Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-3xl font-bold">${totalAssets.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">
                {isForSelf 
                  ? "You have accumulated significant assets, including your home, savings, and investments."
                  : `${firstName} has accumulated significant assets, including ${objectPronoun} home, savings, and investments.`
                } Understanding the value of these assets is crucial in determining how to protect them effectively while planning for Medicaid.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-red-50">
              <CardTitle className="text-red-700 flex items-center text-lg">
                <AlertCircle className="mr-2 h-5 w-5" /> Assets At Risk
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-3xl font-bold">${countableAssets.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">
                Out of {subjectPronoun.toLowerCase()} total assets, ${countableAssets.toLocaleString()} are considered countable and at risk of 
                impacting Medicaid eligibility. These assets are subject to Medicaid's spend-down requirements unless properly managed.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader className="pb-2 bg-green-50">
              <CardTitle className="text-green-700 flex items-center text-lg">
                <ShieldCheck className="mr-2 h-5 w-5" /> Potential Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-3xl font-bold">
                ${minProtection.toLocaleString()} - ${maxProtection.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                With the right Medicaid planning strategies, {isForSelf ? "you" : firstName} could potentially protect 
                {minPercentage}% to {maxPercentage}% of {isForSelf ? "your" : objectPronoun} countable assets.*
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-purple-800 mb-4">Recommended Approach:</h2>
          <p className="text-gray-700 mb-4">
            {planningApproach}
          </p>
          
          <h2 className="text-xl font-bold text-purple-800 mb-4">Recommended Next Steps:</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <Badge className="mt-1 bg-purple-700">1</Badge>
              <div className="ml-4">
                <h3 className="font-semibold">Act Quickly</h3>
                <p className="text-gray-600">Time is a critical factor. Implement these strategies as soon as possible to protect the maximum amount of assets.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Badge className="mt-1 bg-purple-700">2</Badge>
              <div className="ml-4">
                <h3 className="font-semibold">Consult with a Certified Medicaid Planner</h3>
                <p className="text-gray-600">
                  Speak with a Certified Medicaid Planner who can guide {isForSelf ? "you" : "you both"} through the specific steps needed to protect {isForSelf ? "your" : `${firstName}'s`} assets.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Badge className="mt-1 bg-purple-700">3</Badge>
              <div className="ml-4">
                <h3 className="font-semibold">Document All Actions</h3>
                <p className="text-gray-600">Proper documentation is key to ensure compliance and maximize asset protection.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 italic">
            *Disclaimer: The exact amount of assets that can be protected will depend on several factors, including 
            the specific facts of your case, the Medicaid laws in your state, and the strategies that are implemented 
            by both your Certified Medicaid Planner and Elder Law Attorney.
          </p>
        </div>
      </div>
      
      {/* Make this button always visible */}
      <div className="flex justify-center space-x-4 mt-6 print:hidden">
        <Button
          onClick={handleGeneratePDF}
          variant="success"
          className="flex items-center"
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? "Generating..." : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Lead Magnet PDF
            </>
          )}
        </Button>
        
        {email && pdfWebhookUrl && (
          <Button
            onClick={handleEmailPDF}
            variant="outline"
            className="flex items-center"
            disabled={isSendingEmail}
          >
            {isSendingEmail ? "Sending..." : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Email Report
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LeadMagnetReport;

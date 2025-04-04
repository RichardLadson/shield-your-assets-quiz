
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { medicaidPlanningAlgorithm } from "@/lib/medicaidPlanningCalculations";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { generatePDF, emailPDFToUser } from "@/lib/pdfUtils";
import { AssetCards } from "./lead-magnet/AssetCards";
import { RecommendedApproach } from "./lead-magnet/RecommendedApproach";
import { ActionButtons } from "./lead-magnet/ActionButtons";

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

        <AssetCards 
          totalAssets={totalAssets}
          countableAssets={countableAssets}
          minProtection={minProtection}
          maxProtection={maxProtection}
          minPercentage={minPercentage}
          maxPercentage={maxPercentage}
          isForSelf={isForSelf}
          firstName={firstName}
          objectPronoun={objectPronoun}
          subjectPronoun={subjectPronoun}
        />

        <RecommendedApproach
          planningApproach={planningApproach}
          isForSelf={isForSelf}
          firstName={firstName}
          objectPronoun={objectPronoun}
        />

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 italic">
            *Disclaimer: The exact amount of assets that can be protected will depend on several factors, including 
            the specific facts of your case, the Medicaid laws in your state, and the strategies that are implemented 
            by both your Certified Medicaid Planner and Elder Law Attorney.
          </p>
        </div>
      </div>
      
      <ActionButtons
        handleGeneratePDF={handleGeneratePDF}
        handleEmailPDF={handleEmailPDF}
        isGeneratingPDF={isGeneratingPDF}
        isSendingEmail={isSendingEmail}
        email={email}
        pdfWebhookUrl={pdfWebhookUrl}
      />
    </div>
  );
};

export default LeadMagnetReport;

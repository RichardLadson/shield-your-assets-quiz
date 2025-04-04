
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Mail } from "lucide-react";

interface ReportHeaderProps {
  handleBackToQuiz: () => void;
  handleDownload: () => Promise<void>;
  handleDownloadLeadMagnet: () => Promise<void>;
  handleEmail: () => Promise<void>;
  isGeneratingPDF: boolean;
  isSendingEmail: boolean;
  formData: any;
}

export const ReportHeader = ({
  handleBackToQuiz,
  handleDownload,
  handleDownloadLeadMagnet,
  handleEmail,
  isGeneratingPDF,
  isSendingEmail,
  formData
}: ReportHeaderProps) => {
  return (
    <>
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
          <Button 
            onClick={handleDownload} 
            className="flex items-center" 
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? "Generating..." : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
          {formData.email && (
            <Button 
              onClick={handleEmail} 
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
      
      <div className="mb-6 flex justify-center">
        <Button 
          onClick={handleDownloadLeadMagnet} 
          variant="success"
          size="lg"
          className="flex items-center"
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? "Generating Lead Magnet PDF..." : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Download Lead Magnet Report PDF
            </>
          )}
        </Button>
      </div>
    </>
  );
};

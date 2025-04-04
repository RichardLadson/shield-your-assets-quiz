
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";

interface ActionButtonsProps {
  handleGeneratePDF: () => Promise<void>;
  handleEmailPDF: () => Promise<void>;
  isGeneratingPDF: boolean;
  isSendingEmail: boolean;
  email?: string;
  pdfWebhookUrl?: string;
}

export const ActionButtons = ({
  handleGeneratePDF,
  handleEmailPDF,
  isGeneratingPDF,
  isSendingEmail,
  email,
  pdfWebhookUrl
}: ActionButtonsProps) => {
  return (
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
  );
};

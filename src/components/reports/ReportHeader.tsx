
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";

interface ReportHeaderProps {
  handleBackToQuiz: () => void;
  handleEmail: () => Promise<void>;
  isSendingEmail: boolean;
  formData: any;
}

export const ReportHeader = ({
  handleBackToQuiz,
  handleEmail,
  isSendingEmail,
  formData
}: ReportHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <Button 
        variant="outline" 
        onClick={handleBackToQuiz} 
        className="flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Quiz
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
  );
};

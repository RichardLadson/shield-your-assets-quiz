
import html2pdf from 'html2pdf.js';
import { toJpeg } from 'html-to-image';

// Function to generate PDF from a component
export const generatePDF = async (
  elementId: string, 
  fileName: string = 'report.pdf',
  options = {}
): Promise<Blob | null> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    return null;
  }

  const defaultOptions = {
    margin: [10, 10, 10, 10],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    // Merge default options with any provided options
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Generate PDF
    const pdfBlob = await html2pdf()
      .from(element)
      .set(mergedOptions)
      .outputPdf('blob');
      
    return pdfBlob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
};

// Function to email PDF to user
export const emailPDFToUser = async (
  pdfBlob: Blob, 
  email: string, 
  subject: string,
  webhookUrl: string
): Promise<boolean> => {
  if (!pdfBlob || !email) {
    return false;
  }

  try {
    // Convert PDF blob to base64
    const base64Data = await blobToBase64(pdfBlob);
    
    // Send to webhook (could be your CRM or email service)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        email,
        subject,
        pdfAttachment: base64Data,
        timestamp: new Date().toISOString()
      }),
    });
    
    return true;
  } catch (error) {
    console.error('Error emailing PDF:', error);
    return false;
  }
};

// Helper function to convert blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Function to send form data to Go High Level CRM
export const sendToGoHighLevel = async (formData: any, webhookUrl: string): Promise<boolean> => {
  if (!webhookUrl) {
    console.error('No Go High Level webhook URL provided');
    return false;
  }

  try {
    // Format data for Go High Level
    const crmData = {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      state: formData.state || '',
      completingFor: formData.completingFor || '',
      maritalStatus: formData.maritalStatus || '',
      totalAssets: calculateTotalAssets(formData),
      dateSubmitted: new Date().toISOString(),
      sourceUrl: window.location.href
    };
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(crmData),
    });
    
    return true;
  } catch (error) {
    console.error('Error sending data to Go High Level:', error);
    return false;
  }
};

// Helper function to calculate total assets for CRM
const calculateTotalAssets = (formData: any): number => {
  let total = 0;
  
  if (formData.homeValue) total += parseFloat(formData.homeValue) || 0;
  if (formData.liquidAssets) total += parseFloat(formData.liquidAssets) || 0;
  if (formData.retirementValue) total += parseFloat(formData.retirementValue) || 0;
  if (formData.additionalPropertyValue) total += parseFloat(formData.additionalPropertyValue) || 0;
  
  return total;
};

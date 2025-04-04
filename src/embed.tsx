
import { createRoot } from 'react-dom/client';
import EmbeddableQuiz from './components/EmbeddableQuiz';
import './index.css';

// This function finds all containers with the specified class and initializes the quiz in each
function initializeEmbeds() {
  const containers = document.querySelectorAll('.medicaid-quiz-embed');
  
  containers.forEach(container => {
    const buttonText = container.getAttribute('data-button-text') || undefined;
    const buttonClassName = container.getAttribute('data-button-class') || undefined;
    const crmWebhookUrl = container.getAttribute('data-crm-webhook') || undefined;
    const pdfWebhookUrl = container.getAttribute('data-pdf-webhook') || undefined;
    
    const root = createRoot(container);
    root.render(
      <EmbeddableQuiz 
        buttonText={buttonText} 
        buttonClassName={buttonClassName}
        crmWebhookUrl={crmWebhookUrl}
        pdfWebhookUrl={pdfWebhookUrl}
      />
    );
  });
}

// Initialize when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEmbeds);
} else {
  initializeEmbeds();
}

// Export components for direct import if needed
export { EmbeddableQuiz };

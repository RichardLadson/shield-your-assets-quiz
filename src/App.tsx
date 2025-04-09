import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initializeAPI } from "@/lib/medicaid/medicaid-integration";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize the Medicaid API with your backend URL
    // Replace with your actual AWS URL when deployed
    initializeAPI('https://your-aws-url.elasticbeanstalk.com/api');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/reports" element={<Reports />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
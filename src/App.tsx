import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatGPTReview from "./pages/ChatGPTReview";
import AIEthicsBias from "./pages/AIEthicsBias";
import Storytelling from "./pages/Storytelling";
import Vibecoding from "./pages/Vibecoding";
import CustomGPTs from "./pages/CustomGPTs";
import PrototypePlanner from "./pages/PrototypePlanner";
import SubmissionsAdmin from "./pages/SubmissionsAdmin";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import { ProgressProvider } from "./hooks/useAppProgress";
import { MobileAppShell } from "./components/layout/MobileAppShell";

import { useScrollToTop } from "./hooks/useScrollToTop";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollToTop();
  
  return (
    <MobileAppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/week1" element={<ChatGPTReview />} />
        <Route path="/week3" element={<AIEthicsBias />} />
        <Route path="/week4" element={<Storytelling />} />
        <Route path="/week6" element={<Vibecoding />} />
        <Route path="/custom-gpts" element={<CustomGPTs />} />
        <Route path="/prototype-planner" element={<PrototypePlanner />} />
        <Route path="/admin/submissions" element={<SubmissionsAdmin />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MobileAppShell>
  );
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

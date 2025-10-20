import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import SubjectSelection from "./pages/SubjectSelection";
import Dashboard from "./pages/Dashboard";
import Sections from "./pages/Sections";
import TopicView from "./pages/TopicView";
import PhysicsDashboard from "./pages/PhysicsDashboard";
import PhysicsSections from "./pages/PhysicsSections";
import PhysicsTopicView from "./pages/PhysicsTopicView";
import BlurPractice from "./pages/BlurPractice";
import SectionReader from "./pages/SectionReader";
import BlurExercise from "./pages/BlurExercise";
import Results from "./pages/Results";
import History from "./pages/History";
import AdminSections from "./pages/AdminSections";
import Settings from "./pages/Settings";
import Progress from "./pages/Progress";
import SpacedRepetition from "./pages/SpacedRepetition";
import Help from "./pages/Help";
import ImportPDF from "./pages/ImportPDF";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/subjects" element={<SubjectSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/topic/:id" element={<TopicView />} />
          <Route path="/physics/dashboard" element={<PhysicsDashboard />} />
          <Route path="/physics/sections" element={<PhysicsSections />} />
          <Route path="/physics/topic/:id" element={<PhysicsTopicView />} />
          <Route path="/blur-practice/:topicId/:subsectionId" element={<BlurPractice />} />
          <Route path="/section/:id" element={<SectionReader />} />
          <Route path="/blur/:id" element={<BlurExercise />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin/sections" element={<AdminSections />} />
          <Route path="/admin/import" element={<ImportPDF />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/review" element={<SpacedRepetition />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

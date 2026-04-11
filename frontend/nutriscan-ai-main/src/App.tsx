import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ScanPage from "./pages/ScanPage";
import FoodLogPage from "./pages/FoodLogPage";
import InsightsPage from "./pages/InsightsPage";
import HistoryPage from "./pages/HistoryPage";
import ComparePage from "./pages/ComparePage";
import GoalsPage from "./pages/GoalsPage";
import PhotoIdPage from "./pages/PhotoIdPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />}/>

          {/* App routes with sidebar layout */}
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/scan" element={<ScanPage />} />
                  <Route path="/log" element={<FoodLogPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/goals" element={<GoalsPage />} />
                  <Route path="/identify" element={<PhotoIdPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

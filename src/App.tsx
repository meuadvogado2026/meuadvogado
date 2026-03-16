import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import { MainLayout } from "./layouts/MainLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Pages
import { Landing } from "./pages/Landing";
import { Search } from "./pages/Search";
import { LawyerProfile } from "./pages/LawyerProfile";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { ClientDashboard } from "./pages/dashboards/ClientDashboard";
import { ClientProfile } from "./pages/dashboards/ClientProfile";
import { LawyerDashboard } from "./pages/dashboards/LawyerDashboard";
import { LawyerProfileEdit } from "./pages/dashboards/LawyerProfileEdit";
import { LawyerSettings } from "./pages/dashboards/LawyerSettings";
import { AdminDashboard } from "./pages/dashboards/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/advogado/:id" element={<LawyerProfile />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route element={<DashboardLayout role="client" />}>
            <Route path="/painel/cliente" element={<ClientDashboard />} />
            <Route path="/painel/cliente/perfil" element={<ClientProfile />} />
            <Route path="/painel/cliente/*" element={<ClientDashboard />} />
          </Route>
          
          <Route element={<DashboardLayout role="lawyer" />}>
            <Route path="/painel/advogado" element={<LawyerDashboard />} />
            <Route path="/painel/advogado/perfil" element={<LawyerProfileEdit />} />
            <Route path="/painel/advogado/config" element={<LawyerSettings />} />
            <Route path="/painel/advogado/*" element={<LawyerDashboard />} />
          </Route>
          
          <Route element={<DashboardLayout role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
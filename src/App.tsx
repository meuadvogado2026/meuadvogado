import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
import { LawyerBenefits } from "./pages/dashboards/LawyerBenefits";
import { AdminDashboard } from "./pages/dashboards/AdminDashboard";
import { AdminApprovals } from "./pages/dashboards/AdminApprovals";
import { AdminUsers } from "./pages/dashboards/AdminUsers";
import { AdminPrayers } from "./pages/dashboards/AdminPrayers";
import { AdminUrgentCalls } from "./pages/dashboards/AdminUrgentCalls";
import { AdminBenefits } from "./pages/dashboards/AdminBenefits";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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

            {/* Client Protected Routes */}
            <Route element={
              <ProtectedRoute allowedRoles={['client', 'admin']}>
                <DashboardLayout role="client" />
              </ProtectedRoute>
            }>
              <Route path="/painel/cliente" element={<ClientDashboard />} />
              <Route path="/painel/cliente/perfil" element={<ClientProfile />} />
              <Route path="/painel/cliente/buscar" element={<Search />} />
              <Route path="/painel/cliente/advogado/:id" element={<LawyerProfile />} />
              <Route path="/painel/cliente/*" element={<ClientDashboard />} />
            </Route>
            
            {/* Lawyer Protected Routes */}
            <Route element={
              <ProtectedRoute allowedRoles={['lawyer', 'admin']}>
                <DashboardLayout role="lawyer" />
              </ProtectedRoute>
            }>
              <Route path="/painel/advogado" element={<LawyerDashboard />} />
              <Route path="/painel/advogado/buscar" element={<Search />} />
              <Route path="/painel/advogado/beneficios" element={<LawyerBenefits />} />
              <Route path="/painel/advogado/advogado/:id" element={<LawyerProfile />} />
              <Route path="/painel/advogado/perfil" element={<LawyerProfileEdit />} />
              <Route path="/painel/advogado/config" element={<LawyerSettings />} />
              <Route path="/painel/advogado/*" element={<LawyerDashboard />} />
            </Route>
            
            {/* Admin Protected Routes */}
            <Route element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout role="admin" />
              </ProtectedRoute>
            }>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/urgencias" element={<AdminUrgentCalls />} />
              <Route path="/admin/aprovacoes" element={<AdminApprovals />} />
              <Route path="/admin/usuarios" element={<AdminUsers />} />
              <Route path="/admin/oracoes" element={<AdminPrayers />} />
              <Route path="/admin/beneficios" element={<AdminBenefits />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  LogOut, 
  LayoutDashboard, 
  User, 
  Search, 
  Settings, 
  PieChart, 
  Users, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/MobileNav";

export const DashboardLayout = ({ role }: { role: 'client' | 'lawyer' | 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const getLinks = () => {
    switch (role) {
      case 'client':
        return [
          { icon: LayoutDashboard, label: 'Visão Geral', path: '/painel/cliente' },
          { icon: Search, label: 'Buscar Advogados', path: '/painel/cliente/buscar' },
          { icon: User, label: 'Meu Perfil', path: '/painel/cliente/perfil' },
        ];
      case 'lawyer':
        return [
          { icon: LayoutDashboard, label: 'Meu Desempenho', path: '/painel/advogado' },
          { icon: User, label: 'Editar Perfil', path: '/painel/advogado/perfil' },
          { icon: Settings, label: 'Configurações', path: '/painel/advogado/config' },
        ];
      case 'admin':
        return [
          { icon: PieChart, label: 'Métricas', path: '/admin' },
          { icon: ShieldCheck, label: 'Aprovações', path: '/admin/aprovacoes' },
          { icon: Users, label: 'Usuários', path: '/admin/usuarios' },
        ];
    }
  };

  const links = getLinks();
  
  const roleDisplay = {
    admin: 'Administrador',
    lawyer: 'Advogado',
    client: 'Cliente'
  };

  // Se for a página de busca ou perfil dentro do painel, remove o padding para ocupar a tela toda
  const isFullWidthPage = location.pathname.includes('/advogado') || location.pathname.includes('/buscar');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      
      {/* Sidebar Desktop (SaaS Premium) */}
      <aside className="hidden md:flex flex-col w-[280px] bg-slate-950 border-r border-slate-800 min-h-screen relative z-20 shadow-2xl shadow-slate-900/20">
        
        {/* Brand Area */}
        <div className="h-20 flex items-center px-6 mb-2">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-600/20">
              <Scale className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Meu Advogado</span>
          </Link>
        </div>
        
        {/* Role Badge */}
        <div className="px-6 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Painel de Acesso</span>
              <span className="text-sm font-semibold text-slate-300">{roleDisplay[role]}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <User className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="px-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Menu Principal
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path || (link.path.includes('/buscar') && location.pathname.includes('/advogado'));
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path} className="block group">
                <div className={cn(
                  "flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 shadow-inner" 
                    : "text-slate-400 border border-transparent hover:bg-slate-900 hover:text-slate-200"
                )}>
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-5 h-5", isActive ? "text-blue-500" : "text-slate-500 group-hover:text-slate-300")} />
                    {link.label}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-blue-500/50" />}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Area */}
        <div className="p-4 mt-auto mb-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-slate-400 border border-transparent hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400 transition-colors" />
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-slate-50/50">
        
        {/* Mobile Header (Refinado) */}
        <header className="md:hidden h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center px-4 justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <Scale className="h-5 w-5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Meu Advogado</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout} 
            className="text-slate-500 font-medium hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </header>

        <main className={cn("flex-1 overflow-y-auto", !isFullWidthPage && "p-4 md:p-8 lg:px-12")}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav role={role} />
    </div>
  );
};
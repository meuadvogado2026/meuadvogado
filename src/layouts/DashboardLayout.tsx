import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, LogOut, LayoutDashboard, User, Search, Settings, PieChart, Users, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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
          { icon: Search, label: 'Buscar Advogados', path: '/buscar' },
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white min-h-screen">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-lg tracking-tight">Meu Advogado</span>
          </Link>
        </div>
        
        <div className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {role === 'admin' ? 'Painel Admin' : role === 'lawyer' ? 'Painel do Advogado' : 'Painel do Cliente'}
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link key={link.path} to={link.path}>
                <span className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}>
                  <Icon className="w-5 h-5" />
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-bold">Painel</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Sair</Button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
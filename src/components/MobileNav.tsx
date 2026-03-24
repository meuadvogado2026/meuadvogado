import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Search, User, LayoutDashboard, Briefcase, ShieldCheck, Settings, PieChart, AlertTriangle, HeartHandshake, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  role?: 'public' | 'client' | 'lawyer' | 'admin';
  onOpenPrayer?: () => void;
}

export const MobileNav = ({ role = 'public', onOpenPrayer }: MobileNavProps) => {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const getLinks = () => {
    switch (role) {
      case 'client':
        return [
          { icon: Search, label: 'Buscar', path: '/painel/cliente/buscar' },
          { icon: LayoutDashboard, label: 'Painel', path: '/painel/cliente' },
          { icon: User, label: 'Perfil', path: '/painel/cliente/perfil' },
          { icon: HeartHandshake, label: 'Oração', action: 'prayer' },
        ];
      case 'lawyer':
        return [
          { icon: LayoutDashboard, label: 'Painel', path: '/painel/advogado' },
          { icon: Search, label: 'Colegas', path: '/painel/advogado/buscar' },
          { icon: Gift, label: 'Benefícios', path: '/painel/advogado/beneficios' },
          { icon: User, label: 'Perfil', path: '/painel/advogado/perfil' },
          { icon: HeartHandshake, label: 'Oração', action: 'prayer' },
        ];
      case 'admin':
        return [
          { icon: PieChart, label: 'Métricas', path: '/admin' },
          { icon: AlertTriangle, label: 'Urgências', path: '/admin/urgencias' },
          { icon: ShieldCheck, label: 'Aprovações', path: '/admin/aprovacoes' },
          { icon: Gift, label: 'Benefícios', path: '/admin/beneficios' },
        ];
      default:
        return [
          { icon: Search, label: 'Buscar', path: '/buscar' },
          { icon: User, label: 'Entrar', path: '/login' },
          { icon: Briefcase, label: 'Cadastrar', path: '/cadastro' },
        ];
    }
  };

  const links = getLinks();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 pb-safe pt-2 z-50 flex justify-around items-center shadow-[0_-4px_12px_rgba(0,0,0,0.05)] overflow-x-auto">
      {links.map((link, index) => {
        if (link.action === 'prayer') {
          return (
            <button 
              key={`action-${index}`}
              onClick={onOpenPrayer}
              className="flex flex-col items-center justify-center py-1 px-3 min-w-[64px] transition-colors relative text-amber-500 hover:text-amber-600"
            >
              <link.icon className="w-6 h-6 mb-1 stroke-[2px]" />
              <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{link.label}</span>
            </button>
          );
        }

        const isViewingProfile = location.pathname.includes('/advogado/') && link.path?.includes('/buscar');
        const isActive = location.pathname === link.path || isViewingProfile;
        const Icon = link.icon;
        
        const isUrgencyLink = link.path === '/admin/urgencias';
        const isBenefitsLink = link.path?.includes('/beneficios');
        
        return (
          <Link 
            key={link.path || index} 
            to={link.path || '#'} 
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 min-w-[64px] transition-colors relative",
              isActive ? (isUrgencyLink ? "text-red-600" : isBenefitsLink ? "text-amber-500" : "text-primary") : (isUrgencyLink ? "text-red-400 hover:text-red-600" : isBenefitsLink ? "text-amber-400 hover:text-amber-600" : "text-slate-400 hover:text-slate-600")
            )}
          >
            <Icon className={cn("w-6 h-6 mb-1", isActive ? "stroke-[2.5px]" : "stroke-[2px]", isUrgencyLink && !isActive && "text-red-400", isBenefitsLink && !isActive && "text-amber-400")} />
            <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{link.label}</span>
            {isActive && <span className={cn("absolute -bottom-2 w-8 h-1 rounded-t-full", isUrgencyLink ? "bg-red-600" : isBenefitsLink ? "bg-amber-500" : "bg-primary")} />}
          </Link>
        );
      })}
    </nav>
  );
};
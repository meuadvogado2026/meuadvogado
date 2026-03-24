import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getMobileLinks } from "@/config/navigation";

interface MobileNavProps {
  role?: 'public' | 'client' | 'lawyer' | 'admin';
  onOpenPrayer?: () => void;
}

export const MobileNav = ({ role = 'public', onOpenPrayer }: MobileNavProps) => {
  const location = useLocation();

  if (location.pathname === '/') return null;

  const links = getMobileLinks(role);

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
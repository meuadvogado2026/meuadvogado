import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  User, 
  ChevronRight,
  HeartHandshake,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/MobileNav";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { getSidebarLinks } from "@/config/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const DashboardLayout = ({ role }: { role: 'client' | 'lawyer' | 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [prayerRequest, setPrayerRequest] = useState("");
  const [isSubmittingPrayer, setIsSubmittingPrayer] = useState(false);

  useEffect(() => {
    if (role !== 'admin') return;

    const channel = supabase.channel('urgent_calls_admin_alert')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'urgent_calls' }, (payload) => {
        toast.error("🚨 NOVA CHAMADA URGENTE!", {
          description: `O cliente ${payload.new.client_name} acabou de acionar o plantão com ${payload.new.lawyer_name}.`,
          duration: 15000,
          action: {
            label: 'Ver Agora',
            onClick: () => navigate('/admin/urgencias')
          }
        });
        
        try {
          const audio = new Audio('/alert.mp3'); 
          audio.play().catch(() => {});
        } catch(e) { console.error("Error playing audio", e); }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [role, navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Sessão encerrada com sucesso");
      navigate('/login');
    } catch (error) {
      toast.error("Erro ao sair da conta");
    }
  };

  const submitPrayer = async () => {
    if (!prayerRequest.trim() || !user) return;
    setIsSubmittingPrayer(true);

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      const { error } = await supabase.from('prayer_requests').insert({
        user_id: user.id,
        user_name: profile?.name || 'Anônimo',
        user_type: role === 'lawyer' ? 'Advogado' : 'Cliente',
        request: prayerRequest,
        status: 'pending'
      });

      if (error) throw error;

      toast.success("Pedido de oração enviado!", {
        description: "A equipe de intercessão estará orando por você. Fique em paz."
      });
      setIsPrayerModalOpen(false);
      setPrayerRequest("");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar pedido. Tente novamente.");
    } finally {
      setIsSubmittingPrayer(false);
    }
  };

  const links = getSidebarLinks(role);
  
  const roleDisplay = {
    admin: 'Administrador',
    lawyer: 'Advogado',
    client: 'Cliente'
  };

  const isFullWidthPage = location.pathname.includes('/advogado/advogado/') || location.pathname.includes('/cliente/advogado/') || location.pathname.includes('/buscar');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans pb-20 md:pb-0">
      
      <aside className="hidden md:flex flex-col w-[280px] bg-slate-950 border-r border-slate-800 min-h-screen relative z-20 shadow-2xl shadow-slate-900/20">
        
        <div className="h-20 flex items-center px-6 mb-2 mt-4">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="bg-white p-1.5 rounded-xl shadow-lg">
              <img src="/logo.png" alt="Meu Advogado" className="h-6 w-6 object-contain" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Meu Advogado</span>
          </Link>
        </div>
        
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

        <nav className="px-4 space-y-1.5 mt-2">
          {links.map((link) => {
            const isViewingProfile = location.pathname.includes('/advogado/') && link.path.includes('/buscar');
            const isActive = location.pathname === link.path || isViewingProfile;
            const Icon = link.icon;
            
            const isUrgencyLink = link.path === '/admin/urgencias';
            const isBenefitsLink = link.path.includes('/beneficios');

            return (
              <Link key={link.path} to={link.path} className="block group">
                <div className={cn(
                  "flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? (isUrgencyLink ? "bg-red-600/15 text-red-400 border border-red-500/20 shadow-inner" : isBenefitsLink ? "bg-amber-600/15 text-amber-400 border border-amber-500/20 shadow-inner" : "bg-blue-600/15 text-blue-400 border border-blue-500/20 shadow-inner") 
                    : "text-slate-400 border border-transparent hover:bg-slate-900 hover:text-slate-200",
                  !isActive && isUrgencyLink && "hover:text-red-400",
                  !isActive && isBenefitsLink && "hover:text-amber-400"
                )}>
                  <div className="flex items-center gap-3">
                    <Icon className={cn(
                      "w-5 h-5", 
                      isActive 
                        ? (isUrgencyLink ? "text-red-500" : isBenefitsLink ? "text-amber-500" : "text-blue-500") 
                        : (isUrgencyLink ? "text-slate-500 group-hover:text-red-400" : isBenefitsLink ? "text-slate-500 group-hover:text-amber-400" : "text-slate-500 group-hover:text-slate-300")
                    )} />
                    {link.label}
                  </div>
                  {isActive && <ChevronRight className={cn("w-4 h-4", isUrgencyLink ? "text-red-500/50" : isBenefitsLink ? "text-amber-500/50" : "text-blue-500/50")} />}
                </div>
              </Link>
            );
          })}
        </nav>

        {role !== 'admin' && (
          <div className="px-4 mt-6">
            <button 
              onClick={() => setIsPrayerModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 w-full rounded-xl text-sm font-bold text-amber-900 bg-amber-400 hover:bg-amber-500 transition-all duration-200 shadow-md shadow-amber-500/20"
            >
              <HeartHandshake className="w-5 h-5" />
              Pedir Oração
            </button>
          </div>
        )}

        <div className="p-4 mt-auto mb-4">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Sair da conta
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-slate-50/50">
        
        <header className="md:hidden h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center px-4 justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Meu Advogado" className="h-7 w-7 object-contain" />
            <span className="font-bold text-slate-900 tracking-tight">Meu Advogado</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout} 
            className="text-red-600 font-bold border-red-200 bg-red-50 hover:bg-red-600 hover:text-white transition-colors shadow-sm"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </header>

        <main className={cn("flex-1 overflow-y-auto", !isFullWidthPage && "p-4 md:p-8 lg:px-12")}>
          <Outlet />
        </main>
      </div>

      <MobileNav role={role} onOpenPrayer={() => setIsPrayerModalOpen(true)} />

      <Dialog open={isPrayerModalOpen} onOpenChange={setIsPrayerModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E3A5F] p-6 text-center text-white relative">
            <HeartHandshake className="w-24 h-24 absolute right-0 top-0 opacity-10 pointer-events-none -mt-4 -mr-4" />
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-white">Apoio Espiritual</DialogTitle>
              <DialogDescription className="text-blue-100 font-medium mt-2">
                "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei." <br/>
                <span className="text-xs uppercase tracking-widest font-bold opacity-80 mt-1 block">Mateus 11:28</span>
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="p-6 bg-white space-y-4">
            <p className="text-sm font-medium text-slate-600 mb-2">
              Nossa equipe de intercessores tem um espaço reservado para orar por você. Deixe seu pedido abaixo.
            </p>
            <Textarea 
              placeholder="Como podemos orar por você hoje?" 
              className="h-32 rounded-xl bg-slate-50 border-slate-200 resize-none font-medium"
              value={prayerRequest}
              onChange={(e) => setPrayerRequest(e.target.value)}
            />
            
            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3 sm:space-x-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsPrayerModalOpen(false)}
                className="w-full rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </Button>
              <Button 
                type="button" 
                onClick={submitPrayer}
                disabled={!prayerRequest.trim() || isSubmittingPrayer}
                className="w-full rounded-xl bg-[#1E3A5F] hover:bg-[#0F172A] text-white font-bold"
              >
                {isSubmittingPrayer ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <HeartHandshake className="w-4 h-4 mr-2" />}
                Enviar Pedido de Oração
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
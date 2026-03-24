import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ShieldCheck, User, Navigation, Siren, AlertTriangle, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WhatsAppButton } from "./WhatsAppButton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface LawyerCardProps {
  lawyer: {
    id: string;
    name: string;
    specialty: string;
    secondarySpecialties?: string[];
    city: string;
    state: string;
    cep?: string;
    region?: string;
    distance?: number;
    rating: number;
    reviews: number;
    verified: boolean;
    image: string;
    cover?: string;
    bio: string;
    type?: string;
    phone?: string;
  };
}

export const LawyerCard = ({ lawyer }: LawyerCardProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isUrgencyModalOpen, setIsUrgencyModalOpen] = useState(false);
  const [isSubmittingUrgency, setIsSubmittingUrgency] = useState(false);
  
  const basePath = location.pathname.startsWith('/painel/cliente') 
    ? '/painel/cliente' 
    : location.pathname.startsWith('/painel/advogado') 
      ? '/painel/advogado' 
      : '';
      
  const profileLink = `${basePath}/advogado/${lawyer.id}`;

  const coverImage = lawyer.cover || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800&h=300";

  const handleTriggerUrgency = async () => {
    if (!user) {
      toast.error("Acesso necessário", { description: "Faça login ou cadastre-se para acionar o plantão urgente." });
      navigate('/login');
      return;
    }

    setIsSubmittingUrgency(true);
    try {
      const { data: clientProfile } = await supabase
        .from('profiles')
        .select('name, phone')
        .eq('id', user.id)
        .single();

      const { error } = await supabase.from('urgent_calls').insert({
        client_id: user.id,
        lawyer_id: lawyer.id,
        client_name: clientProfile?.name || 'Cliente',
        client_phone: clientProfile?.phone || 'Não informado',
        lawyer_name: lawyer.name,
        status: 'pending'
      });

      if (error) throw error;

      toast.success("Alerta Emitido!", {
        description: "A equipe da plataforma e o advogado foram notificados da sua urgência."
      });
      setIsUrgencyModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao emitir alerta", { description: "Tente entrar em contato pelo WhatsApp." });
    } finally {
      setIsSubmittingUrgency(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200/60 rounded-3xl bg-white group flex flex-col h-full">
        <div className="h-28 w-full relative bg-slate-800 overflow-hidden shrink-0">
          <img 
            src={coverImage} 
            alt={`Capa do escritório ${lawyer.name}`} 
            className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          
          {lawyer.distance !== undefined && (
            <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              {lawyer.distance < 1 ? 'Muito próximo' : `A ${lawyer.distance.toFixed(1)} km`}
            </div>
          )}
        </div>
        
        <CardContent className="p-5 flex-1 flex flex-col relative">
          <div className="flex gap-4">
            <div className="-mt-12 sm:-mt-14 shrink-0 relative z-10">
              {lawyer.image ? (
                <img 
                  src={lawyer.image} 
                  alt={lawyer.name} 
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-[1.25rem] object-cover border-4 border-white shadow-sm bg-slate-100"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[1.25rem] flex items-center justify-center bg-slate-100 text-slate-400 border-4 border-white shadow-sm">
                  <User className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
              )}
            </div>
            
            <div className="pt-2 sm:pt-3 flex-1 flex justify-between items-start gap-2">
              <div>
                <Link to={profileLink} className="hover:text-primary transition-colors inline-block">
                  <h3 className="text-lg sm:text-xl font-black text-[#0F172A] leading-tight line-clamp-1 flex items-center gap-1.5">
                    {lawyer.name}
                    {lawyer.verified && (
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" title="Perfil Verificado" />
                    )}
                  </h3>
                </Link>
                
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold border-blue-100 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5">
                    {lawyer.specialty}
                  </Badge>
                  {lawyer.secondarySpecialties && lawyer.secondarySpecialties.slice(0, 2).map((spec, i) => (
                    <Badge key={i} variant="outline" className="text-slate-500 font-medium border-slate-200 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5">
                      {spec}
                    </Badge>
                  ))}
                  {lawyer.secondarySpecialties && lawyer.secondarySpecialties.length > 2 && (
                    <span className="text-[10px] font-bold text-slate-400">+{lawyer.secondarySpecialties.length - 2}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-1 bg-amber-50 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-sm shrink-0 border border-amber-100/50">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="text-amber-700">{lawyer.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mt-5 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" /> 
              {lawyer.city}, {lawyer.state}
            </span>
            {lawyer.type?.includes("Online") && (
              <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded-md border border-green-200/60 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Atende Online
              </span>
            )}
          </div>
          
          <p className="text-sm text-slate-600 mt-3 line-clamp-2 flex-1 leading-relaxed">
            {lawyer.bio}
          </p>
          
          <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
            <Link to={profileLink} className="w-1/3 sm:flex-1">
              <Button variant="outline" className="w-full h-11 border-slate-200 text-[#0F172A] hover:bg-slate-50 hover:border-slate-300 font-bold rounded-xl transition-colors text-xs sm:text-sm px-0 sm:px-4">
                Perfil
              </Button>
            </Link>
            <WhatsAppButton 
              lawyerId={lawyer.id}
              phone={lawyer.phone}
              message={`Olá Dr(a). ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`}
              className="flex-[2] sm:flex-[2] h-11 rounded-xl shadow-md shadow-green-600/20 text-xs sm:text-sm px-2"
            />
            <Button 
              onClick={(e) => {
                e.preventDefault();
                if (!user) {
                  toast.error("Faça login para solicitar urgência.");
                  navigate('/login');
                  return;
                }
                setIsUrgencyModalOpen(true);
              }}
              variant="outline"
              className="h-11 w-11 sm:w-12 p-0 border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 rounded-xl shadow-sm transition-all group shrink-0"
              title="Plantão / Urgência"
            >
              <Siren className="w-5 h-5 group-hover:animate-pulse" />
            </Button>
          </div>

        </CardContent>
      </Card>

      <Dialog open={isUrgencyModalOpen} onOpenChange={setIsUrgencyModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border border-red-200 shadow-2xl z-[100]">
          <div className="bg-red-600 p-6 text-center text-white relative">
            <Siren className="w-24 h-24 absolute right-0 top-0 opacity-10 pointer-events-none -mt-4 -mr-4" />
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-white flex items-center justify-center gap-2">
                <AlertTriangle className="w-6 h-6" /> Atenção
              </DialogTitle>
              <DialogDescription className="text-red-100 font-medium mt-2">
                Acionar o plantão envia um alerta sonoro para a equipe.
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="p-6 bg-white space-y-4">
            <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-100 text-sm font-medium">
              Utilize esta opção <strong>apenas em casos de emergência real</strong>, como:
              <ul className="list-disc ml-5 mt-2 space-y-1 text-red-700">
                <li>Prisão em flagrante</li>
                <li>Busca e apreensão</li>
                <li>Risco iminente de perda de direitos críticos</li>
              </ul>
            </div>
            
            <p className="text-sm font-medium text-slate-600 text-center">
              Tem certeza que deseja acionar o plantão urgente de <strong className="text-slate-900">{lawyer.name}</strong>?
            </p>
            
            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3 sm:space-x-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsUrgencyModalOpen(false)}
                className="w-full rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </Button>
              <Button 
                type="button" 
                onClick={handleTriggerUrgency}
                disabled={isSubmittingUrgency}
                className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {isSubmittingUrgency ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Siren className="w-4 h-4 mr-2" />}
                Confirmar Emergência
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
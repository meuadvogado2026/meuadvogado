/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Gift, ExternalLink, Info, Loader2, Building, Tag, Sparkles, Maximize2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { VipCard } from "@/components/VipCard";

export const LawyerBenefits = () => {
  const { user } = useAuth();
  const [benefits, setBenefits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBenefit, setSelectedBenefit] = useState<any>(null);
  const [showFullscreenCard, setShowFullscreenCard] = useState(false);
  const [profileData, setProfileData] = useState<any>({});

  useEffect(() => {
    fetchBenefits();
    fetchProfile();
  }, []);

  const fetchBenefits = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('benefits').select('*').eq('is_active', true).order('created_at', { ascending: false });
      if (!error && data) setBenefits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!user) return;
    try {
      const { data: lData } = await supabase.from('lawyer_details').select('oab, oab_state').eq('id', user.id).maybeSingle();
      const { data: pData } = await supabase.from('profiles').select('name').eq('id', user.id).single();
      setProfileData({
        name: pData?.name || '',
        oab: lData?.oab || '',
        oab_state: lData?.oab_state || ''
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Hero Premium */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-amber-600/20 border border-amber-400">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 text-white/10 pointer-events-none">
          <Gift className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-md px-3 py-1 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-3 h-3 mr-1.5" /> Exclusivo
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
            Clube de Benefícios
          </h1>
          <p className="text-amber-100 font-medium max-w-2xl text-lg">
            Aproveite descontos e vantagens exclusivas em softwares, livros, saúde e bem-estar, pensados para o seu crescimento.
          </p>
        </div>
      </div>

      {/* VIP Card Section */}
      <div className="bg-gradient-to-br from-[#000B21] via-[#001433] to-[#00040A] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-[#0066FF]/20 shadow-xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.15] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-[60px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
              Seu Cartão <span className="text-amber-400">VIP</span>
            </h2>
            <p className="text-white/50 font-medium max-w-md text-sm leading-relaxed mb-6">
              Apresente este cartão no estabelecimento parceiro para resgatar seu benefício exclusivo. Ele identifica você como membro verificado do Clube.
            </p>
            <Button 
              onClick={() => setShowFullscreenCard(true)}
              className="bg-[#0066FF] hover:bg-blue-500 text-white font-bold rounded-full h-12 px-8 shadow-[0_0_25px_rgba(0,102,255,0.3)] transition-all"
            >
              <Maximize2 className="w-4 h-4 mr-2" /> Apresentar Cartão em Tela Cheia
            </Button>
          </div>
          
          <div className="w-full max-w-[420px] shrink-0">
            <VipCard 
              name={profileData?.name || ''} 
              oab={profileData?.oab || ''} 
              oabState={profileData?.oab_state || ''} 
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-amber-500" /></div>
      ) : benefits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <Gift className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-600">Nenhum benefício disponível</h3>
          <p className="text-slate-400">Estamos fechando novas parcerias. Volte em breve!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <Card key={b.id} className="border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white flex flex-col h-full group overflow-hidden">
              <div className="h-32 bg-slate-100 relative flex items-center justify-center border-b border-slate-100">
                {b.image_url ? (
                  <img src={b.image_url} alt={b.company} className="h-full w-full object-cover" />
                ) : (
                  <Building className="w-12 h-12 text-slate-300" />
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-slate-700 font-bold shadow-sm">{b.category}</Badge>
                </div>
              </div>
              
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{b.company}</p>
                  <h3 className="font-black text-lg text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">{b.title}</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-black text-sm flex items-center">
                    <Tag className="w-4 h-4 mr-1.5" /> {b.discount}
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Button onClick={() => setSelectedBenefit(b)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl h-11">
                    Ver como resgatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Resgate */}
      <Dialog open={!!selectedBenefit} onOpenChange={(o) => !o && setSelectedBenefit(null)}>
        {selectedBenefit && (
          <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
            <div className="bg-slate-900 p-8 text-white relative">
              <Gift className="w-32 h-32 absolute right-0 top-0 opacity-10 pointer-events-none -mt-4 -mr-4" />
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0 font-bold">{selectedBenefit.discount}</Badge>
                  <Badge variant="outline" className="border-slate-700 text-slate-300">{selectedBenefit.category}</Badge>
                </div>
                <DialogTitle className="text-2xl font-black text-white">{selectedBenefit.company}</DialogTitle>
                <p className="text-slate-400 font-medium mt-1">{selectedBenefit.title}</p>
              </DialogHeader>
            </div>
            
            <div className="p-8 bg-white space-y-6">
              {selectedBenefit.description && (
                <p className="text-slate-600 font-medium leading-relaxed">{selectedBenefit.description}</p>
              )}
              
              <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
                <h4 className="text-sm font-black text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Regras de Resgate
                </h4>
                <p className="text-amber-900 text-sm whitespace-pre-line font-medium leading-relaxed">
                  {selectedBenefit.instructions}
                </p>
              </div>

              {selectedBenefit.link && (
                <div className="pt-2">
                  <a href={selectedBenefit.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl h-12 shadow-lg shadow-amber-500/20">
                      Acessar Benefício <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Fullscreen VIP Card Presentation */}
      <Dialog open={showFullscreenCard} onOpenChange={setShowFullscreenCard}>
        <DialogContent className="max-w-none w-screen h-screen p-0 m-0 border-none bg-[#000B21] flex items-center justify-center [&>button]:text-white [&>button]:opacity-70 [&>button]:hover:opacity-100 [&>button]:top-6 [&>button]:right-6">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#0066FF]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-[600px] px-6 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-amber-400 font-black text-xs uppercase tracking-[0.3em] mb-2">Cartão de Membro VIP</p>
              <p className="text-white/40 text-[11px] font-medium">Apresente este cartão no local do benefício para resgatar</p>
            </div>
            <VipCard 
              name={profileData?.name || ''} 
              oab={profileData?.oab || ''} 
              oabState={profileData?.oab_state || ''} 
            />
            <Button 
              onClick={() => setShowFullscreenCard(false)} 
              variant="outline"
              className="border-white/10 text-white/60 hover:text-white hover:bg-white/10 rounded-full px-8 h-10 font-bold text-xs"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
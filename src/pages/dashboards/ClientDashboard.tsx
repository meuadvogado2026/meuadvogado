/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { LawyerCard } from "@/components/LawyerCard";
import { Loader2, Target, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ClientDashboard = () => {
  const { user } = useAuth();
  const [clientData, setClientData] = useState({ name: 'Cliente', city: '', state: '' });
  const [idealMatch, setIdealMatch] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Prayer modal state
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [prayerText, setPrayerText] = useState('');
  const [isSendingPrayer, setIsSendingPrayer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, city, state, preferred_specialties')
          .eq('id', user.id)
          .single();

        if (profile) {
          setClientData({
            name: profile.name?.split(' ')[0] || 'Cliente',
            city: profile.city || '',
            state: profile.state || ''
          });

          // Matching por cidade + especialidade
          if (profile.city && profile.preferred_specialties && profile.preferred_specialties.length > 0) {
            // Buscar advogados aprovados na mesma cidade com especialidade compatível
            const { data: lawyers } = await supabase
              .from('lawyer_details')
              .select('id, main_specialty, secondary_specialties, rating, reviews_count, is_verified, mini_bio, full_bio, attendance_type, whatsapp, office_link, status')
              .eq('status', 'approved');

            if (lawyers && lawyers.length > 0) {
              // Buscar profiles dos advogados
              const lawyerIds = lawyers.map(l => l.id);
              const { data: lawyerProfiles } = await supabase
                .from('profiles')
                .select('*')
                .in('id', lawyerIds)
                .eq('city', profile.city);

              if (lawyerProfiles && lawyerProfiles.length > 0) {
                // Priorizar por especialidade match
                const matched = lawyerProfiles.map(p => {
                  const d = lawyers.find(l => l.id === p.id);
                  if (!d) return null;

                  const specMatch = profile.preferred_specialties.includes(d.main_specialty) ||
                    (d.secondary_specialties || []).some((s: string) => profile.preferred_specialties.includes(s));

                  return {
                    id: p.id,
                    name: p.name || 'Advogado(a)',
                    specialty: d.main_specialty || 'Não informada',
                    secondarySpecialties: d.secondary_specialties || [],
                    city: p.city || '',
                    state: p.state || '',
                    rating: d.rating || 5.0,
                    reviews: d.reviews_count || 0,
                    verified: d.is_verified || false,
                    image: p.avatar_url || '',
                    cover: p.cover_url || '',
                    bio: d.mini_bio || d.full_bio || '',
                    type: d.attendance_type || 'Híbrido',
                    phone: d.whatsapp || p.phone || '',
                    googleMapsUrl: d.office_link || '',
                    specMatch
                  };
                }).filter(Boolean);

                // Ordenar: quem tem match de especialidade primeiro
                matched.sort((a: any, b: any) => (b.specMatch ? 1 : 0) - (a.specMatch ? 1 : 0));

                if (matched.length > 0) {
                  setIdealMatch(matched[0]);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handlePrayerRequest = async () => {
    if (!prayerText.trim()) {
      toast.error("Escreva seu pedido de oração.");
      return;
    }

    setIsSendingPrayer(true);
    try {
      const { error } = await supabase.from('prayer_requests').insert({
        user_id: user?.id,
        user_name: clientData.name || 'Cliente',
        user_type: 'Cliente',
        request: prayerText.trim(),
        status: 'pending',
      });

      if (error) throw error;

      toast.success("Pedido de oração enviado!", {
        description: "Sua mensagem será tratada com todo carinho e sigilo."
      });
      setPrayerText('');
      setShowPrayerModal(false);
    } catch (error) {
      toast.error("Erro ao enviar pedido de oração.");
    } finally {
      setIsSendingPrayer(false);
    }
  };

  const EmptyState = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-slate-300 rounded-3xl col-span-full">
      <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-500 max-w-sm mb-6">{description}</p>
      <Link to="/painel/cliente/perfil">
        <Button variant="outline" className="rounded-xl font-bold border-slate-300 text-slate-700 hover:bg-slate-50">
          Editar Minhas Preferências
        </Button>
      </Link>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">

      {/* Welcome Banner */}
      <div className="bg-[#0F172A] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Olá, {clientData.name}!
            </h1>
            <p className="text-lg text-slate-300 font-medium">
              Bem-vindo ao Advogado 2.0, estamos aqui para te ajudar.
            </p>
          </div>
          <div className="shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl overflow-hidden bg-[#0a1628] shadow-xl shadow-[#0066FF]/20 border-2 border-white/10">
              <img src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/Meu%20Advogado%20LOGO.jpeg" alt="Advogado 2.0" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Match Ideal */}
      {idealMatch && (
        <div className="space-y-6 relative z-10 transition-all duration-500 animate-in slide-in-from-bottom-5 fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl shadow-inner">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-[#0F172A] leading-tight">Advogado Indicado</h2>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-lg border border-blue-200 uppercase tracking-widest shadow-sm">
              Na sua cidade
            </span>
          </div>

          <div className="relative p-[2px] rounded-[1.6rem] bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-600 shadow-2xl shadow-blue-500/20 group">
            <div className="bg-white rounded-[1.5rem] overflow-hidden">
              <LawyerCard lawyer={idealMatch} />
            </div>
          </div>
        </div>
      )}

      {!idealMatch && !isLoading && (
        <EmptyState
          icon={Search}
          title="Buscando o Advogado Ideal"
          description="Ainda não encontramos um especialista na sua cidade com as áreas de interesse selecionadas. Edite suas preferências ou aguarde novos profissionais."
        />
      )}

      {/* Pedido de Oração — no final da página */}
      <div
        onClick={() => setShowPrayerModal(true)}
        className="bg-[#0a0f1c] p-6 md:p-8 rounded-3xl border border-slate-800 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer group relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
        <div className="flex items-center gap-6">
          <div className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden border border-slate-700 group-hover:border-amber-500/30 transition-colors shadow-lg">
            <img src="/bible_prayer.png" alt="Bíblia" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl font-black text-white tracking-tight">✝️ Pedido de Oração</span>
            </div>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Envie seu pedido de oração de forma confidencial. Nossa equipe intercede por você com carinho e sigilo.
            </p>
          </div>
          <div className="hidden sm:block text-slate-500 group-hover:text-amber-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </div>
        </div>
      </div>

      {/* Modal de Pedido de Oração */}
      <Dialog open={showPrayerModal} onOpenChange={setShowPrayerModal}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
          <div className="bg-[#0F172A] p-8 text-white relative">
            <div className="absolute top-4 right-4 w-20 h-20 rounded-2xl overflow-hidden opacity-20">
              <img src="/bible_prayer.png" alt="" className="w-full h-full object-cover" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-white flex items-center gap-3">
                ✝️ Pedido de Oração
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-slate-300 mt-2">
              Escreva seu pedido com confiança. É 100% sigiloso e será tratado pela nossa equipe com respeito e amor.
            </p>
          </div>
          <div className="p-6 space-y-4 bg-white">
            <Textarea
              placeholder="Escreva aqui o seu pedido de oração..."
              className="min-h-[140px] resize-none rounded-xl border-slate-200 bg-slate-50 focus:border-blue-500"
              maxLength={1000}
              value={prayerText}
              onChange={(e) => setPrayerText(e.target.value)}
            />
            <p className="text-xs text-slate-400 text-right font-medium">{prayerText.length}/1000 caracteres</p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPrayerModal(false)}
                className="rounded-xl font-bold border-slate-200"
                disabled={isSendingPrayer}
              >
                Cancelar
              </Button>
              <Button
                onClick={handlePrayerRequest}
                disabled={isSendingPrayer || !prayerText.trim()}
                className="bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-bold px-6 shadow-lg"
              >
                {isSendingPrayer ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {isSendingPrayer ? 'Enviando...' : 'Enviar Pedido'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};
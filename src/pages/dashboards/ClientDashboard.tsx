import React, { useEffect, useState } from 'react';
import { LawyerCard } from "@/components/LawyerCard";
import { Search, Sparkles, Clock, Bookmark, Scale, MapPin, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ClientDashboard = () => {
  const { user } = useAuth();
  const [clientData, setClientData] = useState({ name: 'Cliente', city: '', state: '' });
  const [recommendedLawyers, setRecommendedLawyers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);

      try {
        // Busca os dados do cliente
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, city, state')
          .eq('id', user.id)
          .single();

        if (profile) {
          setClientData({
            name: profile.name?.split(' ')[0] || 'Cliente',
            city: profile.city || '',
            state: profile.state || ''
          });
        }

        // Busca advogados recomendados (que tenham perfil verificado)
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'lawyer')
          .limit(4);

        const { data: detailsData } = await supabase
          .from('lawyer_details')
          .select('*')
          .eq('is_verified', true);

        if (profilesData && detailsData) {
          // Filtra perfis que têm detalhes verificados
          const verifiedLawyers = profilesData.filter(p => detailsData.some(d => d.id === p.id));
          
          const mappedData = verifiedLawyers.map(p => {
            const d = detailsData.find(x => x.id === p.id) || {};
            return {
              id: p.id,
              name: p.name || 'Advogado(a)',
              specialty: d.main_specialty || 'Não informada',
              city: p.city || '',
              state: p.state || '',
              rating: d.rating || 5.0,
              reviews: d.reviews_count || 0,
              verified: d.is_verified || false,
              image: p.avatar_url || '',
              cover: p.cover_url || '',
              bio: d.mini_bio || d.full_bio || '',
              type: d.attendance_type || 'Híbrido'
            };
          });

          // Mostra apenas os 2 primeiros como recomendados na home
          setRecommendedLawyers(mappedData.slice(0, 2));
        }

      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Componente auxiliar para estados vazios
  const EmptyState = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-slate-300 rounded-3xl col-span-full">
      <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-slate-500 max-w-sm mb-6">{description}</p>
      <Link to="/painel/cliente/buscar">
        <Button variant="outline" className="rounded-xl font-bold border-slate-300 text-slate-700 hover:bg-slate-50">
          Explorar Advogados
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
      
      {/* Header Premium */}
      <div className="bg-[#0F172A] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-800">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-white/5 pointer-events-none">
          <Scale className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            {clientData.city && clientData.state && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-4 backdrop-blur-sm border border-white/10">
                <MapPin className="w-4 h-4" /> Sua localização: {clientData.city}, {clientData.state}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Olá, {clientData.name}!
            </h1>
            <p className="text-lg text-slate-300 font-medium">
              Encontre o especialista ideal para o seu caso.
            </p>
          </div>
          <Link to="/painel/cliente/buscar" className="w-full md:w-auto shrink-0">
            <Button className="w-full h-14 px-8 bg-blue-600 text-white hover:bg-blue-700 font-black rounded-2xl text-lg shadow-xl shadow-blue-600/20 transition-transform hover:scale-105 border-0">
              <Search className="w-5 h-5 mr-2" /> Fazer nova busca
            </Button>
          </Link>
        </div>
      </div>

      {/* Advogados Recomendados */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-[#0F172A]">Recomendados na plataforma</h2>
          </div>
          <Link to="/painel/cliente/buscar" className="text-sm font-bold text-blue-600 hover:text-blue-800 hidden sm:block">
            Ver todos profissionais
          </Link>
        </div>
        
        {recommendedLawyers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendedLawyers.map(lawyer => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Sparkles} 
            title="Nenhum advogado verificado ainda" 
            description="Estamos cadastrando os melhores profissionais. Faça uma busca para ver todos os perfis disponíveis."
          />
        )}
      </div>

      {/* Histórico e Salvos */}
      <div className="pt-4">
        <Tabs defaultValue="recentes" className="w-full">
          <TabsList className="h-14 mb-8 bg-slate-100/50 p-1 border border-slate-200/60 rounded-2xl w-full max-w-md">
            <TabsTrigger value="recentes" className="rounded-xl h-11 text-base font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0F172A] flex-1">
              <Clock className="w-4 h-4 mr-2" /> Vistos Recentemente
            </TabsTrigger>
            <TabsTrigger value="salvos" className="rounded-xl h-11 text-base font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0F172A] flex-1">
              <Bookmark className="w-4 h-4 mr-2" /> Salvos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recentes" className="space-y-6 outline-none">
            <EmptyState 
              icon={Clock} 
              title="Nenhum perfil visto" 
              description="Os advogados que você visitar recentemente aparecerão aqui para fácil acesso."
            />
          </TabsContent>

          <TabsContent value="salvos" className="space-y-6 outline-none">
            <EmptyState 
              icon={Bookmark} 
              title="Nenhum advogado salvo" 
              description="Em breve você poderá salvar os perfis que mais gostou para entrar em contato no momento certo."
            />
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
};
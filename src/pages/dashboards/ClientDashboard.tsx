/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { LawyerCard } from "@/components/LawyerCard";
import { Search, Sparkles, Clock, Bookmark, Scale, MapPin, Loader2, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ClientDashboard = () => {
  const { user } = useAuth();
  const [clientData, setClientData] = useState({ name: 'Cliente', city: '', state: '' });
  const [idealMatch, setIdealMatch] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setIsLoading(true);

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, city, state, lat, lng, preferred_specialties')
          .eq('id', user.id)
          .single();

        let matchId: string | null = null;

        if (profile) {
          setClientData({
            name: profile.name?.split(' ')[0] || 'Cliente',
            city: profile.city || '',
            state: profile.state || ''
          });

          if (profile.lat && profile.lng && profile.preferred_specialties && profile.preferred_specialties.length > 0) {
            const { data: matchData, error: matchError } = await supabase.rpc('get_ideal_lawyer', {
              user_lat: parseFloat(profile.lat),
              user_lng: parseFloat(profile.lng),
              user_specs: profile.preferred_specialties
            });
            
            if (!matchError && matchData && matchData.length > 0) {
              matchId = matchData[0].id;
              
              const { data: pData } = await supabase.from('profiles').select('*').eq('id', matchId).single();
              const { data: dData } = await supabase.from('lawyer_details').select('*').eq('id', matchId).single();
              
              if (pData && dData) {
                setIdealMatch({
                  id: pData.id,
                  name: pData.name || 'Advogado(a)',
                  specialty: dData.main_specialty || 'Não informada',
                  secondarySpecialties: dData.secondary_specialties || [],
                  city: pData.city || '',
                  state: pData.state || '',
                  cep: pData.cep || '',
                  street: pData.street || '',
                  neighborhood: pData.neighborhood || '',
                  address_number: pData.address_number || '',
                  lat: parseFloat(pData.lat) || undefined,
                  lng: parseFloat(pData.lng) || undefined,
                  rating: dData.rating || 5.0,
                  reviews: dData.reviews_count || 0,
                  verified: dData.is_verified || false,
                  image: pData.avatar_url || '',
                  cover: pData.cover_url || '',
                  bio: dData.mini_bio || dData.full_bio || '',
                  type: dData.attendance_type || 'Híbrido',
                  phone: dData.whatsapp || pData.phone || '',
                  googleMapsUrl: dData.office_link || '',
                  distance: matchData[0].distance_km
                });
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

      {idealMatch && (
        <div className="space-y-6 relative z-10 transition-all duration-500 animate-in slide-in-from-bottom-5 fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl shadow-inner">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-[#0F172A] leading-tight">Match Ideal (Mais Próximo)</h2>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 bg-blue-50 text-blue-700 text-xs font-black rounded-lg border border-blue-200 uppercase tracking-widest shadow-sm">
              Combinação 100%
            </span>
          </div>
          
          <div className="relative p-[2px] rounded-[1.6rem] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-2xl shadow-blue-500/20 group">
            <div className="absolute top-0 right-8 bg-[#0F172A] text-white text-xs font-black px-4 py-2 rounded-b-xl z-20 shadow-xl flex items-center gap-2 group-hover:bg-blue-600 transition-colors">
              <MapPin className="w-3.5 h-3.5" /> Apenas {idealMatch.distance ? idealMatch.distance.toFixed(1) : '< 1'} km de você
            </div>
            <div className="bg-white rounded-[1.5rem] overflow-hidden">
              <LawyerCard lawyer={idealMatch} />
            </div>
          </div>
        </div>
      )}
      
      {!idealMatch && !isLoading && (
        <EmptyState 
          icon={Search} 
          title="Buscando o Match Ideal" 
          description="Ainda não encontramos um especialista com o perfil exato das suas áreas de interesse na sua região. Edite suas preferências!"
        />
      )}

    </div>
  );
};
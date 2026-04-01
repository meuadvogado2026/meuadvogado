/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader2, Users, AlertCircle } from "lucide-react";
import { LawyerCard } from "@/components/LawyerCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<'client'|'lawyer'|null>(null);
  const [profileComplete, setProfileComplete] = useState(true);
  
  // Client Data
  const [idealMatch, setIdealMatch] = useState<any | null>(null);
  
  // Lawyer Data
  const [colleagues, setColleagues] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, lat, lng, preferred_specialties, city, state')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserRole(profile.role);
          
          if (profile.role === 'client') {
            const hasLocation = profile.lat && profile.lng;
            const hasSpecs = profile.preferred_specialties && profile.preferred_specialties.length > 0;
            
            if (!hasLocation || !hasSpecs) {
              setProfileComplete(false);
            } else {
              setProfileComplete(true);
              const { data: matchData, error: matchError } = await supabase.rpc('get_ideal_lawyer', {
                user_lat: parseFloat(profile.lat),
                user_lng: parseFloat(profile.lng),
                user_specs: profile.preferred_specialties
              });
              
              if (!matchError && matchData && matchData.length > 0) {
                const matchId = matchData[0].id;
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
            
          } else if (profile.role === 'lawyer') {
            setProfileComplete(true);
            // Fetch all approved colleagues except self
            const { data: profilesData } = await supabase
              .from('profiles')
              .select('*')
              .eq('role', 'lawyer')
              .neq('id', user.id);

            const { data: detailsData } = await supabase
              .from('lawyer_details')
              .select('*')
              .eq('status', 'approved');

            if (profilesData && detailsData) {
              const verifiedColleagues = profilesData.filter(p => detailsData.some(d => d.id === p.id));
              
              const mappedData = verifiedColleagues.map(p => {
                const d = detailsData.find(x => x.id === p.id) || {};
                return {
                  id: p.id,
                  name: p.name || 'Advogado(a)',
                  specialty: d.main_specialty || 'Não informada',
                  secondarySpecialties: d.secondary_specialties || [],
                  city: p.city || '',
                  state: p.state || '',
                  cep: p.cep || '',
                  street: p.street || '',
                  neighborhood: p.neighborhood || '',
                  address_number: p.address_number || '',
                  lat: parseFloat(p.lat) || undefined,
                  lng: parseFloat(p.lng) || undefined,
                  rating: d.rating || 5.0,
                  reviews: d.reviews_count || 0,
                  verified: d.is_verified || false,
                  image: p.avatar_url || '',
                  cover: p.cover_url || '',
                  bio: d.mini_bio || d.full_bio || '',
                  type: d.attendance_type || 'Híbrido',
                  phone: d.whatsapp || p.phone || '',
                  googleMapsUrl: d.office_link || ''
                };
              });
              setColleagues(mappedData);
            }
          }
        }
      } catch (error) {
         console.error("Erro no Search:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold">Carregando dados na rede...</p>
      </div>
    );
  }

  // --- VISÃO DO CLIENTE (Módulo de Motor Exclusivo 1x1) ---
  if (userRole === 'client') {
    return (
      <div className="min-h-screen bg-slate-50/50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">Seu Especialista Exclusivo</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Nossa inteligência artificial cruzou sua localização exata e suas necessidades jurídicas para encontrar o profissional perfeito para o seu caso.
            </p>
          </div>

          {!profileComplete ? (
            <div className="text-center py-20 bg-amber-50 rounded-3xl border border-amber-200 shadow-sm">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight">Precisamos de mais dados!</h3>
              <p className="text-slate-600 max-w-md mx-auto mb-8 font-medium">Você precisa definir um CEP válido e pelo menos 1 (uma) Especialidade em seu perfil para que a inteligência artificial faça o Match com um advogado.</p>
              <Link to="/painel/cliente/perfil">
                <Button className="rounded-xl font-bold bg-[#1E3A5F] hover:bg-[#0F172A] h-14 px-8 shadow-lg shadow-[#1E3A5F]/20 transition-all hover:scale-105">
                  Completar Meu Perfil Agora
                </Button>
              </Link>
            </div>
          ) : idealMatch ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <span className="font-black text-[#0F172A] uppercase tracking-widest text-[#1E3A5F] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0" /> MATCH ABSOLUTO ENCONTRADO
                </span>
                <span className="px-4 py-1.5 bg-white text-green-700 font-black rounded-lg text-xs uppercase tracking-widest shadow-sm">
                  {idealMatch.distance !== null && idealMatch.distance !== undefined 
                    ? `A ${idealMatch.distance < 1 ? '< 1' : idealMatch.distance.toFixed(1)} km da sua região` 
                    : 'Na sua região'}
                </span>
              </div>
              
              <div className="relative p-[3px] rounded-[1.6rem] bg-gradient-to-tr from-[#1E3A5F] via-blue-600 to-indigo-400 shadow-2xl shadow-blue-500/20 group hover:shadow-blue-500/30 transition-shadow duration-500">
                <div className="bg-white rounded-[1.5rem] overflow-hidden">
                  <LawyerCard lawyer={idealMatch} />
                </div>
              </div>
              
              <div className="text-center pt-8">
                <p className="text-slate-500 mb-4 text-sm font-medium">Deseja buscar por outra especialidade ou cadastrou o CEP errado?</p>
                <Link to="/painel/cliente/perfil">
                  <Button variant="outline" className="border-slate-300 text-slate-700 font-bold rounded-xl h-12 px-8 hover:bg-slate-100 transition-colors">
                    Atualizar Minhas Preferências de Busca
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Navigation className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight">Nenhum profissional na sua região ativa</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">Ainda não temos um advogado aprovado com as características exatas que você procura próximo ao seu CEP. Tente expandir suas áreas de interesse no perfil.</p>
              <Link to="/painel/cliente/perfil">
                <Button className="rounded-xl font-bold bg-[#1E3A5F] hover:bg-[#0F172A] h-14 px-8 shadow-lg shadow-[#1E3A5F]/20 transition-all hover:scale-105">
                  Editar Minhas Preferências
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- VISÃO DO ADVOGADO (Lista de Colegas Verificados) ---
  return (
    <div className="min-h-screen bg-slate-50/50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">Colegas de Profissão</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Rede de advogados aprovados na plataforma "Advogado 2.0". Crie parcerias e expanda seus horizontes profissionais.
          </p>
        </div>

        {colleagues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {colleagues.map(lawyer => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight">Nenhum colega aprovado ainda</h3>
            <p className="text-slate-500 max-w-md mx-auto font-medium">Os advogados parceiros que passarem pela nossa checagem OAB irão aparecer aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
};
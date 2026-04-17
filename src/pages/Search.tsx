/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, Users, AlertCircle } from "lucide-react";
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
          .select('role, city, state, preferred_specialties')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserRole(profile.role);

          if (profile.role === 'client') {
            const hasCity = !!profile.city;
            const hasSpecs = profile.preferred_specialties && profile.preferred_specialties.length > 0;

            if (!hasCity || !hasSpecs) {
              setProfileComplete(false);
            } else {
              setProfileComplete(true);

              // Matching por cidade + especialidade
              const { data: lawyers } = await supabase
                .from('lawyer_details')
                .select('id, main_specialty, secondary_specialties, rating, reviews_count, is_verified, mini_bio, full_bio, attendance_type, whatsapp, office_link, status')
                .eq('status', 'approved');

              if (lawyers && lawyers.length > 0) {
                const lawyerIds = lawyers.map(l => l.id);
                const { data: lawyerProfiles } = await supabase
                  .from('profiles')
                  .select('*')
                  .in('id', lawyerIds)
                  .eq('city', profile.city);

                if (lawyerProfiles && lawyerProfiles.length > 0) {
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

                  matched.sort((a: any, b: any) => (b.specMatch ? 1 : 0) - (a.specMatch ? 1 : 0));

                  if (matched.length > 0) {
                    setIdealMatch(matched[0]);
                  }
                }
              }
            }

          } else if (profile.role === 'lawyer') {
            setProfileComplete(true);
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
                const d: any = detailsData.find(x => x.id === p.id) || {};
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

  // --- VISÃO DO CLIENTE ---
  if (userRole === 'client') {
    return (
      <div className="min-h-screen bg-slate-50/50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-[#0F172A] mb-4 tracking-tight">Seu Especialista Exclusivo</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Cruzamos sua cidade e suas necessidades jurídicas para encontrar o profissional perfeito para o seu caso.
            </p>
          </div>

          {!profileComplete ? (
            <div className="text-center py-20 bg-amber-50 rounded-3xl border border-amber-200 shadow-sm">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight">Precisamos de mais dados!</h3>
              <p className="text-slate-600 max-w-md mx-auto mb-8 font-medium">Você precisa definir sua cidade e pelo menos 1 (uma) especialidade em seu perfil para que possamos indicar um advogado.</p>
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
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0" /> ADVOGADO ENCONTRADO NA SUA CIDADE
                </span>
                <span className="px-4 py-1.5 bg-white text-green-700 font-black rounded-lg text-xs uppercase tracking-widest shadow-sm">
                  {idealMatch.city}, {idealMatch.state}
                </span>
              </div>

              <div className="relative p-[3px] rounded-[1.6rem] bg-gradient-to-tr from-[#1E3A5F] via-blue-600 to-blue-400 shadow-2xl shadow-blue-500/20 group hover:shadow-blue-500/30 transition-shadow duration-500">
                <div className="bg-white rounded-[1.5rem] overflow-hidden">
                  <LawyerCard lawyer={idealMatch} />
                </div>
              </div>

              <div className="text-center pt-8">
                <p className="text-slate-500 mb-4 text-sm font-medium">Deseja buscar por outra especialidade ou mudar de cidade?</p>
                <Link to="/painel/cliente/perfil">
                  <Button variant="outline" className="border-slate-300 text-slate-700 font-bold rounded-xl h-12 px-8 hover:bg-slate-100 transition-colors">
                    Atualizar Minhas Preferências
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-3 tracking-tight">Nenhum profissional na sua cidade</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">Ainda não temos um advogado aprovado com as especialidades que você procura na sua cidade. Tente expandir suas áreas de interesse.</p>
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
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  Briefcase, 
  ArrowLeft,
  User,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Globe,
  Link as LinkIcon,
  Building2,
  Scale,
  Phone,
  Mail,
  Share2,
  Info,
  Loader2,
  AlertTriangle,
  Siren
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export const LawyerProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [lawyer, setLawyer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUrgencyModalOpen, setIsUrgencyModalOpen] = useState(false);
  const [isSubmittingUrgency, setIsSubmittingUrgency] = useState(false);

  const basePath = location.pathname.startsWith('/painel/cliente') 
    ? '/painel/cliente' 
    : location.pathname.startsWith('/painel/advogado') 
      ? '/painel/advogado' 
      : '';
  const searchLink = `${basePath}/buscar`;

  useEffect(() => {
    const fetchLawyer = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const { data: pData } = await supabase.from('profiles').select('*').eq('id', id).single();
        const { data: lData } = await supabase.from('lawyer_details').select('*').eq('id', id).maybeSingle();

        if (pData) {
          const details = lData || {};
          setLawyer({
            id: pData.id,
            name: pData.name || 'Advogado(a)',
            title: details.title || details.main_specialty || '',
            specialty: details.main_specialty || 'Não informada',
            secondarySpecialties: details.secondary_specialties || [],
            city: pData.city || '',
            state: pData.state || '',
            oab: details.oab ? `${details.oab_state || ''} ${details.oab}` : 'Não informada',
            rating: details.rating || 5.0,
            reviews: details.reviews_count || 0,
            verified: details.is_verified || false,
            type: details.attendance_type || 'Híbrido (Online e Presencial)',
            phone: details.whatsapp || pData.phone || '',
            email: pData.email || '',
            bio: details.full_bio || details.mini_bio || 'Este profissional ainda não adicionou uma biografia.',
            image: pData.avatar_url,
            cover: pData.cover_url,
            showSocials: true,
            socials: {
              instagram: details.instagram,
              linkedin: details.linkedin,
              facebook: details.facebook,
              youtube: details.youtube,
              website: details.website,
              officeLink: details.office_link,
              customLink: details.custom_link
            }
          });
        }
      } catch (error) {
        console.error("Erro ao carregar advogado", error);
        toast.error("Erro ao carregar os dados deste profissional.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLawyer();
  }, [id]);

  useEffect(() => {
    if (lawyer && lawyer.id !== user?.id) {
      const recordView = async () => {
        const viewed = sessionStorage.getItem(`viewed_${lawyer.id}`);
        if (!viewed) {
          await supabase.from('lawyer_events').insert({
            lawyer_id: lawyer.id,
            client_id: user?.id || null,
            event_type: 'profile_view'
          });
          sessionStorage.setItem(`viewed_${lawyer.id}`, 'true');
        }
      };
      recordView();
    }
  }, [lawyer, user]);

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

  const handleShareProfile = async () => {
    const shareUrl = `${window.location.origin}/advogado/${lawyer.id}`;
    const shareData = {
      title: `Perfil de ${lawyer.name}`,
      text: `Confira o perfil de ${lawyer.name} na plataforma Meu Advogado.`,
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(shareUrl);
          toast.success("Link copiado para a área de transferência!");
        }
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Profissional não encontrado</h2>
        <Link to={searchLink}>
          <Button>Voltar para a busca</Button>
        </Link>
      </div>
    );
  }

  const coverImage = lawyer.cover || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200&h=400";

  const renderSocialIcon = (key: string, value: string) => {
    if (!value) return null;
    const icons: Record<string, { icon: any, color: string, href: string }> = {
      instagram: { icon: Instagram, color: "hover:text-pink-600 hover:bg-pink-50 text-slate-400", href: `https://instagram.com/${value.replace('@','')}` },
      linkedin: { icon: Linkedin, color: "hover:text-blue-600 hover:bg-blue-50 text-slate-400", href: value.includes('http') ? value : `https://${value}` },
      facebook: { icon: Facebook, color: "hover:text-blue-500 hover:bg-blue-50 text-slate-400", href: value.includes('http') ? value : `https://${value}` },
      youtube: { icon: Youtube, color: "hover:text-red-600 hover:bg-red-50 text-slate-400", href: value.includes('http') ? value : `https://${value}` },
      website: { icon: Globe, color: "hover:text-slate-700 hover:bg-slate-100 text-slate-400", href: value.includes('http') ? value : `https://${value}` },
      officeLink: { icon: Building2, color: "hover:text-indigo-600 hover:bg-indigo-50 text-slate-400", href: value.includes('http') ? value : `https://${value}` },
      customLink: { icon: LinkIcon, color: "hover:text-slate-700 hover:bg-slate-100 text-slate-400", href: value.includes('http') ? value : `https://${value}` },
    };

    const SocialData = icons[key];
    if (!SocialData) return null;
    const IconComponent = SocialData.icon;

    return (
      <a 
        key={key} 
        href={SocialData.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-9 h-9 rounded-full flex items-center justify-center bg-white border border-slate-200 transition-all duration-300 shadow-sm ${SocialData.color}`}
      >
        <IconComponent className="w-4 h-4" />
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      
      {/* HEADER / HERO */}
      <div className="w-full h-48 md:h-64 relative bg-[#0F172A] overflow-hidden shrink-0">
        <img 
          src={coverImage} 
          alt={`Capa do Dr(a) ${lawyer.name}`} 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0F172A]/80 to-transparent pointer-events-none"></div>
        
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="container mx-auto px-4 pt-5 max-w-5xl">
            <Link to={searchLink}>
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-md bg-black/20 rounded-xl px-4 h-9 -ml-2 font-medium text-sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* TOPO DO PERFIL */}
      <div className="container mx-auto px-4 max-w-5xl mb-8">
        <div className="flex flex-col sm:flex-row gap-5 md:gap-6 items-center sm:items-start text-center sm:text-left">
          
          <div className="relative shrink-0 -mt-16 md:-mt-20 z-10">
            {lawyer.image ? (
              <img 
                src={lawyer.image} 
                alt={lawyer.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-[1.5rem] object-cover bg-slate-100 border-[4px] border-white shadow-md"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[1.5rem] bg-slate-100 flex items-center justify-center text-slate-400 border-[4px] border-white shadow-md">
                <User className="w-12 h-12 md:w-16 md:h-16" />
              </div>
            )}
            {lawyer.verified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-xl shadow-sm border-[3px] border-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            )}
          </div>

          <div className="flex-1 w-full sm:pt-3">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
              
              <div className="space-y-1.5">
                <h1 className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight leading-tight">{lawyer.name}</h1>
                {lawyer.title && <p className="text-sm md:text-base font-bold text-primary">{lawyer.title}</p>}
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs md:text-sm font-medium text-slate-600 pt-1.5">
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md text-slate-700 border border-slate-200/60 shadow-sm">
                    <Scale className="w-3.5 h-3.5 text-primary" /> OAB {lawyer.oab}
                  </div>
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200/60 px-2.5 py-1 rounded-md shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {lawyer.city}, {lawyer.state}
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-100/50 px-2.5 py-1 rounded-md shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 
                    <span className="font-bold">{lawyer.rating}</span> 
                    <span className="text-amber-700/60 font-medium">({lawyer.reviews})</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-2.5">
                  <Badge className="px-3 py-1 bg-[#1E3A5F] hover:bg-[#0F172A] text-white font-bold border-0 text-[10px] md:text-xs rounded-md shadow-sm">
                    {lawyer.specialty}
                  </Badge>
                  {lawyer.secondarySpecialties?.map((spec: string) => (
                    <Badge key={spec} variant="outline" className="px-3 py-1 bg-white border-slate-200 text-slate-600 font-medium rounded-md text-[10px] md:text-xs shadow-sm">
                      {spec}
                    </Badge>
                  ))}
                  {lawyer.type?.includes("Online") && (
                    <Badge variant="outline" className="px-3 py-1 bg-green-50 border-green-200 text-green-700 font-bold rounded-md text-[10px] md:text-xs shadow-sm">
                      Atende Online
                    </Badge>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-auto shrink-0 flex flex-col items-center sm:items-start lg:items-end gap-3 mt-1 lg:mt-0">
                <div className="flex w-full gap-2">
                  <WhatsAppButton 
                    lawyerId={lawyer.id}
                    className="flex-1 lg:w-auto h-11 md:h-12 px-6 text-sm shadow-md shadow-green-600/20 rounded-xl font-bold"
                    phone={lawyer.phone?.replace(/\D/g, '')}
                    message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                  />
                  <Button 
                    onClick={() => {
                      if(!user) {
                        toast.error("Faça login para solicitar urgência.");
                        navigate('/login');
                        return;
                      }
                      setIsUrgencyModalOpen(true);
                    }}
                    variant="outline"
                    className="h-11 md:h-12 w-11 md:w-12 p-0 border-red-200 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 rounded-xl shadow-sm transition-all group shrink-0"
                    title="Plantão / Urgência"
                  >
                    <Siren className="w-5 h-5 group-hover:animate-pulse" />
                  </Button>
                </div>
                
                {lawyer.showSocials && lawyer.socials && (
                  <div className="flex flex-wrap justify-center sm:justify-start lg:justify-end gap-1.5 w-full">
                    {Object.entries(lawyer.socials).map(([key, value]) => renderSocialIcon(key, value as string))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORPO DO PERFIL */}
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-5">
            <Card className="border-0 shadow-sm rounded-2xl border border-slate-200/50 bg-white">
              <CardContent className="p-5 md:p-6">
                <h2 className="text-lg font-black text-[#0F172A] mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Sobre o Profissional
                </h2>
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                  {lawyer.bio}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-2xl border border-slate-200/50 bg-white">
              <CardContent className="p-5 md:p-6">
                <h2 className="text-lg font-black text-[#0F172A] mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Áreas de Atuação
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[lawyer.specialty, ...(lawyer.secondarySpecialties || [])].filter(Boolean).map((spec: string, index: number) => (
                    <div key={index} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-sm hover:border-slate-200 transition-colors">
                      <Scale className="w-4 h-4 text-primary" />
                      <span className="font-bold text-slate-800">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-2xl border border-slate-200/50 bg-white">
              <CardContent className="p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-black text-[#0F172A] flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    Avaliações de Clientes
                  </h2>
                  <p className="text-slate-500 text-xs font-medium flex items-center justify-center sm:justify-start gap-1.5">
                    <Info className="w-3.5 h-3.5 shrink-0" /> Somente clientes verificados podem avaliar.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 bg-amber-50 px-5 py-2.5 rounded-xl border border-amber-100/50 shrink-0">
                  <div className="text-3xl font-black text-amber-600">{lawyer.rating}</div>
                  <div className="flex flex-col">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.round(lawyer.rating) ? 'fill-amber-500 text-amber-500' : 'fill-slate-200 text-slate-200'}`} />
                      ))}
                    </div>
                    <span className="font-bold text-slate-500 text-[10px] uppercase tracking-wider mt-0.5">{lawyer.reviews} avaliações</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <Card className="border-0 shadow-sm rounded-2xl border border-slate-200/50 overflow-hidden bg-white">
                <div className="h-1 w-full bg-[#1E3A5F]" />
                <CardContent className="p-5 md:p-6">
                  <h3 className="text-base font-black text-[#0F172A] mb-5">Informações de Contato</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Telefone / WhatsApp</p>
                        <p className="font-bold text-slate-800 text-sm">{lawyer.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">E-mail</p>
                        <a href={`mailto:${lawyer.email}`} className="font-bold text-slate-800 text-sm truncate block hover:text-blue-600 transition-colors">{lawyer.email}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Localização</p>
                        <p className="font-bold text-slate-800 text-sm">{lawyer.city}, {lawyer.state}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-1 border-t border-slate-100 space-y-2">
                      <WhatsAppButton 
                        fullWidth
                        lawyerId={lawyer.id}
                        className="h-12 text-sm rounded-xl shadow-md shadow-green-600/20 font-bold"
                        phone={lawyer.phone?.replace(/\D/g, '')}
                        message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                      />
                      <Button 
                        onClick={() => {
                          if(!user) {
                            toast.error("Faça login para solicitar urgência.");
                            navigate('/login');
                            return;
                          }
                          setIsUrgencyModalOpen(true);
                        }}
                        variant="outline" 
                        className="w-full h-12 text-sm rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"
                      >
                        <Siren className="w-4 h-4 mr-2" /> Acionar Plantão Urgente
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleShareProfile}
                variant="ghost" 
                className="w-full text-slate-500 h-10 rounded-xl font-bold hover:bg-slate-200/50 hover:text-slate-800 transition-colors text-xs"
              >
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar Perfil
              </Button>

            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE URGÊNCIA */}
      <Dialog open={isUrgencyModalOpen} onOpenChange={setIsUrgencyModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border border-red-200 shadow-2xl">
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
    </div>
  );
};
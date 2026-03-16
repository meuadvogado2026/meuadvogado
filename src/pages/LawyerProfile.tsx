import React from 'react';
import { useParams, Link, useLocation } from "react-router-dom";
import { mockLawyers } from "@/data/mock";
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
  Info
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const LawyerProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const lawyer = mockLawyers.find(l => l.id === id) || mockLawyers[0];

  const basePath = location.pathname.startsWith('/painel/cliente') ? '/painel/cliente' : '';
  const searchLink = `${basePath}/buscar`;

  const renderSocialIcon = (key: string, value: string) => {
    if (!value) return null;
    const icons: Record<string, { icon: any, color: string, href: string }> = {
      instagram: { icon: Instagram, color: "hover:text-pink-600 hover:bg-pink-50", href: `https://instagram.com/${value.replace('@','')}` },
      linkedin: { icon: Linkedin, color: "hover:text-blue-600 hover:bg-blue-50", href: value.includes('http') ? value : `https://${value}` },
      facebook: { icon: Facebook, color: "hover:text-blue-500 hover:bg-blue-50", href: value.includes('http') ? value : `https://${value}` },
      youtube: { icon: Youtube, color: "hover:text-red-600 hover:bg-red-50", href: value.includes('http') ? value : `https://${value}` },
      website: { icon: Globe, color: "hover:text-slate-700 hover:bg-slate-100", href: value.includes('http') ? value : `https://${value}` },
      officeLink: { icon: Building2, color: "hover:text-indigo-600 hover:bg-indigo-50", href: value.includes('http') ? value : `https://${value}` },
      customLink: { icon: LinkIcon, color: "hover:text-slate-700 hover:bg-slate-100", href: value.includes('http') ? value : `https://${value}` },
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
        className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-500 transition-all duration-300 ${SocialData.color}`}
      >
        <IconComponent className="w-4 h-4" />
      </a>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      
      {/* HEADER / HERO */}
      <div className="w-full h-56 md:h-80 relative bg-[#0F172A] overflow-hidden">
        {lawyer.cover ? (
          <img 
            src={lawyer.cover} 
            alt={`Capa do Dr(a) ${lawyer.name}`} 
            className="w-full h-full object-cover opacity-90"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-primary/80" />
        )}
        
        {/* Gradiente sutil para garantir leitura do botão voltar e transição suave para o card */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/20"></div>
        
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="container mx-auto px-4 pt-6">
            <Link to={searchLink}>
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-md bg-black/20 rounded-xl px-4 h-10 -ml-2 font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a busca
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-20 -mt-20 md:-mt-28">
        
        {/* BLOCO PRINCIPAL DO TOPO */}
        <Card className="border-0 shadow-xl shadow-slate-200/40 rounded-[2rem] mb-8 bg-white/95 backdrop-blur-xl">
          <CardContent className="p-6 md:p-8">
            
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              
              {/* Avatar Alinhado à Esquerda com Borda */}
              <div className="relative shrink-0 -mt-16 md:-mt-20">
                {lawyer.image ? (
                  <img 
                    src={lawyer.image} 
                    alt={lawyer.name} 
                    className="w-28 h-28 md:w-36 md:h-36 rounded-[1.5rem] object-cover bg-slate-100 border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-[1.5rem] bg-slate-100 flex items-center justify-center text-slate-400 border-4 border-white shadow-lg">
                    <User className="w-12 h-12" />
                  </div>
                )}
                {lawyer.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-md border-2 border-white flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Informações Principais (Alinhadas à esquerda) */}
              <div className="flex-1 w-full pt-1">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  
                  <div className="space-y-2 text-left">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">{lawyer.name}</h1>
                    <p className="text-base font-bold text-primary">{lawyer.title || lawyer.specialty}</p>
                    
                    <div className="flex flex-wrap items-center justify-start gap-3 text-sm font-medium text-slate-600 pt-2">
                      <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700">
                        <Scale className="w-4 h-4 text-primary" /> OAB {lawyer.oab}
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                        <MapPin className="w-4 h-4 text-slate-400" /> {lawyer.city}, {lawyer.state}
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> 
                        <span className="font-bold">{lawyer.rating}</span> 
                        <span className="text-amber-600/70 font-normal">({lawyer.reviews})</span>
                      </div>
                    </div>

                    {/* Tags de Especialidades e Atendimento simplificadas */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      <Badge className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 font-bold border-0 shadow-none rounded-lg">
                        {lawyer.specialty}
                      </Badge>
                      {lawyer.secondarySpecialties?.map(spec => (
                        <Badge key={spec} variant="outline" className="px-3 py-1 border-slate-200 text-slate-600 font-medium rounded-lg">
                          {spec}
                        </Badge>
                      ))}
                      <Badge variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-600 font-medium border-0 rounded-lg flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {lawyer.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Ações e Redes */}
                  <div className="w-full lg:w-auto shrink-0 flex flex-col items-start lg:items-end gap-3 mt-2 lg:mt-0">
                    <WhatsAppButton 
                      className="w-full lg:w-auto h-12 md:px-8 text-base shadow-lg shadow-green-600/20 rounded-xl font-bold"
                      message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                    />
                    
                    {lawyer.showSocials && lawyer.socials && (
                      <div className="flex flex-wrap justify-start lg:justify-end gap-2 mt-1">
                        {Object.entries(lawyer.socials).map(([key, value]) => renderSocialIcon(key, value as string))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* CORPO DO PERFIL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 bg-white">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <User className="w-5 h-5" />
                  </div>
                  Sobre o Profissional
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-line text-base font-medium">
                  {lawyer.bio}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 bg-white">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  Áreas de Atuação
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[lawyer.specialty, ...(lawyer.secondarySpecialties || [])].map((spec, index) => (
                    <div key={index} className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl hover:border-slate-200 transition-colors">
                      <div className="w-10 h-10 shrink-0 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center">
                        <Scale className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="font-bold text-slate-700 text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 bg-white">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                        <Star className="w-5 h-5 fill-amber-500" />
                      </div>
                      Avaliações
                    </h2>
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                      <Info className="w-4 h-4" /> Somente clientes verificados podem avaliar.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100/50">
                    <div className="text-4xl font-black text-amber-600 mb-1">{lawyer.rating}</div>
                    <div className="flex gap-1 text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.round(lawyer.rating) ? 'fill-amber-500 text-amber-500' : 'fill-slate-200 text-slate-200'}`} />
                      ))}
                    </div>
                    <span className="font-bold text-slate-600 text-xs">{lawyer.reviews} avaliações</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* BARRA LATERAL (Contato) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 overflow-hidden bg-white">
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-primary" />
                <CardContent className="p-6">
                  <h3 className="text-lg font-black text-slate-900 mb-5">Contato</h3>
                  
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telefone / WhatsApp</p>
                        <p className="font-bold text-slate-800 text-base">{lawyer.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail</p>
                        <a href={`mailto:${lawyer.email}`} className="font-bold text-slate-800 text-sm truncate block hover:text-blue-600 transition-colors">{lawyer.email}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Localização</p>
                        <p className="font-bold text-slate-800 text-sm">{lawyer.city}, {lawyer.state}</p>
                      </div>
                    </div>

                    <div className="pt-6 mt-2 border-t border-slate-100">
                      <WhatsAppButton 
                        fullWidth
                        className="h-12 text-sm rounded-xl shadow-lg shadow-green-600/20"
                        message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                      />
                    </div>

                  </div>
                </CardContent>
              </Card>

              {/* Botão extra de compartilhar */}
              <Button variant="outline" className="w-full bg-white border-slate-200 shadow-sm h-12 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                <Share2 className="w-4 h-4 mr-2 text-slate-400" /> Compartilhar Perfil
              </Button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
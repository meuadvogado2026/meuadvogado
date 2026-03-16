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
  MessageSquareQuote,
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
      <div className="w-full h-64 md:h-[360px] relative bg-slate-900 overflow-hidden">
        {lawyer.cover ? (
          <img 
            src={lawyer.cover} 
            alt={`Capa do Dr(a) ${lawyer.name}`} 
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-primary/80" />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-black/40"></div>
        
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="container mx-auto px-4 pt-6">
            <Link to={searchLink}>
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm bg-black/20 rounded-xl px-4 h-10 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para a busca
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-20 -mt-24 md:-mt-32">
        
        {/* BLOCO PRINCIPAL DO TOPO */}
        <Card className="border-0 shadow-xl shadow-slate-200/40 rounded-[2rem] mb-8 overflow-visible bg-white/95 backdrop-blur-xl">
          <CardContent className="p-6 md:p-10 pt-0">
            
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end -mt-16 md:-mt-20 mb-8">
              {/* Avatar */}
              <div className="relative shrink-0 mx-auto lg:mx-0">
                <div className="p-2 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                  {lawyer.image ? (
                    <img 
                      src={lawyer.image} 
                      alt={lawyer.name} 
                      className="w-36 h-36 md:w-48 md:h-48 rounded-[2rem] object-cover bg-slate-100"
                    />
                  ) : (
                    <div className="w-36 h-36 md:w-48 md:h-48 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-400">
                      <User className="w-20 h-20" />
                    </div>
                  )}
                </div>
                {lawyer.verified && (
                  <div className="absolute -bottom-3 -right-3 bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg border-4 border-white flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Informações Principais */}
              <div className="flex-1 flex flex-col lg:flex-row lg:items-center justify-between w-full gap-8">
                
                <div className="space-y-3 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">{lawyer.name}</h1>
                  </div>
                  
                  <p className="text-lg md:text-xl text-primary font-bold">{lawyer.title || lawyer.specialty}</p>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700">
                      <Scale className="w-4 h-4 text-primary" /> OAB {lawyer.oab}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" /> {lawyer.city}, {lawyer.state}
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> 
                      <span className="font-bold">{lawyer.rating}</span> 
                      <span className="text-amber-600/70 font-normal">({lawyer.reviews} avaliações)</span>
                    </div>
                  </div>
                </div>

                {/* Ações e Redes (Lado Direito) */}
                <div className="w-full lg:w-auto shrink-0 flex flex-col items-center lg:items-end gap-4">
                  <WhatsAppButton 
                    className="h-14 w-full md:w-auto md:px-10 text-lg shadow-xl shadow-green-600/20 rounded-2xl transition-transform hover:scale-105 font-black"
                    message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                  />
                  
                  {lawyer.showSocials && lawyer.socials && (
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {Object.entries(lawyer.socials).map(([key, value]) => renderSocialIcon(key, value as string))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8" />

            {/* Tags de Especialidades e Atendimento */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center lg:justify-start">
              <span className="text-slate-500 font-semibold flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <Briefcase className="w-4 h-4 text-primary" /> Atendimento: {lawyer.type}
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 font-bold border-0 shadow-none rounded-xl">
                  {lawyer.specialty}
                </Badge>
                {lawyer.secondarySpecialties?.map(spec => (
                  <Badge key={spec} variant="outline" className="px-4 py-2 border-slate-200 text-slate-600 font-medium rounded-xl">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* CORPO DO PERFIL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 bg-white">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <User className="w-6 h-6" />
                  </div>
                  Sobre o Profissional
                </h2>
                <div className="text-slate-600 leading-[1.8] space-y-4 whitespace-pre-line text-lg font-medium">
                  {lawyer.bio}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 bg-white">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  Áreas de Atuação
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[lawyer.specialty, ...(lawyer.secondarySpecialties || [])].map((spec, index) => (
                    <div key={index} className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:border-slate-200 transition-colors">
                      <div className="w-12 h-12 shrink-0 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                        <Scale className="w-5 h-5 text-slate-400" />
                      </div>
                      <span className="font-bold text-slate-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nova seção de Avaliações Simplificada */}
            <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 bg-white">
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-2">
                      <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl">
                        <Star className="w-6 h-6 fill-amber-500" />
                      </div>
                      Avaliações da Comunidade
                    </h2>
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                      <Info className="w-4 h-4" /> Somente clientes que entraram em contato podem avaliar.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center bg-amber-50 px-8 py-6 rounded-3xl border border-amber-100/50">
                    <div className="text-5xl font-black text-amber-600 mb-2">{lawyer.rating}</div>
                    <div className="flex gap-1 text-amber-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.round(lawyer.rating) ? 'fill-amber-500 text-amber-500' : 'fill-slate-200 text-slate-200'}`} />
                      ))}
                    </div>
                    <span className="font-bold text-slate-600 text-sm">{lawyer.reviews} avaliações recebidas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* BARRA LATERAL (Contato) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              
              <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 overflow-hidden bg-white">
                <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-primary" />
                <CardContent className="p-8">
                  <h3 className="text-xl font-black text-slate-900 mb-6">Informações de Contato</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Telefone / WhatsApp</p>
                        <p className="font-bold text-slate-800 text-lg">{lawyer.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">E-mail</p>
                        <a href={`mailto:${lawyer.email}`} className="font-bold text-slate-800 text-base truncate block hover:text-blue-600 transition-colors">{lawyer.email}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Localização</p>
                        <p className="font-bold text-slate-800 text-lg">{lawyer.city}, {lawyer.state}</p>
                      </div>
                    </div>

                    <div className="pt-8 mt-2 border-t border-slate-100">
                      <WhatsAppButton 
                        fullWidth
                        className="h-14 text-base rounded-2xl shadow-lg shadow-green-600/20"
                        message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                      />
                    </div>

                  </div>
                </CardContent>
              </Card>

              {/* Botão extra de compartilhar */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 bg-white border-slate-200 shadow-sm h-14 rounded-2xl text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                  <Share2 className="w-5 h-5 mr-2 text-slate-400" /> Compartilhar Perfil
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
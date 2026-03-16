import React from 'react';
import { useParams, Link } from "react-router-dom";
import { mockLawyers } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShieldCheck, Award, Briefcase, Share2, ArrowLeft } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const LawyerProfile = () => {
  const { id } = useParams();
  const lawyer = mockLawyers.find(l => l.id === id) || mockLawyers[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Imagem de Capa e Header Dinâmico */}
      <div className="w-full h-56 md:h-80 relative bg-slate-900 overflow-hidden">
        {lawyer.cover ? (
          <img 
            src={lawyer.cover} 
            alt={`Capa do Dr(a) ${lawyer.name}`} 
            className="w-full h-full object-cover opacity-90"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-primary/80" />
        )}
        
        {/* Gradiente sobre a capa para legibilidade do botão voltar */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/30"></div>
        
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="container mx-auto px-4 pt-6">
            <Link to="/buscar">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm bg-black/20 rounded-xl px-4 h-10 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para busca
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-20 -mt-16 md:-mt-24">
        
        {/* Bloco Principal: Avatar sobreposto + Infos + Botão principal */}
        <Card className="border-0 shadow-xl shadow-slate-200/50 rounded-3xl mb-8 overflow-visible">
          <CardContent className="p-6 md:p-8 pt-0">
            
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-12 md:-mt-16 mb-6">
              {/* Avatar Flutuante */}
              <div className="relative shrink-0">
                <img 
                  src={lawyer.image} 
                  alt={lawyer.name} 
                  className="w-32 h-32 md:w-44 md:h-44 rounded-3xl object-cover border-4 border-white shadow-lg bg-white relative z-20"
                />
              </div>

              {/* Informações ao lado da foto */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
                
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{lawyer.name}</h1>
                    {lawyer.verified && (
                      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border border-blue-200 flex gap-1 px-2.5 py-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verificado OAB
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-lg text-primary font-medium">{lawyer.specialty} • OAB {lawyer.oab}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" /> {lawyer.city}, {lawyer.state}
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-600">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> 
                      {lawyer.rating} <span className="text-slate-500 font-normal">({lawyer.reviews} avaliações)</span>
                    </div>
                  </div>
                </div>

                {/* Botão de Contato Primário (Desktop focado no lado direito) */}
                <div className="w-full md:w-auto shrink-0 md:self-end">
                  <WhatsAppButton 
                    fullWidth 
                    className="h-14 md:px-8 text-base shadow-lg shadow-green-600/20 rounded-xl"
                    message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100 my-6" />

            {/* Tags e Info Extra */}
            <div className="flex flex-wrap gap-3 items-center text-sm">
              <span className="text-slate-500 font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Atendimento: <span className="text-slate-900">{lawyer.type}</span>
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="px-3 py-1 bg-slate-100 font-medium text-slate-700 border-0">{lawyer.specialty}</Badge>
                {lawyer.secondarySpecialties.map(spec => (
                  <Badge key={spec} variant="outline" className="px-3 py-1 border-slate-200 text-slate-600">{spec}</Badge>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Corpo do Perfil */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" /> Sobre o Profissional
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4 whitespace-pre-line text-lg">
                  {lawyer.bio}
                  <br/><br/>
                  Com uma trajetória marcada pela excelência e dedicação ao cliente, atuo buscando sempre a melhor estratégia jurídica para o seu caso. O atendimento inicial serve para entendermos o cenário e desenharmos os próximos passos com clareza e transparência.
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="border-0 shadow-sm rounded-3xl border border-slate-200/50 overflow-hidden">
                <div className="h-1.5 w-full bg-primary" />
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Precisa de ajuda jurídica?</h3>
                  <p className="text-slate-500 text-sm mb-6">Fale diretamente com o advogado via WhatsApp para tirar suas dúvidas de forma rápida e segura.</p>
                  
                  <WhatsAppButton 
                    fullWidth 
                    className="h-12 text-base rounded-xl mb-4"
                    message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                  />
                  
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> Contato sem intermediários
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full bg-white border-slate-200 shadow-sm h-12 rounded-xl text-slate-700 font-medium hover:bg-slate-50">
                <Share2 className="w-4 h-4 mr-2 text-slate-400" /> Compartilhar Perfil
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
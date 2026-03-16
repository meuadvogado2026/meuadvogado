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
      {/* Top Banner / Cover */}
      <div className="h-48 md:h-64 bg-slate-900 w-full relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <div className="container mx-auto px-4 h-full relative">
          <Link to="/buscar">
            <Button variant="ghost" className="text-white hover:bg-white/20 mt-6 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para busca
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img 
                    src={lawyer.image} 
                    alt={lawyer.name} 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white shadow-sm bg-white"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-slate-900">{lawyer.name}</h1>
                      {lawyer.verified && (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 flex gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verificado OAB
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-lg text-slate-600 mb-4">{lawyer.specialty} • OAB {lawyer.oab}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {lawyer.city}, {lawyer.state}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" /> Atendimento {lawyer.type}
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-amber-600">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> 
                        {lawyer.rating} ({lawyer.reviews} avaliações)
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-8 border-slate-100" />

                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Sobre o Profissional</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {lawyer.bio}
                    <br/><br/>
                    Com uma trajetória marcada pela excelência e dedicação ao cliente, atuo buscando sempre a melhor estratégia jurídica para o seu caso. O atendimento inicial serve para entendermos o cenário e desenharmos os próximos passos com clareza e transparência.
                  </p>
                </div>

                <hr className="my-8 border-slate-100" />

                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Especialidades Adicionais
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="px-3 py-1 text-sm bg-slate-100">{lawyer.specialty}</Badge>
                    {lawyer.secondarySpecialties.map(spec => (
                      <Badge key={spec} variant="outline" className="px-3 py-1 text-sm">{spec}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Card (Right Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="border-0 shadow-md border-t-4 border-t-primary">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Precisa de ajuda jurídica?</h3>
                  <p className="text-slate-500 text-sm mb-6">Fale diretamente com o advogado via WhatsApp para tirar suas dúvidas.</p>
                  
                  <WhatsAppButton 
                    fullWidth 
                    className="h-14 text-lg shadow-lg"
                    message={`Olá Dr(a) ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`} 
                  />
                  
                  <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Contato seguro e sem intermediários
                  </p>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full bg-white shadow-sm h-12 text-slate-600">
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar Perfil
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ShieldCheck, User, Navigation } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { WhatsAppButton } from "./WhatsAppButton";

interface LawyerCardProps {
  lawyer: {
    id: string;
    name: string;
    specialty: string;
    secondarySpecialties?: string[];
    city: string;
    state: string;
    cep?: string;
    region?: string;
    distance?: number;
    rating: number;
    reviews: number;
    verified: boolean;
    image: string;
    cover?: string;
    bio: string;
    type?: string;
    phone?: string;
  };
}

export const LawyerCard = ({ lawyer }: LawyerCardProps) => {
  const location = useLocation();
  
  // Decide se estamos no painel do cliente ou do advogado para montar a URL
  const basePath = location.pathname.startsWith('/painel/cliente') 
    ? '/painel/cliente' 
    : location.pathname.startsWith('/painel/advogado') 
      ? '/painel/advogado' 
      : '';
      
  const profileLink = `${basePath}/advogado/${lawyer.id}`;

  const coverImage = lawyer.cover || "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800&h=300";

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200/60 rounded-3xl bg-white group flex flex-col h-full">
      
      <div className="h-28 w-full relative bg-slate-800 overflow-hidden shrink-0">
        <img 
          src={coverImage} 
          alt={`Capa do escritório ${lawyer.name}`} 
          className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
        
        {lawyer.distance !== undefined && (
          <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <Navigation className="w-3.5 h-3.5 text-blue-400" />
            {lawyer.distance < 1 ? 'Muito próximo' : `A ${lawyer.distance.toFixed(1)} km`}
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col relative">
        <div className="flex gap-4">
          <div className="-mt-12 sm:-mt-14 shrink-0 relative z-10">
            {lawyer.image ? (
              <img 
                src={lawyer.image} 
                alt={lawyer.name} 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-[1.25rem] object-cover border-4 border-white shadow-sm bg-slate-100"
              />
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[1.25rem] flex items-center justify-center bg-slate-100 text-slate-400 border-4 border-white shadow-sm">
                <User className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            )}
          </div>
          
          <div className="pt-2 sm:pt-3 flex-1 flex justify-between items-start gap-2">
            <div>
              <Link to={profileLink} className="hover:text-primary transition-colors inline-block">
                <h3 className="text-lg sm:text-xl font-black text-[#0F172A] leading-tight line-clamp-1 flex items-center gap-1.5">
                  {lawyer.name}
                  {lawyer.verified && (
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" title="Perfil Verificado" />
                  )}
                </h3>
              </Link>
              
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold border-blue-100 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5">
                  {lawyer.specialty}
                </Badge>
                {/* Mostra até 2 especialidades secundárias */}
                {lawyer.secondarySpecialties && lawyer.secondarySpecialties.slice(0, 2).map((spec, i) => (
                  <Badge key={i} variant="outline" className="text-slate-500 font-medium border-slate-200 text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5">
                    {spec}
                  </Badge>
                ))}
                {lawyer.secondarySpecialties && lawyer.secondarySpecialties.length > 2 && (
                  <span className="text-[10px] font-bold text-slate-400">+{lawyer.secondarySpecialties.length - 2}</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-amber-50 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-sm shrink-0 border border-amber-100/50">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-amber-700">{lawyer.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mt-5 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" /> 
            {lawyer.city}, {lawyer.state}
          </span>
          {lawyer.type?.includes("Online") && (
            <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded-md border border-green-200/60 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Atende Online
            </span>
          )}
        </div>
        
        <p className="text-sm text-slate-600 mt-3 line-clamp-2 flex-1 leading-relaxed">
          {lawyer.bio}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100">
          <Link to={profileLink}>
            <Button variant="outline" className="w-full h-11 border-slate-200 text-[#0F172A] hover:bg-slate-50 hover:border-slate-300 font-bold rounded-xl transition-colors text-xs sm:text-sm">
              Ver perfil
            </Button>
          </Link>
          <WhatsAppButton 
            fullWidth 
            phone={lawyer.phone}
            message={`Olá Dr(a). ${lawyer.name}, encontrei seu perfil no Meu Advogado e gostaria de uma orientação.`}
            className="h-11 rounded-xl shadow-md shadow-green-600/20 text-xs sm:text-sm"
          />
        </div>

      </CardContent>
    </Card>
  );
};
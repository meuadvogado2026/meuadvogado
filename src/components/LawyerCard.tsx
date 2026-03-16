import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShieldCheck, User, Navigation } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { WhatsAppButton } from "./WhatsAppButton";

interface LawyerCardProps {
  lawyer: {
    id: string;
    name: string;
    specialty: string;
    city: string;
    state: string;
    cep?: string;
    region?: string;
    distance?: number;
    rating: number;
    reviews: number;
    verified: boolean;
    image: string;
    bio: string;
    type: string;
  };
}

export const LawyerCard = ({ lawyer }: LawyerCardProps) => {
  const location = useLocation();
  const basePath = location.pathname.startsWith('/painel/cliente') ? '/painel/cliente' : '';
  const profileLink = `${basePath}/advogado/${lawyer.id}`;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200/60 rounded-3xl bg-white group flex flex-col h-full">
      <CardContent className="p-0 flex flex-col sm:flex-row h-full">
        <div className="sm:w-64 h-56 sm:h-auto shrink-0 relative overflow-hidden bg-slate-100">
          {lawyer.image ? (
            <img 
              src={lawyer.image} 
              alt={lawyer.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
              <User className="w-16 h-16" />
            </div>
          )}
          {lawyer.verified && (
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Verificado
            </div>
          )}
          
          {/* Badge de Distância (se houver) */}
          {lawyer.distance !== undefined && (
            <div className="absolute bottom-3 left-3 bg-[#0F172A]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              {lawyer.distance < 10 ? `A ${lawyer.distance}km de você` : 'Fora da sua região'}
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
            <div>
              <Link to={profileLink} className="hover:text-primary transition-colors inline-block">
                <h3 className="text-xl font-black text-[#0F172A] leading-tight">{lawyer.name}</h3>
              </Link>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold border-blue-100">{lawyer.specialty}</Badge>
                {lawyer.type.includes("Online") && (
                  <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 font-semibold text-[10px]">Atende Online</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm shrink-0">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              {lawyer.rating} <span className="font-medium text-slate-400 text-xs ml-1">({lawyer.reviews})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4 font-medium bg-slate-50/50 w-fit px-2 py-1 rounded-lg">
            <MapPin className="w-4 h-4 text-slate-400" />
            {lawyer.city}, {lawyer.state} {lawyer.region && <span className="text-slate-400 border-l border-slate-300 ml-1.5 pl-1.5">{lawyer.region}</span>}
          </div>
          
          <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">
            {lawyer.bio}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-slate-100">
            <Link to={profileLink} className="flex-1">
              <Button variant="outline" className="w-full h-11 border-slate-200 text-[#0F172A] hover:bg-slate-50 hover:border-slate-300 font-bold rounded-xl transition-colors">
                Ver perfil
              </Button>
            </Link>
            <div className="flex-1">
              <WhatsAppButton 
                fullWidth 
                className="h-11 rounded-xl shadow-md shadow-green-600/20 text-sm"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
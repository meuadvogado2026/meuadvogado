import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShieldCheck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { WhatsAppButton } from "./WhatsAppButton";

interface LawyerCardProps {
  lawyer: {
    id: string;
    name: string;
    specialty: string;
    city: string;
    state: string;
    rating: number;
    reviews: number;
    verified: boolean;
    image: string;
    bio: string;
  };
}

export const LawyerCard = ({ lawyer }: LawyerCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200/60 rounded-3xl bg-white group">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-56 h-48 sm:h-auto shrink-0 relative overflow-hidden bg-slate-100">
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
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5" /> Verificado
              </div>
            )}
          </div>
          
          <div className="p-6 flex flex-col flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
              <div>
                <Link to={`/advogado/${lawyer.id}`} className="hover:text-primary transition-colors inline-block">
                  <h3 className="text-xl font-black text-slate-900 leading-tight">{lawyer.name}</h3>
                </Link>
                <p className="text-primary font-bold text-sm mt-0.5">{lawyer.specialty}</p>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm shrink-0">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                {lawyer.rating} <span className="font-medium text-slate-400 text-xs ml-1">({lawyer.reviews})</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-4 font-medium">
              <MapPin className="w-4 h-4" />
              {lawyer.city}, {lawyer.state}
            </div>
            
            <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">
              {lawyer.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Link to={`/advogado/${lawyer.id}`} className="flex-1">
                <button className="w-full h-11 px-4 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 font-bold transition-colors text-sm">
                  Ver perfil
                </button>
              </Link>
              <div className="flex-1">
                <WhatsAppButton 
                  fullWidth 
                  className="h-11 rounded-xl shadow-md shadow-green-600/20"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
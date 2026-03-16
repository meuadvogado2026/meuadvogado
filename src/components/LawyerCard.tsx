import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ShieldCheck } from "lucide-react";
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-slate-200">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-48 sm:h-auto shrink-0 relative">
            <img 
              src={lawyer.image} 
              alt={lawyer.name} 
              className="w-full h-full object-cover"
            />
            {lawyer.verified && (
              <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3" /> Verificado
              </div>
            )}
          </div>
          
          <div className="p-5 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link to={`/advogado/${lawyer.id}`} className="hover:text-primary transition-colors">
                  <h3 className="text-xl font-bold text-slate-900">{lawyer.name}</h3>
                </Link>
                <p className="text-primary font-medium">{lawyer.specialty}</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-sm font-semibold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                {lawyer.rating} <span className="font-normal text-amber-600/70 text-xs">({lawyer.reviews})</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
              <MapPin className="w-4 h-4" />
              {lawyer.city}, {lawyer.state}
            </div>
            
            <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-1">
              {lawyer.bio}
            </p>
            
            <div className="flex gap-3 mt-auto">
              <Link to={`/advogado/${lawyer.id}`} className="flex-1">
                <button className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 font-medium transition-colors text-sm">
                  Ver perfil completo
                </button>
              </Link>
              <div className="flex-1">
                <WhatsAppButton fullWidth />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
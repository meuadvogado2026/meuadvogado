import React from 'react';
import { mockLawyers } from "@/data/mock";
import { LawyerCard } from "@/components/LawyerCard";
import { Search, Sparkles, Clock, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ClientDashboard = () => {
  // Simulações de dados (Em um app real, viriam da API baseadas no histórico do usuário)
  const featuredLawyers = mockLawyers.filter(l => l.rating >= 4.9).slice(0, 2);
  const recentLawyers = mockLawyers.slice(0, 1);
  const savedLawyers = mockLawyers.filter(l => l.specialty === "Criminal");

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      
      {/* Header / Saudação */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-slate-900 to-[#1E3A5F] p-8 md:p-10 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">Olá, João!</h1>
          <p className="text-slate-300 text-lg">Pronto para encontrar o advogado ideal hoje?</p>
        </div>
        <Link to="/buscar" className="w-full md:w-auto">
          <Button className="w-full md:w-auto bg-white text-slate-900 hover:bg-slate-100 h-14 px-8 rounded-2xl font-bold shadow-lg">
            <Search className="w-5 h-5 mr-2 text-primary" /> Fazer nova busca
          </Button>
        </Link>
      </div>

      {/* Advogados em Destaque */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Em Destaque</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {featuredLawyers.map(lawyer => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Vistos Recentemente */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Vistos Recentemente</h2>
          </div>
          <div className="space-y-4">
            {recentLawyers.map(lawyer => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
            {recentLawyers.length === 0 && (
              <p className="text-slate-500 text-sm">Você ainda não visualizou nenhum perfil.</p>
            )}
          </div>
        </div>

        {/* Salvos */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
              <Bookmark className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Advogados Salvos</h2>
          </div>
          <div className="space-y-4">
            {savedLawyers.map(lawyer => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
            {savedLawyers.length === 0 && (
              <p className="text-slate-500 text-sm">Você ainda não salvou nenhum perfil.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
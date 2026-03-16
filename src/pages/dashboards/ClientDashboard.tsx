import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLawyers } from "@/data/mock";
import { LawyerCard } from "@/components/LawyerCard";
import { History, Bookmark, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ClientDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Olá, João!</h1>
        <p className="text-slate-500 mt-1">Bem-vindo ao seu painel pessoal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <History className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Perfis visualizados</p>
              <h3 className="text-2xl font-bold text-slate-900">12</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-purple-50">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-600 font-medium">Advogados salvos</p>
              <h3 className="text-2xl font-bold text-slate-900">3</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm bg-white border border-slate-200 flex items-center justify-center p-6">
          <Link to="/buscar" className="w-full">
            <Button variant="outline" className="w-full gap-2 text-primary border-slate-300">
              <Search className="w-4 h-4" /> Nova Busca
            </Button>
          </Link>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Vistos recentemente</h2>
        <div className="space-y-4">
          {mockLawyers.slice(0, 2).map(lawyer => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </div>
  );
};
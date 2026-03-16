import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, MapPin, Briefcase } from "lucide-react";
import { mockLawyers, specialties } from "@/data/mock";
import { LawyerCard } from "@/components/LawyerCard";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const filteredLawyers = mockLawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lawyer.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || lawyer.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Search Area */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Encontre o seu advogado</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input 
                placeholder="Nome, cidade ou palavra-chave..." 
                className="pl-10 h-12 text-base bg-slate-50 border-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="md:col-span-4 relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-slate-400 z-10" />
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="pl-10 h-12 text-base bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Especialidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  {specialties.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-3">
              <Button className="w-full h-12 text-base font-medium">
                Buscar
              </Button>
            </div>
          </div>
        </div>

        {/* Results layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters (Static for MVP) */}
          <aside className="w-full md:w-64 shrink-0 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Localização
              </h3>
              <div className="space-y-3">
                {['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG'].map(loc => (
                  <label key={loc} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Atendimento</h3>
              <div className="space-y-3">
                {['Online', 'Presencial', 'Híbrido'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-slate-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* List */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-slate-600 font-medium">
                Encontramos <strong className="text-slate-900">{filteredLawyers.length}</strong> advogados
              </h2>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recomendados</SelectItem>
                  <SelectItem value="rating">Melhor Avaliação</SelectItem>
                  <SelectItem value="reviews">Mais Avaliados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredLawyers.map(lawyer => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
              {filteredLawyers.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                  <SearchIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900">Nenhum advogado encontrado</h3>
                  <p className="text-slate-500">Tente ajustar seus filtros de busca.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, MapPin, Briefcase, SlidersHorizontal, X } from "lucide-react";
import { mockLawyers, specialties } from "@/data/mock";
import { LawyerCard } from "@/components/LawyerCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const filteredLawyers = mockLawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || lawyer.specialty === selectedSpecialty;
    const matchesCity = selectedCity === "" || lawyer.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesState = selectedState === "" || lawyer.state.toLowerCase() === selectedState.toLowerCase();
    
    // Simplificando o match de tipo para o mock
    let matchesType = true;
    if (selectedType !== "all") {
      if (selectedType === "Online" && !lawyer.type.includes("Online") && !lawyer.type.includes("Híbrido")) matchesType = false;
      if (selectedType === "Presencial" && !lawyer.type.includes("Presencial") && !lawyer.type.includes("Híbrido")) matchesType = false;
    }

    return matchesSearch && matchesSpecialty && matchesCity && matchesState && matchesType;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("all");
    setSelectedCity("");
    setSelectedState("");
    setSelectedType("all");
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Especialidade</h3>
        <select 
          value={selectedSpecialty} 
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="all">Todas as áreas</option>
          {specialties.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          Localização
        </h3>
        <div className="space-y-3">
          <Input 
            placeholder="Digite o Estado (Ex: SP)" 
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="h-11 rounded-xl bg-slate-50"
            maxLength={2}
          />
          <Input 
            placeholder="Digite a Cidade" 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="h-11 rounded-xl bg-slate-50"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Atendimento</h3>
        <div className="space-y-2">
          {['all', 'Online', 'Presencial'].map(type => (
            <label key={type} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <input 
                type="radio" 
                name="attendanceType" 
                value={type}
                checked={selectedType === type}
                onChange={() => setSelectedType(type)}
                className="w-4 h-4 text-primary focus:ring-primary border-slate-300" 
              />
              <span className="text-sm font-medium text-slate-700">
                {type === 'all' ? 'Qualquer formato' : type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full h-11 rounded-xl border-slate-200 text-slate-500 font-bold hover:bg-slate-50">
        <X className="w-4 h-4 mr-2" /> Limpar Filtros
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Search Area */}
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-slate-200/60 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Buscar por nome do advogado..." 
              className="pl-12 h-12 md:h-14 text-base rounded-2xl bg-slate-50 border-slate-100 shadow-inner focus-visible:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Mobile Filter Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full md:hidden h-12 rounded-2xl bg-slate-900 text-white font-bold">
                <SlidersHorizontal className="w-5 h-5 mr-2" /> Filtros Avançados
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-[2rem]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-black text-slate-900">Filtros</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-full pb-20 px-1">
                <FilterSidebar />
                <SheetClose asChild>
                  <Button className="w-full h-14 mt-8 rounded-2xl bg-primary text-white font-bold text-lg">
                    Aplicar Filtros
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-72 shrink-0">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-8">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-black text-slate-900">Filtros</h2>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* List */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-lg font-medium text-slate-600">
                Encontramos <span className="font-black text-slate-900">{filteredLawyers.length}</span> advogados
              </h2>
            </div>

            <div className="space-y-6">
              {filteredLawyers.map(lawyer => (
                <LawyerCard key={lawyer.id} lawyer={lawyer} />
              ))}
              
              {filteredLawyers.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
                  <SearchIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-black text-slate-900 mb-2">Nenhum profissional encontrado</h3>
                  <p className="text-slate-500 max-w-md mx-auto">Tente ajustar seus filtros de busca ou procurar por outros termos.</p>
                  <Button variant="outline" onClick={clearFilters} className="mt-6 rounded-xl font-bold">
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
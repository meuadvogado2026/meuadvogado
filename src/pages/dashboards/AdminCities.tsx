 
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Trash2, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { estados } from "@/data/locations";

interface City {
  id: string;
  state: string;
  city: string;
  created_at: string;
}

export const AdminCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // New city form
  const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");

  // Filter
  const [filterState, setFilterState] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('state')
        .order('city');

      if (error) throw error;
      setCities(data || []);
    } catch (error) {
      toast.error("Erro ao carregar cidades.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCity = async () => {
    if (!newState || !newCity.trim()) {
      toast.error("Preencha estado e cidade.");
      return;
    }

    setIsAdding(true);
    try {
      const { error } = await supabase.from('cities').insert({
        state: newState,
        city: newCity.trim()
      });

      if (error) {
        if (error.code === '23505') {
          toast.error("Cidade já cadastrada", { description: `${newCity} - ${newState} já existe.` });
        } else {
          throw error;
        }
        return;
      }

      toast.success("Cidade adicionada!", { description: `${newCity} - ${newState}` });
      setNewCity("");
      fetchCities();
    } catch (error) {
      toast.error("Erro ao adicionar cidade.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteCity = async (city: City) => {
    if (!confirm(`Tem certeza que deseja remover "${city.city} - ${city.state}"?`)) return;

    try {
      const { error } = await supabase
        .from('cities')
        .delete()
        .eq('id', city.id);

      if (error) throw error;

      toast.success("Cidade removida.", { description: `${city.city} - ${city.state}` });
      setCities(prev => prev.filter(c => c.id !== city.id));
    } catch (error) {
      toast.error("Erro ao remover cidade.");
    }
  };

  // Filtered list
  const filteredCities = cities.filter(c => {
    if (filterState && filterState !== 'all' && c.state !== filterState) return false;
    if (searchTerm && !c.city.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // States that exist in DB
  const existingStates = [...new Set(cities.map(c => c.state))].sort();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          Cidades Atendidas
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Gerencie as cidades disponíveis na plataforma. Total: <strong>{cities.length}</strong></p>
      </div>

      {/* Add City */}
      <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-4">
          <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" /> Adicionar Nova Cidade
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label className="font-bold text-slate-700">Estado (UF)</Label>
              <Select value={newState} onValueChange={setNewState}>
                <SelectTrigger className="h-12 rounded-xl bg-white border-slate-200">
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map(e => (
                    <SelectItem key={e.sigla} value={e.sigla}>{e.sigla} — {e.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-[2] space-y-2">
              <Label className="font-bold text-slate-700">Nome da Cidade</Label>
              <Input
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Ex: Brasília"
                className="h-12 rounded-xl bg-white border-slate-200"
                onKeyDown={(e) => e.key === 'Enter' && handleAddCity()}
              />
            </div>
            <Button
              onClick={handleAddCity}
              disabled={isAdding || !newState || !newCity.trim()}
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20"
            >
              {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-1" />}
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar cidade..."
            className="h-11 pl-10 rounded-xl bg-white border-slate-200"
          />
        </div>
        <Select value={filterState} onValueChange={setFilterState}>
          <SelectTrigger className="h-11 w-44 rounded-xl bg-white border-slate-200">
            <SelectValue placeholder="Todos estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos estados</SelectItem>
            {existingStates.map(s => (
              <SelectItem key={s} value={s}>{s} ({cities.filter(c => c.state === s).length})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cities List */}
      <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {filteredCities.length === 0 ? (
              <div className="p-12 text-center">
                <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">Nenhuma cidade encontrada.</p>
              </div>
            ) : (
              filteredCities.map((city) => (
                <div key={city.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs">
                      {city.state}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{city.city}</p>
                      <p className="text-xs text-slate-400">{new Date(city.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCity(city)}
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, User, MapPin, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { specialties } from "@/data/mock";
import { cn } from "@/lib/utils";

export const ClientProfile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    password: "",
    currentPassword: "",
    preferred_specialties: [] as string[]
  });

  // Cities from DB
  const [allCities, setAllCities] = useState<{ state: string; city: string }[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const { data } = await supabase
        .from('cities')
        .select('state, city')
        .order('state')
        .order('city');

      if (data) {
        setAllCities(data);
        const states = [...new Set(data.map(c => c.state))].sort();
        setAvailableStates(states);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (profile.state) {
      const cities = allCities
        .filter(c => c.state === profile.state)
        .map(c => c.city)
        .sort();
      setFilteredCities(cities);
    } else {
      setFilteredCities([]);
    }
  }, [profile.state, allCities]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile(prev => ({
            ...prev,
            name: data.name || "",
            email: data.email || user.email || "",
            phone: data.phone || "",
            city: data.city || "",
            state: data.state || "",
            preferred_specialties: data.preferred_specialties || []
          }));
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Erro ao carregar seus dados.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleSpecialty = (spec: string) => {
    setProfile(prev => ({
      ...prev,
      preferred_specialties: prev.preferred_specialties.includes(spec)
        ? prev.preferred_specialties.filter(s => s !== spec)
        : [...prev.preferred_specialties, spec]
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          phone: profile.phone,
          city: profile.city,
          state: profile.state,
          preferred_specialties: profile.preferred_specialties
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      if (profile.password) {
        if (!profile.currentPassword) {
          toast.error("Senha atual obrigatória", { description: "Para alterar a senha, informe a senha atual." });
          setIsSaving(false);
          return;
        }

        // Verify current password by re-authenticating
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: profile.email,
          password: profile.currentPassword
        });

        if (signInError) {
          toast.error("Senha atual incorreta", { description: "A senha atual informada não confere." });
          setIsSaving(false);
          return;
        }

        const { error: authError } = await supabase.auth.updateUser({
          password: profile.password
        });

        if (authError) throw authError;
        setProfile(prev => ({ ...prev, password: "", currentPassword: "" }));
      }

      toast.success("Dados atualizados com sucesso!", {
        description: "Suas informações foram salvas."
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao salvar", { description: error.message || "Tente novamente mais tarde." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
              <User className="w-6 h-6" />
            </div>
            Meus Dados
          </h1>
          <p className="text-slate-100 mt-2 font-medium">Mantenha suas informações atualizadas.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl px-6 h-12 font-bold">
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-5">
          <CardTitle className="text-xl font-bold text-slate-900">Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label className="font-bold text-slate-700">Nome Completo</Label>
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="h-12 rounded-xl bg-slate-50 border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">E-mail</Label>
              <Input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="h-12 rounded-xl bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700">Telefone / WhatsApp</Label>
              <Input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="h-12 rounded-xl bg-slate-50 border-slate-200"
              />
            </div>
          </div>

          <div className="w-full h-px bg-slate-100" />

          {/* Localização: Estado + Cidade */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Localização
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Estado</Label>
                <Select value={profile.state} onValueChange={(val) => setProfile(prev => ({ ...prev, state: val, city: "" }))}>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStates.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Cidade</Label>
                <Select value={profile.city} onValueChange={(val) => setProfile(prev => ({ ...prev, city: val }))} disabled={!profile.state}>
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                    <SelectValue placeholder={profile.state ? "Selecione a cidade" : "Selecione o estado primeiro"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCities.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100" />

          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" /> Especialidades Desejadas
            </h3>
            <p className="text-xs text-slate-500 font-medium">Isto irá redefinir o seu "Match" automático na página inicial.</p>
            <div className="flex flex-wrap gap-2">
              {specialties.map(spec => {
                const isSelected = profile.preferred_specialties.includes(spec);
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => handleToggleSpecialty(spec)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border",
                      isSelected
                        ? "bg-blue-50 border-blue-300 text-blue-700 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    )}
                  >
                    <span className="flex items-center gap-1">
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      {spec}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="w-full h-px bg-slate-100" />

          <div className="space-y-2 max-w-sm">
            <Label className="font-bold text-slate-700">Senha Atual</Label>
            <Input
              type="password"
              name="currentPassword"
              value={profile.currentPassword}
              onChange={handleChange}
              placeholder="Digite sua senha atual"
              className="h-12 rounded-xl bg-slate-50 border-slate-200"
            />
          </div>

          <div className="space-y-2 max-w-sm">
            <Label className="font-bold text-slate-700">Nova Senha</Label>
            <Input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              placeholder="Deixe em branco para não alterar"
              className="h-12 rounded-xl bg-slate-50 border-slate-200"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-white hover:bg-blue-900 shadow-xl shadow-primary/20 rounded-xl px-12 h-14 font-black transition-all hover:scale-[1.02]">
          {isSaving ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Save className="w-5 h-5 mr-3" />}
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  );
};
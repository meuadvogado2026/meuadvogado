import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, User, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { estados, cidadesPorEstado } from "@/data/locations";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const ClientProfile = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    cep: "",
    city: "",
    state: "",
    password: ""
  });

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
            cep: data.cep || "",
            city: data.city || "",
            state: data.state || ""
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
    setProfile(prev => {
      // Se mudar o estado, reseta a cidade
      if (name === 'state') return { ...prev, state: value, city: '' };
      return { ...prev, [name]: value };
    });
  };

  const applyCepMask = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCep = applyCepMask(e.target.value);
    setProfile(prev => ({ ...prev, cep: maskedCep }));

    if (maskedCep.length === 9) {
      const cleanCep = maskedCep.replace(/\D/g, '');
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setProfile(prev => ({
            ...prev,
            state: data.uf,
            city: data.localidade
          }));
          toast.success("Endereço atualizado pelo CEP!");
        }
      } catch (error) {
        // Silencioso em caso de erro de rede no CEP
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    try {
      // 1. Atualizar dados na tabela profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          phone: profile.phone,
          cep: profile.cep,
          city: profile.city,
          state: profile.state
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // 2. Atualizar senha se foi preenchida
      if (profile.password) {
        const { error: authError } = await supabase.auth.updateUser({
          password: profile.password
        });
        
        if (authError) throw authError;
        setProfile(prev => ({ ...prev, password: "" })); // Limpa o campo de senha após sucesso
      }

      toast.success("Dados atualizados com sucesso!", {
        description: "Suas informações foram salvas na plataforma."
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
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <User className="w-6 h-6" />
            </div>
            Meus Dados
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Mantenha suas informações e localização atualizadas.</p>
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
          
          {/* Dados de Contato */}
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

          {/* Localização */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Localização
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label className="font-bold text-slate-700">CEP</Label>
                <Input 
                  name="cep" 
                  value={profile.cep} 
                  onChange={handleCepChange} 
                  maxLength={9}
                  className="h-12 rounded-xl bg-slate-50 border-slate-200" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="font-bold text-slate-700">Estado (UF)</Label>
                <select 
                  name="state"
                  value={profile.state} 
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none"
                >
                  <option value="" disabled>Selecione</option>
                  {estados.map(estado => (
                    <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="font-bold text-slate-700">Cidade</Label>
                <select 
                  name="city"
                  value={profile.city} 
                  onChange={handleChange}
                  disabled={!profile.state}
                  className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none disabled:opacity-50"
                >
                  <option value="" disabled>Selecione</option>
                  {profile.state && cidadesPorEstado[profile.state]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                  {profile.city && (!profile.state || !cidadesPorEstado[profile.state]?.includes(profile.city)) && (
                     <option value={profile.city}>{profile.city}</option>
                  )}
                </select>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-3">Usamos seu CEP e localização para recomendar advogados que atendem perto de você.</p>
          </div>

          <div className="w-full h-px bg-slate-100" />

          {/* Segurança */}
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
    </div>
  );
};
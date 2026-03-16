import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, User, MapPin } from "lucide-react";
import { toast } from "sonner";

export const ClientProfile = () => {
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    cep: "01310-100",
    city: "São Paulo",
    state: "SP",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success("Dados atualizados com sucesso!", {
      description: "Suas informações foram salvas."
    });
  };

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
        <Button onClick={handleSave} className="bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl px-6 h-12 font-bold">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
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
                onChange={handleChange} 
                className="h-12 rounded-xl bg-slate-50 border-slate-200" 
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-1">
                <Label className="font-bold text-slate-700">CEP</Label>
                <Input 
                  name="cep" 
                  value={profile.cep} 
                  onChange={handleChange} 
                  maxLength={9}
                  className="h-12 rounded-xl bg-slate-50 border-slate-200" 
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label className="font-bold text-slate-700">Estado (UF)</Label>
                <Input 
                  name="state" 
                  value={profile.state} 
                  onChange={handleChange} 
                  maxLength={2} 
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 uppercase" 
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label className="font-bold text-slate-700">Cidade</Label>
                <Input 
                  name="city" 
                  value={profile.city} 
                  onChange={handleChange} 
                  className="h-12 rounded-xl bg-slate-50 border-slate-200" 
                />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mt-3">Usamos seu CEP para recomendar advogados que atendem perto de você.</p>
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
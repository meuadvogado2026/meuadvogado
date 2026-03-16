import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, User } from "lucide-react";
import { toast } from "sonner";

export const ClientProfile = () => {
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
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
          <h1 className="text-2xl font-black text-slate-950 flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            Meus Dados
          </h1>
          <p className="text-sm text-slate-500">Mantenha suas informações de contato atualizadas para os advogados.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl px-6 h-11">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
          <CardTitle className="text-lg text-slate-800">Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label>Nome Completo</Label>
              <Input 
                name="name" 
                value={profile.name} 
                onChange={handleChange} 
                className="h-11 rounded-xl bg-slate-50" 
              />
            </div>
            <div className="space-y-2">
              <Label>E-mail</Label>
              <Input 
                type="email" 
                name="email" 
                value={profile.email} 
                onChange={handleChange} 
                className="h-11 rounded-xl bg-slate-50" 
              />
            </div>
            <div className="space-y-2">
              <Label>Telefone / WhatsApp</Label>
              <Input 
                type="tel" 
                name="phone" 
                value={profile.phone} 
                onChange={handleChange} 
                className="h-11 rounded-xl bg-slate-50" 
              />
            </div>
            <div className="space-y-2">
              <Label>Cidade</Label>
              <Input 
                name="city" 
                value={profile.city} 
                onChange={handleChange} 
                className="h-11 rounded-xl bg-slate-50" 
              />
            </div>
            <div className="space-y-2">
              <Label>Estado (UF)</Label>
              <Input 
                name="state" 
                value={profile.state} 
                onChange={handleChange} 
                maxLength={2} 
                className="h-11 rounded-xl bg-slate-50 uppercase" 
              />
            </div>
            <div className="space-y-2 md:col-span-2 pt-4 border-t border-slate-100">
              <Label>Nova Senha</Label>
              <Input 
                type="password" 
                name="password" 
                value={profile.password} 
                onChange={handleChange} 
                placeholder="Deixe em branco para não alterar" 
                className="h-11 rounded-xl bg-slate-50" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
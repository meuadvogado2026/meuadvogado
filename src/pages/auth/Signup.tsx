import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, User, Briefcase, MapPin } from "lucide-react";
import { toast } from "sonner";
import { BRAZIL_STATES, CITIES_BY_STATE } from "@/data/locations";

export const Signup = () => {
  const navigate = useNavigate();

  // Estados para controlar os selects dependentes no formulário
  const [clientState, setClientState] = useState("");
  const [lawyerState, setLawyerState] = useState("");

  const handleRegister = (role: string) => (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Conta criada com sucesso!", {
      description: "Redirecionando para o seu painel...",
    });
    navigate(role === 'lawyer' ? '/painel/advogado' : '/painel/cliente');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6">
          <div className="bg-[#0F172A] text-white p-3 rounded-2xl shadow-xl shadow-slate-900/20">
            <Scale className="h-8 w-8" />
          </div>
        </Link>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">
          Crie sua conta
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-medium">
          Já tem uma conta? <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Faça login</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">
          
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-slate-50 p-1 rounded-2xl border border-slate-100">
              <TabsTrigger value="client" className="text-sm font-bold gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"><User className="w-4 h-4"/> Sou Cliente</TabsTrigger>
              <TabsTrigger value="lawyer" className="text-sm font-bold gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"><Briefcase className="w-4 h-4"/> Sou Advogado</TabsTrigger>
            </TabsList>
            
            {/* Cadastro de CLIENTE */}
            <TabsContent value="client">
              <form className="space-y-5" onSubmit={handleRegister('client')}>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-700 font-bold">Nome Completo</Label>
                    <Input required className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-700 font-bold">Email</Label>
                      <Input type="email" required className="mt-1 h-12 rounded-xl bg-slate-50" />
                    </div>
                    <div>
                      <Label className="text-slate-700 font-bold">WhatsApp</Label>
                      <Input type="tel" required className="mt-1 h-12 rounded-xl bg-slate-50" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-blue-600"/>
                      <span className="font-bold text-slate-800 text-sm">Seu Endereço</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">CEP</Label>
                        <Input required className="mt-1 h-12 rounded-xl bg-white border-slate-200" placeholder="00000-000" maxLength={9} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Estado (UF)</Label>
                        <select 
                          required 
                          value={clientState}
                          onChange={(e) => setClientState(e.target.value)}
                          className="mt-1 flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none"
                        >
                          <option value="" disabled>Selecione</option>
                          {BRAZIL_STATES.map(state => (
                            <option key={state.uf} value={state.uf}>{state.uf} - {state.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Cidade</Label>
                        <select 
                          required 
                          disabled={!clientState}
                          className="mt-1 flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                        >
                          <option value="" disabled selected>Selecione</option>
                          {clientState && CITIES_BY_STATE[clientState]?.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-2">Usaremos sua localização para encontrar advogados próximos.</p>
                  </div>

                  <div>
                    <Label className="text-slate-700 font-bold">Senha</Label>
                    <Input type="password" required className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-14 mt-6 text-base font-black rounded-2xl shadow-lg shadow-primary/20">Criar conta grátis</Button>
              </form>
            </TabsContent>

            {/* Cadastro de ADVOGADO */}
            <TabsContent value="lawyer">
              <form className="space-y-5" onSubmit={handleRegister('lawyer')}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-slate-700 font-bold">Nome Completo (como na OAB)</Label>
                    <Input required className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">Email Profissional</Label>
                    <Input type="email" required className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">WhatsApp Profissional</Label>
                    <Input type="tel" required className="mt-1 h-12 rounded-xl bg-slate-50" placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">Número da OAB</Label>
                    <Input required className="mt-1 h-12 rounded-xl bg-slate-50" placeholder="123456" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">Estado OAB (UF)</Label>
                    <select 
                      required 
                      className="mt-1 flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none"
                    >
                      <option value="" disabled selected>UF</option>
                      {BRAZIL_STATES.map(state => (
                        <option key={state.uf} value={state.uf}>{state.uf}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#1E3A5F]"/>
                        <span className="font-bold text-slate-800 text-sm">Local e Atendimento</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">CEP</Label>
                        <Input required className="mt-1 h-12 rounded-xl bg-white border-slate-200" placeholder="00000-000" maxLength={9} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Estado (UF)</Label>
                        <select 
                          required 
                          value={lawyerState}
                          onChange={(e) => setLawyerState(e.target.value)}
                          className="mt-1 flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none"
                        >
                          <option value="" disabled>Selecione</option>
                          {BRAZIL_STATES.map(state => (
                            <option key={state.uf} value={state.uf}>{state.uf}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Cidade</Label>
                        <select 
                          required 
                          disabled={!lawyerState}
                          className="mt-1 flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                        >
                          <option value="" disabled selected>Selecione</option>
                          {lawyerState && CITIES_BY_STATE[lawyerState]?.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-slate-700 font-bold">Formato de Atendimento</Label>
                      <select required className="mt-1 w-full h-12 rounded-xl bg-white border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none">
                        <option value="Híbrido (Online e Presencial)">Híbrido (Online e Presencial)</option>
                        <option value="Online">Apenas Online</option>
                        <option value="Presencial">Apenas Presencial</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <Label className="text-slate-700 font-bold">Senha</Label>
                    <Input type="password" required className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-14 mt-6 bg-[#0F172A] hover:bg-slate-800 text-white text-base font-black rounded-2xl shadow-xl shadow-slate-900/20">Cadastrar Perfil Profissional</Button>
                <p className="text-xs font-semibold text-center text-slate-500 mt-4">
                  Seu perfil passará por validação da equipe antes de ser publicado.
                </p>
              </form>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
};
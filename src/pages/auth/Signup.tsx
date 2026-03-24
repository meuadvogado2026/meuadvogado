"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { estados } from "@/data/locations";
import { supabase } from "@/integrations/supabase/client";

export const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Estados para Cliente
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientCep, setClientCep] = useState("");
  const [clientState, setClientState] = useState("");
  const [clientCity, setClientCity] = useState("");
  const [clientStreet, setClientStreet] = useState("");
  const [clientNeighborhood, setClientNeighborhood] = useState("");
  const [clientAddressNumber, setClientAddressNumber] = useState("");
  const [clientLat, setClientLat] = useState<number | null>(null);
  const [clientLng, setClientLng] = useState<number | null>(null);
  const [isFetchingClientCep, setIsFetchingClientCep] = useState(false);

  // Estados para Advogado
  const [lawyerName, setLawyerName] = useState("");
  const [lawyerEmail, setLawyerEmail] = useState("");
  const [lawyerPhone, setLawyerPhone] = useState("");
  const [lawyerOab, setLawyerOab] = useState("");
  const [lawyerOabState, setLawyerOabState] = useState("");
  const [lawyerAttendance, setLawyerAttendance] = useState("Híbrido (Online e Presencial)");
  const [lawyerPassword, setLawyerPassword] = useState("");
  const [lawyerCep, setLawyerCep] = useState("");
  const [lawyerState, setLawyerState] = useState("");
  const [lawyerCity, setLawyerCity] = useState("");
  const [lawyerStreet, setLawyerStreet] = useState("");
  const [lawyerNeighborhood, setLawyerNeighborhood] = useState("");
  const [lawyerAddressNumber, setLawyerAddressNumber] = useState("");
  const [lawyerLat, setLawyerLat] = useState<number | null>(null);
  const [lawyerLng, setLawyerLng] = useState<number | null>(null);
  const [isFetchingLawyerCep, setIsFetchingLawyerCep] = useState(false);

  const applyCepMask = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);
  };

  const fetchCep = async (cep: string, type: 'client' | 'lawyer') => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    if (type === 'client') setIsFetchingClientCep(true);
    else setIsFetchingLawyerCep(true);

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`);
      const data = await response.json();

      if (response.status !== 200 || data.errors) {
        toast.error("CEP não encontrado", { description: "Verifique o CEP digitado e tente novamente." });
        return;
      }

      const lat = data.location?.coordinates?.latitude ? parseFloat(data.location.coordinates.latitude) : null;
      const lng = data.location?.coordinates?.longitude ? parseFloat(data.location.coordinates.longitude) : null;

      if (type === 'client') {
        setClientState(data.state || "");
        setClientCity(data.city || "");
        setClientStreet(data.street || "");
        setClientNeighborhood(data.neighborhood || "");
        setClientLat(lat);
        setClientLng(lng);
      } else {
        setLawyerState(data.state || "");
        setLawyerCity(data.city || "");
        setLawyerStreet(data.street || "");
        setLawyerNeighborhood(data.neighborhood || "");
        setLawyerLat(lat);
        setLawyerLng(lng);
      }
      
      // Foca automaticamente no campo "Número" se tiver achado a rua
      if (data.street) {
        document.getElementById(`address-number-${type}`)?.focus();
      }
      
      toast.success("Endereço preenchido!", { description: `${data.street || data.neighborhood || data.city}` });
    } catch (error) {
      toast.error("Erro ao buscar CEP", { description: "Tente preencher os dados manualmente." });
    } finally {
      if (type === 'client') setIsFetchingClientCep(false);
      else setIsFetchingLawyerCep(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'client' | 'lawyer') => {
    const maskedCep = applyCepMask(e.target.value);
    if (type === 'client') setClientCep(maskedCep);
    else setLawyerCep(maskedCep);

    if (maskedCep.length === 9) fetchCep(maskedCep, type);
  };

  const handleRegister = (role: 'client' | 'lawyer') => async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const email = role === 'client' ? clientEmail : lawyerEmail;
    const password = role === 'client' ? clientPassword : lawyerPassword;
    const name = role === 'client' ? clientName : lawyerName;
    const phone = role === 'client' ? clientPhone : lawyerPhone;
    const city = role === 'client' ? clientCity : lawyerCity;
    const state = role === 'client' ? clientState : lawyerState;
    const street = role === 'client' ? clientStreet : lawyerStreet;
    const neighborhood = role === 'client' ? clientNeighborhood : lawyerNeighborhood;
    const cep = role === 'client' ? clientCep : lawyerCep;
    const lat = role === 'client' ? clientLat : lawyerLat;
    const lng = role === 'client' ? clientLng : lawyerLng;
    const address_number = role === 'client' ? clientAddressNumber : lawyerAddressNumber;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role, phone, city, state }
        }
      });

      if (error) throw error;

      if (data.session) {
        await supabase.from('profiles').update({
          phone, city, state, street, neighborhood, cep, lat, lng, address_number
        }).eq('id', data.user!.id);
        
        toast.success("Conta criada com sucesso!");
        navigate(role === 'lawyer' ? '/painel/advogado' : '/painel/cliente');
      } else {
        toast.success("Cadastro realizado!", { description: "Verifique seu e-mail para confirmar a conta." });
        navigate('/login');
      }
    } catch (error: any) {
      toast.error("Erro ao criar conta", { description: error.message || "Verifique os dados." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6">
          <img src="/logo.png" alt="Meu Advogado" className="h-20 w-auto object-contain drop-shadow-sm" />
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
                    <Input required value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-700 font-bold">Email</Label>
                      <Input type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
                    </div>
                    <div>
                      <Label className="text-slate-700 font-bold">WhatsApp</Label>
                      <Input type="tel" required value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-blue-600"/>
                      <span className="font-bold text-slate-800 text-sm">Seu Endereço</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                      <div className="sm:col-span-2 relative">
                        <Label className="text-slate-700 font-bold">CEP</Label>
                        <Input 
                          required 
                          value={clientCep}
                          onChange={(e) => handleCepChange(e, 'client')}
                          className="mt-1 h-12 rounded-xl bg-white border-slate-200 pr-10" 
                          placeholder="00000-000" 
                          maxLength={9} 
                        />
                        {isFetchingClientCep && (
                          <div className="absolute right-3 top-[38px]">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Estado (UF)</Label>
                        <Input 
                          readOnly 
                          value={clientState} 
                          placeholder="Auto" 
                          className="mt-1 h-12 rounded-xl bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed" 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Cidade</Label>
                        <Input 
                          readOnly 
                          value={clientCity} 
                          placeholder="Auto" 
                          className="mt-1 h-12 rounded-xl bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed" 
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Bairro</Label>
                        <Input 
                          readOnly={!!clientNeighborhood} 
                          value={clientNeighborhood} 
                          onChange={(e) => setClientNeighborhood(e.target.value)} 
                          className={`mt-1 h-12 rounded-xl border-slate-200 ${clientNeighborhood ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}`} 
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <Label className="text-slate-700 font-bold">Rua / Logradouro</Label>
                        <Input 
                          readOnly={!!clientStreet} 
                          value={clientStreet} 
                          onChange={(e) => setClientStreet(e.target.value)} 
                          className={`mt-1 h-12 rounded-xl border-slate-200 ${clientStreet ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}`} 
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <Label className="text-slate-700 font-bold">Número</Label>
                        <Input 
                          id="address-number-client"
                          required 
                          value={clientAddressNumber} 
                          onChange={(e) => setClientAddressNumber(e.target.value)} 
                          className="mt-1 h-12 rounded-xl bg-white border-slate-300 shadow-sm focus:border-blue-500" 
                          placeholder="Ex: 10" 
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-700 font-bold">Senha</Label>
                    <Input type="password" required value={clientPassword} onChange={(e) => setClientPassword(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-14 mt-6 text-base font-black rounded-2xl shadow-lg shadow-primary/20">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Criar conta grátis"}
                </Button>
              </form>
            </TabsContent>

            {/* Cadastro de ADVOGADO */}
            <TabsContent value="lawyer">
              <form className="space-y-5" onSubmit={handleRegister('lawyer')}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-slate-700 font-bold">Nome Completo (como na OAB)</Label>
                    <Input required value={lawyerName} onChange={(e) => setLawyerName(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">Email Profissional</Label>
                    <Input type="email" required value={lawyerEmail} onChange={(e) => setLawyerEmail(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">WhatsApp Profissional</Label>
                    <Input type="tel" required value={lawyerPhone} onChange={(e) => setLawyerPhone(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" placeholder="(00) 00000-0000" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">Número da OAB</Label>
                    <Input required value={lawyerOab} onChange={(e) => setLawyerOab(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" placeholder="123456" />
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">Estado OAB (UF)</Label>
                    <select 
                      required 
                      value={lawyerOabState}
                      onChange={(e) => setLawyerOabState(e.target.value)}
                      className="mt-1 flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none"
                    >
                      <option value="" disabled>UF</option>
                      {estados.map(estado => (
                        <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>
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
                      <div className="sm:col-span-2 relative">
                        <Label className="text-slate-700 font-bold">CEP</Label>
                        <Input 
                          required 
                          value={lawyerCep}
                          onChange={(e) => handleCepChange(e, 'lawyer')}
                          className="mt-1 h-12 rounded-xl bg-white border-slate-200 pr-10" 
                          placeholder="00000-000" 
                          maxLength={9} 
                        />
                        {isFetchingLawyerCep && (
                          <div className="absolute right-3 top-[38px]">
                            <Loader2 className="w-4 h-4 animate-spin text-[#1E3A5F]" />
                          </div>
                        )}
                      </div>
                      <div className="sm:col-span-4">
                        <Label className="text-slate-700 font-bold">Formato de Atendimento</Label>
                        <select required value={lawyerAttendance} onChange={(e) => setLawyerAttendance(e.target.value)} className="mt-1 w-full h-12 rounded-xl bg-white border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none">
                          <option value="Híbrido (Online e Presencial)">Híbrido (Online e Presencial)</option>
                          <option value="Online">Apenas Online</option>
                          <option value="Presencial">Apenas Presencial</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Estado (UF)</Label>
                        <Input 
                          readOnly 
                          value={lawyerState} 
                          placeholder="Auto" 
                          className="mt-1 h-12 rounded-xl bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed" 
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <Label className="text-slate-700 font-bold">Cidade</Label>
                        <Input 
                          readOnly 
                          value={lawyerCity} 
                          placeholder="Auto" 
                          className="mt-1 h-12 rounded-xl bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed" 
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Label className="text-slate-700 font-bold">Bairro</Label>
                        <Input 
                          readOnly={!!lawyerNeighborhood} 
                          value={lawyerNeighborhood} 
                          onChange={(e) => setLawyerNeighborhood(e.target.value)} 
                          className={`mt-1 h-12 rounded-xl border-slate-200 ${lawyerNeighborhood ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}`} 
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <Label className="text-slate-700 font-bold">Rua / Logradouro</Label>
                        <Input 
                          readOnly={!!lawyerStreet} 
                          value={lawyerStreet} 
                          onChange={(e) => setLawyerStreet(e.target.value)} 
                          className={`mt-1 h-12 rounded-xl border-slate-200 ${lawyerStreet ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}`} 
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <Label className="text-slate-700 font-bold">Num / Ap</Label>
                        <Input 
                          id="address-number-lawyer"
                          required 
                          value={lawyerAddressNumber} 
                          onChange={(e) => setLawyerAddressNumber(e.target.value)} 
                          className="mt-1 h-12 rounded-xl bg-white border-slate-300 shadow-sm focus:border-[#1E3A5F]" 
                          placeholder="Ex: 10" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <Label className="text-slate-700 font-bold">Senha</Label>
                    <Input type="password" required value={lawyerPassword} onChange={(e) => setLawyerPassword(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-14 mt-6 bg-[#0F172A] hover:bg-slate-800 text-white text-base font-black rounded-2xl shadow-xl shadow-slate-900/20">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Cadastrar Perfil Profissional"}
                </Button>
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
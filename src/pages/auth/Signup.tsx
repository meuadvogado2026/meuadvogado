import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, User, Briefcase } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const Signup = () => {
  const navigate = useNavigate();

  const handleRegister = (role: string) => (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Conta criada com sucesso!",
      description: "Redirecionando para o seu painel...",
    });
    navigate(role === 'lawyer' ? '/painel/advogado' : '/painel/cliente');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6">
          <div className="bg-primary text-white p-2 rounded-xl">
            <Scale className="h-8 w-8" />
          </div>
        </Link>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Crie sua conta
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Já tem uma conta? <Link to="/login" className="font-medium text-primary hover:text-blue-800">Faça login</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="client" className="text-sm font-medium gap-2"><User className="w-4 h-4"/> Sou Cliente</TabsTrigger>
              <TabsTrigger value="lawyer" className="text-sm font-medium gap-2"><Briefcase className="w-4 h-4"/> Sou Advogado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="client">
              <form className="space-y-4" onSubmit={handleRegister('client')}>
                <div>
                  <Label>Nome Completo</Label>
                  <Input required className="mt-1" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" required className="mt-1" />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input type="tel" required className="mt-1" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input type="password" required className="mt-1" />
                </div>
                <Button type="submit" className="w-full h-11 mt-4">Criar conta de Cliente</Button>
              </form>
            </TabsContent>

            <TabsContent value="lawyer">
              <form className="space-y-4" onSubmit={handleRegister('lawyer')}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Nome Completo (como na OAB)</Label>
                    <Input required className="mt-1" />
                  </div>
                  <div className="col-span-2">
                    <Label>Email Profissional</Label>
                    <Input type="email" required className="mt-1" />
                  </div>
                  <div>
                    <Label>Número da OAB</Label>
                    <Input required className="mt-1" placeholder="123456" />
                  </div>
                  <div>
                    <Label>Estado OAB</Label>
                    <Input required className="mt-1" placeholder="SP" maxLength={2} />
                  </div>
                  <div className="col-span-2">
                    <Label>WhatsApp Profissional</Label>
                    <Input type="tel" required className="mt-1" placeholder="(00) 00000-0000" />
                  </div>
                  <div className="col-span-2">
                    <Label>Senha</Label>
                    <Input type="password" required className="mt-1" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 mt-4 bg-primary text-white">Criar Perfil de Advogado</Button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  Seu perfil passará por uma rápida validação de OAB.
                </p>
              </form>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
};
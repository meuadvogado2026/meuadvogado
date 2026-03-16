import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake login logic - for demonstration, let's route to Client Dashboard
    toast({
      title: "Login realizado com sucesso",
      description: "Bem-vindo de volta!",
    });
    navigate('/painel/cliente');
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
          Acesse sua conta
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Ou <Link to="/cadastro" className="font-medium text-primary hover:text-blue-800 transition-colors">crie sua conta gratuitamente</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
              <div className="mt-1">
                <Input id="email" name="email" type="email" required className="h-11" placeholder="voce@exemplo.com" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
                <a href="#" className="text-sm font-medium text-primary hover:text-blue-800">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="mt-1">
                <Input id="password" name="password" type="password" required className="h-11" />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold">
              Entrar
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Acesso temporário para demonstração. Clique em Entrar para visualizar o painel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Buscar a role (tipo de conta) do usuário na tabela profiles
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error("Erro ao buscar perfil:", profileError);
      }

      const role = profile?.role || 'client';
      toast.success("Login realizado com sucesso!");

      // Redirecionamento com base na role
      if (role === 'admin') navigate('/admin');
      else if (role === 'lawyer') navigate('/painel/advogado');
      else navigate('/painel/cliente');

    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "";
      toast.error("Erro no login", {
        description: msg === "Invalid login credentials" 
          ? "E-mail ou senha incorretos." 
          : msg || "Não foi possível entrar na sua conta."
      });setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 mt-10">
        <div className="bg-white pt-20 pb-8 px-6 shadow-2xl sm:rounded-[2rem] sm:px-10 relative">
          
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <Link to="/">
              <div className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-xl border-[5px] border-[#0F172A] hover:scale-105 transition-transform duration-300 overflow-hidden bg-[#0a1628]">
                <img src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/Meu%20Advogado%20LOGO.jpeg" alt="Advogado 2.0" className="w-full h-full object-cover scale-[1.15]" />
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Acesse sua conta
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Bem-vindo de volta à plataforma
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="text-slate-700 font-bold">Email</Label>
              <div className="mt-1">
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className="h-12 rounded-xl bg-slate-50 border-slate-200" 
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700 font-bold">Senha</Label>
              <div className="mt-1">
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="h-12 rounded-xl bg-slate-50 border-slate-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="mt-2 text-right">
                <a href="#" className="text-sm font-bold text-primary hover:text-blue-800 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-14 text-base font-black rounded-xl bg-[#0F172A] hover:bg-slate-800 shadow-lg shadow-slate-900/20">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar na plataforma"}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm font-medium text-slate-600">
              Não tem uma conta? <Link to="/cadastro" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Cadastre-se</Link>
            </p>
            <div className="flex justify-center gap-4 pt-2 border-t border-slate-100">
              <Link to="/privacidade" className="text-xs font-bold text-slate-400 hover:text-[#0F172A] transition-colors">Privacidade</Link>
              <Link to="/termos" className="text-xs font-bold text-slate-400 hover:text-[#0F172A] transition-colors">Termos</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
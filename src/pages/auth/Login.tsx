import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== "123456") {
      toast({
        title: "Erro no login",
        description: "Senha incorreta. Utilize 123456 para testes.",
        variant: "destructive",
      });
      return;
    }

    if (email === "admin@email.com") {
      toast({ title: "Bem-vindo, Administrador!" });
      navigate('/admin');
    } else if (email === "adv@email.com") {
      toast({ title: "Bem-vindo, Dr(a).!" });
      navigate('/painel/advogado');
    } else if (email === "user@email.com") {
      toast({ title: "Bem-vindo ao Meu Advogado!" });
      navigate('/painel/cliente');
    } else {
      toast({
        title: "Usuário não encontrado",
        description: "Utilize os e-mails: admin@email.com, adv@email.com ou user@email.com.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Efeito de brilho de fundo para um visual mais premium */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 mt-10">
        <div className="bg-white pt-14 pb-8 px-6 shadow-2xl sm:rounded-[2rem] sm:px-10 relative">
          
          {/* Logo Circular (Modal) */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <Link to="/">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-[6px] border-[#0F172A] hover:scale-105 transition-transform duration-300">
                <img src="/logo.png" alt="Meu Advogado" className="h-10 w-10 object-contain" />
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">
              Acesse sua conta
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Utilize os acessos de teste com a senha <span className="font-bold text-primary">123456</span>
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
                  placeholder="admin@email.com, adv@email.com..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700 font-bold">Senha</Label>
                <a href="#" className="text-sm font-bold text-primary hover:text-blue-800 transition-colors">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="mt-1">
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="h-12 rounded-xl bg-slate-50 border-slate-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 text-base font-black rounded-xl bg-[#0F172A] hover:bg-slate-800 shadow-lg shadow-slate-900/20">
              Entrar na plataforma
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center mb-3">Acessos rápidos de teste</p>
            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => {setEmail("admin@email.com"); setPassword("123456")}} className="text-xs text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-600 transition-colors">
                <strong className="text-slate-800">Admin:</strong> admin@email.com
              </button>
              <button onClick={() => {setEmail("adv@email.com"); setPassword("123456")}} className="text-xs text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-600 transition-colors">
                <strong className="text-slate-800">Advogado:</strong> adv@email.com
              </button>
              <button onClick={() => {setEmail("user@email.com"); setPassword("123456")}} className="text-xs text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-600 transition-colors">
                <strong className="text-slate-800">Cliente:</strong> user@email.com
              </button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-slate-600">
              Não tem uma conta? <Link to="/cadastro" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
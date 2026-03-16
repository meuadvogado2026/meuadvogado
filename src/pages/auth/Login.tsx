import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale } from "lucide-react";
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
          Utilize os acessos de teste com a senha <span className="font-bold">123456</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
              <div className="mt-1">
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className="h-11" 
                  placeholder="admin@email.com, adv@email.com ou user@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="h-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold">
              Entrar
            </Button>
          </form>
          
          <div className="mt-8 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Acessos rápidos de teste:</p>
            <div className="grid grid-cols-1 gap-2">
              <button onClick={() => {setEmail("admin@email.com"); setPassword("123456")}} className="text-xs text-left p-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-slate-600">
                <strong>Admin:</strong> admin@email.com
              </button>
              <button onClick={() => {setEmail("adv@email.com"); setPassword("123456")}} className="text-xs text-left p-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-slate-600">
                <strong>Advogado:</strong> adv@email.com
              </button>
              <button onClick={() => {setEmail("user@email.com"); setPassword("123456")}} className="text-xs text-left p-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-slate-600">
                <strong>Cliente:</strong> user@email.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
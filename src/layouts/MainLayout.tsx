import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, Menu } from "lucide-react";

export const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <Scale className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Meu Advogado</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/buscar" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Encontrar Advogado
            </Link>
            <Link to="/cadastro" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Sou Advogado
            </Link>
            <div className="h-4 w-px bg-slate-200"></div>
            <Link to="/login">
              <Button variant="ghost" className="font-medium">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button className="font-medium shadow-sm">Cadastre-se</Button>
            </Link>
          </nav>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-slate-800 text-white p-1.5 rounded-lg">
                <Scale className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-white">Meu Advogado</span>
            </Link>
            <p className="text-sm text-slate-400">
              Conectando pessoas que precisam de justiça aos melhores profissionais do mercado.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Para Clientes</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/buscar" className="hover:text-white transition-colors">Encontrar Advogados</Link></li>
              <li><Link to="/cadastro" className="hover:text-white transition-colors">Criar Conta</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Como funciona</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Para Advogados</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cadastro" className="hover:text-white transition-colors">Cadastre seu Perfil</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Painel do Advogado</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Planos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Privacidade</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          © {new Date().getFullYear()} Meu Advogado. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};
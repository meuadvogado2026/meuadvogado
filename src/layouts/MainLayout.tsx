import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Meu Advogado" className="h-8 w-8 object-contain" />
            <span className="font-bold text-xl tracking-tight text-slate-900">Meu Advogado</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="font-medium text-slate-600 hover:text-primary">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button className="font-medium shadow-sm rounded-xl">Cadastre-se grátis</Button>
            </Link>
          </nav>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <footer className="bg-[#0F172A] text-slate-400 py-8 border-t border-slate-800 hidden md:block">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo e Nome */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-white p-1 rounded-lg">
              <img src="/logo.png" alt="Meu Advogado" className="h-5 w-5 object-contain" />
            </div>
            <span className="font-bold text-lg text-white">Meu Advogado</span>
          </Link>

          {/* Links Essenciais */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Sobre Nós</Link>
            <Link to="/" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link to="/" className="hover:text-white transition-colors">Privacidade</Link>
          </div>

        </div>
        
        {/* Direitos Autorais */}
        <div className="container mx-auto px-4 max-w-5xl mt-8 pt-6 border-t border-slate-800/50 text-xs text-center text-slate-500">
          © {new Date().getFullYear()} Meu Advogado. Todos os direitos reservados.
        </div>
      </footer>

      {/* Mobile Navigation Menu */}
      <MobileNav role="public" />
    </div>
  );
};
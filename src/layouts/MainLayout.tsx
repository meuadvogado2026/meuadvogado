import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl overflow-hidden bg-[#0a1628] shadow-sm">
              <img src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/Meu%20Advogado%20LOGO.jpeg" alt="Advogado 2.0" className="w-full h-full object-cover scale-[1.2]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Advogado 2.0</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="font-medium text-slate-600 hover:text-primary">Entrar</Button>
            </Link>
            <Link to="/cadastro">
              <Button className="font-medium shadow-sm rounded-xl">Cadastre-se grátis</Button>
            </Link>
          </nav>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col border-slate-200 w-[300px]">
                <SheetHeader className="text-left mb-6 mt-4">
                  <SheetTitle className="flex items-center gap-2.5 font-bold text-xl text-slate-900">
                    <div className="h-7 w-7 rounded-xl overflow-hidden bg-[#0a1628]">
                      <img src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/Meu%20Advogado%20LOGO.jpeg" alt="Advogado 2.0" className="w-full h-full object-cover scale-[1.2]" />
                    </div>
                    Advogado 2.0
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-3">
                  <SheetClose asChild>
                    <Link to="/login" className="w-full">
                      <Button variant="outline" className="w-full justify-start h-12 text-base font-bold rounded-xl border-slate-200">
                        Entrar
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/cadastro" className="w-full">
                      <Button className="w-full justify-start h-12 text-base font-bold rounded-xl bg-[#0F172A] text-white hover:bg-slate-800">
                        Cadastre-se grátis
                      </Button>
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <footer className="bg-[#0F172A] text-slate-400 py-8 border-t border-slate-800 hidden md:block">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo e Nome */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="p-0.5 rounded-xl overflow-hidden bg-[#0a1628]">
              <img src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/Meu%20Advogado%20LOGO.jpeg" alt="Advogado 2.0" className="h-6 w-6 object-cover scale-[1.2]" />
            </div>
            <span className="font-bold text-lg text-white">Advogado 2.0</span>
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
          © {new Date().getFullYear()} Advogado 2.0. Todos os direitos reservados.
        </div>
      </footer>

      {/* Mobile Navigation Menu */}
      <MobileNav role="public" />
    </div>
  );
};
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Scale, ShieldCheck, Clock, CheckCircle2, Star } from "lucide-react";
import { specialties, mockTestimonials } from "@/data/mock";

export const Landing = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 font-medium text-sm mb-6 border border-blue-500/30">
              A maior rede de advogados do Brasil
            </span>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Encontre o advogado certo com mais rapidez e confiança.
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Busque por especialidade, localização e perfil profissional. Para advogados, uma nova forma de ser encontrado por clientes que precisam de você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/buscar">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white border-0">
                  <Search className="mr-2 h-5 w-5" /> Procuro um Advogado
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-white/10 hover:bg-white/20 text-white border-slate-600 backdrop-blur-sm">
                  <Scale className="mr-2 h-5 w-5" /> Sou Advogado
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Especialidades mais buscadas</h2>
            <p className="text-slate-600">Encontre especialistas prontos para resolver o seu problema jurídico com excelência.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((spec) => (
              <Link key={spec} to={`/buscar?especialidade=${spec}`}>
                <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary cursor-pointer transition-all text-slate-700 hover:text-primary font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  {spec}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Como funciona para o cliente?</h2>
              <p className="text-lg text-slate-600 mb-8">Conectar-se ao advogado ideal nunca foi tão simples, direto e seguro.</p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-xl">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Busque pelo seu problema</h3>
                    <p className="text-slate-600">Filtre por especialidade (ex: Trabalhista) e encontre profissionais na sua região ou online.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-xl">2</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Analise os perfis</h3>
                    <p className="text-slate-600">Veja fotos, histórico, registro na OAB, avaliações de outros clientes e a biografia do advogado.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-xl">3</div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Fale no WhatsApp</h3>
                    <p className="text-slate-600">Inicie uma conversa direta, tire suas dúvidas iniciais e agende uma consulta sem intermediários.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative">
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Perfis Verificados</p>
                    <p className="text-xs text-slate-500">OAB validada pela plataforma</p>
                  </div>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                alt="Advogada trabalhando" 
                className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <Scale className="w-16 h-16 mx-auto mb-6 text-blue-300" />
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Pronto para encontrar a solução jurídica?</h2>
          <p className="text-xl text-blue-100 mb-10">Milhares de profissionais qualificados estão prontos para analisar o seu caso agora mesmo.</p>
          <Link to="/buscar">
            <Button size="lg" className="h-14 px-10 text-lg bg-white text-primary hover:bg-slate-100">
              Buscar Advogados Agora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
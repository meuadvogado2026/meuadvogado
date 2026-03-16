import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Scale,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  Briefcase,
  Users,
  Sparkles,
  Clock3,
  ChevronRight,
  UserPlus,
  LogIn
} from "lucide-react";

export const Landing = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F4F6F8] text-slate-900">
      {/* background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#1E3A5F]/10 blur-3xl" />
        <div className="absolute right-[-120px] top-[260px] h-[260px] w-[260px] rounded-full bg-slate-400/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[-100px] h-[280px] w-[280px] rounded-full bg-[#0F2747]/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center gap-6 px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#1E3A5F]/15 bg-white px-4 py-2 text-sm font-medium text-[#1E3A5F] shadow-sm">
            <Sparkles className="h-4 w-4" />
            Plataforma jurídica moderna, humana e confiável
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-[#0F172A] sm:text-5xl lg:text-7xl">
            Encontre o seu
            <span className="block bg-gradient-to-r from-[#0F2747] via-[#1E3A5F] to-slate-500 bg-clip-text text-transparent py-2">
              advogado ideal
            </span>
            com rapidez e confiança.
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            O <span className="font-semibold text-[#0F2747]">Meu Advogado</span> conecta
            clientes e profissionais do direito com uma experiência clara, elegante e
            direta, com contato pelo WhatsApp.
          </p>

          <div className="mt-6 flex flex-col w-full sm:w-auto sm:flex-row gap-4 justify-center">
            <Link to="/cadastro">
              <Button className="h-14 w-full sm:w-auto rounded-2xl bg-[#0F2747] px-8 text-base font-semibold text-white shadow-lg shadow-[#0F2747]/20 hover:bg-[#16345C]">
                <UserPlus className="mr-2 h-5 w-5" />
                Criar conta grátis
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="outline"
                className="h-14 w-full sm:w-auto rounded-2xl border-slate-300 bg-white px-8 text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Acessar plataforma
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center justify-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="rounded-2xl bg-[#0F2747]/10 p-3 text-[#0F2747]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Perfis com validação</p>
              <p className="text-sm text-slate-500">Mais segurança na escolha do profissional.</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="rounded-2xl bg-[#0F2747]/10 p-3 text-[#0F2747]">
              <Users className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Conexão Direta</p>
              <p className="text-sm text-slate-500">Nossa plataforma conecta você ao profissional ideal.</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="rounded-2xl bg-[#0F2747]/10 p-3 text-[#0F2747]">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900">Contato no WhatsApp</p>
              <p className="text-sm text-slate-500">Conexão rápida e prática com o advogado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#0F172A] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-200">
              Como funciona
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Simples para o cliente.
              <span className="block text-slate-300 mt-2">Estratégico para o advogado.</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-3 text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Para quem precisa de um advogado</h3>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Conecte-se com o especialista",
                    desc: "Nossa plataforma apresenta os advogados com clareza e transparência.",
                  },
                  {
                    title: "Compare perfis com confiança",
                    desc: "Veja biografia, especialidades, região e avaliações de clientes reais.",
                  },
                  {
                    title: "Entre em contato no WhatsApp",
                    desc: "Converse direto com o advogado e avance no atendimento com rapidez.",
                  },
                ].map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0F172A] font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="mt-1 text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0F2747]/50 to-white/5 p-8 backdrop-blur">
              <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-3 text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Para advogados</h3>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Cadastre seu perfil profissional",
                    desc: "Apresente sua atuação, OAB, região e especialidades com elegância.",
                  },
                  {
                    title: "Ganhe visibilidade digital",
                    desc: "Seja encontrado por pessoas que realmente precisam do seu serviço.",
                  },
                  {
                    title: "Receba contatos qualificados",
                    desc: "O cliente entra em contato direto pelo WhatsApp com mais intenção.",
                  },
                ].map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-300 text-[#0F172A] font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="mt-1 text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-[#0F2747] shadow-sm">
            Por que escolher o Meu Advogado
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl mt-2">
            Uma experiência jurídica mais moderna, humana e direta.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Chega de plataformas confusas ou perfis sem credibilidade. O Meu Advogado foi
            pensado para transmitir confiança, facilitar a conexão e aproximar cliente e profissional.
          </p>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 text-left">
            {[
              "Design claro e profissional",
              "Perfis organizados e fáceis de entender",
              "Foco em transparência e validação",
              "Contato rápido pelo WhatsApp",
              "Experiência pensada para conversão",
              "Sem intermediários na comunicação"
            ].map((item) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 shadow-sm hover:border-slate-300 transition-colors">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[#0F2747]" />
                <span className="font-semibold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2747] via-[#17365F] to-[#1F2937]" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.15),_transparent_20%)]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur">
            <Scale className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            A forma mais moderna de apresentar 
            <span className="block text-slate-300 mt-2">serviços jurídicos.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Comece agora e descubra uma nova forma de conectar clientes e advogados
            com clareza, confiança e agilidade.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/cadastro">
              <Button className="h-14 rounded-2xl bg-white px-8 text-base font-semibold text-[#0F2747] hover:bg-slate-100">
                Cadastre-se grátis
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-white/30 bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/20"
              >
                Acessar plataforma
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
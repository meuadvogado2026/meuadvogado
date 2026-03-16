import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  Scale,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Star,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Users,
  Sparkles,
  Clock3,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { specialties, mockTestimonials } from "@/data/mock";

export const Landing = () => {
  return (
    <div className="min-h-screen w-full bg-white text-slate-900 overflow-x-hidden">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="absolute top-[320px] right-[-120px] h-[300px] w-[300px] rounded-full bg-slate-300/20 blur-3xl" />
        <div className="absolute bottom-[-100px] left-[-100px] h-[320px] w-[320px] rounded-full bg-blue-800/10 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Left */}
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-900 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Plataforma jurídica moderna, simples e confiável
              </div>

              <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Encontre o seu
                <span className="block bg-gradient-to-r from-blue-950 via-blue-800 to-slate-600 bg-clip-text text-transparent">
                  advogado ideal
                </span>
                com rapidez e confiança.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                O <span className="font-semibold text-slate-900">Meu Advogado</span> conecta
                pessoas a profissionais jurídicos por especialidade, localização e perfil.
                Tudo de forma clara, elegante e com contato direto pelo WhatsApp.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/buscar">
                  <Button className="h-14 rounded-2xl bg-blue-950 px-8 text-base font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-blue-900">
                    <Search className="mr-2 h-5 w-5" />
                    Encontrar advogado
                  </Button>
                </Link>

                <Link to="/cadastro">
                  <Button
                    variant="outline"
                    className="h-14 rounded-2xl border-slate-300 bg-white px-8 text-base font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    <Scale className="mr-2 h-5 w-5" />
                    Sou advogado
                  </Button>
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="mb-2 flex items-center gap-2 text-blue-900">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-semibold">Perfis verificados</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Mais confiança para escolher com segurança.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="mb-2 flex items-center gap-2 text-blue-900">
                    <MapPin className="h-5 w-5" />
                    <span className="text-sm font-semibold">Busca por região</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Encontre atendimento próximo ou online.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <div className="mb-2 flex items-center gap-2 text-blue-900">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm font-semibold">WhatsApp direto</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Fale com o advogado sem burocracia.
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-blue-950/10 via-slate-400/10 to-transparent blur-2xl" />

              <div className="relative rounded-[32px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/60">
                {/* Mock top bar */}
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Meu Advogado</p>
                    <p className="text-xs text-slate-500">Encontre especialistas jurídicos</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-slate-300" />
                    <span className="h-3 w-3 rounded-full bg-slate-300" />
                    <span className="h-3 w-3 rounded-full bg-blue-900" />
                  </div>
                </div>

                {/* Search card */}
                <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 text-white">
                  <div className="mb-5 flex items-center gap-2 text-blue-200">
                    <BadgeCheck className="h-5 w-5" />
                    <span className="text-sm font-medium">Busca inteligente</span>
                  </div>

                  <h3 className="text-2xl font-bold leading-tight">
                    Encontre um advogado por especialidade, cidade e perfil.
                  </h3>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 backdrop-blur">
                      Especialidade: Direito Trabalhista
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 backdrop-blur">
                      Localização: Goiânia - GO
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 backdrop-blur">
                      Atendimento: Presencial ou Online
                    </div>
                  </div>

                  <Button className="mt-6 h-12 w-full rounded-2xl bg-white font-semibold text-blue-950 hover:bg-slate-100">
                    <Search className="mr-2 h-4 w-4" />
                    Buscar agora
                  </Button>
                </div>

                {/* Cards */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">Dra. Mariana Costa</p>
                        <p className="text-sm text-slate-500">Direito de Família</p>
                      </div>
                      <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900">
                        Verificado
                      </div>
                    </div>
                    <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />
                      Brasília - DF
                    </div>
                    <div className="mb-4 flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-2 text-sm font-medium text-slate-600">5.0</span>
                    </div>
                    <Button className="h-11 w-full rounded-2xl bg-green-600 text-white hover:bg-green-700">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Falar no WhatsApp
                    </Button>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <p className="text-sm font-semibold text-slate-700">Resultados rápidos</p>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-blue-100 p-2 text-blue-900">
                          <Clock3 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Contato sem intermediários</p>
                          <p className="text-sm text-slate-500">
                            O cliente encontra e fala direto com o profissional.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-slate-200 p-2 text-slate-700">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Experiência clara</p>
                          <p className="text-sm text-slate-500">
                            Perfis organizados para facilitar a escolha.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-blue-100 p-2 text-blue-900">
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">Mais visibilidade para advogados</p>
                          <p className="text-sm text-slate-500">
                            Uma vitrine profissional para captar novos clientes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating tag */}
                <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl md:block">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Experiência premium
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    Mais credibilidade. Mais clareza. Mais conversão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-950">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Perfis com validação</p>
              <p className="text-sm text-slate-500">Mais segurança na escolha do profissional.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-950">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Busca por especialidade</p>
              <p className="text-sm text-slate-500">Resultados mais relevantes para cada caso.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-950">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Contato direto no WhatsApp</p>
              <p className="text-sm text-slate-500">Conexão rápida e prática com o advogado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Especialidades jurídicas
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Encontre o especialista certo para o seu momento.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Navegue pelas áreas mais buscadas e encontre profissionais preparados para
              atender o seu caso com clareza e confiança.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {specialties.map((spec) => (
              <Link key={spec} to={`/buscar?especialidade=${encodeURIComponent(spec)}`}>
                <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-950 transition group-hover:bg-blue-950 group-hover:text-white">
                    <Scale className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{spec}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Profissionais com atuação específica nessa área do direito.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-950">
                    Ver advogados
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-200">
              Como funciona
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Simples para o cliente.
              <span className="block text-blue-300">Estratégico para o advogado.</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Cliente */}
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="mb-6 inline-flex rounded-2xl bg-blue-500/15 p-3 text-blue-300">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Para quem procura um advogado</h3>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Pesquise pelo seu problema",
                    desc: "Use filtros por área jurídica, cidade e formato de atendimento.",
                  },
                  {
                    title: "Compare perfis com confiança",
                    desc: "Veja biografia, especialidades, região e avaliações de clientes.",
                  },
                  {
                    title: "Entre em contato no WhatsApp",
                    desc: "Converse direto com o advogado e avance no atendimento.",
                  },
                ].map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-950 font-bold">
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

            {/* Advogado */}
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-950/40 to-white/5 p-8 backdrop-blur">
              <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-3 text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Para advogados</h3>

              <div className="mt-8 space-y-6">
                {[
                  {
                    title: "Cadastre seu perfil profissional",
                    desc: "Apresente sua atuação, OAB, região e especialidades de forma profissional.",
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
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-300 text-slate-950 font-bold">
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
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-950">
              Por que escolher o Meu Advogado
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Uma experiência jurídica mais moderna, humana e direta.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Chega de plataformas confusas ou perfis sem credibilidade. O Meu Advogado foi
              pensado para transmitir confiança, facilitar a busca e aproximar cliente e profissional.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                "Design claro e profissional",
                "Perfis organizados e fáceis de entender",
                "Busca por especialidade e localização",
                "Contato rápido pelo WhatsApp",
                "Experiência pensada para conversão",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-blue-900" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-blue-900/10 to-slate-400/10 blur-2xl" />
            <div className="relative rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1200&q=80"
                alt="Profissional do direito"
                className="h-[520px] w-full rounded-[28px] object-cover"
              />

              <div className="absolute bottom-10 left-10 right-10 rounded-[24px] border border-white/30 bg-white/85 p-5 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Perfil profissional em destaque</p>
                    <p className="text-lg font-bold text-slate-950">Mais confiança na decisão do cliente</p>
                  </div>
                  <Link to="/buscar">
                    <Button className="rounded-2xl bg-blue-950 px-6 text-white hover:bg-blue-900">
                      Explorar perfis
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              Depoimentos
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Uma experiência que gera confiança dos dois lados.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mockTestimonials.map((testimonial: any, index: number) => (
              <div
                key={index}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-base leading-7 text-slate-600">
                  “{testimonial.content || testimonial.text || "Excelente experiência, encontrei um profissional com rapidez e segurança."}”
                </p>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-900">
                    {testimonial.name || "Cliente satisfeito"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {testimonial.role || "Usuário da plataforma"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.15),_transparent_20%)]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur">
            <Scale className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            O caminho mais moderno para encontrar
            <span className="block text-blue-300">o advogado certo.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Comece agora e descubra uma nova forma de conectar clientes e advogados
            com mais clareza, confiança e agilidade.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/buscar">
              <Button className="h-14 rounded-2xl bg-white px-8 text-base font-semibold text-blue-950 hover:bg-slate-100">
                Encontrar advogado
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cadastro">
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-white/30 bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/20"
              >
                Cadastrar como advogado
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
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
  Building2,
  FileText,
  PhoneCall,
} from "lucide-react";
import { specialties, mockTestimonials } from "@/data/mock";

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
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-14">
          {/* left */}
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1E3A5F]/15 bg-white px-4 py-2 text-sm font-medium text-[#1E3A5F] shadow-sm">
              <Sparkles className="h-4 w-4" />
              Plataforma jurídica moderna, humana e confiável
            </div>

            <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-[#0F172A] sm:text-5xl lg:text-7xl">
              Encontre o seu
              <span className="block bg-gradient-to-r from-[#0F2747] via-[#1E3A5F] to-slate-500 bg-clip-text text-transparent">
                advogado ideal
              </span>
              com rapidez e confiança.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              O <span className="font-semibold text-[#0F2747]">Meu Advogado</span> conecta
              clientes e profissionais do direito com uma experiência clara, elegante e
              direta, com contato pelo WhatsApp.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/buscar">
                <Button className="h-14 rounded-2xl bg-[#0F2747] px-8 text-base font-semibold text-white shadow-lg shadow-[#0F2747]/20 hover:bg-[#16345C]">
                  <Search className="mr-2 h-5 w-5" />
                  Encontrar advogado
                </Button>
              </Link>

              <Link to="/cadastro">
                <Button
                  variant="outline"
                  className="h-14 rounded-2xl border-slate-300 bg-white px-8 text-base font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <Scale className="mr-2 h-5 w-5" />
                  Sou advogado
                </Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-[#0F2747]">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-sm font-semibold">Perfis verificados</span>
                </div>
                <p className="text-sm text-slate-600">
                  Mais segurança para escolher com confiança.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-[#0F2747]">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-semibold">Busca por região</span>
                </div>
                <p className="text-sm text-slate-600">
                  Atendimento próximo ou online.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-[#0F2747]">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-semibold">WhatsApp direto</span>
                </div>
                <p className="text-sm text-slate-600">
                  Fale sem burocracia com o advogado.
                </p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#0F2747]/10 via-slate-300/20 to-transparent blur-2xl" />

            <div className="relative rounded-[32px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-300/40">
              {/* top bar */}
              <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Meu Advogado</p>
                  <p className="text-xs text-slate-500">Busca jurídica simples e confiável</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-slate-300" />
                  <span className="h-3 w-3 rounded-full bg-slate-300" />
                  <span className="h-3 w-3 rounded-full bg-[#0F2747]" />
                </div>
              </div>

              {/* app mock */}
              <div className="rounded-[28px] bg-gradient-to-br from-[#0F2747] via-[#17365F] to-[#1F2937] p-6 text-white">
                <div className="mb-5 flex items-center gap-2 text-slate-200">
                  <BadgeCheck className="h-5 w-5" />
                  <span className="text-sm font-medium">Busca inteligente</span>
                </div>

                <h3 className="text-2xl font-bold leading-tight">
                  Encontre um advogado por especialidade, cidade e tipo de atendimento.
                </h3>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Especialidade</p>
                    <p className="mt-1 text-sm font-semibold text-white">Direito Trabalhista</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Localização</p>
                    <p className="mt-1 text-sm font-semibold text-white">Goiânia - GO</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-xs uppercase tracking-wide text-slate-300">Atendimento</p>
                    <p className="mt-1 text-sm font-semibold text-white">Online ou Presencial</p>
                  </div>
                </div>

                <Button className="mt-6 h-12 w-full rounded-2xl bg-white font-semibold text-[#0F2747] hover:bg-slate-100">
                  <Search className="mr-2 h-4 w-4" />
                  Buscar agora
                </Button>
              </div>

              {/* lower cards */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">Dra. Mariana Costa</p>
                      <p className="text-sm text-slate-500">Direito de Família</p>
                    </div>
                    <div className="rounded-full bg-[#0F2747]/10 px-3 py-1 text-xs font-semibold text-[#0F2747]">
                      Verificado
                    </div>
                  </div>

                  <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    Brasília - DF
                  </div>

                  <div className="mb-4 flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-slate-600">5.0</span>
                  </div>

                  <Button className="h-11 w-full rounded-2xl bg-green-600 text-white hover:bg-green-700">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Falar no WhatsApp
                  </Button>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <p className="text-sm font-semibold text-slate-700">Por que funciona</p>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-[#0F2747]/10 p-2 text-[#0F2747]">
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
                          Perfis organizados e fáceis de comparar.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-[#0F2747]/10 p-2 text-[#0F2747]">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Mais visibilidade</p>
                        <p className="text-sm text-slate-500">
                          Uma vitrine profissional para o advogado captar clientes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <div className="rounded-2xl bg-[#0F2747]/10 p-3 text-[#0F2747]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Perfis com validação</p>
              <p className="text-sm text-slate-500">Mais segurança na escolha do profissional.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <div className="rounded-2xl bg-[#0F2747]/10 p-3 text-[#0F2747]">
              <Search className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Busca por especialidade</p>
              <p className="text-sm text-slate-500">Resultados mais relevantes para cada caso.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <div className="rounded-2xl bg-[#0F2747]/10 p-3 text-[#0F2747]">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Contato no WhatsApp</p>
              <p className="text-sm text-slate-500">Conexão rápida e prática com o advogado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              Especialidades jurídicas
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Encontre o especialista certo para o seu momento.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Navegue pelas áreas mais buscadas e encontre profissionais preparados para
              atender seu caso com clareza e confiança.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {specialties.map((spec) => (
              <Link key={spec} to={`/buscar?especialidade=${encodeURIComponent(spec)}`}>
                <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A5F]/20 hover:shadow-xl">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F2747]/10 text-[#0F2747] transition group-hover:bg-[#0F2747] group-hover:text-white">
                    <Scale className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{spec}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Profissionais com atuação específica nessa área do direito.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0F2747]">
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
      <section className="bg-[#0F172A] py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-200">
              Como funciona
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Simples para o cliente.
              <span className="block text-slate-300">Estratégico para o advogado.</span>
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-3 text-white">
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
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0F2747] shadow-sm">
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
                  <CheckCircle2 className="h-5 w-5 text-[#0F2747]" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-[#0F2747]/10 to-slate-400/10 blur-2xl" />
            <div className="relative rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-300/40">
              <div className="rounded-[28px] bg-gradient-to-br from-[#0F2747] via-[#17365F] to-[#334155] p-8 text-white">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-3">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">Perfil profissional em destaque</p>
                    <p className="text-lg font-bold">Mais confiança na decisão do cliente</p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-semibold">
                        MC
                      </div>
                      <div>
                        <p className="font-semibold">Dra. Mariana Costa</p>
                        <p className="text-sm text-slate-300">Direito de Família e Sucessões</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="flex items-center gap-2 text-slate-200">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">Brasília - DF</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-slate-200">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">OAB validada e perfil completo</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-slate-200">
                      <PhoneCall className="h-4 w-4" />
                      <span className="text-sm">Contato rápido pelo WhatsApp</span>
                    </div>
                  </div>

                  <Link to="/buscar">
                    <Button className="h-12 w-full rounded-2xl bg-white text-[#0F2747] hover:bg-slate-100">
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
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="mb-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
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
                className="rounded-[28px] border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="text-base leading-7 text-slate-600">
                  “{testimonial.content || testimonial.text || "Excelente experiência, encontrei um profissional com rapidez e segurança."}”
                </p>

                <div className="mt-6 border-t border-slate-200 pt-4">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2747] via-[#17365F] to-[#1F2937]" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.25),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.15),_transparent_20%)]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur">
            <Scale className="h-8 w-8" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            O caminho mais moderno para encontrar
            <span className="block text-slate-300">o advogado certo.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Comece agora e descubra uma nova forma de conectar clientes e advogados
            com mais clareza, confiança e agilidade.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/buscar">
              <Button className="h-14 rounded-2xl bg-white px-8 text-base font-semibold text-[#0F2747] hover:bg-slate-100">
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
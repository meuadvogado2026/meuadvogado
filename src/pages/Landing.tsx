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
  ChevronRight,
  UserPlus,
  LogIn,
  Gift,
  HeartHandshake
} from "lucide-react";

export const Landing = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F4F6F8] text-slate-900 font-sans">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute right-[-100px] top-[400px] h-[300px] w-[300px] rounded-full bg-slate-400/20 blur-[100px]" />
        <div className="absolute bottom-[-100px] left-[-100px] h-[400px] w-[400px] rounded-full bg-[#0F2747]/10 blur-[100px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Text */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm font-bold text-blue-800 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Plataforma jurídica moderna e humana
              </div>

              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl xl:text-7xl">
                Encontre o seu
                <span className="block bg-gradient-to-r from-[#0F2747] via-blue-700 to-blue-500 bg-clip-text text-transparent py-2">
                  advogado ideal
                </span>
                com rapidez.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl font-medium">
                Conectamos clientes e profissionais do direito com uma experiência clara, elegante e direta. Sem intermediários: contato direto pelo WhatsApp.
              </p>

              <div className="mt-10 flex flex-col w-full sm:w-auto sm:flex-row gap-4">
                <Link to="/cadastro" className="w-full sm:w-auto">
                  <Button className="h-14 w-full sm:w-auto rounded-2xl bg-[#0F2747] px-8 text-base font-black text-white shadow-xl shadow-[#0F2747]/20 hover:bg-[#16345C] hover:-translate-y-1 transition-all duration-300">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Criar conta grátis
                  </Button>
                </Link>

                <Link to="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-14 w-full sm:w-auto rounded-2xl border-slate-300 bg-white px-8 text-base font-bold text-slate-800 shadow-sm hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300"
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Acessar plataforma
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
              <img 
                src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/HERO%20meu%20advogado.png" 
                alt="Plataforma Meu Advogado" 
                className="w-full h-auto rounded-[2rem] shadow-2xl border border-white/50 object-cover"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce hover:animate-none" style={{ animationDuration: '3s' }}>
                <div className="bg-green-100 p-3 rounded-xl text-green-600">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contato Direto</p>
                  <p className="font-black text-[#0F172A]">Via WhatsApp</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 shadow-sm border border-blue-100">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="font-black text-[#0F172A]">Perfis Validados</p>
              <p className="text-sm font-medium text-slate-500">OAB e dados conferidos.</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 shadow-sm border border-blue-100">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="font-black text-[#0F172A]">Conexão Real</p>
              <p className="text-sm font-medium text-slate-500">Clientes e advogados ideais.</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 shadow-sm border border-blue-100">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="font-black text-[#0F172A]">Sem Intermediários</p>
              <p className="text-sm font-medium text-slate-500">Chame direto no WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS FOR LAWYERS SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Left */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 rounded-[3rem] transform -rotate-3 scale-105 -z-10"></div>
              <img 
                src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/meu%20adv%2026.png" 
                alt="Benefícios para Advogados" 
                className="w-full h-auto rounded-[2rem] shadow-2xl border border-slate-100 object-cover"
              />
            </div>

            {/* Content Right */}
            <div className="order-1 lg:order-2">
              <span className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-black text-amber-700 shadow-sm">
                Para Advogados
              </span>
              <h2 className="text-3xl font-black tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl mb-6">
                Mais que um perfil. <br/> Um <span className="text-amber-600">Clube de Benefícios</span>.
              </h2>
              <p className="text-lg leading-relaxed text-slate-600 font-medium mb-8">
                Ao se cadastrar no Meu Advogado, você não ganha apenas visibilidade digital e novos clientes. Você faz parte de um ecossistema focado no seu crescimento.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Briefcase,
                    title: "Vitrine Profissional",
                    desc: "Apresente sua OAB, especialidades e conquistas em um perfil desenhado para converter visitantes em clientes."
                  },
                  {
                    icon: Gift,
                    title: "Clube de Vantagens Exclusivo",
                    desc: "Acesso a descontos reais em softwares jurídicos, livrarias, cursos, saúde e bem-estar."
                  },
                  {
                    icon: MessageCircle,
                    title: "Contatos Qualificados",
                    desc: "Os clientes te chamam diretamente no WhatsApp. Sem taxas sobre honorários, sem complicações."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-[#0F2747]">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-[#0F172A]">{item.title}</h4>
                      <p className="mt-1 text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/cadastro">
                  <Button className="h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white px-8 text-base font-black shadow-lg shadow-amber-500/20">
                    Cadastrar como Advogado <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRAYER / SPIRITUAL SUPPORT SECTION */}
      <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Content Left */}
            <div>
              <span className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-blue-200 shadow-sm backdrop-blur-sm border border-white/10">
                Lado Humano
              </span>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6 leading-tight">
                Apoiamos a justiça dos homens. <br/>
                <span className="text-blue-400">Confiamos na justiça divina.</span>
              </h2>
              <p className="text-lg leading-relaxed text-slate-300 font-medium mb-8">
                Sabemos que processos judiciais e problemas legais trazem grande carga emocional. Por isso, oferecemos mais do que tecnologia: oferecemos apoio espiritual.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <HeartHandshake className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-2xl font-black mb-3">Rede de Intercessão</h3>
                <p className="text-slate-300 font-medium leading-relaxed mb-6">
                  Clientes e advogados podem enviar <strong>pedidos de oração</strong> de forma confidencial através da plataforma. Nossa equipe de intercessores dedica tempo real para orar por sua causa, sua família e sua paz.
                </p>
                <div className="flex items-center gap-3 text-sm font-bold text-blue-200 bg-white/10 w-fit px-4 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  Totalmente gratuito e confidencial
                </div>
              </div>
            </div>

            {/* Image Right */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/30 to-transparent rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
              <img 
                src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/meu%20adv%202026.png" 
                alt="Apoio Espiritual" 
                className="w-full h-auto rounded-[2rem] shadow-2xl border border-white/10 object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS FOR CLIENTS */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-4 inline-flex rounded-full bg-slate-200 px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
            Para Clientes
          </span>
          <h2 className="text-3xl font-black tracking-tight text-[#0F172A] sm:text-5xl mt-2 mb-16">
            Como encontrar seu advogado
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Linha conectora (visível apenas no desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 -z-10"></div>

            {[
              {
                step: "1",
                title: "Busque na Plataforma",
                desc: "Filtre por especialidade, cidade ou atendimento online."
              },
              {
                step: "2",
                title: "Analise o Perfil",
                desc: "Veja a biografia, registro da OAB e avaliações de outros clientes."
              },
              {
                step: "3",
                title: "Chame no WhatsApp",
                desc: "Com um clique, inicie a conversa diretamente com o advogado escolhido."
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center text-2xl font-black text-[#0F2747] mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-black text-[#0F172A] mb-3">{item.title}</h3>
                <p className="text-slate-600 font-medium max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0F2747] via-[#17365F] to-[#0F172A] rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Efeitos do Card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-inner">
                <Scale className="h-10 w-10" />
              </div>

              <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl mb-6">
                Pronto para transformar sua 
                <span className="block text-blue-300 mt-2">experiência jurídica?</span>
              </h2>

              <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-300 mb-10">
                Seja você um cliente buscando seus direitos ou um advogado buscando crescer na carreira, o Meu Advogado é o seu lugar.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/cadastro">
                  <Button className="h-14 w-full sm:w-auto rounded-2xl bg-white px-8 text-base font-black text-[#0F2747] hover:bg-slate-100 shadow-xl">
                    Criar minha conta grátis
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    variant="outline"
                    className="h-14 w-full sm:w-auto rounded-2xl border-white/30 bg-white/5 backdrop-blur-sm px-8 text-base font-bold text-white hover:bg-white/20"
                  >
                    Já tenho uma conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE FOOTER FOR LANDING */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <img src="/logo.png" alt="Meu Advogado Logo" className="h-8 w-8" />
            <span className="text-xl font-black text-[#0F172A]">Meu Advogado</span>
          </div>
          <p className="text-slate-500 font-medium text-sm">
            © {new Date().getFullYear()} Plataforma Meu Advogado. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
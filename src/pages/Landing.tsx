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
  HeartHandshake,
  Star,
  Search,
  MessageSquare
} from "lucide-react";

export const Landing = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fafcff] text-slate-900 font-sans selection:bg-blue-200">
      
      {/* 1. MESH BACKGROUND & HERO */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-blue-400/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute right-[-5%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-400/10 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-[-10%] left-[20%] h-[600px] w-[600px] rounded-full bg-emerald-400/5 blur-[150px]" />
      </div>

      <section className="relative overflow-hidden pt-8 pb-24 lg:pt-12 lg:pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/40 backdrop-blur-md px-5 py-2.5 text-sm font-bold text-blue-800 shadow-[0_4px_24px_-8px_rgba(59,130,246,0.15)] hover:bg-white/60 transition-colors">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>A revolução do atendimento jurídico</span>
              </div>

              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-[#0A1120] sm:text-5xl lg:text-7xl">
                Encontre o seu
                <span className="block bg-gradient-to-r from-[#0F2747] via-blue-700 to-indigo-500 bg-clip-text text-transparent py-2 drop-shadow-sm">
                  advogado ideal
                </span>
                com rapidez.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl font-medium">
                Conecte-se aos melhores profissionais do direito em uma experiência clara e sofisticada. Negocie direto pelo WhatsApp, sem intermediários.
              </p>

              <div className="mt-10 flex flex-col w-full sm:w-auto sm:flex-row gap-4">
                <Link to="/cadastro" className="w-full sm:w-auto">
                  <Button className="group h-14 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[#0F2747] to-[#1E3A5F] px-8 text-base font-black text-white shadow-[0_8px_30px_-8px_rgba(15,39,71,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(15,39,71,0.7)] hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-blue-400/30">
                    <UserPlus className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    Criar conta grátis
                  </Button>
                </Link>

                <Link to="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="h-14 w-full sm:w-auto rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-8 text-base font-bold text-slate-800 shadow-sm hover:bg-white hover:border-slate-300 hover:-translate-y-1 transition-all duration-300"
                  >
                    <LogIn className="mr-2 h-5 w-5 text-slate-500" />
                    Acessar plataforma
                  </Button>
                </Link>
              </div>
              
              {/* Seção removida (10.000 conexões) conforme solicitado */}
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-[3rem] transform rotate-3 scale-105 -z-10 blur-xl"></div>
              
              <div className="relative rounded-[2.5rem] bg-white p-2 shadow-2xl border border-white/60">
                <img 
                  src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/HERO%20meu%20advogado.png" 
                  alt="Plataforma Meu Advogado" 
                  className="w-full h-auto rounded-[2rem] object-cover"
                />
              </div>
              
              {/* Floating Glass Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] border border-white flex items-center gap-3 animate-bounce hover:animate-none scale-90 sm:scale-100 origin-bottom-left" style={{ animationDuration: '4s' }}>
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-2 sm:p-2.5 rounded-xl text-white shadow-lg shadow-green-500/20">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Sem Taxas extras</p>
                  <p className="font-black text-[#0A1120] text-sm sm:text-base leading-tight">Contato Direto</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BENTO GRID TRUST STRIP */}
      <section className="relative z-20 -mt-10 lg:-mt-16 mb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-black text-[#0A1120] mb-2">Segurança Garantida</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Perfis de advogados com OAB rigorosamente validada pela nossa equipe.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-black text-[#0A1120] mb-2">Conexão Real</h3>
              <p className="text-slate-500 font-medium leading-relaxed">O algoritmo de busca te conecta cirurgicamente com o profissional ideal para seu caso.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6">
                <MessageSquare className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-black text-[#0A1120] mb-2">Liberdade Total</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Negocie honorários diretamente pelo WhatsApp, sem comissões da plataforma.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PREMIUM BENEFITS FOR LAWYERS */}
      <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }}></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/20 to-orange-500/20 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 -z-10"></div>
              <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-100/50 relative">
                <img 
                  src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/meu%20adv%2026.png" 
                  alt="Benefícios para Advogados" 
                  className="w-full h-auto rounded-[2rem] object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 mb-6 shadow-sm">
                <Briefcase className="h-4 w-4" /> Para Profissionais
              </div>
              
              <h2 className="text-4xl font-black tracking-tight text-[#0A1120] lg:text-5xl mb-6 leading-tight">
                Mais que um perfil. <br/> Um <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">Clube VIP</span>.
              </h2>
              
              <p className="text-lg leading-relaxed text-slate-600 font-medium mb-10">
                Ao se candidatar no Meu Advogado, você transcende a visibilidade comum. Você passa a integrar um ecossistema projetado para impulsionar a sua carreira e sua vida pessoal.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: Scale,
                    title: "Vitrine Premium",
                    desc: "Perfil imersivo que destaca suas vitórias, especialidades e transmite máxima autoridade."
                  },
                  {
                    icon: Gift,
                    title: "Clube de Vantagens",
                    desc: "Descontos reais em softwares parceiros, clínicas de estética, viagens e muito mais."
                  },
                  {
                    icon: Search,
                    title: "Leads Qualificados",
                    desc: "Encontrado facilmente por clientes quentes que mapeiam advogados por geolocalização exata."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-white border border-slate-200 shadow-sm text-[#0F2747]">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-[#0A1120]">{item.title}</h4>
                      <p className="mt-1.5 text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/cadastro">
                  <Button className="group h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 text-base font-black shadow-[0_8px_30px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(245,158,11,0.8)] transition-all transform hover:-translate-y-1">
                    Quero ser um Advogado parceiro <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SPIRITUAL SUPPORT (DEEP DARK GLASS) */}
      <section className="py-32 bg-[#0A0F1A] text-white relative overflow-hidden">
        {/* Deep Mesh Background */}
        <div className="absolute top-0 right-[-20%] w-[1000px] h-[1000px] bg-blue-900/30 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/40 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="relative order-2 lg:order-1 perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-[3rem] transform rotate-[-3deg] -z-10 blur-xl"></div>
              <div className="bg-white/5 p-2 rounded-[2.5rem] backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/meu%20adv%202026.png" 
                  alt="Apoio Espiritual" 
                  className="w-full h-auto rounded-[2rem] object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-bold text-blue-200 shadow-xl backdrop-blur-md">
                <HeartHandshake className="w-4 h-4 text-rose-400" />
                O Lado Humano da Tecnologia
              </span>
              
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200">
                Apoiamos a justiça dos homens. <br/>
                Confiamos na <span className="text-blue-400">justiça divina.</span>
              </h2>
              
              <p className="text-xl leading-relaxed text-slate-300/90 font-medium mb-10">
                Lidar com processos judiciais exige resiliência. Por isso, oferecemos um braço amigo e constante além da tela do celular.
              </p>

              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                  Rede de Intercessão Fechada
                </h3>
                <p className="text-slate-300 font-medium leading-relaxed mb-8 text-lg">
                  Envie <strong>pedidos de oração</strong> de forma confidencial. Nossa equipe dedica tempo real e genuíno para clamar pela sua causa, sua proteção e pela resolução rápida do seu problema.
                </p>
                <div className="flex items-center gap-3 text-sm font-bold text-white bg-blue-600/20 border border-blue-500/30 w-fit px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  Serviço social 100% gratuito e privado
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (STEP-BY-STEP CARDS) */}
      <section className="py-32 bg-[#fafcff]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm mb-6">
              Experiência do Cliente
            </span>
            <h2 className="text-4xl font-black tracking-tight text-[#0A1120] sm:text-5xl">
              Simples. Direto. <span className="text-blue-600">Resolvido.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative items-start">
            {/* Desktop Connectors */}
            <div className="hidden md:block absolute top-[4.5rem] left-[16%] w-[68%] h-[2px] bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 -z-10"></div>

            {[
              {
                step: "01",
                icon: Search,
                title: "Critério de Busca",
                desc: "Insira seu problema ou procure por cidades ao redor de você. A IA filtra os especialistas certos."
              },
              {
                step: "02",
                icon: ShieldCheck,
                title: "Avalie o Profissional",
                desc: "Leia a bio, cheque o número da OAB validada, e veja as impressões de clientes anteriores."
              },
              {
                step: "03",
                icon: MessageCircle,
                title: "Contato Imediato",
                desc: "Abra o WhatsApp comercial do advogado com 1 clique e explique seu caso diretamente."
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col relative group">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-white border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center text-blue-600 mb-8 transform group-hover:-translate-y-2 transition-transform duration-300 relative">
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0F2747] text-white text-xs font-black flex items-center justify-center border-[3px] border-[#fafcff] shadow-md">
                    {item.step}
                  </span>
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="text-center bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full">
                  <h3 className="text-2xl font-black text-[#0A1120] mb-4">{item.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL AURORA CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative rounded-[3rem] px-6 py-20 sm:px-16 sm:py-24 text-center overflow-hidden bg-gradient-to-br from-[#0F2747] via-[#112F58] to-[#0A1120] shadow-[0_20px_50px_-15px_rgba(15,39,71,0.5)] border border-blue-900/50">
            {/* Aurora effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] mix-blend-plus-lighter pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[100px] mix-blend-plus-lighter pointer-events-none"></div>

            <div className="relative z-10">
              <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <Scale className="h-12 w-12 text-white" />
              </div>

              <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl mb-8 leading-[1.1]">
                Um novo padrão na <br/>
                <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">advocacia digital</span>
              </h2>

              <p className="mx-auto max-w-2xl text-xl font-medium leading-relaxed text-blue-100/80 mb-12">
                O acesso à justiça começa aqui. Moderno, seguro e feito para simplificar. Junte-se a milhares de pessoas agora mesmo.
              </p>

              <div className="flex flex-col justify-center gap-5 sm:flex-row">
                <Link to="/cadastro">
                  <Button className="h-16 w-full sm:w-auto rounded-2xl bg-white px-10 text-lg font-black text-[#0A1120] hover:bg-slate-50 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
                    Cadastre-se Gratuitamente
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>

                <Link to="/login">
                  <Button
                    variant="outline"
                    className="h-16 w-full sm:w-auto rounded-2xl border-white/20 bg-white/5 backdrop-blur-md px-10 text-lg font-bold text-white hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    Fazer Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center">
          <div className="flex justify-center items-center gap-3 mb-6 bg-slate-50 border border-slate-100 px-6 py-3 rounded-full shadow-sm">
            <img src="/logo.png" alt="Meu Advogado Logo" className="h-8 w-8 drop-shadow-sm" />
            <span className="text-xl font-black text-[#0A1120] tracking-tight">Meu Advogado</span>
          </div>
          <p className="text-slate-500 font-medium text-sm">
            © {new Date().getFullYear()} Plataforma Meu Advogado. Simplificando o direito.
          </p>
        </div>
      </footer>
    </div>
  );
};
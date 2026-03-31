import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Scale, ShieldCheck, MessageCircle, CheckCircle2, Briefcase, Users, Sparkles, ChevronRight, UserPlus, LogIn, Gift, HeartHandshake, Star, Search, MessageSquare, ArrowRight } from "lucide-react";

export const Landing = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#000B21] text-white font-sans selection:bg-[#0066FF] selection:text-white">
      {/* BACKGROUND NOISE & GLOWS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden mix-blend-screen">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#0066FF]/10 blur-[120px] will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-[40%] -right-[20%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/10 blur-[100px] will-change-transform"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        />
        <div className="absolute inset-0 bg-[#000B21]/60" />
      </div>

      {/* FLOATING HEADER */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="flex items-center justify-between px-6 py-4 bg-[#000814]/80 backdrop-blur-xl border border-white/5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-blue-900 flex items-center justify-center shadow-lg shadow-[#0066FF]/20">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">Meu Advogado</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a>
            <a href="#advogados" className="hover:text-white transition-colors">Para Advogados</a>
            <a href="#proposito" className="hover:text-white transition-colors">Propósito</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-3 sm:px-5 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors">
              Entrar
            </Link>
            <Link to="/cadastro">
              <Button className="rounded-full bg-[#0066FF] hover:bg-blue-500 text-white font-bold h-10 px-8 border-none shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] transition-all">
                Cadastrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION - MASSIVE TYPOGRAPHY */}
      <section className="relative z-10 pt-48 pb-32 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[90vh]">
        <div className="w-full max-w-5xl flex flex-col items-center text-center">
          
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 px-5 py-2 text-xs sm:text-sm font-bold text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            CONECTE, INTEGRE E RESOLVA O SEU CASO
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-white">
            Encontre o seu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-blue-400 to-cyan-300">
              advogado ideal
            </span> <br />
            com rapidez.
          </h1>

          <p className="mt-10 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed text-slate-400">
            Conecte-se aos melhores profissionais do direito em uma experiência clara e sofisticada. Negocie direto pelo WhatsApp, 
            <strong className="text-white font-bold"> sem intermediários e sem taxas ocultas.</strong>
          </p>

          <div className="mt-14 flex flex-col sm:flex-row gap-5 w-full max-w-md">
            <Link to="/cadastro" className="w-full">
              <Button className="w-full h-16 rounded-full bg-[#0066FF] hover:bg-blue-500 text-white text-lg font-bold shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:-translate-y-1 transition-all">
                Criar conta grátis
              </Button>
            </Link>
          </div>
          
          {/* Dashboard Abstract Preview (Scroll Reveal) */}
          <div className="mt-24 w-full relative perspective-1000 group hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-t from-[#000B21] via-transparent to-transparent z-10 
                            translate-y-10 group-hover:translate-y-20 transition-transform duration-1000"></div>
            <div 
              className="relative rounded-t-[2.5rem] bg-[#00102A] p-3 border border-white/10 shadow-2xl overflow-hidden
                         transform-gpu rotate-x-12 scale-95 group-hover:rotate-x-0 group-hover:scale-100 transition-all duration-1000 ease-out"
              style={{ transform: `rotateX(${Math.max(0, 15 - scrollY * 0.05)}deg) scale(${Math.min(1, 0.95 + scrollY * 0.0002)})` }}
            >
              <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/lflb43qwh/Meu%20advogado/HERO%20meu%20advogado.png')] bg-cover bg-top opacity-60 mix-blend-screen filter contrast-125"></div>
              <div className="h-[40vh] min-h-[300px] w-full relative z-20 flex pt-10 px-10">
                {/* Floating UI Elements inside */}
                <div className="w-64 h-24 bg-[#000B21]/80 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl
                                absolute -top-12 left-10 animate-float translate-y-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex justify-center items-center"><CheckCircle2 className="w-5 h-5"/></div>
                    <div><p className="text-white font-bold text-sm">Match Encontrado</p><p className="text-slate-400 text-xs">A 0.8km de você</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP: 3 Core Pillars (ASYMMETRICAL LAYOUT) */}
      <section id="beneficios" className="relative z-20 py-24 bg-[#000814] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-0 items-center">
            
            <div className="lg:col-span-4 lg:pr-10">
              <h2 className="text-3xl font-black text-white leading-tight mb-4 tracking-tighter">A API Invisível da sua Justiça</h2>
              <p className="text-slate-400 font-medium">Nosso motor não lista milhares de nomes. Ele entrega o contato exato que você precisa com base no CEP.</p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-6">
              {[
                { i: ShieldCheck, t: "Segurança", d: "Advogados com OAB rigorosamente validada." },
                { i: Users, t: "Conexão Real", d: "A IA busca pelo raio mais próximo e te conecta." },
                { i: MessageSquare, t: "Liberdade", d: "Negocie os honorários no Zap sem taxas." }
              ].map((item, idx) => (
                <div key={idx} className={`bg-[#00102A] rounded-3xl p-8 border border-white/5 hover:bg-[#001433] hover:border-[#0066FF]/30 transition-colors ${idx === 1 ? 'sm:-translate-y-8' : ''}`}>
                  <item.i className="w-10 h-10 text-[#0066FF] mb-6" />
                  <h3 className="text-white font-bold text-lg mb-2">{item.t}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ADVOGADOS VIP - FRAGMENTED BLOCK */}
      <section id="advogados" className="relative z-10 py-32 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#0066FF]/5 skew-x-12 transform origin-top-right -z-10 blur-3xl" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Narrative */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-500 mb-8">
                <Briefcase className="h-4 w-4" /> Para Profissionais
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
                Mais que um perfil. <br/> Um <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Clube VIP</span>.
              </h2>
              
              <p className="text-lg leading-relaxed text-slate-400 font-medium mb-12 max-w-xl">
                Ao se candidatar, você transcende a visibilidade comum. Você integra um ecossistema projetado para impulsionar a sua carreira dominando a sua região.
              </p>

              <div className="space-y-4 mb-12">
                {[
                  { title: "Vitrine Premium", desc: "Destaque suas vitórias, área jurídica e transmita máxima autoridade na sua cidade." },
                  { title: "Clube de Vantagens", desc: "Descontos reais em softwares parceiros, viagens e estética." },
                  { title: "Leads Exclusivos", desc: "A inteligência do Meu Advogado mapeia sua geolocalização exata para fechar matches 1x1." }
                ].map((item, idx) => (
                  <div key={idx} className="group flex gap-6 p-6 rounded-3xl bg-[#000814]/50 border border-white/5 hover:border-[#0066FF]/30 transition-all">
                    <div className="w-1 h-auto bg-[#0066FF] rounded-full scale-y-50 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/cadastro" className="inline-block">
                <Button className="h-14 rounded-full bg-transparent border border-amber-500/50 hover:bg-amber-500/10 text-amber-500 hover:text-amber-400 font-bold px-8 transition-colors">
                  Quero ser Parceiro <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Right Abstract Image Layout */}
            <div className="order-1 lg:order-2 relative perspective-1000 hidden md:block">
              <div className="absolute inset-0 bg-[#0066FF]/20 blur-[100px] rounded-full" />
              <div className="relative z-10 p-2 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/0 border border-white/10 backdrop-blur-xl transform-gpu rotate-y-[-10deg]">
                <img 
                  src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/meu%20adv%2026.png" 
                  alt="Interface VIP" 
                  className="rounded-[2rem] shadow-2xl w-full h-auto opacity-80 mix-blend-screen filter contrast-125"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#000814] border border-white/10 p-6 rounded-3xl shadow-2xl z-20">
                <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-1">100%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Exclusividade</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* APOIO ESPIRITUAL - DARK NARRATIVE */}
      <section id="proposito" className="relative z-20 py-32 bg-[#00040A] border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative perspective-1000 hidden md:block">
              <div className="bg-[#00102A] p-2 rounded-[2.5rem] border border-white/5 transform-gpu rotate-y-12 shadow-[20px_0_50px_rgba(0,102,255,0.1)]">
                <img 
                  src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/meu%20adv%202026.png" 
                  alt="Apoio Humano" 
                  className="rounded-[2rem] w-full h-auto opacity-70 mix-blend-screen hover:mix-blend-normal hover:opacity-100 transition-all duration-1000"
                />
              </div>
            </div>

            <div className="pl-0 lg:pl-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm font-bold text-rose-400 mb-8">
                <HeartHandshake className="w-4 h-4" /> O Lado Humano
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
                Apoiamos a justiça humana. <br/>
                Confiamos na <span className="text-[#0066FF]">justiça divina.</span>
              </h2>
              
              <p className="text-lg leading-relaxed text-slate-400 font-medium mb-10">
                Lidar com processos judiciais exige resiliência. Oferecemos um braço amigo humanizado além da tecnologia.
              </p>

              <div className="bg-[#000814] border border-[#0066FF]/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0066FF] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <h3 className="text-xl font-bold text-white mb-4">Rede de Intercessão Fechada</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Envie <strong>pedidos de oração</strong> confidencialmente. Nossa equipe dedica tempo real e genuíno para clamar pela sua proteção familiar e resolução da causa.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0066FF] px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-4 h-4" /> Acesso 100% Gratuito
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA - IMMERSIVE */}
      <section className="relative z-10 py-32 overflow-hidden border-t border-white/5 bg-[#000B21]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00040A] z-0" />
        <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10 text-center">
          
          <Scale className="w-16 h-16 text-[#0066FF] mx-auto mb-8" />
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
            A Justiça <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
              no seu Bolso.
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Moderno. Rápido. Cirúrgico. Feito para resolver. Integre-se ao futuro jurídico agora.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link to="/cadastro">
              <Button className="w-full sm:w-auto h-16 rounded-full bg-[#0066FF] hover:bg-blue-500 text-white px-12 text-lg font-bold shadow-[0_0_40px_rgba(0,102,255,0.4)] transition-all">
                Criar Conta Gratuitamente
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-20 py-10 bg-[#00040A] border-t border-white/5 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-slate-500" />
          <span className="text-xl font-black text-slate-400 tracking-tighter">Meu Advogado</span>
        </div>
        <p className="text-sm font-medium text-slate-600">
          © {new Date().getFullYear()} Plataforma Meu Advogado. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};
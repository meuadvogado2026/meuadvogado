/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { 
  Eye, 
  MessageCircle, 
  Star, 
  Heart, 
  Users, 
  TrendingUp, 
  Copy, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  LayoutDashboard,
  Loader2,
  Award,
  HeartHandshake,
  Sparkles,
  Maximize2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { VipCard } from "@/components/VipCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { subDays } from "date-fns";
import { shareOrCopy } from "@/utils/share";

const MetricCard = ({ title, value, icon: Icon, trend, trendValue, color, chartData, isLoading }: any) => (
  <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${color} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex flex-col items-end">
          {isLoading ? (
            <div className="w-12 h-4 bg-slate-100 animate-pulse rounded"></div>
          ) : (
            <span className={`text-xs font-bold flex items-center gap-0.5 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
              {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
              {trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
              {trendValue}
            </span>
          )}
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        {isLoading ? (
           <div className="w-20 h-8 bg-slate-100 animate-pulse rounded mt-1"></div>
        ) : (
           <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        )}
      </div>

      <div className="h-10 mt-4 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData || []}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={trend === 'up' ? '#16a34a' : trend === 'down' ? '#ef4444' : '#94a3b8'} 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export const LawyerDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  const [profileData, setProfileData] = useState<any>({});
  const [metrics, setMetrics] = useState({
    views: { total: 0, trend: 'neutral', trendLabel: '0%', data: [] as any[] },
    clicks: { total: 0, trend: 'neutral', trendLabel: '0%', data: [] as any[] },
    favorites: { total: 0, trend: 'neutral', trendLabel: '0%', data: [] as any[] },
    contacts: { total: 0, trend: 'neutral', trendLabel: '0%', data: [] as any[] },
    rating: { total: 0, trend: 'neutral', trendLabel: 'Estável', data: [] as any[] }
  });
  
  const [chartData, setChartData] = useState<any[]>([]);
  const [profileCompleteness, setProfileCompleteness] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showFullscreenCard, setShowFullscreenCard] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [prayerText, setPrayerText] = useState('');
  const [isSendingPrayer, setIsSendingPrayer] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('showVipWelcome') === 'true') {
      setShowWelcome(true);
      localStorage.removeItem('showVipWelcome');
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardData = async () => {
      try {
        const now = new Date();
        const sixtyDaysAgo = subDays(now, 60).toISOString();

        // 1. Busca perfil do advogado
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        const { data: details } = await supabase.from('lawyer_details').select('*').eq('id', user.id).single();
        
        if (profile) {
          setProfileData({ ...profile, ...details });
          
          let score = 0;
          if (profile.avatar_url) score += 15;
          if (profile.cover_url) score += 5;
          if (details?.full_bio) score += 20;
          if (details?.main_specialty) score += 15;
          if (details?.secondary_specialties?.length > 0) score += 5;
          if (details?.oab) score += 10;
          if (profile.city && profile.state) score += 10;
          if (details?.whatsapp) score += 10;
          if (details?.instagram || details?.linkedin) score += 10;
          setProfileCompleteness(Math.min(100, score));
        }

        const { data: events } = await supabase.from('lawyer_events').select('*').eq('lawyer_id', user.id).gte('created_at', sixtyDaysAgo);
        const { data: favs } = await supabase.from('favorites').select('*').eq('lawyer_id', user.id).gte('created_at', sixtyDaysAgo);
        const { data: urgents } = await supabase.from('urgent_calls').select('*').eq('lawyer_id', user.id).gte('created_at', sixtyDaysAgo);

        const safeEvents = events || [];
        const safeFavs = favs || [];
        const safeUrgents = urgents || [];

        const current30 = safeEvents.filter(e => new Date(e.created_at) >= subDays(now, 30));
        const previous30 = safeEvents.filter(e => new Date(e.created_at) < subDays(now, 30));

        const viewsNow = current30.filter(e => e.event_type === 'profile_view').length;
        const viewsPrev = previous30.filter(e => e.event_type === 'profile_view').length;
        
        const clicksNow = current30.filter(e => e.event_type === 'whatsapp_click').length;
        const clicksPrev = previous30.filter(e => e.event_type === 'whatsapp_click').length;

        const favsNow = safeFavs.filter(e => new Date(e.created_at) >= subDays(now, 30)).length;
        const favsPrev = safeFavs.filter(e => new Date(e.created_at) < subDays(now, 30)).length;

        const urgentsNow = safeUrgents.filter(e => new Date(e.created_at) >= subDays(now, 30)).length;
        const urgentsPrev = safeUrgents.filter(e => new Date(e.created_at) < subDays(now, 30)).length;
        const contactsNow = clicksNow + urgentsNow;
        const contactsPrev = clicksPrev + urgentsPrev;

        const getTrend = (current: number, prev: number) => {
          if (prev === 0 && current > 0) return { trend: 'up', label: '+100%' };
          if (prev === 0 && current === 0) return { trend: 'neutral', label: '0%' };
          const diff = ((current - prev) / prev) * 100;
          return {
            trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral',
            label: `${diff > 0 ? '+' : ''}${Math.round(diff)}%`
          };
        };

        setMetrics({
          views: { total: viewsNow, trend: getTrend(viewsNow, viewsPrev).trend, trendLabel: getTrend(viewsNow, viewsPrev).label, data: generateMiniChart(current30.filter(e => e.event_type === 'profile_view')) },
          clicks: { total: clicksNow, trend: getTrend(clicksNow, clicksPrev).trend, trendLabel: getTrend(clicksNow, clicksPrev).label, data: generateMiniChart(current30.filter(e => e.event_type === 'whatsapp_click')) },
          favorites: { total: favsNow, trend: getTrend(favsNow, favsPrev).trend, trendLabel: getTrend(favsNow, favsPrev).label, data: generateMiniChart(safeFavs.filter(e => new Date(e.created_at) >= subDays(now, 30))) },
          contacts: { total: contactsNow, trend: getTrend(contactsNow, contactsPrev).trend, trendLabel: getTrend(contactsNow, contactsPrev).label, data: generateMiniChart([...current30.filter(e => e.event_type === 'whatsapp_click'), ...safeUrgents.filter(e => new Date(e.created_at) >= subDays(now, 30))]) },
          rating: { total: details?.rating || 0, trend: 'neutral', trendLabel: 'Estável', data: [{value: details?.rating || 0}, {value: details?.rating || 0}] }
        });

        const newChartData = [1, 2, 3, 4].map(week => {
          const start = subDays(now, week * 7);
          const end = subDays(now, (week - 1) * 7);
          
          const weekEvents = current30.filter(e => {
            const d = new Date(e.created_at);
            return d >= start && d < end;
          });
          
          return {
            name: `Sem ${5 - week}`,
            visitas: weekEvents.filter(e => e.event_type === 'profile_view').length,
            contatos: weekEvents.filter(e => e.event_type === 'whatsapp_click').length
          };
        }).reverse();
        
        setChartData(newChartData);

      } catch (error) {
        console.error("Erro ao carregar dados do painel:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const generateMiniChart = (data: any[]) => {
      const now = new Date();
      return [5, 4, 3, 2, 1, 0].map(block => {
        const start = subDays(now, (block + 1) * 5);
        const end = subDays(now, block * 5);
        return {
          value: data.filter(e => {
            const d = new Date(e.created_at);
            return d >= start && d < end;
          }).length
        };
      });
    };

    fetchDashboardData();
  }, [user]);

  const profileLink = `${window.location.origin}/advogado/${user?.id || ''}`;
  const firstName = profileData?.name ? profileData.name.split(' ')[0] : 'Doutor(a)';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
    toast.success("Link copiado para a área de transferência!");
  };

  const handleShare = async () => {
    await shareOrCopy({
      title: `Perfil de Dr(a). ${firstName}`,
      text: 'Confira meu perfil profissional na plataforma Advogado 2.0.',
      url: profileLink
    });
  };

  const handlePrayerRequest = async () => {
    if (!prayerText.trim()) {
      toast.error("Por favor, escreva seu pedido de oração.");
      return;
    }
    if (!user) return;

    setIsSendingPrayer(true);
    try {
      const { error } = await supabase.from('prayer_requests').insert({
        user_id: user.id,
        user_name: profileData?.name || 'Anônimo',
        user_type: 'Advogado',
        request: prayerText.trim(),
        status: 'pending'
      });

      if (error) throw error;

      toast.success("Seu pedido de oração foi recebido com muito carinho e sigilo. Nossa equipe estará intercedendo por você!");
      setPrayerText('');
      setShowPrayerModal(false);
    } catch (error) {
      console.error('Erro ao enviar pedido de oração:', error);
      toast.error("Erro ao enviar pedido", { description: "Tente novamente em alguns instantes." });
    } finally {
      setIsSendingPrayer(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header Premium */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1 uppercase tracking-wider">
            <LayoutDashboard className="w-4 h-4" />
            Painel de Performance
          </div>
          <h1 className="text-3xl font-black text-slate-950">
            {isLoading ? <span className="inline-block w-64 h-8 bg-slate-100 animate-pulse rounded"></span> : `Olá, Dr(a). ${firstName}`}
          </h1>
          <p className="text-slate-500">Acompanhe os resultados reais do seu perfil na plataforma.</p>
        </div>

        <div className="w-full lg:w-72 space-y-3">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-700">Completude do Perfil</span>
            <span className="text-primary">{profileCompleteness}%</span>
          </div>
          <Progress value={profileCompleteness} className="h-2 bg-slate-100" />
          <p className="text-xs text-slate-400">
            {profileCompleteness === 100 ? "Seu perfil está perfeito e atraente!" : "Entre em contato com o administrador para completar seu perfil."}
          </p>
        </div>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard 
          isLoading={isLoading}
          title="Visitas ao Perfil" 
          value={metrics.views.total} 
          icon={Eye} 
          trend={metrics.views.trend} 
          trendValue={metrics.views.trendLabel} 
          color="bg-blue-600"
          chartData={metrics.views.data}
        />
        <MetricCard 
          isLoading={isLoading}
          title="Cliques WhatsApp" 
          value={metrics.clicks.total} 
          icon={MessageCircle} 
          trend={metrics.clicks.trend} 
          trendValue={metrics.clicks.trendLabel} 
          color="bg-green-600"
          chartData={metrics.clicks.data}
        />
        <MetricCard 
          isLoading={isLoading}
          title="Avaliação Média" 
          value={metrics.rating.total.toFixed(1)} 
          icon={Star} 
          trend={metrics.rating.trend} 
          trendValue={metrics.rating.trendLabel} 
          color="bg-amber-500"
          chartData={metrics.rating.data}
        />
        <MetricCard 
          isLoading={isLoading}
          title="Favoritos" 
          value={metrics.favorites.total} 
          icon={Heart} 
          trend={metrics.favorites.trend} 
          trendValue={metrics.favorites.trendLabel} 
          color="bg-rose-500"
          chartData={metrics.favorites.data}
        />
        <MetricCard 
          isLoading={isLoading}
          title="Contatos Totais" 
          value={metrics.contacts.total} 
          icon={Users} 
          trend={metrics.contacts.trend} 
          trendValue={metrics.contacts.trendLabel} 
          color="bg-indigo-600"
          chartData={metrics.contacts.data}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gráfico de Evolução */}
        <Card className="lg:col-span-8 border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 p-6">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Resumo dos últimos 30 dias</CardTitle>
                <CardDescription>Comparativo real de Visitas vs Contatos</CardDescription>
              </div>
              <Badge variant="outline" className="bg-white text-slate-500">Últimas 4 Semanas</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} allowDecimals={false} />
                    <RechartsTooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visitas" 
                      name="Visitas"
                      stroke="#1e293b" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorVisitas)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="contatos"
                      name="Contatos" 
                      stroke="#2563eb" 
                      strokeWidth={3}
                      fill="transparent"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Taxa de Conversão Atual
                </div>
                <p className="text-sm text-slate-600">
                  {metrics.views.total > 0 
                    ? `Cerca de ${Math.round((metrics.clicks.total / metrics.views.total) * 100)}% dos visitantes clicaram no seu WhatsApp.`
                    : "Aguardando mais visitantes para calcular sua taxa."}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Dica Rápida
                </div>
                <p className="text-sm text-slate-600">
                  {profileCompleteness < 100 
                    ? "Completar seu perfil aumentará radicalmente sua visibilidade."
                    : "Compartilhe seu link público em suas redes sociais para atrair mais clientes."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar de Ações e Dicas */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* VIP Card Digital */}
          <div className="relative group cursor-pointer w-full flex flex-col items-center gap-4" title="Clique para copiar seu Link do Perfil">
            <div className="relative w-full flex justify-center" onClick={copyToClipboard}>
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-[#0066FF] rounded-[1.7rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <VipCard 
                name={isLoading ? '...' : (profileData?.name || '')} 
                oab={profileData?.oab || ''} 
                oabState={profileData?.oab_state || ''} 
              />
              {/* Overlay hint */}
              <div className="absolute inset-0 bg-black/40 rounded-[1.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                <div className="bg-white/10 p-3 rounded-full flex items-center gap-2 border border-white/20 shadow-xl">
                   <Copy className="w-5 h-5 text-white" />
                   <span className="text-white font-bold text-sm">Copiar Link</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setShowFullscreenCard(true)}
              variant="outline"
              className="w-full h-10 rounded-xl border-[#0066FF]/30 bg-[#000B21] hover:bg-[#001433] text-amber-400 hover:text-amber-300 font-bold text-xs transition-all shadow-lg shadow-[#000B21]/30"
            >
              <Maximize2 className="w-4 h-4 mr-2" /> Apresentar Cartão em Tela Cheia
            </Button>
          </div>

          {/* Benefícios & Pedido de Oração */}
          <Card className="border-slate-200/60 shadow-sm rounded-[2rem] overflow-hidden bg-gradient-to-b from-white to-slate-50">
            <CardHeader className="border-b border-slate-100 bg-white pb-5">
              <CardTitle className="text-lg flex items-center gap-2 font-black text-slate-800">
                <HeartHandshake className="w-5 h-5 text-rose-500 drop-shadow-sm" />
                Espaço do Advogado
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-7">
              <div>
                <h4 className="text-sm font-bold tracking-tight text-slate-900 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Seus Benefícios Exclusivos
                </h4>
                <ul className="space-y-3">
                  {[
                    "Prioridade máxima no Algoritmo de Match",
                    "Página de alta conversão para clientes",
                    "Recebimento de honorários direto via WhatsApp"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                      <div className="mt-0.5 bg-green-100 p-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-gradient-to-br from-rose-50 to-pink-50/50 border border-rose-100 rounded-2xl relative overflow-hidden group shadow-inner">
                <div className="absolute right-0 top-0 opacity-5 -mt-6 -mr-6 group-hover:scale-110 transition-transform duration-500">
                  <Heart className="w-32 h-32 text-rose-500" />
                </div>
                <h4 className="text-[15px] font-black text-rose-900 mb-1.5 relative z-10 tracking-tight">Precisa de um abraço espiritual?</h4>
                <p className="text-xs text-rose-700/80 font-medium mb-5 relative z-10 leading-relaxed">
                  A advocacia exige muito de nós. Temos uma equipe pronta para orar e interceder pelas suas vitórias e desafios diários.
                </p>
                <Button 
                  onClick={() => setShowPrayerModal(true)} 
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl relative z-10 shadow-md shadow-rose-600/20 active:scale-95 transition-all"
                >
                  <Heart className="w-4 h-4 mr-2" /> Fazer Pedido de Oração
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white rounded-3xl border-none shadow-2xl">
          <div className="bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#1e293b] p-6 sm:p-8 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            
            <div className="relative z-10 w-full flex justify-center scale-95 sm:scale-100 origin-top">
              <VipCard 
                name={profileData?.name || ''} 
                oab={profileData?.oab || ''} 
                oabState={profileData?.oab_state || ''} 
              />
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-b from-rose-50 to-white relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-5 -mb-6 -mr-6">
              <Heart className="w-32 h-32 text-rose-500" />
            </div>
            <DialogHeader className="text-left space-y-3">
              <DialogTitle className="text-lg flex items-center gap-2 font-black text-slate-800 tracking-tight">
                <HeartHandshake className="w-5 h-5 text-rose-500 drop-shadow-sm" />
                Espaço Espiritual Apoiador
              </DialogTitle>
              <DialogDescription className="text-[13px] font-medium text-slate-600 pt-1 leading-relaxed">
                Sabemos o peso emocional que a advocacia traz. Acreditamos fortemente no poder da fé. Se a qualquer momento você, sua família ou suas causas judiciais precisarem de um apoio extra, nossa equipe intercessora estará de prontidão para orar por você em nosso Espaço do Advogado no painel.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              <Button onClick={() => setShowWelcome(false)} className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl h-12 font-bold shadow-lg shadow-slate-900/20 active:scale-95 transition-all">
                Acessar Meu Painel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen VIP Card Presentation */}
      <Dialog open={showFullscreenCard} onOpenChange={setShowFullscreenCard}>
        <DialogContent className="max-w-none w-screen h-screen p-0 m-0 border-none bg-[#000B21] flex items-center justify-center [&>button]:text-white [&>button]:opacity-70 [&>button]:hover:opacity-100 [&>button]:top-6 [&>button]:right-6">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#0066FF]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-[600px] px-6 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-amber-400 font-black text-xs uppercase tracking-[0.3em] mb-2">Cartão de Membro VIP</p>
              <p className="text-white/40 text-[11px] font-medium">Apresente este cartão no local do benefício para resgatar</p>
            </div>
            <VipCard 
              name={profileData?.name || ''} 
              oab={profileData?.oab || ''} 
              oabState={profileData?.oab_state || ''} 
            />
            <Button 
              onClick={() => setShowFullscreenCard(false)} 
              variant="outline"
              className="border-white/10 text-white/60 hover:text-white hover:bg-white/10 rounded-full px-8 h-10 font-bold text-xs"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Pedido de Oração */}
      <Dialog open={showPrayerModal} onOpenChange={setShowPrayerModal}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white rounded-3xl border-none shadow-2xl">
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 sm:p-8 border-b border-rose-100 relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-5 -mt-8 -mr-8">
              <Heart className="w-40 h-40 text-rose-500" />
            </div>
            <DialogHeader className="text-left space-y-2">
              <DialogTitle className="text-xl flex items-center gap-2 font-black text-rose-900 tracking-tight">
                <HeartHandshake className="w-5 h-5 text-rose-500" />
                Pedido de Oração
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-rose-700/70 leading-relaxed">
                Escreva aqui o que está no seu coração. Seu pedido será tratado com total sigilo e carinho pela nossa equipe de intercessão.
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <div className="p-6 sm:p-8 space-y-6">
            <Textarea
              placeholder="Descreva seu pedido de oração aqui... Pode ser pela sua família, por uma causa judicial, pela sua saúde ou qualquer necessidade."
              value={prayerText}
              onChange={(e) => setPrayerText(e.target.value)}
              className="min-h-[140px] resize-none rounded-2xl border-slate-200 bg-slate-50 text-sm font-medium placeholder:text-slate-400 focus:border-rose-300 focus:ring-rose-200"
              maxLength={1000}
            />
            <p className="text-xs text-slate-400 text-right font-medium">{prayerText.length}/1000 caracteres</p>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPrayerModal(false)}
                className="w-full sm:w-auto rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                disabled={isSendingPrayer}
              >
                Cancelar
              </Button>
              <Button
                onClick={handlePrayerRequest}
                disabled={isSendingPrayer || !prayerText.trim()}
                className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md shadow-rose-600/20 active:scale-95 transition-all"
              >
                {isSendingPrayer ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Heart className="w-4 h-4 mr-2" />
                )}
                {isSendingPrayer ? 'Enviando...' : 'Enviar Pedido'}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
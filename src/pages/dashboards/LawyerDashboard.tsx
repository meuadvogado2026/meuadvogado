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
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
import { subDays, startOfDay, endOfDay } from "date-fns";

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

  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardData = async () => {
      try {
        const now = new Date();
        const thirtyDaysAgo = subDays(now, 30).toISOString();
        const sixtyDaysAgo = subDays(now, 60).toISOString();

        // 1. Busca perfil do advogado
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        const { data: details } = await supabase.from('lawyer_details').select('*').eq('id', user.id).single();
        
        if (profile) {
          setProfileData({ ...profile, ...details });
          
          // Cálculo de completude do perfil
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

        // 2. Busca eventos (Views e Cliques do WhatsApp)
        const { data: events } = await supabase
          .from('lawyer_events')
          .select('*')
          .eq('lawyer_id', user.id)
          .gte('created_at', sixtyDaysAgo);

        // 3. Busca Favoritos
        const { data: favs } = await supabase
          .from('favorites')
          .select('*')
          .eq('lawyer_id', user.id)
          .gte('created_at', sixtyDaysAgo);

        // 4. Busca Chamadas Urgentes (Contatos extras)
        const { data: urgents } = await supabase
          .from('urgent_calls')
          .select('*')
          .eq('lawyer_id', user.id)
          .gte('created_at', sixtyDaysAgo);

        const safeEvents = events || [];
        const safeFavs = favs || [];
        const safeUrgents = urgents || [];

        // Filtra por períodos
        const current30 = safeEvents.filter(e => new Date(e.created_at) >= subDays(now, 30));
        const previous30 = safeEvents.filter(e => new Date(e.created_at) < subDays(now, 30));

        // Views
        const viewsNow = current30.filter(e => e.event_type === 'profile_view').length;
        const viewsPrev = previous30.filter(e => e.event_type === 'profile_view').length;
        
        // WhatsApp Clicks
        const clicksNow = current30.filter(e => e.event_type === 'whatsapp_click').length;
        const clicksPrev = previous30.filter(e => e.event_type === 'whatsapp_click').length;

        // Favoritos
        const favsNow = safeFavs.filter(e => new Date(e.created_at) >= subDays(now, 30)).length;
        const favsPrev = safeFavs.filter(e => new Date(e.created_at) < subDays(now, 30)).length;

        // Contatos Recebidos (WhatsApp + Urgentes)
        const urgentsNow = safeUrgents.filter(e => new Date(e.created_at) >= subDays(now, 30)).length;
        const urgentsPrev = safeUrgents.filter(e => new Date(e.created_at) < subDays(now, 30)).length;
        const contactsNow = clicksNow + urgentsNow;
        const contactsPrev = clicksPrev + urgentsPrev;

        // Função para calcular tendência
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

        // Gráfico principal (Agrupado por Semana das últimas 4 semanas)
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

    fetchDashboardData();
  }, [user]);

  // Função auxiliar para gerar dados pros mini-gráficos (dividir os ultimos 30 dias em 6 blocos de 5 dias)
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

  const profileLink = profileData?.custom_link || `meuadvogado.com/advogado/${user?.id?.substring(0,8)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
    toast.success("Link copiado para a área de transferência!");
  };

  const firstName = profileData?.name ? profileData.name.split(' ')[0] : 'Doutor(a)';

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
            {profileCompleteness === 100 ? "Seu perfil está perfeito e atraente!" : "Complete seu perfil em 'Editar Perfil' para chegar a 100%."}
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
          {/* Link Público Card */}
          <Card className="border-none bg-primary text-white rounded-3xl shadow-xl shadow-primary/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <TrendingUp className="w-32 h-32" />
            </div>
            <CardContent className="p-8 relative z-10">
              <h3 className="text-xl font-bold mb-2">Seu Cartão de Visitas</h3>
              <p className="text-blue-100/70 text-sm mb-6">Compartilhe seu perfil otimizado e receba contatos diretos.</p>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20 mb-6 group cursor-pointer" onClick={copyToClipboard}>
                <span className="text-xs font-mono truncate mr-4">
                  {isLoading ? "..." : profileLink}
                </span>
                <Copy className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
              </div>
              
              <Button onClick={copyToClipboard} className="w-full bg-white text-primary hover:bg-blue-50 font-bold h-12 rounded-xl">
                Compartilhar agora
              </Button>
            </CardContent>
          </Card>

          {/* Dicas Card */}
          <Card className="border-slate-200/60 shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Estratégias de Crescimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Foto Profissional", desc: "Fotos em ambientes neutros e iluminados convertem 3x mais clientes.", icon: ChevronRight },
                { title: "Atendimento Rápido", desc: "Responder ao cliente no WhatsApp em menos de 5 minutos garante 80% de fechamento.", icon: ChevronRight },
                { title: "Bio Resumida", desc: "Foque nos problemas reais que você resolve logo no 1º parágrafo.", icon: ChevronRight }
              ].map((dica, i) => (
                <div key={i} className="group flex items-start justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{dica.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{dica.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
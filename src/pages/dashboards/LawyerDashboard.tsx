import React from 'react';
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
  LayoutDashboard
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
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { toast } from "sonner";

// Dados mockados para os gráficos
const performanceData = [
  { name: 'Sem 1', visitas: 45, contatos: 12 },
  { name: 'Sem 2', visitas: 52, contatos: 18 },
  { name: 'Sem 3', visitas: 48, contatos: 15 },
  { name: 'Sem 4', visitas: 61, contatos: 22 },
];

const miniChartData = [
  { value: 10 }, { value: 15 }, { value: 8 }, { value: 22 }, { value: 18 }, { value: 25 }
];

const MetricCard = ({ title, value, icon: Icon, trend, trendValue, color, chartData }: any) => (
  <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${color} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xs font-bold flex items-center gap-0.5 ${trend === 'up' ? 'text-green-600' : 'text-slate-400'}`}>
            {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
            {trendValue}
          </span>
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>

      <div className="h-10 mt-4 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={trend === 'up' ? '#16a34a' : '#94a3b8'} 
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
  const profileLink = "meuadvogado.com/dr-carlos-eduardo";
  const profileCompleteness = 85;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
    toast.success("Link copiado para a área de transferência!");
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
          <h1 className="text-3xl font-black text-slate-950">Olá, Dr. Carlos Eduardo</h1>
          <p className="text-slate-500">Seu perfil está performando <span className="text-green-600 font-bold">12% melhor</span> que no mês passado.</p>
        </div>

        <div className="w-full lg:w-72 space-y-3">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-700">Completude do Perfil</span>
            <span className="text-primary">{profileCompleteness}%</span>
          </div>
          <Progress value={profileCompleteness} className="h-2 bg-slate-100" />
          <p className="text-xs text-slate-400">Complete sua biografia para chegar aos 100%.</p>
        </div>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard 
          title="Visitas ao Perfil" 
          value="1,248" 
          icon={Eye} 
          trend="up" 
          trendValue="+14%" 
          color="bg-blue-600"
          chartData={miniChartData}
        />
        <MetricCard 
          title="Cliques WhatsApp" 
          value="84" 
          icon={MessageCircle} 
          trend="up" 
          trendValue="+5%" 
          color="bg-green-600"
          chartData={[{value: 5}, {value: 12}, {value: 10}, {value: 18}, {value: 15}, {value: 20}]}
        />
        <MetricCard 
          title="Avaliação Média" 
          value="4.9" 
          icon={Star} 
          trend="neutral" 
          trendValue="Estável" 
          color="bg-amber-500"
          chartData={[{value: 4.9}, {value: 4.8}, {value: 4.9}, {value: 5.0}, {value: 4.9}, {value: 4.9}]}
        />
        <MetricCard 
          title="Favoritos" 
          value="32" 
          icon={Heart} 
          trend="up" 
          trendValue="+2" 
          color="bg-rose-500"
          chartData={[{value: 2}, {value: 4}, {value: 3}, {value: 8}, {value: 10}, {value: 12}]}
        />
        <MetricCard 
          title="Contatos Recebidos" 
          value="156" 
          icon={Users} 
          trend="up" 
          trendValue="+18%" 
          color="bg-indigo-600"
          chartData={[{value: 10}, {value: 20}, {value: 15}, {value: 30}, {value: 25}, {value: 40}]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gráfico de Evolução */}
        <Card className="lg:col-span-8 border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/50 p-6">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold">Resumo dos últimos 30 dias</CardTitle>
                <CardDescription>Comparativo de Visitas vs Contatos</CardDescription>
              </div>
              <Badge variant="outline" className="bg-white">Maio 2024</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitas" 
                    stroke="#1e293b" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorVisitas)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="contatos" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  O que está funcionando bem
                </div>
                <p className="text-sm text-slate-600">Sua taxa de resposta no WhatsApp é de 98%, a melhor da sua região.</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Oportunidades de melhoria
                </div>
                <p className="text-sm text-slate-600">Aumente sua visibilidade adicionando "Direito Civil" como especialidade.</p>
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
                <span className="text-xs font-mono truncate mr-4">{profileLink}</span>
                <Copy className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
              </div>
              
              <Button className="w-full bg-white text-primary hover:bg-blue-50 font-bold h-12 rounded-xl">
                Compartilhar agora
              </Button>
            </CardContent>
          </Card>

          {/* Dicas Card */}
          <Card className="border-slate-200/60 shadow-sm rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Dicas de Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Foto Profissional", desc: "Fotos em ambientes neutros convertem 3x mais.", icon: ChevronRight },
                { title: "Depoimentos", desc: "Peça para 3 clientes avaliarem seu perfil hoje.", icon: ChevronRight },
                { title: "Bio Resumida", desc: "Foque nos problemas que você resolve no 1º parágrafo.", icon: ChevronRight }
              ].map((dica, i) => (
                <div key={i} className="group cursor-pointer flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{dica.title}</h4>
                    <p className="text-xs text-slate-500">{dica.desc}</p>
                  </div>
                  <dica.icon className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              ))}
              
              <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-primary font-bold mt-2">
                Ver todas as estratégias
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
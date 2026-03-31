/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  MapPin, 
  Award,
  Search,
  ChevronRight,
  Loader2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { subMonths, startOfMonth, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para armazenar os dados calculados
  const [kpis, setKpis] = useState({
    lawyersTotal: 0, lawyersGrowth: 0,
    clientsTotal: 0, clientsGrowth: 0,
    approvedOab: 0, pendingOab: 0
  });
  
  const [chartData, setChartData] = useState<any[]>([]);
  const [quickStats, setQuickStats] = useState({ topProfiles: [], topCities: [], topSpecialties: [] });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // 1. Buscar Perfis
      const { data: profiles } = await supabase.from('profiles').select('id, name, role, city, created_at');
      
      // 2. Buscar Detalhes de Advogados
      const { data: details } = await supabase.from('lawyer_details').select('id, status, main_specialty');
      
      // 3. Buscar Eventos de Perfil (Views)
      const { data: events } = await supabase.from('lawyer_events').select('lawyer_id').eq('event_type', 'profile_view');

      const safeProfiles = profiles || [];
      const safeDetails = details || [];
      const safeEvents = events || [];

      const now = new Date();
      const currentMonthStart = startOfMonth(now);
      const prevMonthStart = startOfMonth(subMonths(now, 1));

      // --- CÁLCULO DE KPIs ---
      const lawyers = safeProfiles.filter(p => p.role === 'lawyer');
      const clients = safeProfiles.filter(p => p.role === 'client');
      
      const lawyersCurrentMonth = lawyers.filter(p => new Date(p.created_at) >= currentMonthStart).length;
      const lawyersPrevMonth = lawyers.filter(p => new Date(p.created_at) >= prevMonthStart && new Date(p.created_at) < currentMonthStart).length;
      const lGrowth = lawyersPrevMonth === 0 ? (lawyersCurrentMonth > 0 ? 100 : 0) : ((lawyersCurrentMonth - lawyersPrevMonth) / lawyersPrevMonth) * 100;

      const clientsCurrentMonth = clients.filter(p => new Date(p.created_at) >= currentMonthStart).length;
      const clientsPrevMonth = clients.filter(p => new Date(p.created_at) >= prevMonthStart && new Date(p.created_at) < currentMonthStart).length;
      const cGrowth = clientsPrevMonth === 0 ? (clientsCurrentMonth > 0 ? 100 : 0) : ((clientsCurrentMonth - clientsPrevMonth) / clientsPrevMonth) * 100;

      const approved = safeDetails.filter(d => d.status === 'approved').length;
      const pending = safeDetails.filter(d => d.status === 'pending').length;

      setKpis({
        lawyersTotal: lawyers.length,
        lawyersGrowth: Math.round(lGrowth),
        clientsTotal: clients.length,
        clientsGrowth: Math.round(cGrowth),
        approvedOab: approved,
        pendingOab: pending
      });

      // --- CÁLCULO DO GRÁFICO (Últimos 6 meses) ---
      const newChartData = [];
      for (let i = 5; i >= 0; i--) {
        const monthStart = startOfMonth(subMonths(now, i));
        const monthEnd = i === 0 ? now : startOfMonth(subMonths(now, i - 1));
        
        const mName = format(monthStart, 'MMM', { locale: ptBR });
        const mLawyers = lawyers.filter(p => { const d = new Date(p.created_at); return d >= monthStart && d < monthEnd; }).length;
        const mClients = clients.filter(p => { const d = new Date(p.created_at); return d >= monthStart && d < monthEnd; }).length;
        
        newChartData.push({ month: mName.charAt(0).toUpperCase() + mName.slice(1), advogados: mLawyers, clientes: mClients });
      }
      setChartData(newChartData);

      // --- INSIGHTS RÁPIDOS ---
      // Top Profiles
      const viewsCount: Record<string, number> = {};
      safeEvents.forEach(e => { viewsCount[e.lawyer_id] = (viewsCount[e.lawyer_id] || 0) + 1; });
      const topProfilesData = Object.entries(viewsCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([id, count]) => {
          const profile = safeProfiles.find(p => p.id === id);
          return { name: profile?.name || 'Desconhecido', views: `${count} vistas` };
        });

      // Top Cities
      const citiesCount: Record<string, number> = {};
      lawyers.forEach(l => {
        if (l.city) citiesCount[l.city] = (citiesCount[l.city] || 0) + 1;
      });
      const topCitiesData = Object.entries(citiesCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, count]) => ({ name, count: `${count} advs` }));

      // Top Specialties
      const specCount: Record<string, number> = {};
      let totalSpecs = 0;
      safeDetails.forEach(d => {
        if (d.main_specialty) {
          specCount[d.main_specialty] = (specCount[d.main_specialty] || 0) + 1;
          totalSpecs++;
        }
      });
      const topSpecData = Object.entries(specCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name, count]) => ({ name, searches: `${Math.round((count / (totalSpecs || 1)) * 100)}%` }));

      setQuickStats({
        topProfiles: topProfilesData as never[],
        topCities: topCitiesData as never[],
        topSpecialties: topSpecData as never[]
      });

      // --- ÚLTIMOS CADASTROS ---
      const sortedProfiles = [...safeProfiles].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
      
      const recentUsersData = sortedProfiles.map(p => {
        const detail = safeDetails.find(d => d.id === p.id);
        
        let status = 'Ativo';
        if (p.role === 'lawyer') {
          status = detail?.status === 'pending' ? 'Aguardando OAB' : detail?.status === 'approved' ? 'Ativo' : 'Rejeitado';
        }

        const dateObj = new Date(p.created_at);
        const isToday = dateObj.toDateString() === now.toDateString();
        const dateStr = isToday ? `Hoje, ${format(dateObj, 'HH:mm')}` : format(dateObj, 'dd/MM/yyyy');

        return {
          id: p.id,
          name: p.name || 'Sem nome',
          type: p.role === 'lawyer' ? 'Advogado' : p.role === 'admin' ? 'Admin' : 'Cliente',
          date: dateStr,
          status: status
        };
      });

      setRecentUsers(recentUsersData);

    } catch (error) {
      console.error("Erro ao carregar o dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      {isLoading && (
        <div className="absolute inset-0 z-50 bg-slate-50/50 backdrop-blur-sm flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-xl">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="font-bold text-slate-600">Calculando métricas da plataforma...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Visão Geral da Plataforma</h1>
          <p className="text-slate-500 mt-1">Métricas de crescimento, aprovações e uso do sistema em tempo real.</p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline" className="h-11 px-6 rounded-xl font-bold border-slate-200 text-slate-700 hover:bg-slate-100">
          Atualizar Dados
        </Button>
      </div>

      {/* Grid de KPIs (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform"><Briefcase className="w-24 h-24" /></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Advogados</p>
                <h3 className="text-3xl font-black text-slate-900">{kpis.lawyersTotal}</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
            <div className={`mt-4 flex items-center text-sm font-medium ${kpis.lawyersGrowth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              <TrendingUp className="w-4 h-4 mr-1" /> {kpis.lawyersGrowth >= 0 ? '+' : ''}{kpis.lawyersGrowth}% este mês
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform"><Users className="w-24 h-24" /></div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Clientes</p>
                <h3 className="text-3xl font-black text-slate-900">{kpis.clientsTotal}</h3>
              </div>
              <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className={`mt-4 flex items-center text-sm font-medium ${kpis.clientsGrowth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              <TrendingUp className="w-4 h-4 mr-1" /> {kpis.clientsGrowth >= 0 ? '+' : ''}{kpis.clientsGrowth}% este mês
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm rounded-3xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">OAB Validada</p>
                <h3 className="text-3xl font-black text-slate-900">{kpis.approvedOab}</h3>
              </div>
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-slate-500">
              Perfis ativos e visíveis
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm rounded-3xl border-amber-200/50 bg-amber-50/30 transition-colors hover:bg-amber-50/60">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-1">Aguardando</p>
                <h3 className="text-3xl font-black text-amber-900">{kpis.pendingOab}</h3>
              </div>
              <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <Link to="/admin/aprovacoes" className="mt-4 flex items-center text-sm font-bold text-amber-600 hover:text-amber-800 cursor-pointer transition-colors">
              Revisar agora <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid: Gráfico (2/3) + Estatísticas (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico de Crescimento */}
        <Card className="lg:col-span-2 border-slate-200/60 shadow-sm rounded-3xl overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-white pb-6">
            <CardTitle className="text-xl font-black text-slate-900">Crescimento da Plataforma</CardTitle>
            <CardDescription className="text-sm font-medium">Novos cadastros por mês nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClientes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAdvogados" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold'}}
                  itemStyle={{fontWeight: 600}}
                />
                <Area type="monotone" dataKey="clientes" name="Clientes" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#colorClientes)" />
                <Area type="monotone" dataKey="advogados" name="Advogados" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAdvogados)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <Card className="border-slate-200/60 shadow-sm rounded-3xl flex flex-col bg-slate-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-black text-slate-900">Insights Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8 flex-1">
            
            {/* Perfis Mais Acessados */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-500 uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-500" /> Top Perfis (Visitas)
              </div>
              <div className="space-y-3">
                {quickStats.topProfiles.length > 0 ? quickStats.topProfiles.map((item: any, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="font-bold text-slate-800 text-sm truncate pr-2">{item.name}</span>
                    <span className="text-xs font-semibold text-primary bg-blue-50 px-2 py-1 rounded-md shrink-0">{item.views}</span>
                  </div>
                )) : <p className="text-sm text-slate-400 font-medium">Dados insuficientes</p>}
              </div>
            </div>

            {/* Cidades em Destaque */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-500 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-rose-500" /> Top Cidades (Advs)
              </div>
              <div className="space-y-3">
                {quickStats.topCities.length > 0 ? quickStats.topCities.map((item: any, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="font-bold text-slate-800 text-sm truncate pr-2">{item.name}</span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md shrink-0">{item.count}</span>
                  </div>
                )) : <p className="text-sm text-slate-400 font-medium">Dados insuficientes</p>}
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-500 uppercase tracking-wider">
                <Search className="w-4 h-4 text-indigo-500" /> Especialidades Comuns
              </div>
              <div className="flex flex-wrap gap-2">
                {quickStats.topSpecialties.length > 0 ? quickStats.topSpecialties.map((item: any, i) => (
                  <Badge key={i} variant="secondary" className="bg-white border-slate-200 text-slate-700 px-3 py-1.5 shadow-sm text-xs font-bold">
                    {item.name} <span className="text-slate-400 ml-1 font-medium">{item.searches}</span>
                  </Badge>
                )) : <p className="text-sm text-slate-400 font-medium">Dados insuficientes</p>}
              </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Tabela de Últimos Cadastros */}
      <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-white pb-5">
          <CardTitle className="text-xl font-black text-slate-900">Últimos Cadastros</CardTitle>
          <CardDescription className="text-sm font-medium">Lista em tempo real dos novos usuários.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-slate-50 border-b-slate-200">
                <TableHead className="font-bold text-slate-600 h-12 px-6">Nome</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Tipo</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Data</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Status</TableHead>
                <TableHead className="font-bold text-slate-600 h-12 text-right px-6">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user, i) => (
                <TableRow key={i} className="border-b-slate-100 hover:bg-slate-50/80 transition-colors group">
                  <TableCell className="font-black text-slate-900 px-6 py-4">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant={user.type === 'Advogado' ? 'default' : 'secondary'} className={user.type === 'Advogado' ? 'bg-[#1E3A5F]' : 'bg-slate-100 text-slate-600'}>
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-500">{user.date}</TableCell>
                  <TableCell>
                    {user.status === 'Aguardando OAB' ? (
                      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                        <Clock className="w-3 h-3 mr-1" /> {user.status}
                      </Badge>
                    ) : user.status === 'Rejeitado' ? (
                      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
                        {user.status}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                        <ShieldCheck className="w-3 h-3 mr-1" /> {user.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <Link to="/admin/usuarios">
                      <Button variant="ghost" size="sm" className="font-bold text-primary hover:text-blue-800 hover:bg-blue-50 rounded-xl">
                        Ver detalhes
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {recentUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-slate-500 font-medium">Nenhum registro encontrado.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
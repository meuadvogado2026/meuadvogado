import React from 'react';
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
  ChevronRight
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

// --- MOCK DATA LOCAL PARA O DASHBOARD ---
const growthData = [
  { month: 'Jan', advogados: 45, clientes: 120 },
  { month: 'Fev', advogados: 52, clientes: 180 },
  { month: 'Mar', advogados: 61, clientes: 250 },
  { month: 'Abr', advogados: 85, clientes: 380 },
  { month: 'Mai', advogados: 110, clientes: 520 },
  { month: 'Jun', advogados: 145, clientes: 750 },
];

const quickStats = {
  topProfiles: [
    { name: "Dr. Carlos Eduardo", views: "1.2k vistas" },
    { name: "Dra. Mariana Costa", views: "980 vistas" },
    { name: "Dr. Roberto Alves", views: "845 vistas" },
  ],
  topCities: [
    { name: "São Paulo, SP", count: "450 advs" },
    { name: "Rio de Janeiro, RJ", count: "320 advs" },
    { name: "Curitiba, PR", count: "185 advs" },
  ],
  topSpecialties: [
    { name: "Trabalhista", searches: "35%" },
    { name: "Família", searches: "28%" },
    { name: "Civil", searches: "15%" },
  ]
};

const recentUsers = [
  { name: "Juliana Santos", type: "Cliente", date: "Hoje, 14:30", status: "Ativo" },
  { name: "Dr. Marcos Vinicius", type: "Advogado", date: "Hoje, 11:15", status: "Aguardando OAB" },
  { name: "Pedro Almeida", type: "Cliente", date: "Ontem, 18:45", status: "Ativo" },
  { name: "Dra. Fernanda Lima", type: "Advogado", date: "Ontem, 14:20", status: "Ativo" },
  { name: "Carlos Magno", type: "Cliente", date: "Ontem, 09:10", status: "Ativo" },
];

export const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Visão Geral da Plataforma</h1>
          <p className="text-slate-500 mt-1">Métricas de crescimento, aprovações e uso do sistema.</p>
        </div>
        <Button className="bg-primary text-white hover:bg-blue-900 h-11 px-6 rounded-xl font-bold shadow-lg shadow-primary/20">
          Gerar Relatório
        </Button>
      </div>

      {/* Grid de KPIs (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200/60 shadow-sm rounded-3xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Advogados</p>
                <h3 className="text-3xl font-black text-slate-900">1.245</h3>
              </div>
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" /> +12% este mês
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200/60 shadow-sm rounded-3xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Clientes</p>
                <h3 className="text-3xl font-black text-slate-900">8.430</h3>
              </div>
              <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" /> +24% este mês
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm rounded-3xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">OAB Validada</p>
                <h3 className="text-3xl font-black text-slate-900">1.100</h3>
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

        <Card className="border-slate-200/60 shadow-sm rounded-3xl border-amber-200/50 bg-amber-50/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-1">Aguardando</p>
                <h3 className="text-3xl font-black text-amber-900">145</h3>
              </div>
              <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-bold text-amber-600 hover:text-amber-700 cursor-pointer">
              Revisar agora <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid: Gráfico (2/3) + Estatísticas (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico de Crescimento */}
        <Card className="lg:col-span-2 border-slate-200/60 shadow-sm rounded-3xl overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-100 bg-white pb-6">
            <CardTitle className="text-xl font-black text-slate-900">Crescimento da Plataforma</CardTitle>
            <CardDescription className="text-sm font-medium">Novos cadastros por mês (Clientes x Advogados)</CardDescription>
          </CardHeader>
          <CardContent className="p-6 flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
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
                <Award className="w-4 h-4 text-amber-500" /> Top Perfis
              </div>
              <div className="space-y-3">
                {quickStats.topProfiles.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                    <span className="text-xs font-semibold text-primary bg-blue-50 px-2 py-1 rounded-md">{item.views}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cidades em Destaque */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-500 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-rose-500" /> Top Cidades
              </div>
              <div className="space-y-3">
                {quickStats.topCities.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Especialidades */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-500 uppercase tracking-wider">
                <Search className="w-4 h-4 text-indigo-500" /> Buscas Mais Frequentes
              </div>
              <div className="flex flex-wrap gap-2">
                {quickStats.topSpecialties.map((item, i) => (
                  <Badge key={i} variant="secondary" className="bg-white border-slate-200 text-slate-700 px-3 py-1.5 shadow-sm text-xs font-bold">
                    {item.name} <span className="text-slate-400 ml-1 font-medium">{item.searches}</span>
                  </Badge>
                ))}
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
                <TableHead className="font-bold text-slate-600 h-12 px-6">Nome / Usuário</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Tipo</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Data de Entrada</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Status</TableHead>
                <TableHead className="font-bold text-slate-600 h-12 text-right px-6">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user, i) => (
                <TableRow key={i} className="border-b-slate-100 hover:bg-slate-50/80 transition-colors group">
                  <TableCell className="font-black text-slate-900 px-6 py-4">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant={user.type === 'Advogado' ? 'default' : 'secondary'} className={user.type === 'Advogado' ? 'bg-primary' : 'bg-slate-100 text-slate-600'}>
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-500">{user.date}</TableCell>
                  <TableCell>
                    {user.status === 'Aguardando OAB' ? (
                      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                        <Clock className="w-3 h-3 mr-1" /> {user.status}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                        <ShieldCheck className="w-3 h-3 mr-1" /> {user.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <Button variant="ghost" size="sm" className="font-bold text-primary hover:text-blue-800 hover:bg-blue-50 rounded-xl">
                      Ver detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
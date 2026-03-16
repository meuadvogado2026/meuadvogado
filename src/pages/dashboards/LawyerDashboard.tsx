import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MousePointerClick, Star, TrendingUp, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LawyerDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Resumo do Perfil</h1>
          <p className="text-slate-500 mt-1">Acompanhe seu desempenho nos últimos 30 dias.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Perfil Ativo
          </span>
          <Button variant="outline" size="sm" className="gap-2">
            <Bell className="w-4 h-4" /> Notificações
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Visualizações do Perfil</p>
                <h3 className="text-3xl font-bold text-slate-900">342</h3>
              </div>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4 flex items-center gap-1 font-medium">
              <TrendingUp className="w-4 h-4" /> +12% esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Cliques no WhatsApp</p>
                <h3 className="text-3xl font-bold text-slate-900">48</h3>
              </div>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <MousePointerClick className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-4 flex items-center gap-1 font-medium">
              <TrendingUp className="w-4 h-4" /> +5% esta semana
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Avaliação Média</p>
                <h3 className="text-3xl font-bold text-slate-900">4.9</h3>
              </div>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Star className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-4 font-medium">
              Baseado em 24 avaliações
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Dicas para melhorar seu perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-xl flex items-start gap-4 bg-slate-50">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
              <div>
                <h4 className="font-semibold text-slate-900">Adicione mais especialidades secundárias</h4>
                <p className="text-sm text-slate-600 mt-1">Perfis com mais de uma especialidade aparecem em 40% mais buscas.</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto text-primary">Editar</Button>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl flex items-start gap-4 bg-slate-50">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 shrink-0"></div>
              <div>
                <h4 className="font-semibold text-slate-900">Complete sua biografia</h4>
                <p className="text-sm text-slate-600 mt-1">Sua biografia está curta. Conte um pouco sobre seus casos de sucesso.</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto text-primary">Editar</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 bg-primary text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Seu Link Público</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-100 mb-4">Compartilhe seu perfil nas redes sociais para atrair mais clientes.</p>
            <div className="bg-slate-900/50 p-3 rounded-md text-xs font-mono break-all mb-4 text-blue-200 border border-white/10">
              meuadvogado.com/dr-carlos-eduardo
            </div>
            <Button className="w-full bg-white text-primary hover:bg-slate-100">
              Copiar Link
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
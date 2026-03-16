import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, CheckCircle2 } from "lucide-react";
import { adminMetrics } from "@/data/mock";

export const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Visão Geral da Plataforma</h1>
        <p className="text-slate-500 mt-1">Métricas em tempo real de uso e cadastros.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Advogados Cadastrados</p>
                <h3 className="text-2xl font-bold text-slate-900">{adminMetrics.totalLawyers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Clientes Cadastrados</p>
                <h3 className="text-2xl font-bold text-slate-900">{adminMetrics.totalClients}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Perfis Ativos (OAB Ok)</p>
                <h3 className="text-2xl font-bold text-slate-900">{adminMetrics.activeProfiles}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimos Cadastros</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo de Usuário</TableHead>
                <TableHead>Data de Entrada</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminMetrics.recentSignups.map((user, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge variant={user.type === 'Advogado' ? 'default' : 'secondary'}>
                      {user.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.date}</TableCell>
                  <TableCell>
                    {user.type === 'Advogado' ? (
                      <span className="text-amber-600 text-sm font-medium">Aguardando OAB</span>
                    ) : (
                      <span className="text-green-600 text-sm font-medium">Ativo</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-primary text-sm font-medium hover:underline">
                      Ver detalhes
                    </button>
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
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  Search,
  Eye,
  Ban,
  CheckCircle,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  User,
  ShieldAlert
} from "lucide-react";
import { toast } from "sonner";

// Mock de dados para usuários
const initialUsers = [
  {
    id: "1",
    name: "João Silva",
    type: "Cliente",
    email: "joao.silva@email.com",
    city: "São Paulo",
    date: "10/03/2024",
    status: "Ativo",
    phone: "(11) 99999-1111"
  },
  {
    id: "2",
    name: "Dra. Camila Nogueira",
    type: "Advogado",
    email: "camila.adv@email.com",
    city: "Rio de Janeiro",
    date: "15/03/2024",
    status: "Ativo",
    phone: "(21) 98888-2222"
  },
  {
    id: "3",
    name: "Pedro Almeida",
    type: "Cliente",
    email: "pedro.almeida@email.com",
    city: "Curitiba",
    date: "12/03/2024",
    status: "Inativo",
    phone: "(41) 97777-3333"
  },
  {
    id: "4",
    name: "Dr. Fernando Costa",
    type: "Advogado",
    email: "fernando.costa@email.com",
    city: "Belo Horizonte",
    date: "14/03/2024",
    status: "Ativo",
    phone: "(31) 96666-4444"
  },
  {
    id: "5",
    name: "Mariana Santos",
    type: "Cliente",
    email: "mariana.santos@email.com",
    city: "Salvador",
    date: "18/03/2024",
    status: "Ativo",
    phone: "(71) 95555-5555"
  }
];

export const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtros dinâmicos
  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === "all" || user.type === typeFilter;
    const matchStatus = statusFilter === "all" || user.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  // Ações
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "Ativo" ? "Inativo" : "Ativo";
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    toast.success(`Conta ${newStatus === "Ativo" ? "ativada" : "desativada"} com sucesso!`);
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success("Usuário excluído permanentemente.");
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Ativo') {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1"/> Ativo</Badge>;
    }
    return <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-300"><Ban className="w-3 h-3 mr-1"/> Inativo</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-[#1E3A5F]" />
            Gerenciamento de Usuários
          </h1>
          <p className="text-slate-500 mt-1">Visualize, filtre e gerencie todas as contas da plataforma.</p>
        </div>
      </div>

      {/* Barra de Filtros */}
      <Card className="border-slate-200/60 shadow-sm rounded-2xl bg-white">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Buscar por nome ou email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200"
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none flex-1 md:w-40"
            >
              <option value="all">Todos os tipos</option>
              <option value="Cliente">Clientes</option>
              <option value="Advogado">Advogados</option>
            </select>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none flex-1 md:w-40"
            >
              <option value="all">Todos os status</option>
              <option value="Ativo">Ativos</option>
              <option value="Inativo">Inativos</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card className="border-slate-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-slate-200">
              <TableRow className="hover:bg-slate-50">
                <TableHead className="font-bold text-slate-700 h-14 px-6">Nome</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Tipo</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Email</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Cidade</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Data de Cadastro</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Status</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 text-right px-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-b-slate-100 hover:bg-slate-50/80 transition-colors">
                  
                  <TableCell className="px-6 py-4 font-bold text-[#0F172A]">
                    {user.name}
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="secondary" className={user.type === 'Advogado' ? 'bg-[#1E3A5F]/10 text-[#1E3A5F]' : 'bg-slate-100 text-slate-600'}>
                      {user.type === 'Advogado' ? <Briefcase className="w-3 h-3 mr-1"/> : <User className="w-3 h-3 mr-1"/>}
                      {user.type}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-slate-500 font-medium">
                    {user.email}
                  </TableCell>
                  
                  <TableCell className="text-slate-600 font-medium">
                    {user.city}
                  </TableCell>
                  
                  <TableCell className="text-slate-500 text-sm">
                    {user.date}
                  </TableCell>
                  
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1">
                      
                      {/* Modal de Ver Perfil */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl" title="Ver Perfil">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md rounded-[2rem] p-0 overflow-hidden border-0 shadow-2xl">
                          <div className="bg-[#0F172A] p-8 text-white relative">
                            <ShieldAlert className="w-32 h-32 absolute right-0 top-0 opacity-5 -mt-4 -mr-4 pointer-events-none" />
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-black text-white">{user.name}</DialogTitle>
                            </DialogHeader>
                            <div className="flex items-center gap-3 mt-3">
                              <Badge className="bg-white/10 hover:bg-white/20 text-white border-0">
                                {user.type}
                              </Badge>
                              {getStatusBadge(user.status)}
                            </div>
                          </div>
                          
                          <div className="p-8 space-y-6 bg-white">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 text-slate-700">
                                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100"><Mail className="w-4 h-4 text-slate-500"/></div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                                  <p className="font-bold">{user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-slate-700">
                                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100"><Phone className="w-4 h-4 text-slate-500"/></div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telefone / WhatsApp</p>
                                  <p className="font-bold">{user.phone}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-slate-700">
                                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100"><MapPin className="w-4 h-4 text-slate-500"/></div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cidade</p>
                                  <p className="font-bold">{user.city}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-slate-700">
                                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100"><Calendar className="w-4 h-4 text-slate-500"/></div>
                                <div>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data de Cadastro</p>
                                  <p className="font-bold">{user.date}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Ativar/Desativar Conta */}
                      <Button 
                        onClick={() => handleToggleStatus(user.id, user.status)}
                        variant="ghost" 
                        size="icon" 
                        className={`h-9 w-9 rounded-xl ${user.status === 'Ativo' ? 'text-amber-500 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`} 
                        title={user.status === 'Ativo' ? 'Desativar Conta' : 'Ativar Conta'}
                      >
                        {user.status === 'Ativo' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </Button>

                      {/* Excluir Usuário */}
                      <Button 
                        onClick={() => handleDelete(user.id)}
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl" 
                        title="Excluir Usuário"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-slate-500">
                    Nenhum usuário encontrado com os filtros atuais.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
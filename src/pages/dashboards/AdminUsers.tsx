import React, { useState, useEffect } from 'react';
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
  ShieldAlert,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedUsers = data.map(u => ({
          id: u.id,
          name: u.name || 'Sem nome',
          type: u.role === 'lawyer' ? 'Advogado' : u.role === 'admin' ? 'Admin' : 'Cliente',
          email: u.email || 'Email não disponível',
          city: u.city || 'Não informada',
          date: new Date(u.created_at).toLocaleDateString('pt-BR'),
          phone: u.phone || 'Não informado',
          status: 'Ativo' // Por enquanto todos são listados como ativos
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Erro ao carregar lista de usuários.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filtros dinâmicos
  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === "all" || user.type === typeFilter;
    return matchSearch && matchType;
  });

  const showFeatureToast = () => {
    toast.info("Ação restrita", {
      description: "Por segurança, a exclusão de usuários deve ser feita pelo painel raiz do Supabase."
    });
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
          <p className="text-slate-500 mt-1">Visualize e pesquise todas as contas criadas na plataforma.</p>
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
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none flex-1 md:w-48"
            >
              <option value="all">Todos os tipos</option>
              <option value="Cliente">Clientes</option>
              <option value="Advogado">Advogados</option>
              <option value="Admin">Administradores</option>
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
                <TableHead className="font-bold text-slate-700 h-14 text-right px-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-b-slate-100 hover:bg-slate-50/80 transition-colors">
                    
                    <TableCell className="px-6 py-4 font-bold text-[#0F172A]">
                      {user.name}
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant="secondary" className={
                        user.type === 'Advogado' ? 'bg-[#1E3A5F]/10 text-[#1E3A5F]' : 
                        user.type === 'Admin' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }>
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

                        {/* Excluir/Desativar Usuário */}
                        <Button 
                          onClick={showFeatureToast}
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl" 
                          title="Excluir Usuário"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-500 font-medium">
                    Nenhum usuário encontrado.
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
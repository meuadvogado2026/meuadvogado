/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Users, 
  Search,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  User,
  ShieldAlert,
  Loader2,
  Pencil,
  UserPlus,
  Scale,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [lawyerDetails, setLawyerDetails] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const [{ data: profiles, error: pError }, { data: details, error: dError }] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('lawyer_details').select('*')
      ]);

      if (pError) throw pError;

      if (profiles) {
        const mappedUsers = profiles.map(u => ({
          id: u.id,
          name: u.name || 'Sem nome',
          role: u.role,
          type: u.role === 'lawyer' ? 'Advogado' : u.role === 'admin' ? 'Admin' : 'Cliente',
          email: u.email || 'Email não disponível',
          city: u.city || 'Não informada',
          state: u.state || '',
          date: new Date(u.created_at).toLocaleDateString('pt-BR'),
          phone: u.phone || 'Não informado',
          avatar_url: u.avatar_url,
        }));
        setUsers(mappedUsers);
      }

      if (details) {
        const detailsMap: Record<string, any> = {};
        details.forEach(d => { detailsMap[d.id] = d; });
        setLawyerDetails(detailsMap);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Erro ao carregar lista de usuários.");
    } finally {
      setIsLoading(false);
    }
  };

  const clientUsers = users.filter(u => u.role === 'client' || u.role === 'admin');
  const lawyerUsers = users.filter(u => u.role === 'lawyer');

  const filteredClients = clientUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLawyers = lawyerUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = async (userId: string, userName: string) => {
    setDeletingUserId(userId);
    try {
      const { data, error } = await supabase.rpc('delete_user_admin', {
        target_user_id: userId
      });

      if (error) throw error;

      const result = data as any;
      if (result?.success) {
        toast.success("Usuário excluído", {
          description: result.message || `${userName} foi removido da plataforma.`
        });
        setUsers(prev => prev.filter(u => u.id !== userId));
      } else {
        toast.error("Erro ao excluir", {
          description: result?.error || "Não foi possível excluir o usuário."
        });
      }
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir usuário", {
        description: error?.message || "Tente novamente."
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  const renderProfileModal = (user: any) => (
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
                <p className="font-bold">{user.city}{user.state ? ` - ${user.state}` : ''}</p>
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
  );

  const renderDeleteButton = (user: any) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl" 
          title="Excluir Usuário"
          disabled={deletingUserId === user.id}
        >
          {deletingUserId === user.id ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl border-0 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-500" />
            Confirmar Exclusão
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-slate-600 leading-relaxed">
            Você está prestes a excluir permanentemente o usuário <strong className="text-slate-900">{user.name}</strong> ({user.type}).
            <br /><br />
            Esta ação é <strong className="text-red-600">irreversível</strong> e irá remover todos os dados associados: perfil, favoritos, eventos e pedidos de oração.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3 mt-2">
          <AlertDialogCancel className="rounded-xl font-bold border-slate-200">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteUser(user.id, user.name)}
            className="rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Sim, Excluir Permanentemente
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const renderLoadingRow = (cols: number) => (
    <TableRow>
      <TableCell colSpan={cols} className="h-32 text-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
      </TableCell>
    </TableRow>
  );

  const renderEmptyRow = (cols: number, message: string) => (
    <TableRow>
      <TableCell colSpan={cols} className="h-32 text-center text-slate-500 font-medium">
        {message}
      </TableCell>
    </TableRow>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-[#1E3A5F]" />
            Gerenciamento de Usuários
          </h1>
          <p className="text-slate-500 mt-1">Gerencie clientes e advogados da plataforma.</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="border-slate-200/60 shadow-sm rounded-2xl bg-white">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Buscar por nome ou email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs: Usuários / Advogados */}
      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="w-full grid grid-cols-2 h-14 bg-slate-100 rounded-2xl p-1.5 gap-1.5">
          <TabsTrigger 
            value="clients" 
            className="rounded-xl font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-[#0F172A] data-[state=active]:shadow-sm h-full transition-all"
          >
            <User className="w-4 h-4 mr-2" />
            Usuários
            <Badge variant="secondary" className="ml-2 bg-slate-200/80 text-slate-600 text-[10px] font-black px-2 py-0">
              {filteredClients.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="lawyers" 
            className="rounded-xl font-bold text-sm data-[state=active]:bg-white data-[state=active]:text-[#0F172A] data-[state=active]:shadow-sm h-full transition-all"
          >
            <Scale className="w-4 h-4 mr-2" />
            Advogados
            <Badge variant="secondary" className="ml-2 bg-slate-200/80 text-slate-600 text-[10px] font-black px-2 py-0">
              {filteredLawyers.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* TAB: Clientes / Admins */}
        <TabsContent value="clients" className="mt-6">
          <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-200">
                  <TableRow className="hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-700 h-14 px-6">Nome</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">Tipo</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">Email</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">Cidade</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">Cadastro</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14 text-right px-6">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? renderLoadingRow(6) : filteredClients.length > 0 ? (
                    filteredClients.map((user) => (
                      <TableRow key={user.id} className="border-b-slate-100 hover:bg-slate-50/80 transition-colors">
                        <TableCell className="px-6 py-4 font-bold text-[#0F172A]">{user.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={
                            user.type === 'Admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                          }>
                            <User className="w-3 h-3 mr-1"/>
                            {user.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500 font-medium">{user.email}</TableCell>
                        <TableCell className="text-slate-600 font-medium">{user.city}</TableCell>
                        <TableCell className="text-slate-500 text-sm">{user.date}</TableCell>
                        <TableCell className="text-right px-6">
                          <div className="flex items-center justify-end gap-1">
                            {renderProfileModal(user)}
                            {renderDeleteButton(user)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : renderEmptyRow(6, "Nenhum usuário encontrado.")}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: Advogados */}
        <TabsContent value="lawyers" className="mt-6 space-y-6">
          
          {/* Botão Novo Advogado */}
          <div className="flex justify-end">
            <Button 
              onClick={() => navigate('/admin/usuarios/editar/novo')}
              className="bg-[#1E3A5F] hover:bg-[#0F172A] text-white font-bold rounded-xl h-11 px-6 shadow-lg shadow-[#1E3A5F]/20 transition-all hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Advogado
            </Button>
          </div>

          <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-200">
                  <TableRow className="hover:bg-slate-50">
                    <TableHead className="font-bold text-slate-700 h-14 px-6">Nome</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">OAB</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">Especialidade</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">Cidade</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">Status</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14">Cadastro</TableHead>
                    <TableHead className="font-bold text-slate-700 h-14 text-right px-6">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? renderLoadingRow(7) : filteredLawyers.length > 0 ? (
                    filteredLawyers.map((user) => {
                      const details = lawyerDetails[user.id] || {};
                      return (
                        <TableRow key={user.id} className="border-b-slate-100 hover:bg-slate-50/80 transition-colors">
                          <TableCell className="px-6 py-4 font-bold text-[#0F172A]">{user.name}</TableCell>
                          <TableCell>
                            {details.oab ? (
                              <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-lg text-xs">
                                {details.oab_state || ''} {details.oab}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-sm font-medium">Não informada</span>
                            )}
                          </TableCell>
                          <TableCell className="text-slate-600 font-medium">
                            {details.main_specialty || <span className="text-slate-400">—</span>}
                          </TableCell>
                          <TableCell className="text-slate-600 font-medium">{user.city}</TableCell>
                          <TableCell>
                            {details.status === 'approved' ? (
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold px-3 py-1">
                                <ShieldCheck className="w-3.5 h-3.5 mr-1.5"/> Ativo
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-semibold px-3 py-1">
                                <ShieldAlert className="w-3.5 h-3.5 mr-1.5"/> Pendente
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-slate-500 text-sm">{user.date}</TableCell>
                          <TableCell className="text-right px-6">
                            <div className="flex items-center justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-9 w-9 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl" 
                                title="Editar Perfil"
                                onClick={() => navigate(`/admin/usuarios/editar/${user.id}`)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              {renderProfileModal(user)}
                              {renderDeleteButton(user)}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : renderEmptyRow(7, "Nenhum advogado cadastrado na plataforma.")}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
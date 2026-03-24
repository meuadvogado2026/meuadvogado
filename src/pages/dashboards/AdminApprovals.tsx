import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Eye,
  Scale,
  MapPin,
  Phone,
  MessageCircle,
  Briefcase,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AdminApprovals = () => {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    setIsLoading(true);
    try {
      // Busca perfis de advogados
      const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'lawyer');

      // Busca os detalhes dos advogados (onde ficam o status e a OAB)
      const { data: details, error: dError } = await supabase
        .from('lawyer_details')
        .select('*');

      if (pError || dError) throw pError || dError;

      if (profiles && details) {
        const merged = profiles.map(p => {
          const d = details.find(detail => detail.id === p.id) || {};
          return {
            id: p.id,
            name: p.name || 'Sem nome',
            oab: d.oab || 'Não informada',
            oabState: d.oab_state || '-',
            mainSpecialty: d.main_specialty || 'Não informada',
            secondarySpecialties: d.secondary_specialties || [],
            city: p.city || 'Não informada',
            date: new Date(p.created_at).toLocaleDateString('pt-BR'),
            status: d.status || 'pending', // pending, approved, rejected
            bio: d.full_bio || d.mini_bio || 'Sem biografia',
            phone: p.phone || 'Não informado',
            whatsapp: d.whatsapp || p.phone || 'Não informado'
          };
        });
        
        // Ordena para mostrar os pendentes primeiro
        merged.sort((a, b) => {
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return 0;
        });

        setApprovals(merged);
      }
    } catch (error) {
      console.error("Erro ao buscar aprovações:", error);
      toast.error("Erro ao carregar lista de aprovações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      const isVerified = newStatus === 'approved';
      
      // O .select() no final é crucial para forçar o Supabase a retornar a linha atualizada.
      // Se ele retornar vazio, significa que o RLS bloqueou a ação.
      const { data, error } = await supabase
        .from('lawyer_details')
        .update({ 
          status: newStatus,
          is_verified: isVerified
        })
        .eq('id', id)
        .select();

      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error("Permissão negada. Você rodou o comando SQL de permissão do Admin?");
      }

      // Atualiza localmente só se o banco confirmou
      setApprovals(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
      
      if (newStatus === 'approved') {
        toast.success("Cadastro aprovado!", { description: "O advogado agora possui o selo de verificado." });
      } else {
        toast.error("Cadastro rejeitado.", { description: "O perfil do advogado foi marcado como rejeitado." });
      }
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao processar a aprovação.", { description: error.message });
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 font-semibold px-3 py-1"><ShieldAlert className="w-3.5 h-3.5 mr-1.5"/> Aguardando</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-semibold px-3 py-1"><CheckCircle className="w-3.5 h-3.5 mr-1.5"/> Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-semibold px-3 py-1"><XCircle className="w-3.5 h-3.5 mr-1.5"/> Rejeitado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-[#1E3A5F]" />
            Aprovações de Cadastro
          </h1>
          <p className="text-slate-500 mt-1">Gerencie e valide a entrada de novos advogados na plataforma.</p>
        </div>
      </div>

      {/* Tabela de Aprovações */}
      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-5">
          <CardTitle className="text-xl font-bold text-[#0F172A]">Fila de Verificação</CardTitle>
          <CardDescription className="text-sm">Analise os dados da OAB e libere o selo de verificação.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-100/50">
              <TableRow className="hover:bg-transparent border-b-slate-200">
                <TableHead className="font-bold text-slate-700 h-14 px-6">Nome do Advogado</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Nº OAB</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 text-center">Estado</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Especialidade</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Cidade</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Cadastro</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Status</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 text-right px-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                  </TableCell>
                </TableRow>
              ) : approvals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-slate-500 font-medium">
                    Nenhum advogado cadastrado no sistema ainda.
                  </TableCell>
                </TableRow>
              ) : (
                approvals.map((lawyer) => (
                  <TableRow key={lawyer.id} className="border-b-slate-100 hover:bg-slate-50 transition-colors">
                    
                    <TableCell className="px-6 py-4 font-bold text-[#0F172A]">
                      {lawyer.name}
                    </TableCell>
                    
                    <TableCell className="font-medium text-slate-600">
                      {lawyer.oab}
                    </TableCell>
                    
                    <TableCell className="text-center">
                      <span className="bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded-md text-xs">
                        {lawyer.oabState}
                      </span>
                    </TableCell>
                    
                    <TableCell className="text-slate-600 font-medium">
                      {lawyer.mainSpecialty}
                    </TableCell>
                    
                    <TableCell className="text-slate-600 font-medium">
                      {lawyer.city}
                    </TableCell>
                    
                    <TableCell className="text-slate-500 text-sm">
                      {lawyer.date}
                    </TableCell>
                    
                    <TableCell>
                      {getStatusBadge(lawyer.status)}
                    </TableCell>
                    
                    <TableCell className="text-right px-6">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* Modal de Ver Perfil */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="h-9 font-semibold text-[#1E3A5F] border-slate-200 hover:bg-slate-100 hover:text-[#0F172A] rounded-lg">
                              <Eye className="w-4 h-4 mr-2" /> Ver Perfil
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl rounded-2xl p-0 overflow-hidden border-0 shadow-2xl">
                            {/* Modal Header Premium em Azul Marinho */}
                            <div className="bg-[#0F172A] p-8 text-white relative">
                              <Scale className="w-32 h-32 absolute right-0 top-0 opacity-10 pointer-events-none -mt-4 -mr-4" />
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-black text-white">{lawyer.name}</DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-wrap items-center gap-4 mt-3">
                                <span className="bg-[#1E3A5F] text-blue-100 px-3 py-1 rounded-md font-bold text-sm border border-[#2A4B7C]">
                                  OAB {lawyer.oabState} {lawyer.oab}
                                </span>
                                <span className="text-slate-300 text-sm font-medium flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4" /> {lawyer.city}
                                </span>
                              </div>
                            </div>
                            
                            {/* Modal Content */}
                            <div className="p-8 space-y-6 bg-white">
                              <div>
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <Briefcase className="w-4 h-4 text-[#1E3A5F]" /> Especialidades
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  <Badge className="bg-[#1E3A5F] text-white hover:bg-[#0F172A] px-3 py-1">
                                    {lawyer.mainSpecialty}
                                  </Badge>
                                  {lawyer.secondarySpecialties?.map((spec: string) => (
                                    <Badge key={spec} variant="outline" className="text-slate-600 border-slate-300 px-3 py-1">
                                      {spec}
                                   </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Biografia</h4>
                                <p className="text-slate-700 leading-relaxed font-medium bg-slate-50 p-5 rounded-xl border border-slate-100 max-h-40 overflow-y-auto">
                                  {lawyer.bio}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                    <Phone className="w-4 h-4 text-slate-600"/>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Telefone</p>
                                    <p className="font-bold text-[#0F172A]">{lawyer.phone}</p>
                                  </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                                  <div className="p-2 bg-[#25D366]/10 rounded-lg border border-[#25D366]/20 shadow-sm">
                                    <MessageCircle className="w-4 h-4 text-[#25D366]"/>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">WhatsApp</p>
                                    <p className="font-bold text-[#0F172A]">{lawyer.whatsapp}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Modal Actions (Only show if pending) */}
                              {lawyer.status === 'pending' && (
                                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                                  <Button 
                                    onClick={() => handleAction(lawyer.id, 'approved')} 
                                    className="flex-1 bg-[#1E3A5F] hover:bg-[#0F172A] text-white font-bold h-12 rounded-xl shadow-md"
                                  >
                                    <CheckCircle className="w-5 h-5 mr-2" /> Aprovar Advogado
                                  </Button>
                                  <Button 
                                    onClick={() => handleAction(lawyer.id, 'rejected')} 
                                    variant="outline"
                                    className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 font-bold h-12 rounded-xl"
                                  >
                                    <XCircle className="w-5 h-5 mr-2" /> Rejeitar Cadastro
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
import React, { useState } from 'react';
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
  Briefcase
} from "lucide-react";
import { toast } from "sonner";

// Mock de dados para aprovações
const initialApprovals = [
  {
    id: "1",
    name: "Dr. Marcos Vinicius",
    oab: "145890",
    oabState: "SP",
    mainSpecialty: "Direito Trabalhista",
    secondarySpecialties: ["Previdenciário", "Civil"],
    city: "São Paulo",
    date: "16/03/2024",
    status: "Aguardando aprovação",
    bio: "Especialista em direito do trabalho com foco em defesa do trabalhador bancário e financiário. Atuação ética e transparente buscando a melhor resolução para os clientes.",
    phone: "(11) 3333-4444",
    whatsapp: "(11) 98888-7777"
  },
  {
    id: "2",
    name: "Dra. Camila Nogueira",
    oab: "89745",
    oabState: "RJ",
    mainSpecialty: "Direito de Família",
    secondarySpecialties: ["Sucessões"],
    city: "Rio de Janeiro",
    date: "15/03/2024",
    status: "Aguardando aprovação",
    bio: "Atendimento humanizado em causas familiares, divórcios e pensão alimentícia. Foco em acordos e mediação de conflitos.",
    phone: "(21) 2222-1111",
    whatsapp: "(21) 97777-6666"
  },
  {
    id: "3",
    name: "Dr. Fernando Costa",
    oab: "23456",
    oabState: "MG",
    mainSpecialty: "Direito Empresarial",
    secondarySpecialties: ["Tributário", "Contratos"],
    city: "Belo Horizonte",
    date: "14/03/2024",
    status: "Aprovado",
    bio: "Consultoria preventiva e contenciosa para pequenas e médias empresas. Especialista em blindagem patrimonial.",
    phone: "(31) 3444-5555",
    whatsapp: "(31) 96666-5555"
  },
  {
    id: "4",
    name: "Dra. Renata Alves",
    oab: "55678",
    oabState: "PR",
    mainSpecialty: "Direito Criminal",
    secondarySpecialties: ["Penal Empresarial"],
    city: "Curitiba",
    date: "12/03/2024",
    status: "Rejeitado",
    bio: "Advocacia criminal artesanal com atendimento 24 horas para flagrantes e urgências.",
    phone: "(41) 3555-6666",
    whatsapp: "(41) 95555-4444"
  }
];

export const AdminApprovals = () => {
  const [approvals, setApprovals] = useState(initialApprovals);

  const handleAction = (id: string, newStatus: string) => {
    setApprovals(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    
    if (newStatus === 'Aprovado') {
      toast.success("Cadastro aprovado!", { description: "O advogado agora está visível na plataforma." });
    } else {
      toast.error("Cadastro rejeitado.", { description: "O advogado será notificado sobre a recusa." });
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Aguardando aprovação':
        return <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300 font-semibold px-3 py-1"><ShieldAlert className="w-3.5 h-3.5 mr-1.5"/> Aguardando</Badge>;
      case 'Aprovado':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-semibold px-3 py-1"><CheckCircle className="w-3.5 h-3.5 mr-1.5"/> Aprovado</Badge>;
      case 'Rejeitado':
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
          <CardDescription className="text-sm">Analise os dados da OAB e libere o acesso dos profissionais.</CardDescription>
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
                <TableHead className="font-bold text-slate-700 h-14">Data do Cadastro</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Status</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 text-right px-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((lawyer) => (
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
                                {lawyer.secondarySpecialties.map(spec => (
                                  <Badge key={spec} variant="outline" className="text-slate-600 border-slate-300 px-3 py-1">
                                    {spec}
                                 </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Biografia</h4>
                              <p className="text-slate-700 leading-relaxed font-medium bg-slate-50 p-5 rounded-xl border border-slate-100">
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
                            {lawyer.status === 'Aguardando aprovação' && (
                              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                                <Button 
                                  onClick={() => handleAction(lawyer.id, 'Aprovado')} 
                                  className="flex-1 bg-[#1E3A5F] hover:bg-[#0F172A] text-white font-bold h-12 rounded-xl shadow-md"
                                >
                                  <CheckCircle className="w-5 h-5 mr-2" /> Aprovar Advogado
                                </Button>
                                <Button 
                                  onClick={() => handleAction(lawyer.id, 'Rejeitado')} 
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
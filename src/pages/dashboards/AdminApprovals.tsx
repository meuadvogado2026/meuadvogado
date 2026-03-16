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
    status: "Aguardando",
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
    status: "Aguardando",
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
      toast.success("Cadastro aprovado com sucesso!", { description: "O perfil do advogado agora está visível na plataforma." });
    } else {
      toast.error("Cadastro rejeitado.", { description: "O advogado será notificado sobre a rejeição." });
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Aguardando':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200"><ShieldAlert className="w-3 h-3 mr-1"/> Aguardando</Badge>;
      case 'Aprovado':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1"/> Aprovado</Badge>;
      case 'Rejeitado':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1"/> Rejeitado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-primary" />
            Aprovações de OAB
          </h1>
          <p className="text-slate-500 mt-1">Gerencie a entrada de novos advogados validando suas credenciais.</p>
        </div>
      </div>

      {/* Tabela de Aprovações */}
      <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-white pb-5">
          <CardTitle className="text-xl font-black text-slate-900">Cadastros Recentes</CardTitle>
          <CardDescription className="text-sm font-medium">Fila de verificação de perfis de advogados.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-slate-50 border-b-slate-200">
                <TableHead className="font-bold text-slate-600 h-12 px-6">Nome / OAB</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Especialidade</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Local</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Data</TableHead>
                <TableHead className="font-bold text-slate-600 h-12">Status</TableHead>
                <TableHead className="font-bold text-slate-600 h-12 text-right px-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((lawyer) => (
                <TableRow key={lawyer.id} className="border-b-slate-100 hover:bg-slate-50/80 transition-colors">
                  
                  {/* Nome e OAB */}
                  <TableCell className="px-6 py-4">
                    <p className="font-black text-slate-900">{lawyer.name}</p>
                    <p className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-0.5">
                      <Scale className="w-3 h-3" /> OAB {lawyer.oabState} {lawyer.oab}
                    </p>
                  </TableCell>
                  
                  {/* Especialidade */}
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium">
                      {lawyer.mainSpecialty}
                    </Badge>
                  </TableCell>
                  
                  {/* Local */}
                  <TableCell>
                    <div className="flex items-center text-sm font-medium text-slate-600">
                      <MapPin className="w-4 h-4 mr-1 text-slate-400" /> {lawyer.city} - {lawyer.oabState}
                    </div>
                  </TableCell>
                  
                  {/* Data */}
                  <TableCell className="text-sm font-medium text-slate-500">
                    {lawyer.date}
                  </TableCell>
                  
                  {/* Status */}
                  <TableCell>
                    {getStatusBadge(lawyer.status)}
                  </TableCell>
                  
                  {/* Ações */}
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* Modal de Ver Perfil */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl" title="Ver Perfil">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl rounded-[2rem] p-0 overflow-hidden border-0">
                          <div className="bg-[#0F172A] p-8 text-white relative">
                            <Scale className="w-32 h-32 absolute right-0 top-0 opacity-5 -mt-4 -mr-4 pointer-events-none" />
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-black text-white">{lawyer.name}</DialogTitle>
                            </DialogHeader>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge className="bg-white/20 hover:bg-white/20 text-white border-0">
                                OAB {lawyer.oabState} {lawyer.oab}
                              </Badge>
                              <span className="text-slate-300 text-sm font-medium flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> {lawyer.city}, {lawyer.oabState}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-8 space-y-6 bg-white">
                            <div>
                              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Especialidades</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">{lawyer.mainSpecialty}</Badge>
                                {lawyer.secondarySpecialties.map(spec => (
                                  <Badge key={spec} variant="outline" className="text-slate-600 border-slate-200">{spec}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Biografia</h4>
                              <p className="text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                {lawyer.bio}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1"><Phone className="w-3 h-3"/> Telefone</h4>
                                <p className="font-bold text-slate-800">{lawyer.phone}</p>
                              </div>
                              <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
                                <h4 className="text-xs font-bold text-green-600/70 uppercase tracking-wider flex items-center gap-1 mb-1"><MessageCircle className="w-3 h-3"/> WhatsApp</h4>
                                <p className="font-bold text-green-800">{lawyer.whatsapp}</p>
                              </div>
                            </div>

                            {/* Botões de Aprovação dentro do modal caso esteja aguardando */}
                            {lawyer.status === 'Aguardando' && (
                              <div className="pt-6 border-t border-slate-100 flex gap-3">
                                <Button 
                                  onClick={() => handleAction(lawyer.id, 'Aprovado')} 
                                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl"
                                >
                                  <CheckCircle className="w-5 h-5 mr-2" /> Aprovar Cadastro
                                </Button>
                                <Button 
                                  onClick={() => handleAction(lawyer.id, 'Rejeitado')} 
                                  variant="outline"
                                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold h-12 rounded-xl"
                                >
                                  <XCircle className="w-5 h-5 mr-2" /> Rejeitar
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Botões Rápidos (Aprovar / Rejeitar) */}
                      {lawyer.status === 'Aguardando' && (
                        <>
                          <Button 
                            onClick={() => handleAction(lawyer.id, 'Aprovado')}
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-green-600 hover:bg-green-50 rounded-xl" 
                            title="Aprovar"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleAction(lawyer.id, 'Rejeitado')}
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-red-600 hover:bg-red-50 rounded-xl" 
                            title="Rejeitar"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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
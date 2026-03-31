/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Gift, Plus, Pencil, Trash2, Tag, Building, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AdminBenefits = () => {
  const [benefits, setBenefits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '', title: '', company: '', discount: '', description: '', 
    category: 'Geral', instructions: '', link: '', image_url: ''
  });

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('benefits').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setBenefits(data || []);
    } catch (error) {
      toast.error("Erro ao carregar benefícios.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (benefit: any = null) => {
    if (benefit) {
      setFormData(benefit);
    } else {
      setFormData({ id: '', title: '', company: '', discount: '', description: '', category: 'Geral', instructions: '', link: '', image_url: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (formData.id) {
        const { error } = await supabase.from('benefits').update(formData).eq('id', formData.id);
        if (error) throw error;
        toast.success("Benefício atualizado!");
      } else {
        const { id, ...newBenefit } = formData;
        const { error } = await supabase.from('benefits').insert([newBenefit]);
        if (error) throw error;
        toast.success("Benefício criado!");
      }
      setIsModalOpen(false);
      fetchBenefits();
    } catch (error) {
      toast.error("Erro ao salvar benefício.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este benefício?")) return;
    try {
      const { error } = await supabase.from('benefits').delete().eq('id', id);
      if (error) throw error;
      toast.success("Benefício removido!");
      fetchBenefits();
    } catch (error) {
      toast.error("Erro ao remover.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-3">
            <Gift className="w-8 h-8 text-amber-500" />
            Clube de Benefícios
          </h1>
          <p className="text-slate-500 mt-1">Gerencie as parcerias e descontos exclusivos para advogados.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-11 rounded-xl shadow-lg shadow-amber-500/20">
          <Plus className="w-4 h-4 mr-2" /> Novo Benefício
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-700 h-14 px-6">Empresa</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Oferta</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Categoria</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 text-right px-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={4} className="h-32 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-amber-500"/></TableCell></TableRow>
              ) : benefits.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="h-32 text-center text-slate-500">Nenhum benefício cadastrado.</TableCell></TableRow>
              ) : (
                benefits.map((b) => (
                  <TableRow key={b.id} className="hover:bg-slate-50">
                    <TableCell className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{b.company}</span>
                        <span className="text-xs text-slate-500">{b.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 font-bold"><Tag className="w-3 h-3 mr-1"/> {b.discount}</Badge>
                    </TableCell>
                    <TableCell><Badge variant="outline">{b.category}</Badge></TableCell>
                    <TableCell className="text-right px-6">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(b)} className="text-blue-600 hover:bg-blue-50"><Pencil className="w-4 h-4"/></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)} className="text-red-600 hover:bg-red-50 ml-1"><Trash2 className="w-4 h-4"/></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl rounded-2xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
          
          <DialogHeader className="p-6 pb-4 border-b border-slate-100 bg-white z-10 shrink-0">
            <DialogTitle className="text-2xl font-black text-slate-900">
              {formData.id ? 'Editar' : 'Novo'} Benefício
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="flex flex-col overflow-hidden">
            {/* O corpo do formulário ganha overflow e scroll */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Nome da Empresa</Label>
                  <Input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Ex: Dell, Gympass" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Título da Oferta</Label>
                  <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex: Desconto em Notebooks" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Desconto (Texto)</Label>
                  <Input required value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} placeholder="Ex: 20% OFF ou R$ 50" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Categoria</Label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Educação">Educação</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Livraria">Livraria</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Geral">Geral</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Descrição Comercial (Opcional)</Label>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="rounded-xl bg-slate-50 resize-none h-20" />
              </div>
              
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Instruções de Resgate</Label>
                <Textarea required value={formData.instructions} onChange={e => setFormData({...formData, instructions: e.target.value})} placeholder="Ex: Acesse o link abaixo e use o cupom ADVOGADO20" className="rounded-xl bg-slate-50 resize-none h-24" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Link da Parceria (Opcional)</Label>
                  <Input type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="https://..." className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">URL do Logo (Opcional)</Label>
                  <Input type="url" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." className="h-11 rounded-xl bg-slate-50" />
                </div>
              </div>
            </div>

            {/* Rodapé fixo com os botões */}
            <div className="p-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl px-6">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null} 
                Salvar Benefício
              </Button>
            </div>
          </form>

        </DialogContent>
      </Dialog>
    </div>
  );
};
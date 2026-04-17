import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Partner = { id: string; name: string; logo_url: string; is_active: boolean };

export const AdminPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    id: '', 
    name: '', 
    logo_url: '', 
    is_active: true
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('partners').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      toast.error("Erro ao carregar parceiros.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (partner: Partner | null = null) => {
    if (partner) {
      setFormData(partner);
    } else {
      setFormData({ id: '', name: '', logo_url: '', is_active: true });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("A imagem deve ter no máximo 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo_url: reader.result as string }));
        toast.success("Imagem carregada para visualização!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.logo_url) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSaving(true);
    try {
      if (formData.id) {
        const { error } = await supabase.from('partners').update({
          name: formData.name,
          logo_url: formData.logo_url,
          is_active: formData.is_active
        }).eq('id', formData.id);
        
        if (error) throw error;
        toast.success("Parceiro atualizado!");
      } else {
        const { id, ...newPartner } = formData;
        const { error } = await supabase.from('partners').insert([newPartner]);
        if (error) throw error;
        toast.success("Parceiro criado!");
      }
      setIsModalOpen(false);
      fetchPartners();
    } catch (error) {
      toast.error("Erro ao salvar parceiro.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este parceiro permanentemente?")) return;
    try {
      const { error } = await supabase.from('partners').delete().eq('id', id);
      if (error) throw error;
      toast.success("Parceiro removido!");
      fetchPartners();
    } catch (error) {
      toast.error("Erro ao remover parceiro.");
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from('partners').update({ is_active: !currentStatus }).eq('id', id);
      if (error) throw error;
      fetchPartners();
    } catch (error) {
      toast.error("Erro ao atualizar status.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-3">
            <Building className="w-8 h-8 text-blue-600" />
            Parceiros (Rodapé)
          </h1>
          <p className="text-slate-500 mt-1">Gerencie as logomarcas que aparecem no rodapé dos usuários.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-primary hover:bg-blue-900 text-white font-bold h-11 rounded-xl shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4 mr-2" /> Novo Parceiro
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-700 h-14 px-6 w-24 text-center">Logo</TableHead>
                <TableHead className="font-bold text-slate-700 h-14">Nome do Parceiro</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 text-center">Status</TableHead>
                <TableHead className="font-bold text-slate-700 h-14 text-right px-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={4} className="h-32 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-primary"/></TableCell></TableRow>
              ) : partners.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="h-32 text-center text-slate-500">Nenhum parceiro cadastrado.</TableCell></TableRow>
              ) : (
                partners.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50">
                    <TableCell className="px-6 py-4 text-center">
                      <div className="w-16 h-8 bg-slate-100 rounded flex items-center justify-center p-1 border border-slate-200">
                        <img src={p.logo_url} alt={p.name} className="max-w-full max-h-full object-contain" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-slate-900">{p.name}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <button onClick={() => toggleActive(p.id, p.is_active)} className="transition-all hover:scale-105">
                        {p.is_active ? 
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 font-bold"><Eye className="w-3 h-3 mr-1"/> Visível</Badge> 
                          : 
                          <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-200 border-0 font-bold"><EyeOff className="w-3 h-3 mr-1"/> Oculto</Badge>
                        }
                      </button>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(p)} className="text-blue-600 hover:bg-blue-50"><Pencil className="w-4 h-4"/></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-red-600 hover:bg-red-50 ml-1"><Trash2 className="w-4 h-4"/></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden flex flex-col">
          
          <DialogHeader className="p-6 pb-4 border-b border-slate-100 bg-white z-10 shrink-0">
            <DialogTitle className="text-2xl font-black text-slate-900">
              {formData.id ? 'Editar' : 'Novo'} Parceiro
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="flex flex-col">
            <div className="p-6 space-y-4 bg-white">
              
              {formData.logo_url && (
                <div className="w-full h-32 bg-slate-900 rounded-xl flex items-center justify-center p-4 mb-4 border border-slate-200 shadow-inner">
                  <img src={formData.logo_url} alt="Preview" className="max-w-full max-h-full object-contain filter grayscale invert" />
                </div>
              )}

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Nome da Empresa *</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ex: Dell" className="h-11 rounded-xl bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Logomarca (Upload ou URL) *</Label>
                <div className="flex gap-2">
                  <Input 
                    required 
                    type="text" 
                    value={formData.logo_url} 
                    onChange={e => setFormData({...formData, logo_url: e.target.value})} 
                    placeholder="https://... ou faça upload" 
                    className="h-11 rounded-xl bg-slate-50 flex-1 overflow-hidden text-ellipsis whitespace-nowrap" 
                  />
                  <div className="relative overflow-hidden w-28 h-11 shrink-0 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors shadow-sm">
                    <span className="text-sm font-bold text-slate-700 whitespace-nowrap">📸 Upload</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500">Faça upload do seu computador ou cole a URL. (Dê preferência para PNG sem fundo).</p>
              </div>
              
            </div>

            <div className="p-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-900 text-white font-bold rounded-xl px-6">
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null} 
                Salvar Parceiro
              </Button>
            </div>
          </form>

        </DialogContent>
      </Dialog>
    </div>
  );
};

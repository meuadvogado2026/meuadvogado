import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  MessageCircle, 
  User, 
  LogOut, 
  Save,
  Copy,
  ExternalLink,
  Share2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

export const LawyerSettings = () => {
  const navigate = useNavigate();
  
  // Estado consolidado das configurações
  const [settings, setSettings] = useState({
    // Perfil Público
    isProfileActive: true,
    publicLink: "meuadvogado.com/dr-carlos-eduardo",
    
    // WhatsApp
    whatsappNumber: "(11) 99999-9999",
    whatsappMessage: "Olá! Encontrei seu perfil no Meu Advogado e gostaria de uma orientação inicial.",
    
    // Conta
    email: "contato@carloseduardo.adv.br",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    toast.success("Configurações salvas!", {
      description: "Suas preferências foram atualizadas com sucesso."
    });
  };

  const handleLogout = () => {
    toast("Saindo da conta...");
    navigate('/login');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(settings.publicLink);
    toast.success("Link copiado!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 relative">
      
      {/* Header Sticky */}
      <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mx-4 px-4 md:-mx-8 md:px-8">
        <div>
          <h1 className="text-2xl font-black text-slate-950 flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            Configurações
          </h1>
          <p className="text-sm text-slate-500">Gerencie sua conta e preferências da plataforma.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl px-6 h-11">
          <Save className="w-4 h-4 mr-2" />
          Salvar Preferências
        </Button>
      </div>

      <div className="space-y-6">
        
        {/* Perfil Público */}
        <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Perfil Público
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
              <div>
                <h4 className="font-semibold text-slate-900">Visibilidade do Perfil</h4>
                <p className="text-xs text-slate-600">Ative para aparecer nas buscas de clientes.</p>
              </div>
              <Switch 
                checked={settings.isProfileActive} 
                onCheckedChange={handleToggle('isProfileActive')} 
              />
            </div>

            <div className="space-y-3">
              <Label>Seu link personalizado</Label>
              <div className="flex gap-2">
                <Input readOnly value={settings.publicLink} className="h-11 rounded-xl bg-slate-50 text-slate-600 font-mono text-sm" />
                <Button variant="outline" onClick={copyLink} className="h-11 w-11 shrink-0 rounded-xl border-slate-200 hover:bg-slate-100 p-0">
                  <Copy className="w-4 h-4 text-slate-600" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 h-11 rounded-xl border-slate-200 hover:bg-slate-50 text-primary font-medium">
                <ExternalLink className="w-4 h-4 mr-2" /> Ver Perfil
              </Button>
              <Button variant="outline" className="flex-1 h-11 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-medium">
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp */}
        <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              Configurações do WhatsApp
            </CardTitle>
            <CardDescription>Defina como os clientes entram em contato com você.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Número do WhatsApp</Label>
              <Input 
                name="whatsappNumber" 
                value={settings.whatsappNumber} 
                onChange={handleChange} 
                className="h-11 rounded-xl bg-slate-50" 
              />
            </div>
            <div className="space-y-2">
              <Label>Mensagem Padrão Inicial</Label>
              <Textarea 
                name="whatsappMessage" 
                value={settings.whatsappMessage} 
                onChange={handleChange} 
                className="rounded-xl bg-slate-50 resize-none h-24" 
              />
              <p className="text-xs text-slate-500">Esta é a mensagem que o cliente enviará ao clicar no seu botão do WhatsApp.</p>
            </div>
          </CardContent>
        </Card>

        {/* Conta */}
        <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden border-red-100">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-slate-700" />
              Minha Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>E-mail de Acesso</Label>
              <Input 
                type="email" 
                name="email" 
                value={settings.email} 
                onChange={handleChange} 
                className="h-11 rounded-xl bg-slate-50" 
              />
            </div>
            <div className="space-y-2">
              <Label>Nova Senha</Label>
              <Input 
                type="password" 
                name="password" 
                value={settings.password} 
                onChange={handleChange} 
                placeholder="Deixe em branco para manter a atual" 
                className="h-11 rounded-xl bg-slate-50" 
              />
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full h-11 rounded-xl font-bold bg-red-50 hover:bg-red-100 text-red-600 border-0 shadow-none"
              >
                <LogOut className="w-4 h-4 mr-2" /> Sair da Conta
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
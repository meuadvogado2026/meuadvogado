import React, { useState, useEffect } from 'react';
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
import { useAuth } from "@/contexts/AuthContext";
import { shareOrCopy } from "@/utils/share";
import { supabase } from "@/integrations/supabase/client";

export const LawyerSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [settings, setSettings] = useState({
    isProfileActive: true,
    whatsappNumber: "",
    whatsappMessage: "Olá! Encontrei seu perfil no Advogado 2.0 e gostaria de uma orientação inicial.",
    email: "",
    password: "",
    currentPassword: ""
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;
      
      try {
        // Obter email pelo profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', user.id)
          .single();

        // Obter configurações do lawyer_details
        const { data: details } = await supabase
          .from('lawyer_details')
          .select('whatsapp, whatsapp_message')
          .eq('id', user.id)
          .maybeSingle();

        setSettings(prev => ({
          ...prev,
          email: profile?.email || prev.email,
          whatsappNumber: details?.whatsapp || prev.whatsappNumber,
          whatsappMessage: details?.whatsapp_message || prev.whatsappMessage,
        }));
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
        toast.error("Erro ao carregar suas preferências.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [user]);

  // Gera o link público real baseado no domínio atual e no ID do usuário
  const publicLink = `${window.location.origin}/advogado/${user?.id || ''}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    
    try {
      // Password change with current password verification
      if (settings.password) {
        if (!settings.currentPassword) {
          toast.error("Senha atual obrigatória", { description: "Para alterar a senha, informe a senha atual." });
          setIsSaving(false);
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: settings.email,
          password: settings.currentPassword
        });

        if (signInError) {
          toast.error("Senha atual incorreta", { description: "A senha atual informada não confere." });
          setIsSaving(false);
          return;
        }

        const { error: authError } = await supabase.auth.updateUser({
          password: settings.password
        });

        if (authError) throw authError;
        setSettings(prev => ({ ...prev, password: "", currentPassword: "" }));
      }



      toast.success("Configurações salvas!", {
        description: "Suas preferências foram atualizadas com sucesso."
      });
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar configurações. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    toast("Saindo da conta...");
    navigate('/login');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink);
    toast.success("Link copiado para a área de transferência!");
  };

  const handleShare = async () => {
    await shareOrCopy({
      title: 'Meu Perfil Jurídico',
      text: 'Confira meu perfil na plataforma Advogado 2.0.',
      url: publicLink
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 relative">
      
      <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mx-4 px-4 md:-mx-8 md:px-8">
        <div>
          <h1 className="text-2xl font-black text-slate-950 flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            Configurações
          </h1>
          <p className="text-sm text-slate-500">Gerencie sua conta e preferências da plataforma.</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading || isSaving} className="bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl px-6 h-11">
          <Save className={`w-4 h-4 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
          {isSaving ? "Salvando..." : "Salvar Preferências"}
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
                <Input readOnly value={publicLink} className="h-11 rounded-xl bg-slate-50 text-slate-600 font-mono text-sm" />
                <Button variant="outline" onClick={copyLink} className="h-11 w-11 shrink-0 rounded-xl border-slate-200 hover:bg-slate-100 p-0" title="Copiar link">
                  <Copy className="w-4 h-4 text-slate-600" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/advogado/${user?.id}`)}
                className="flex-1 h-11 rounded-xl border-slate-200 hover:bg-slate-50 text-primary font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" /> Ver Perfil
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="flex-1 h-11 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
              >
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar
              </Button>
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
                disabled
                className="h-11 rounded-xl bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed" 
              />
            </div>
            <div className="space-y-2">
              <Label>Senha Atual</Label>
              <Input 
                type="password" 
                name="currentPassword" 
                value={settings.currentPassword} 
                onChange={handleChange} 
                placeholder="Digite sua senha atual" 
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
            
            <div className="pt-4">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="w-full h-11 bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl font-bold transition-all"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {isSaving ? "Salvando..." : "Salvar Configurações"}
              </Button>
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Camera, MapPin, Briefcase, ShieldCheck, Save,
  Instagram, Linkedin, Facebook, Youtube, Globe,
  Phone, Mail, MessageCircle, User, Star, Upload, Building2, Loader2, Check, ArrowLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { specialties } from "@/data/mock";
import { estados } from "@/data/locations";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const LawyerProfileEdit = () => {
  const { user, role } = useAuth();
  const { id: urlId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Determina se o admin está editando o perfil de outro usuário
  const isAdminMode = role === 'admin' && !!urlId;
  const isCreateMode = isAdminMode && urlId === 'novo';
  const targetId = isCreateMode ? null : (isAdminMode ? urlId : user?.id);

  const [isLoading, setIsLoading] = useState(!isCreateMode);
  const [isSaving, setIsSaving] = useState(false);
  const [targetName, setTargetName] = useState("");

  // Campos exclusivos do modo criação
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    oab: "",
    oabState: "",
    city: "",
    state: "",
    attendanceType: "Híbrido (Online e Presencial)",
    experienceYears: "",
    mainSpecialty: "",
    secondarySpecialties: [] as string[],
    miniBio: "",
    fullBio: "",
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    youtube: "",
    website: "",
    officeLink: "",
    customLink: "",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200&h=400"
  });

  // Cities from DB
  const [allCities, setAllCities] = useState<{ state: string; city: string }[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const { data } = await supabase
        .from('cities')
        .select('state, city')
        .order('state')
        .order('city');
      if (data) {
        setAllCities(data);
        const states = [...new Set(data.map(c => c.state))].sort();
        setAvailableStates(states);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    if (profile.state) {
      const cities = allCities.filter(c => c.state === profile.state).map(c => c.city).sort();
      setFilteredCities(cities);
    } else {
      setFilteredCities([]);
    }
  }, [profile.state, allCities]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!targetId || isCreateMode) return;
      
      try {
        const { data: pData, error: pError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', targetId)
          .single();

        const { data: lData, error: lError } = await supabase
          .from('lawyer_details')
          .select('*')
          .eq('id', targetId)
          .maybeSingle();

        if (pData) {
          setTargetName(pData.name || "Advogado");
          setProfile(prev => ({
            ...prev,
            name: pData.name || "",
            email: pData.email || "",
            phone: pData.phone || "",
            city: pData.city || "",
            state: pData.state || "",
            avatar: pData.avatar_url || prev.avatar,
            cover: pData.cover_url || prev.cover,
            
            title: lData?.title || "",
            oab: lData?.oab || "",
            oabState: lData?.oab_state || "",
            attendanceType: lData?.attendance_type || "Híbrido (Online e Presencial)",
            experienceYears: lData?.experience_years?.toString() || "",
            mainSpecialty: lData?.main_specialty || "",
            secondarySpecialties: lData?.secondary_specialties || [],
            miniBio: lData?.mini_bio || "",
            fullBio: lData?.full_bio || "",
            whatsapp: lData?.whatsapp || pData.phone || "",
            website: lData?.website || "",
            instagram: lData?.instagram || "",
            linkedin: lData?.linkedin || "",
            facebook: lData?.facebook || "",
            youtube: lData?.youtube || "",
            officeLink: lData?.office_link || "",
            customLink: lData?.custom_link || "",
          }));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar perfil.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [targetId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };



  const handleMainSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMain = e.target.value;
    setProfile(prev => ({
      ...prev,
      mainSpecialty: newMain,
      secondarySpecialties: prev.secondarySpecialties.filter(s => s !== newMain)
    }));
  };

  const handleToggleSecondarySpecialty = (spec: string) => {
    setProfile(prev => {
      const isSelected = prev.secondarySpecialties.includes(spec);
      let newSpecs;
      if (isSelected) {
        newSpecs = prev.secondarySpecialties.filter(s => s !== spec);
      } else {
        newSpecs = [...prev.secondarySpecialties, spec];
      }
      return { ...prev, secondarySpecialties: newSpecs };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'cover' | 'avatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, [field]: reader.result as string }));
        toast.success(field === 'cover' ? "Capa atualizada!" : "Foto atualizada!", {
          description: "Preview gerado com sucesso."
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // Modo criação: criar novo advogado
    if (isCreateMode) {
      if (!newEmail || !newPassword) {
        toast.error("Preencha o email e a senha do novo advogado.");
        return;
      }
      if (newPassword.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      if (!profile.name) {
        toast.error("O nome do advogado é obrigatório.");
        return;
      }

      setIsSaving(true);
      try {
        // Salvar sessão do admin
        const { data: { session: adminSession } } = await supabase.auth.getSession();

        // Criar usuário no Supabase Auth
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: newEmail,
          password: newPassword,
          options: {
            data: { name: profile.name, role: 'lawyer', phone: profile.phone, city: profile.city, state: profile.state }
          }
        });

        // Restaurar sessão do admin imediatamente
        if (adminSession) {
          await supabase.auth.setSession({
            access_token: adminSession.access_token,
            refresh_token: adminSession.refresh_token,
          });
        }

        if (signUpError) throw signUpError;
        if (!signUpData.user) throw new Error("Falha ao criar o usuário.");

        const newUserId = signUpData.user.id;

        // Aguardar o trigger criar o profile
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Atualizar profiles com dados completos
        await supabase.from('profiles').update({
          name: profile.name,
          phone: profile.phone,
          city: profile.city,
          state: profile.state,
          avatar_url: profile.avatar,
          cover_url: profile.cover,
          role: 'lawyer',
        }).eq('id', newUserId);

        // Inserir lawyer_details
        await supabase.from('lawyer_details').upsert({
          id: newUserId,
          title: profile.title,
          oab: profile.oab,
          oab_state: profile.oabState,
          attendance_type: profile.attendanceType,
          experience_years: parseInt(profile.experienceYears) || null,
          main_specialty: profile.mainSpecialty,
          secondary_specialties: profile.secondarySpecialties,
          mini_bio: profile.miniBio,
          full_bio: profile.fullBio,
          whatsapp: profile.whatsapp,
          website: profile.website,
          instagram: profile.instagram,
          linkedin: profile.linkedin,
          facebook: profile.facebook,
          youtube: profile.youtube,
          office_link: profile.officeLink,
          custom_link: profile.customLink,
          status: 'approved',
        });

        toast.success("Advogado criado com sucesso!", {
          description: `${profile.name} foi registrado e já está ativo na plataforma.`
        });
        navigate('/admin/usuarios');
      } catch (error: any) {
        console.error(error);
        toast.error("Erro ao criar advogado", { description: error.message });
      } finally {
        setIsSaving(false);
      }
      return;
    }

    // Modo edição: atualizar advogado existente
    if (!targetId) return;
    setIsSaving(true);

    try {
      const { error: pError } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          phone: profile.phone,
          city: profile.city,
          state: profile.state,
          avatar_url: profile.avatar,
          cover_url: profile.cover
        })
        .eq('id', targetId);

      if (pError) throw pError;

      const { error: lError } = await supabase
        .from('lawyer_details')
        .upsert({
          id: targetId,
          title: profile.title,
          oab: profile.oab,
          oab_state: profile.oabState,
          attendance_type: profile.attendanceType,
          experience_years: parseInt(profile.experienceYears) || null,
          main_specialty: profile.mainSpecialty,
          secondary_specialties: profile.secondarySpecialties,
          mini_bio: profile.miniBio,
          full_bio: profile.fullBio,
          whatsapp: profile.whatsapp,
          website: profile.website,
          instagram: profile.instagram,
          linkedin: profile.linkedin,
          facebook: profile.facebook,
          youtube: profile.youtube,
          office_link: profile.officeLink,
          custom_link: profile.customLink,
          status: 'approved',
        });

      if (lError) throw lError;

      toast.success(isAdminMode ? `Perfil de ${targetName} atualizado!` : "Perfil atualizado com sucesso!", {
        description: "As alterações e localização já estão salvas."
      });

      if (isAdminMode) {
        navigate('/admin/usuarios');
      }

    } catch (error: any) {
      console.error(error);
      toast.error("Erro ao salvar", { description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mx-4 px-4 md:-mx-8 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            {isAdminMode && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/admin/usuarios')}
                className="rounded-xl h-9 w-9 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-black text-slate-950">
                {isCreateMode ? 'Novo Advogado' : (isAdminMode ? `Editar: ${targetName}` : 'Editar Perfil')}
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {isCreateMode
                  ? 'Cadastre um novo advogado na plataforma.'
                  : isAdminMode 
                    ? 'Editando perfil como administrador.' 
                    : 'Personalize como os clientes veem você na plataforma.'}
              </p>
            </div>
          </div>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl px-6 h-11 font-bold"
        >
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {isSaving ? "Salvando..." : isCreateMode ? "Criar Advogado" : "Salvar Alterações"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card de Credenciais (somente modo criação) */}
          {isCreateMode && (
            <Card className="border-blue-200/60 shadow-sm rounded-3xl bg-blue-50/30">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-4 rounded-t-3xl">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Credenciais de Acesso
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-slate-500 font-medium bg-white/60 p-3 rounded-xl border border-blue-100">
                  Defina o email e a senha que o advogado usará para acessar o painel.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700">Email do Advogado</Label>
                    <Input 
                      type="email" 
                      required 
                      value={newEmail} 
                      onChange={(e) => setNewEmail(e.target.value)} 
                      placeholder="advogado@email.com" 
                      className="h-11 rounded-xl bg-white border-blue-200 focus:border-blue-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-slate-700">Senha Temporária</Label>
                    <Input 
                      type="password" 
                      required 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      placeholder="Mínimo 6 caracteres" 
                      className="h-11 rounded-xl bg-white border-blue-200 focus:border-blue-500" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Aparência do Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-48 bg-slate-200 group overflow-hidden">
                <img src={profile.cover} alt="Capa" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                
                <input 
                  type="file" 
                  id="cover-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'cover')}
                />
                <label htmlFor="cover-upload" className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                  <div className="flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-xl hover:bg-slate-50 transition-colors">
                    <Upload className="w-4 h-4" /> Alterar imagem de capa
                  </div>
                </label>
              </div>
              
              <div className="px-8 pb-8 flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-12 relative z-10">
                <div className="relative group">
                  <img 
                    src={profile.avatar} 
                    alt="Perfil" 
                    className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg bg-white"
                  />
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'avatar')}
                  />
                  <label htmlFor="avatar-upload" className="absolute inset-0 bg-slate-900/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]">
                    <Camera className="w-8 h-8 text-white drop-shadow-md" />
                  </label>
                </div>
                <div className="flex-1 space-y-1 mb-2">
                  <h3 className="font-black text-slate-900 text-lg">Sua Foto</h3>
                  <p className="text-sm font-medium text-slate-500">Transmita confiança. Use fundo neutro e iluminação clara.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm rounded-3xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 rounded-t-3xl">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Identificação e Local de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label className="font-bold text-slate-700">Nome Completo (Como na OAB)</Label>
                  <Input name="name" value={profile.name} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Número da OAB</Label>
                  <Input name="oab" value={profile.oab} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Estado OAB (UF)</Label>
                  <select 
                    name="oabState"
                    value={profile.oabState} 
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none"
                  >
                    <option value="" disabled>Selecione</option>
                    {estados.map(estado => (
                      <option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100" />

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="sm:col-span-2">
                  <Label className="text-slate-700 font-bold">Estado (UF)</Label>
                  <Select value={profile.state} onValueChange={(val) => setProfile(prev => ({ ...prev, state: val, city: '' }))}>
                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStates.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-4">
                  <Label className="text-slate-700 font-bold">Cidade de Atuação</Label>
                  <Select value={profile.city} onValueChange={(val) => setProfile(prev => ({ ...prev, city: val }))} disabled={!profile.state}>
                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                      <SelectValue placeholder={profile.state ? 'Selecione a cidade' : 'Selecione o estado primeiro'} />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCities.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-6">
                  <Label className="text-slate-700 font-bold">Formato de Atendimento</Label>
                  <select 
                    name="attendanceType" 
                    value={profile.attendanceType} 
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <option value="Online">Apenas Online (Em todo Brasil)</option>
                    <option value="Presencial">Apenas Presencial (Na minha região)</option>
                    <option value="Híbrido (Online e Presencial)">Híbrido (Online e Presencial)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm rounded-3xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 rounded-t-3xl">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Apresentação Profissional
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label className="font-bold text-slate-700">Título Profissional</Label>
                  <Input name="title" value={profile.title} onChange={handleChange} placeholder="Ex: Especialista em Direito Digital" className="h-11 rounded-xl bg-slate-50" />
                  <p className="text-xs font-medium text-slate-500">Aparece logo abaixo do seu nome.</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Anos de Experiência</Label>
                  <Input name="experienceYears" type="number" value={profile.experienceYears} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Especialidade Principal</Label>
                <select 
                  name="mainSpecialty" 
                  value={profile.mainSpecialty} 
                  onChange={handleMainSpecialtyChange}
                  className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="" disabled>Selecione</option>
                  {specialties.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <Label className="font-bold text-slate-700">Especialidades Secundárias</Label>
                <div className="flex flex-wrap gap-2">
                  {specialties.map(spec => {
                    if (profile.mainSpecialty === spec) return null;
                    const isSelected = profile.secondarySpecialties.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => handleToggleSecondarySpecialty(spec)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border",
                          isSelected 
                            ? "bg-blue-50 border-blue-300 text-blue-700 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                        )}
                      >
                        <span className="flex items-center gap-1.5">
                          {isSelected && <Check className="w-4 h-4" />}
                          {spec}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Resumo (Mini Bio)</Label>
                <Textarea name="miniBio" value={profile.miniBio} onChange={handleChange} maxLength={160} className="rounded-xl bg-slate-50 resize-none h-20" />
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Aparece nos resultados de busca. Seja direto.</span>
                  <span>{profile.miniBio.length}/160</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-slate-700">Biografia Completa</Label>
                <Textarea name="fullBio" value={profile.fullBio} onChange={handleChange} className="rounded-xl bg-slate-50 min-h-[160px]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm rounded-3xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 rounded-t-3xl">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Contatos e Redes Sociais
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold text-slate-700"><MessageCircle className="w-4 h-4 text-green-600"/> WhatsApp</Label>
                  <Input name="whatsapp" value={profile.whatsapp} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold text-slate-700"><Phone className="w-4 h-4 text-slate-500"/> Telefone</Label>
                  <Input name="phone" value={profile.phone} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold text-slate-700"><Mail className="w-4 h-4 text-slate-500"/> E-mail</Label>
                  <Input name="email" value={profile.email} onChange={handleChange} disabled className="h-11 rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-sm text-slate-400 font-bold uppercase tracking-wider">Links Públicos</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold text-slate-700"><Instagram className="w-4 h-4 text-pink-600"/> Instagram</Label>
                  <Input name="instagram" value={profile.instagram} onChange={handleChange} placeholder="@seuusuario" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold text-slate-700"><Linkedin className="w-4 h-4 text-blue-600"/> LinkedIn</Label>
                  <Input name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="URL do perfil" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold text-slate-700"><Globe className="w-4 h-4 text-slate-600"/> Site Próprio</Label>
                  <Input name="website" value={profile.website} onChange={handleChange} placeholder="www.seusite.com.br" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center gap-2 font-bold text-slate-700"><MapPin className="w-4 h-4 text-red-500"/> Link do Google Maps (Localização Exata)</Label>
                  <Input name="officeLink" value={profile.officeLink} onChange={handleChange} placeholder="Cole aqui o link do Google Maps do seu escritório" className="h-11 rounded-xl bg-slate-50" />
                  <p className="text-xs font-medium text-slate-500">Abra o Google Maps, busque seu escritório, clique em "Compartilhar" e cole o link aqui. Esse link será usado no botão "Como Chegar".</p>
                </div>
              </div>

            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="bg-primary text-white hover:bg-blue-900 shadow-xl shadow-primary/20 rounded-xl px-12 h-14 font-black transition-all hover:scale-[1.02]"
            >
              {isSaving ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <Save className="w-5 h-5 mr-3" />}
              {isSaving ? "Salvando..." : isCreateMode ? "Criar Advogado" : "Salvar Perfil"}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-2">Preview do Perfil</h3>
            
            <Card className="overflow-hidden border-slate-200/60 shadow-xl shadow-slate-200/50 rounded-3xl">
              <div className="h-32 relative">
                <img src={profile.cover} alt="Cover Preview" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> Visão Pública
                </div>
              </div>
              
              <CardContent className="p-5 pt-0 relative">
                <div className="flex justify-between items-end -mt-10 mb-4">
                  <img 
                    src={profile.avatar} 
                    alt="Avatar Preview" 
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white relative z-10"
                  />
                  {profile.oab && profile.oabState && (
                    <Badge className="bg-blue-50 text-blue-700 font-bold border border-blue-200 flex gap-1 h-6 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verificado
                    </Badge>
                  )}
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-[#0F172A] leading-tight">{profile.name || "Seu Nome"}</h3>
                  <p className="text-xs font-bold text-primary mt-1 line-clamp-1">{profile.title || "Seu Título Profissional"}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500 mt-3 w-full">
                    <div className="flex items-start gap-1.5 bg-slate-50 px-2.5 py-2 rounded-md w-full border border-slate-100">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
                      <div className="flex flex-col flex-1">
                        <span className="text-slate-700 font-bold">
                          {profile.city || "Cidade"}{profile.state ? `, ${profile.state}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm font-medium text-slate-600 line-clamp-3 leading-relaxed">
                    {profile.miniBio || "Seu resumo profissional aparecerá aqui para os clientes."}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {profile.mainSpecialty && (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-bold text-[10px]">{profile.mainSpecialty}</Badge>
                  )}
                  {profile.secondarySpecialties.slice(0, 2).map(spec => (
                     <Badge key={spec} variant="outline" className="text-slate-500 font-medium text-[10px]">{spec}</Badge>
                  ))}
                  {profile.secondarySpecialties.length > 2 && (
                    <Badge variant="outline" className="text-slate-400 text-[10px]">+{profile.secondarySpecialties.length - 2}</Badge>
                  )}
                </div>

                <div className="mt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl h-11 pointer-events-none shadow-md shadow-green-600/20">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Falar no WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <p className="text-xs text-center text-slate-400 font-medium">
              O preview é atualizado em tempo real.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Briefcase, 
  ShieldCheck, 
  Save,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Globe,
  Link as LinkIcon,
  Phone,
  Mail,
  MessageCircle,
  User,
  Star,
  Upload,
  Building2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { specialties } from "@/data/mock";

export const LawyerProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: "Dr. Carlos Eduardo Silva",
    title: "Especialista em Direito do Trabalho e Previdenciário",
    oab: "123456",
    oabState: "SP",
    cep: "01310-100",
    city: "São Paulo",
    state: "SP",
    attendanceType: "Híbrido (Online e Presencial)",
    experienceYears: "15",
    mainSpecialty: "Trabalhista",
    secondarySpecialties: "Previdenciário, Empresarial",
    miniBio: "Defesa ágil de trabalhadores e empresas com atendimento humanizado e foco em resultados.",
    fullBio: "Especialista em Direito do Trabalho com mais de 15 anos de atuação na defesa de trabalhadores e empresas. Foco em resoluções ágeis e atendimento humanizado.\n\nCom uma trajetória marcada pela excelência e dedicação ao cliente, atuo buscando sempre a melhor estratégia jurídica para o seu caso.",
    phone: "(11) 3000-0000",
    whatsapp: "(11) 99999-9999",
    email: "contato@carloseduardo.adv.br",
    instagram: "@carloseduardo.adv",
    linkedin: "linkedin.com/in/carloseduardoadv",
    facebook: "",
    youtube: "youtube.com/@carloseduardoadv",
    website: "www.carloseduardo.adv.br",
    officeLink: "Escritório Silva & Associados",
    customLink: "linktr.ee/carloseduardo",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200&h=400"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
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

  const handleSave = () => {
    toast.success("Perfil atualizado com sucesso!", {
      description: "Suas alterações já estão visíveis no seu perfil público."
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 relative">
      
      {/* Header Sticky com Ação */}
      <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mx-4 px-4 md:-mx-8 md:px-8">
        <div>
          <h1 className="text-2xl font-black text-slate-950">Editar Perfil</h1>
          <p className="text-sm text-slate-500 font-medium">Personalize como os clientes veem você na plataforma.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl px-6 h-11 font-bold">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Formulário (Esquerda) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Imagens e Personalização Visual */}
          <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Aparência do Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Capa */}
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
              
              {/* Foto de Perfil */}
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

          {/* 2. Informações Principais e Localização */}
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
                  <Label className="font-bold text-slate-700">Estado OAB</Label>
                  <Input name="oabState" value={profile.oabState} onChange={handleChange} maxLength={2} className="h-11 rounded-xl bg-slate-50 uppercase" />
                </div>
              </div>

              <div className="w-full h-px bg-slate-100" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">CEP do Escritório</Label>
                  <Input name="cep" value={profile.cep} onChange={handleChange} maxLength={9} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="font-bold text-slate-700">Formato de Atendimento</Label>
                  <select 
                    name="attendanceType" 
                    value={profile.attendanceType} 
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <option value="Online">Apenas Online (Em todo Brasil)</option>
                    <option value="Presencial">Apenas Presencial (Na minha região)</option>
                    <option value="Híbrido (Online e Presencial)">Híbrido (Online e Presencial)</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="font-bold text-slate-700">Cidade</Label>
                  <Input name="city" value={profile.city} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Estado (UF)</Label>
                  <Input name="state" value={profile.state} onChange={handleChange} maxLength={2} className="h-11 rounded-xl bg-slate-50 uppercase" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Apresentação e Áreas de Atuação */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Especialidade Principal</Label>
                  <select 
                    name="mainSpecialty" 
                    value={profile.mainSpecialty} 
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-slate-700">Especialidades Secundárias</Label>
                  <Input name="secondarySpecialties" value={profile.secondarySpecialties} onChange={handleChange} placeholder="Ex: Família, Sucessões" className="h-11 rounded-xl bg-slate-50" />
                  <p className="text-xs font-medium text-slate-500">Separe por vírgulas.</p>
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

          {/* 4. Contato e Redes Sociais */}
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
                  <Input name="email" value={profile.email} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
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
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-bold text-slate-700"><Building2 className="w-4 h-4 text-indigo-600"/> Link do Escritório</Label>
                  <Input name="officeLink" value={profile.officeLink} onChange={handleChange} placeholder="Site ou Google Maps" className="h-11 rounded-xl bg-slate-50" />
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Preview Sidebar (Direita - Sticky) */}
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
                  <Badge className="bg-blue-50 text-blue-700 font-bold border border-blue-200 flex gap-1 h-6 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verificado
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-[#0F172A] leading-tight">{profile.name || "Seu Nome"}</h3>
                  <p className="text-xs font-bold text-primary mt-1 line-clamp-1">{profile.title || "Seu Título Profissional"}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500 mt-3">
                    <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
                      <MapPin className="w-3.5 h-3.5" /> {profile.city || "Cidade"}
                    </div>
                    <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9 (124)
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm font-medium text-slate-600 line-clamp-3 leading-relaxed">
                    {profile.miniBio || "Seu resumo profissional aparecerá aqui para os clientes."}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-bold text-[10px]">{profile.mainSpecialty || "Área Principal"}</Badge>
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
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
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { specialties } from "@/data/mock";

export const LawyerProfileEdit = () => {
  // Estado mockado inicial baseado no Dr. Carlos
  const [profile, setProfile] = useState({
    name: "Dr. Carlos Eduardo Silva",
    title: "Especialista em Direito do Trabalho e Previdenciário",
    oab: "123456",
    oabState: "SP",
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
    youtube: "",
    website: "www.carloseduardo.adv.br",
    officeLink: "",
    customLink: "linktr.ee/carloseduardo",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200&h=400"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
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
          <p className="text-sm text-slate-500">Personalize como os clientes veem você na plataforma.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-white hover:bg-blue-900 shadow-lg shadow-primary/20 rounded-xl px-6 h-11">
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
              <div className="relative h-48 bg-slate-200 group">
                <img src={profile.cover} alt="Capa" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" className="rounded-full bg-white/90 hover:bg-white text-slate-900">
                    <Camera className="w-4 h-4 mr-2" /> Alterar Capa
                  </Button>
                </div>
              </div>
              
              {/* Foto de Perfil */}
              <div className="px-8 pb-8 flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-12 relative z-10">
                <div className="relative group">
                  <img 
                    src={profile.avatar} 
                    alt="Perfil" 
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 space-y-1 mb-2">
                  <h3 className="font-semibold text-slate-900">Foto Profissional</h3>
                  <p className="text-xs text-slate-500">Recomendado: Rosto visível, fundo neutro, alta resolução (1:1).</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Informações Principais */}
          <Card className="border-slate-200/60 shadow-sm rounded-3xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 rounded-t-3xl">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informações Principais
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Nome Completo (Como na OAB)</Label>
                  <Input name="name" value={profile.name} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label>Número da OAB</Label>
                  <Input name="oab" value={profile.oab} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label>Estado OAB</Label>
                  <Input name="oabState" value={profile.oabState} onChange={handleChange} maxLength={2} className="h-11 rounded-xl bg-slate-50 uppercase" />
                </div>
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input name="city" value={profile.city} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Input name="state" value={profile.state} onChange={handleChange} maxLength={2} className="h-11 rounded-xl bg-slate-50 uppercase" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Formato de Atendimento</Label>
                  <select 
                    name="attendanceType" 
                    value={profile.attendanceType} 
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <option value="Online">Apenas Online</option>
                    <option value="Presencial">Apenas Presencial</option>
                    <option value="Híbrido (Online e Presencial)">Híbrido (Online e Presencial)</option>
                  </select>
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
                  <Label>Título Profissional</Label>
                  <Input name="title" value={profile.title} onChange={handleChange} placeholder="Ex: Especialista em Direito Digital" className="h-11 rounded-xl bg-slate-50" />
                  <p className="text-xs text-slate-500">Aparece logo abaixo do seu nome.</p>
                </div>
                <div className="space-y-2">
                  <Label>Anos de Experiência</Label>
                  <Input name="experienceYears" type="number" value={profile.experienceYears} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Especialidade Principal</Label>
                  <select 
                    name="mainSpecialty" 
                    value={profile.mainSpecialty} 
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Especialidades Secundárias</Label>
                  <Input name="secondarySpecialties" value={profile.secondarySpecialties} onChange={handleChange} placeholder="Ex: Família, Sucessões" className="h-11 rounded-xl bg-slate-50" />
                  <p className="text-xs text-slate-500">Separe por vírgulas.</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Resumo (Mini Bio)</Label>
                <Textarea name="miniBio" value={profile.miniBio} onChange={handleChange} maxLength={160} className="rounded-xl bg-slate-50 resize-none h-20" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Aparece nos resultados de busca. Seja direto.</span>
                  <span>{profile.miniBio.length}/160</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Biografia Completa</Label>
                <Textarea name="fullBio" value={profile.fullBio} onChange={handleChange} className="rounded-xl bg-slate-50 min-h-[160px]" />
                <p className="text-xs text-slate-500">Conte sua trajetória, formação e diferenciais do seu atendimento.</p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Contato e Redes Sociais */}
          <Card className="border-slate-200/60 shadow-sm rounded-3xl">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4 rounded-t-3xl">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Contatos e Redes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-green-600"/> WhatsApp</Label>
                  <Input name="whatsapp" value={profile.whatsapp} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500"/> Telefone</Label>
                  <Input name="phone" value={profile.phone} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-500"/> E-mail</Label>
                  <Input name="email" value={profile.email} onChange={handleChange} className="h-11 rounded-xl bg-slate-50" />
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-600"/> Instagram</Label>
                  <Input name="instagram" value={profile.instagram} onChange={handleChange} placeholder="@seuusuario" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-blue-600"/> LinkedIn</Label>
                  <Input name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="URL do perfil" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Facebook className="w-4 h-4 text-blue-500"/> Facebook</Label>
                  <Input name="facebook" value={profile.facebook} onChange={handleChange} placeholder="URL da página" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Youtube className="w-4 h-4 text-red-600"/> YouTube</Label>
                  <Input name="youtube" value={profile.youtube} onChange={handleChange} placeholder="URL do canal" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Globe className="w-4 h-4 text-slate-600"/> Site Próprio</Label>
                  <Input name="website" value={profile.website} onChange={handleChange} placeholder="www.seusite.com.br" className="h-11 rounded-xl bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><LinkIcon className="w-4 h-4 text-slate-600"/> Link Personalizado</Label>
                  <Input name="customLink" value={profile.customLink} onChange={handleChange} placeholder="Linktree, etc" className="h-11 rounded-xl bg-slate-50" />
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Preview Sidebar (Direita - Sticky) */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Preview do Perfil</h3>
            
            <Card className="overflow-hidden border-slate-200/60 shadow-xl shadow-slate-200/50 rounded-3xl">
              <div className="h-32 relative">
                <img src={profile.cover} alt="Cover Preview" className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">
                  Visão do Cliente
                </div>
              </div>
              
              <CardContent className="p-5 pt-0 relative">
                <div className="flex justify-between items-end -mt-10 mb-4">
                  <img 
                    src={profile.avatar} 
                    alt="Avatar Preview" 
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-sm bg-white relative z-10"
                  />
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 flex gap-1 h-6 mb-2">
                    <ShieldCheck className="w-3 h-3" /> Verificado
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{profile.name || "Seu Nome"}</h3>
                  <p className="text-xs font-medium text-primary mt-1 line-clamp-1">{profile.title || "Seu Título Profissional"}</p>
                  
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {profile.city || "Cidade"}, {profile.state || "UF"}
                    </div>
                    <div className="flex items-center gap-1 font-medium text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9 (124)
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {profile.miniBio || "Seu resumo profissional aparecerá aqui para os clientes."}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium text-[10px]">{profile.mainSpecialty || "Área Principal"}</Badge>
                  {profile.secondarySpecialties.split(',').map((spec, i) => spec.trim() && (
                    <Badge key={i} variant="outline" className="text-slate-500 text-[10px]">{spec.trim()}</Badge>
                  ))}
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-11 pointer-events-none">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Falar no WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <p className="text-xs text-center text-slate-400">
              O preview é atualizado em tempo real conforme você digita.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
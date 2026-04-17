import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SpecialtyPicker } from "@/components/SpecialtyPicker";

export const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Client fields
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientState, setClientState] = useState("");
  const [clientCity, setClientCity] = useState("");

  // Cities from DB
  const [allCities, setAllCities] = useState<{ state: string; city: string }[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  // Post-registration
  const [showSpecialtyPicker, setShowSpecialtyPicker] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState<string | null>(null);
  const [isSavingSpecs, setIsSavingSpecs] = useState(false);

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
    if (clientState) {
      const cities = allCities
        .filter(c => c.state === clientState)
        .map(c => c.city)
        .sort();
      setFilteredCities(cities);
      setClientCity("");
    } else {
      setFilteredCities([]);
    }
  }, [clientState, allCities]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast.error("Termos de Uso", { description: "Você precisa aceitar os termos para continuar." });
      return;
    }
    if (!clientCity || !clientState) {
      toast.error("Localização", { description: "Selecione seu estado e cidade." });
      return;
    }
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: clientEmail,
        password: clientPassword,
        options: {
          data: { name: clientName, role: 'client', phone: clientPhone, city: clientCity, state: clientState }
        }
      });

      if (error) throw error;

      if (data.session) {
        await supabase.from('profiles').update({
          phone: clientPhone, city: clientCity, state: clientState,
        }).eq('id', data.user!.id);

        setRegisteredUserId(data.user!.id);
        setShowSpecialtyPicker(true);
      } else {
        toast.success("Cadastro realizado!", { description: "Verifique seu e-mail para confirmar a conta." });
        navigate('/login');
      }
    } catch (error: unknown) {
      toast.error("Erro ao criar conta", { description: error instanceof Error ? error.message : "Verifique os dados." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-6">
          <div className="h-20 w-20 rounded-2xl overflow-hidden bg-[#0a1628] shadow-lg mx-auto">
            <img src="https://ik.imagekit.io/lflb43qwh/Meu%20advogado/Meu%20Advogado%20LOGO.jpeg" alt="Advogado 2.0" className="w-full h-full object-cover scale-[1.15]" />
          </div>
        </Link>
        <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">
          Crie sua conta
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-medium">
          Já tem uma conta? <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Faça login</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-3xl sm:px-10 border border-slate-100">

          <div className="flex items-center gap-3 mb-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <div className="p-2 bg-blue-100 rounded-xl">
              <User className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Cadastro de Cliente</p>
              <p className="text-xs text-slate-500 font-medium">Encontre o advogado ideal para o seu caso.</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-700 font-bold">Nome Completo</Label>
                <Input required value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700 font-bold">Email</Label>
                  <Input type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
                </div>
                <div>
                  <Label className="text-slate-700 font-bold">WhatsApp</Label>
                  <Input type="tel" required value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" placeholder="(00) 00000-0000" />
                </div>
              </div>

              {/* Localização: Estado + Cidade (da tabela cities) */}
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-600"/>
                  <span className="font-bold text-slate-800 text-sm">Sua Cidade</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-700 font-bold">Estado</Label>
                    <Select value={clientState} onValueChange={setClientState}>
                      <SelectTrigger className="mt-1 h-12 rounded-xl bg-white border-slate-200">
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStates.map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-700 font-bold">Cidade</Label>
                    <Select value={clientCity} onValueChange={setClientCity} disabled={!clientState}>
                      <SelectTrigger className="mt-1 h-12 rounded-xl bg-white border-slate-200">
                        <SelectValue placeholder={clientState ? "Selecione a cidade" : "Selecione o estado primeiro"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCities.map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Label className="text-slate-700 font-bold">Senha</Label>
                <Input type="password" required value={clientPassword} onChange={(e) => setClientPassword(e.target.value)} className="mt-1 h-12 rounded-xl bg-slate-50" />
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <Checkbox
                id="terms-client"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                className="border-slate-300 shadow-none"
              />
              <Label htmlFor="terms-client" className="text-xs sm:text-sm text-slate-600 font-medium leading-tight cursor-pointer">
                Li e concordo com os <Link to="/termos" className="text-blue-600 hover:underline font-bold">Termos de Uso</Link> e a <Link to="/privacidade" className="text-blue-600 hover:underline font-bold">Política de Privacidade</Link>.
              </Label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-14 mt-6 bg-[#0066FF] hover:bg-blue-600 text-white text-base font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Criar conta grátis"}
            </Button>
          </form>

        </div>
      </div>

      {/* Specialty Picker Popup (After Client Registration) */}
      <SpecialtyPicker
        open={showSpecialtyPicker}
        isLoading={isSavingSpecs}
        onConfirm={async (specs) => {
          if (!registeredUserId) return;
          setIsSavingSpecs(true);
          try {
            await supabase.from('profiles').update({
              preferred_specialties: specs
            }).eq('id', registeredUserId);
            toast.success("Perfeito! Vamos encontrar o profissional ideal para você.");
            setShowSpecialtyPicker(false);
            navigate('/painel/cliente');
          } catch (e) {
            console.error(e);
            toast.error("Erro ao salvar", { description: "Tente novamente." });
          } finally {
            setIsSavingSpecs(false);
          }
        }}
      />
    </div>
  );
};
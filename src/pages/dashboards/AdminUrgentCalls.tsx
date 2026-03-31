/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Siren, CheckCircle2, Clock, Loader2, Phone, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AdminUrgentCalls = () => {
  const [calls, setCalls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCalls();

    // Escuta novas chamadas em tempo real na própria página
    const channel = supabase.channel('urgent_calls_page')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'urgent_calls' }, () => {
        fetchCalls(); // Recarrega a lista se chegar algo novo
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCalls = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('urgent_calls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCalls(data || []);
    } catch (error) {
      console.error("Erro ao buscar urgências:", error);
      toast.error("Erro ao carregar as chamadas urgentes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsResolved = async (id: string) => {
    try {
      const { error } = await supabase
        .from('urgent_calls')
        .update({ status: 'resolved' })
        .eq('id', id);

      if (error) throw error;

      setCalls(prev => prev.map(c => c.id === id ? { ...c, status: 'resolved' } : c));
      toast.success("Chamada resolvida!", { description: "O caso foi marcado como atendido." });
    } catch (error) {
      console.error("Erro ao atualizar chamada:", error);
      toast.error("Erro ao registrar atendimento.");
    }
  };

  const formatPhone = (phone: string) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    return `https://wa.me/55${cleaned}`;
  };

  const pendingCalls = calls.filter(c => c.status === 'pending');
  const resolvedCalls = calls.filter(c => c.status === 'resolved');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header Alerta Vermelho */}
      <div className="bg-gradient-to-br from-red-950 via-red-900 to-[#0F172A] p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-red-900/20 border border-red-800/50">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 text-red-500/10 pointer-events-none">
          <Siren className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-red-500/30">
              <Siren className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <span className="text-red-400 font-bold uppercase tracking-widest text-sm">Central de Emergência</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
            Chamadas Urgentes
          </h1>
          <p className="text-red-200 font-medium max-w-2xl">
            Atendimentos de plantão, prisões em flagrante e situações que exigem resposta imediata.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-[#0F172A] flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            Aguardando Ação Imediata ({pendingCalls.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : pendingCalls.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-600 mb-2">Tudo tranquilo</h3>
            <p className="text-slate-400">Nenhuma chamada urgente no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingCalls.map((call) => (
              <Card key={call.id} className="border-red-200 shadow-lg shadow-red-900/5 rounded-3xl overflow-hidden bg-white relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-red-600 animate-pulse"></div>
                <CardContent className="p-6 flex flex-col h-full mt-2">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900">{call.client_name}</h3>
                      <p className="text-xs font-bold text-slate-500">Cliente</p>
                    </div>
                    <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full flex items-center gap-1 border border-red-200">
                      <Clock className="w-3 h-3" /> AGORA
                    </span>
                  </div>
                  
                  <div className="flex-1 bg-slate-50 border border-slate-100 p-4 rounded-2xl mb-6 space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Advogado Acionado</p>
                      <p className="font-bold text-slate-800 text-sm">{call.lawyer_name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Contato do Cliente</p>
                      <p className="font-black text-[#0F172A] text-lg">{call.client_phone}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <a href={formatPhone(call.client_phone)} target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="outline" className="w-full h-11 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50">
                        <Phone className="w-4 h-4 mr-2" /> Contatar
                      </Button>
                    </a>
                    <Button 
                      onClick={() => handleMarkAsResolved(call.id)}
                      className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-600/20"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Resolvido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {resolvedCalls.length > 0 && (
        <div className="pt-8 mt-8 border-t border-slate-200">
          <h2 className="text-lg font-black text-slate-400 mb-6 uppercase tracking-wider">
            Histórico de Urgências ({resolvedCalls.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {resolvedCalls.map((call) => (
              <div key={call.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-700 text-sm truncate pr-2">{call.client_name}</span>
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                </div>
                <p className="text-xs text-slate-500 font-medium">Acionou: {call.lawyer_name}</p>
                <p className="text-[10px] text-slate-400 mt-2">{new Date(call.created_at).toLocaleString('pt-BR')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
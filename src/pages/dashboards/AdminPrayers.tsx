import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, CheckCircle2, Clock, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AdminPrayers = () => {
  const [prayers, setPrayers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrayers(data || []);
    } catch (error) {
      console.error("Erro ao buscar orações:", error);
      toast.error("Erro ao carregar os pedidos de oração.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsPrayed = async (id: string) => {
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .update({ status: 'prayed' })
        .eq('id', id);

      if (error) throw error;

      setPrayers(prev => prev.map(p => p.id === id ? { ...p, status: 'prayed' } : p));
      toast.success("Oração confirmada!", { description: "Deus abençoe seu ministério de intercessão." });
    } catch (error) {
      console.error("Erro ao atualizar oração:", error);
      toast.error("Erro ao registrar a oração.");
    }
  };

  const pendingPrayers = prayers.filter(p => p.status === 'pending');
  const prayedPrayers = prayers.filter(p => p.status === 'prayed');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header Especial Reverente */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A] p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden shadow-2xl text-center border border-slate-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1437604537849-8134bb613e51?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
            <Sparkles className="w-8 h-8 text-amber-300" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Espaço de Intercessão
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl mx-auto italic mb-6">
            "Porque, onde estiverem dois ou três reunidos em meu nome, aí estou eu no meio deles."
          </p>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
            Mateus 18:20
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-[#0F172A] flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-primary" />
            Pedidos Aguardando Oração ({pendingPrayers.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : pendingPrayers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Nenhum pedido pendente</h3>
            <p className="text-slate-500">Todos os pedidos de oração já foram atendidos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingPrayers.map((prayer) => (
              <Card key={prayer.id} className="border-slate-200/60 shadow-md rounded-3xl overflow-hidden bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-lg text-slate-900">{prayer.user_name}</h3>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{prayer.user_type}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(prayer.created_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex-1 bg-amber-50/50 border border-amber-100 p-5 rounded-2xl mb-6">
                    <p className="text-slate-700 leading-relaxed font-medium italic">
                      "{prayer.request}"
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => handleMarkAsPrayed(prayer.id)}
                    className="w-full h-12 bg-[#1E3A5F] hover:bg-[#0F172A] text-white font-bold rounded-xl shadow-lg shadow-blue-900/20"
                  >
                    <HeartHandshake className="w-5 h-5 mr-2" /> Já Orei por Este Pedido
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {prayedPrayers.length > 0 && (
        <div className="pt-8 mt-8 border-t border-slate-200">
          <h2 className="text-lg font-black text-slate-400 mb-6 uppercase tracking-wider">
            Pedidos Atendidos ({prayedPrayers.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {prayedPrayers.map((prayer) => (
              <div key={prayer.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 opacity-70">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-700">{prayer.user_name}</span>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 italic">"{prayer.request}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
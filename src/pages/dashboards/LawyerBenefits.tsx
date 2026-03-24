import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Gift, ExternalLink, Info, Loader2, Building, Tag, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const LawyerBenefits = () => {
  const [benefits, setBenefits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBenefit, setSelectedBenefit] = useState<any>(null);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('benefits').select('*').eq('is_active', true).order('created_at', { ascending: false });
      if (!error && data) setBenefits(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Hero Premium */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-amber-600/20 border border-amber-400">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 text-white/10 pointer-events-none">
          <Gift className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-md px-3 py-1 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-3 h-3 mr-1.5" /> Exclusivo
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
            Clube de Benefícios
          </h1>
          <p className="text-amber-100 font-medium max-w-2xl text-lg">
            Aproveite descontos e vantagens exclusivas em softwares, livros, saúde e bem-estar, pensados para o seu crescimento.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-amber-500" /></div>
      ) : benefits.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <Gift className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-600">Nenhum benefício disponível</h3>
          <p className="text-slate-400">Estamos fechando novas parcerias. Volte em breve!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <Card key={b.id} className="border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white flex flex-col h-full group overflow-hidden">
              <div className="h-32 bg-slate-100 relative flex items-center justify-center border-b border-slate-100">
                {b.image_url ? (
                  <img src={b.image_url} alt={b.company} className="h-full w-full object-cover" />
                ) : (
                  <Building className="w-12 h-12 text-slate-300" />
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-slate-700 font-bold shadow-sm">{b.category}</Badge>
                </div>
              </div>
              
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{b.company}</p>
                  <h3 className="font-black text-lg text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">{b.title}</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-black text-sm flex items-center">
                    <Tag className="w-4 h-4 mr-1.5" /> {b.discount}
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Button onClick={() => setSelectedBenefit(b)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl h-11">
                    Ver como resgatar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Resgate */}
      <Dialog open={!!selectedBenefit} onOpenChange={(o) => !o && setSelectedBenefit(null)}>
        {selectedBenefit && (
          <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
            <div className="bg-slate-900 p-8 text-white relative">
              <Gift className="w-32 h-32 absolute right-0 top-0 opacity-10 pointer-events-none -mt-4 -mr-4" />
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0 font-bold">{selectedBenefit.discount}</Badge>
                  <Badge variant="outline" className="border-slate-700 text-slate-300">{selectedBenefit.category}</Badge>
                </div>
                <DialogTitle className="text-2xl font-black text-white">{selectedBenefit.company}</DialogTitle>
                <p className="text-slate-400 font-medium mt-1">{selectedBenefit.title}</p>
              </DialogHeader>
            </div>
            
            <div className="p-8 bg-white space-y-6">
              {selectedBenefit.description && (
                <p className="text-slate-600 font-medium leading-relaxed">{selectedBenefit.description}</p>
              )}
              
              <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
                <h4 className="text-sm font-black text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Regras de Resgate
                </h4>
                <p className="text-amber-900 text-sm whitespace-pre-line font-medium leading-relaxed">
                  {selectedBenefit.instructions}
                </p>
              </div>

              {selectedBenefit.link && (
                <div className="pt-2">
                  <a href={selectedBenefit.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl h-12 shadow-lg shadow-amber-500/20">
                      Acessar Benefício <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Briefcase, Scale, Heart, Shield, Users, ShoppingCart,
  Building2, Receipt, Home, HelpCircle, MessageCircle,
  Check, Loader2, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const SPECIALTY_CONFIG = [
  { name: "Trabalhista", icon: Briefcase, color: "bg-blue-500", lightBg: "bg-blue-50", lightText: "text-blue-700", borderActive: "border-blue-400 ring-blue-200" },
  { name: "Civil", icon: Scale, color: "bg-emerald-500", lightBg: "bg-emerald-50", lightText: "text-emerald-700", borderActive: "border-emerald-400 ring-emerald-200" },
  { name: "Família", icon: Heart, color: "bg-rose-500", lightBg: "bg-rose-50", lightText: "text-rose-700", borderActive: "border-rose-400 ring-rose-200" },
  { name: "Previdenciário", icon: Shield, color: "bg-amber-500", lightBg: "bg-amber-50", lightText: "text-amber-700", borderActive: "border-amber-400 ring-amber-200" },
  { name: "Criminal", icon: Users, color: "bg-red-600", lightBg: "bg-red-50", lightText: "text-red-700", borderActive: "border-red-400 ring-red-200" },
  { name: "Consumidor", icon: ShoppingCart, color: "bg-violet-500", lightBg: "bg-violet-50", lightText: "text-violet-700", borderActive: "border-violet-400 ring-violet-200" },
  { name: "Empresarial", icon: Building2, color: "bg-slate-700", lightBg: "bg-slate-50", lightText: "text-slate-700", borderActive: "border-slate-400 ring-slate-200" },
  { name: "Tributário", icon: Receipt, color: "bg-cyan-600", lightBg: "bg-cyan-50", lightText: "text-cyan-700", borderActive: "border-cyan-400 ring-cyan-200" },
  { name: "Imobiliário", icon: Home, color: "bg-orange-500", lightBg: "bg-orange-50", lightText: "text-orange-700", borderActive: "border-orange-400 ring-orange-200" },
];

interface SpecialtyPickerProps {
  open: boolean;
  onConfirm: (specialties: string[]) => void;
  isLoading?: boolean;
}

export const SpecialtyPicker: React.FC<SpecialtyPickerProps> = ({ open, onConfirm, isLoading = false }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-lg p-0 rounded-[2rem] border-0 shadow-2xl [&>button]:hidden flex flex-col max-h-[95vh] overflow-hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-[#000B21] via-[#001433] to-[#000B21] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#0066FF]/15 rounded-full blur-[60px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">Quase pronto!</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Com o que você precisa de ajuda?
            </h2>
            <p className="text-white/50 text-sm font-medium max-w-sm mx-auto">
              Selecione as áreas jurídicas do seu caso para encontrarmos o advogado ideal pra você.
            </p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar">
          {/* Specialty Grid */}
          <div className="grid grid-cols-3 gap-3">
            {SPECIALTY_CONFIG.map(({ name, icon: Icon, color, lightBg, lightText, borderActive }) => {
              const isActive = selected.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggle(name)}
                  className={cn(
                    "relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all duration-200 group cursor-pointer",
                    isActive
                      ? `${lightBg} ${borderActive} ring-2 shadow-sm`
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <Check className={`w-4 h-4 ${lightText}`} />
                    </div>
                  )}
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm",
                    isActive ? color : "bg-slate-100 group-hover:bg-slate-200"
                  )}>
                    <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700")} />
                  </div>
                  <span className={cn(
                    "text-xs font-bold text-center leading-tight",
                    isActive ? lightText : "text-slate-600"
                  )}>
                    {name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* "Não sei" Section */}
          <div className="mt-5 p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-slate-800 leading-tight">Não sabe qual escolher?</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">Nós ajudamos a identificar qual profissional é ideal para o seu caso!</p>
              </div>
              <a
                href="https://wa.me/5561993574056?text=Ol%C3%A1%2C%20acabei%20de%20me%20cadastrar%20no%20Meu%20Advogado%20e%20preciso%20de%20ajuda%20para%20escolher%20a%20especialidade%20certa."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-9 px-4 font-bold text-xs shadow-md shadow-green-600/20 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Ajuda
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Footer for Button */}
        <div className="p-6 pt-2 bg-white border-t border-slate-100 sticky bottom-0">
          <Button
            onClick={() => onConfirm(selected)}
            disabled={isLoading}
            className={cn(
              "w-full h-14 text-base font-black rounded-2xl shadow-lg transition-all",
              selected.length > 0
                ? "bg-[#0066FF] hover:bg-blue-500 shadow-blue-500/30"
                : "bg-[#0F172A] hover:bg-slate-800 text-white shadow-slate-900/20"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : selected.length > 0 ? (
              `Confirmar ${selected.length} ${selected.length === 1 ? 'área' : 'áreas'} e prosseguir`
            ) : (
              "Prosseguir para o Painel"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

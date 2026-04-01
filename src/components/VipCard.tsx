import React from 'react';
import { Award, QrCode } from 'lucide-react';

export interface VipCardProps {
  name: string;
  oab: string;
  oabState?: string;
  memberSince?: string;
}

export const VipCard: React.FC<VipCardProps> = ({ name, oab, oabState, memberSince = '2026' }) => {
  return (
    <div className="relative w-full max-w-[420px] aspect-[1.586/1] min-h-[220px] mx-auto rounded-[1.5rem] bg-gradient-to-br from-[#000B21] via-[#001433] to-[#00040A] shadow-[0_20px_50px_rgba(0,102,255,0.15)] overflow-hidden group border border-[#0066FF]/20 ring-1 ring-[#0066FF]/10 transition-transform duration-500 hover:scale-[1.02]">
      
      {/* Carbon Fiber Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.25] mix-blend-overlay"></div>
      
      {/* Holographic Sweep / Cyan Glow */}
      <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-[#0066FF]/20 to-transparent group-hover:animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Floating Magic Orbs (Landing Page Colors) */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#0066FF]/30 rounded-full blur-[50px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] mix-blend-screen pointer-events-none"></div>

      {/* Glossy Reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 p-5 sm:p-7 flex flex-col h-full">
        
        {/* Top Header */}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <span className="font-black tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-[10px] sm:text-xs tracking-widest">
              ADVOGADO 2.0 VIP
            </span>
            <span className="text-white/40 text-[8px] sm:text-[10px] tracking-widest mt-1">BENEFITS CLUB MEMBER</span>
          </div>
          <Award className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 opacity-90 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] shrink-0" />
        </div>

        {/* Middle Section: Chip & NFC (flex-1 pushes everything perfectly) */}
        <div className="flex-1 flex justify-between items-center w-full min-h-[60px]">
          <div className="w-10 h-8 sm:w-12 sm:h-9 rounded-md bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 opacity-90 shadow-[inset_0_1px_4px_rgba(255,255,255,0.5),0_2px_4px_rgba(0,0,0,0.4)] relative flex items-center justify-center overflow-hidden shrink-0">
             <div className="absolute w-full h-[1px] bg-amber-800/40 top-1/3"></div>
             <div className="absolute w-full h-[1px] bg-amber-800/40 bottom-1/3"></div>
             <div className="absolute w-[1px] h-full bg-amber-800/40 left-1/3"></div>
             <div className="absolute w-[1px] h-full bg-amber-800/40 right-1/3"></div>
             <div className="w-4 h-5 sm:w-5 sm:h-6 rounded-sm border border-amber-800/30"></div>
          </div>
          
          <div className="flex flex-col items-center opacity-70 mix-blend-screen shrink-0">
             <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-[#0066FF]" />
             <span className="text-[6px] text-white font-bold mt-1 tracking-widest uppercase">Scan in Store</span>
          </div>
        </div>

        {/* Bottom Details (Truncated & Safely Aligned) */}
        <div className="flex justify-between items-end w-full mt-auto">
          {/* Using min-w-0 on flex containers allows inner elements to truncate correctly */}
          <div className="flex flex-col w-[80%] min-w-0 pr-4"> 
            <h3 className="text-base sm:text-lg font-black text-amber-400 tracking-widest uppercase drop-shadow-md truncate w-full">
              {name || 'Membro Exclusivo'}
            </h3>
            
            <div className="flex items-center gap-3 sm:gap-4 mt-2 w-full">
              {/* Member Since Container */}
              <div className="flex flex-col min-w-0 max-w-[50%]">
                <span className="text-[7px] sm:text-[9px] text-amber-300/60 font-bold uppercase tracking-widest truncate">Membro Desde</span>
                <span className="text-amber-400 font-mono text-[10px] sm:text-[13px] tracking-widest truncate">{memberSince}</span>
              </div>
              
              {/* OAB Container */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[7px] sm:text-[9px] text-amber-300/60 font-bold uppercase tracking-widest truncate">OAB</span>
                <span className="text-amber-400 font-mono text-[10px] sm:text-[13px] tracking-widest truncate">
                  {oab ? `${oab} ${oabState || ''}` : 'VERIFICADO'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end shrink-0 pl-1 pb-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#000814]/80 flex items-center justify-center border border-[#0066FF]/40 backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,102,255,0.4)]">
                <span className="font-serif italic font-black text-amber-400 text-xl sm:text-2xl drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]">V</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

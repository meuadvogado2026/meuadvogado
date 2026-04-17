import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const PartnerFooter = () => {
  const [partners, setPartners] = useState<{ id: string; name: string; logo_url: string }[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: true });

        if (!error && data) {
          setPartners(data);
        }
      } catch (error) {
        console.error('Erro ao buscar parceiros:', error);
      }
    };

    fetchPartners();
  }, []);

  if (partners.length === 0) return null;

  return (
    <div className="w-full bg-[#0F172A] mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">
          Nossos Parceiros
        </p>
        
        {/* Container Estático e Responsivo */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <img 
              key={partner.id}
              src={partner.logo_url} 
              alt={partner.name} 
              title={partner.name}
              className="h-12 md:h-16 object-contain opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300 grayscale hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

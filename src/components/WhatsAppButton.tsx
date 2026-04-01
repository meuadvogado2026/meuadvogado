import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface WhatsAppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  message?: string;
  phone?: string;
  lawyerId?: string; // Novo campo para rastrear qual advogado recebeu o clique
  fullWidth?: boolean;
}

export const WhatsAppButton = ({ 
  message = "Olá! Encontrei seu perfil no Advogado 2.0 e gostaria de uma orientação.", 
  phone = "", 
  lawyerId,
  fullWidth = false,
  className,
  ...props 
}: WhatsAppButtonProps) => {
  const { user } = useAuth();
  
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Rastreia o clique silenciosamente se tivermos o ID do advogado
    if (lawyerId) {
      supabase.from('lawyer_events').insert({
        lawyer_id: lawyerId,
        client_id: user?.id || null,
        event_type: 'whatsapp_click'
      }).then(); // Dispara sem aguardar para não atrasar a abertura da janela
    }
    
    // Formatação do número
    let cleanedPhone = phone?.replace(/\D/g, '');
    if (!cleanedPhone) {
      cleanedPhone = "5511999999999";
    } else if (cleanedPhone.length === 10 || cleanedPhone.length === 11) {
      cleanedPhone = `55${cleanedPhone}`;
    }

    const url = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Button 
      onClick={handleClick}
      className={cn("bg-green-600 hover:bg-green-700 text-white gap-2 font-medium transition-all shadow-sm", fullWidth && "w-full", className)}
      {...props}
    >
      <MessageCircle className="w-5 h-5" />
      Falar no WhatsApp
    </Button>
  );
};
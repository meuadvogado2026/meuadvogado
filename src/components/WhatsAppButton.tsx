import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  message?: string;
  phone?: string;
  fullWidth?: boolean;
}

export const WhatsAppButton = ({ 
  message = "Olá! Encontrei seu perfil no Meu Advogado e gostaria de uma orientação.", 
  phone = "", 
  fullWidth = false,
  className,
  ...props 
}: WhatsAppButtonProps) => {
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove tudo que não for número
    let cleanedPhone = phone?.replace(/\D/g, '');
    
    // Se não tiver nenhum número, usa um fallback (para evitar erro de link vazio)
    if (!cleanedPhone) {
      cleanedPhone = "5511999999999";
    } else if (cleanedPhone.length === 10 || cleanedPhone.length === 11) {
      // Se tiver 10 ou 11 dígitos, é provável que seja só o (DDD) + Número. Adicionamos o "55" do Brasil.
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
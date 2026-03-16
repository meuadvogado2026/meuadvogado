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
  phone = "5511999999999", 
  fullWidth = false,
  className,
  ...props 
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
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
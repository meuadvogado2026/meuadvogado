-- Execute este script no SQL Editor do seu Supabase para criar as tabelas de métricas

-- 1. Tabela para registrar visualizações de perfil e cliques no WhatsApp
CREATE TABLE public.lawyer_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lawyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'profile_view' ou 'whatsapp_click'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.lawyer_events ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa (mesmo sem login) pode gerar um evento de visualização/clique
CREATE POLICY "Permitir inserção de eventos para todos" ON public.lawyer_events
FOR INSERT WITH CHECK (true);

-- Advogados podem ver apenas os seus próprios eventos
CREATE POLICY "Advogados veem seus próprios eventos" ON public.lawyer_events
FOR SELECT TO authenticated USING (auth.uid() = lawyer_id);


-- 2. Tabela para registrar quando um cliente favorita um advogado
CREATE TABLE public.favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lawyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, lawyer_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Clientes podem favoritar
CREATE POLICY "Clientes inserem seus favoritos" ON public.favorites
FOR INSERT TO authenticated WITH CHECK (auth.uid() = client_id);

-- Clientes veem seus favoritos
CREATE POLICY "Clientes veem seus favoritos" ON public.favorites
FOR SELECT TO authenticated USING (auth.uid() = client_id);

-- Clientes removem seus favoritos
CREATE POLICY "Clientes removem seus favoritos" ON public.favorites
FOR DELETE TO authenticated USING (auth.uid() = client_id);

-- Advogados podem ver quem os favoritou (para contar o total de favoritos)
CREATE POLICY "Advogados veem quem favoritou" ON public.favorites
FOR SELECT TO authenticated USING (auth.uid() = lawyer_id);
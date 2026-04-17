-- ==========================================
-- CREATE PARTNERS TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS public.partners (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    logo_url text NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Política de leitura: qualquer usuário (autenticado ou anônimo) pode ler os parceiros
CREATE POLICY "Public read access for partners" 
ON public.partners FOR SELECT 
USING (true);

-- Política de inserção, atualização e deleção: apenas Admin pode gerenciar
-- (No Supabase, roles precisam ser validadas contra a tabela profiles.
-- Como uma medida de segurança, usaremos a verificação de role na tabela profiles.)
CREATE POLICY "Admin full access partners" 
ON public.partners 
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
);

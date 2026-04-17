-- =============================================================
-- SETUP_CITIES.sql
-- Cria tabela de cidades e popula com DF + Entorno
-- Executar no Supabase SQL Editor
-- =============================================================

-- 1. Criar tabela
CREATE TABLE IF NOT EXISTS cities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  state text NOT NULL,
  city text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(state, city)
);

-- 2. RLS
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Leitura pública
CREATE POLICY "cities_read_all" ON cities FOR SELECT USING (true);

-- Admin pode inserir/deletar
CREATE POLICY "cities_admin_insert" ON cities FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "cities_admin_delete" ON cities FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Seed: Distrito Federal (RAs)
INSERT INTO cities (state, city) VALUES
  ('DF', 'Brasília'),
  ('DF', 'Águas Claras'),
  ('DF', 'Ceilândia'),
  ('DF', 'Taguatinga'),
  ('DF', 'Samambaia'),
  ('DF', 'Gama'),
  ('DF', 'Sobradinho'),
  ('DF', 'Sobradinho II'),
  ('DF', 'Planaltina'),
  ('DF', 'Guará'),
  ('DF', 'Recanto das Emas'),
  ('DF', 'Riacho Fundo'),
  ('DF', 'Riacho Fundo II'),
  ('DF', 'Lago Sul'),
  ('DF', 'Lago Norte'),
  ('DF', 'Santa Maria'),
  ('DF', 'Vicente Pires'),
  ('DF', 'Paranoá'),
  ('DF', 'São Sebastião'),
  ('DF', 'Núcleo Bandeirante'),
  ('DF', 'Candangolândia'),
  ('DF', 'Cruzeiro'),
  ('DF', 'Sudoeste'),
  ('DF', 'Octogonal'),
  ('DF', 'Asa Sul'),
  ('DF', 'Asa Norte'),
  ('DF', 'Varjão'),
  ('DF', 'Itapoã'),
  ('DF', 'Jardim Botânico'),
  ('DF', 'SIA'),
  ('DF', 'SCIA (Estrutural)'),
  ('DF', 'Fercal'),
  ('DF', 'Sol Nascente'),
  ('DF', 'Pôr do Sol'),
  ('DF', 'Arniqueira')
ON CONFLICT (state, city) DO NOTHING;

-- 4. Seed: Entorno (Goiás)
INSERT INTO cities (state, city) VALUES
  ('GO', 'Águas Lindas de Goiás'),
  ('GO', 'Valparaíso de Goiás'),
  ('GO', 'Cidade Ocidental'),
  ('GO', 'Novo Gama'),
  ('GO', 'Luziânia'),
  ('GO', 'Santo Antônio do Descoberto'),
  ('GO', 'Planaltina de Goiás'),
  ('GO', 'Formosa'),
  ('GO', 'Padre Bernardo'),
  ('GO', 'Alexânia'),
  ('GO', 'Cristalina'),
  ('GO', 'Abadiânia'),
  ('GO', 'Corumbá de Goiás'),
  ('GO', 'Pirenópolis'),
  ('GO', 'Cocalzinho de Goiás'),
  ('GO', 'Mimoso de Goiás')
ON CONFLICT (state, city) DO NOTHING;

-- 5. Seed: Entorno (Minas Gerais)
INSERT INTO cities (state, city) VALUES
  ('MG', 'Unaí'),
  ('MG', 'Buritis'),
  ('MG', 'Paracatu'),
  ('MG', 'Cabeceira Grande')
ON CONFLICT (state, city) DO NOTHING;

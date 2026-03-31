-- ATUALIZAÇÃO DO ALGORITMO (Executar no SQL Editor do Supabase)
-- Corrige o erro 400 (Bad Request) causado por crash matemático (Haversine Precision) 
-- e por validação de tipos de dados numéricos (lat/lng).

CREATE OR REPLACE FUNCTION get_ideal_lawyer(user_lat numeric, user_lng numeric, user_specs text[])
RETURNS TABLE (
  id uuid,
  name text,
  avatar_url text,
  city text,
  state text,
  lat text,
  lng text,
  distance_km float,
  main_specialty text,
  secondary_specialties text[]
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.avatar_url,
    p.city,
    p.state,
    p.lat::text,
    p.lng::text,
    -- PROTEÇÃO CONTRA BUG DE GEOMETRIA (Acos Domain Error / Precision Fallback)
    (6371 * acos(
      LEAST(1.0, GREATEST(-1.0, 
        cos(radians(user_lat::float)) * cos(radians(p.lat::float)) *
        cos(radians(p.lng::float) - (radians(user_lng::float))) +
        sin(radians(user_lat::float)) * sin(radians(p.lat::float))
      ))
    )) AS distance_km,
    d.main_specialty,
    d.secondary_specialties
  FROM profiles p
  JOIN lawyer_details d ON p.id = d.id
  WHERE p.role = 'lawyer' 
    AND d.status = 'approved'
    -- Filtra os advogados cruzando a especialidade escolhida pelo cliente
    AND (
      d.main_specialty = ANY(user_specs) 
      OR 
      d.secondary_specialties && user_specs
    )
    -- Garante que o advogado tem as coordenadas instaladas (remove o != '' que causava crash)
    AND p.lat IS NOT NULL 
    AND p.lng IS NOT NULL
  ORDER BY distance_km ASC
  LIMIT 1; -- Força matematicamente o sistema a trazer APENAS 1 Advogado (o mais próximo globalmente)
END;
$$;

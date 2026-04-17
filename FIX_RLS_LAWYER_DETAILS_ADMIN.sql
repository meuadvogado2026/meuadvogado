-- =============================================================
-- FIX_RLS_LAWYER_DETAILS_ADMIN.sql
-- Permite que admins façam INSERT/UPDATE/DELETE em lawyer_details
-- Executar no Supabase SQL Editor
-- =============================================================

-- 1. Verificar policies existentes (para diagnóstico)
-- SELECT * FROM pg_policies WHERE tablename = 'lawyer_details';

-- 2. Criar policy para admin INSERT
CREATE POLICY "admin_insert_lawyer_details"
  ON lawyer_details
  FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 3. Criar policy para admin UPDATE
CREATE POLICY "admin_update_lawyer_details"
  ON lawyer_details
  FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 4. Criar policy para admin DELETE (para casos futuros)
CREATE POLICY "admin_delete_lawyer_details"
  ON lawyer_details
  FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 5. Garantir que admins também podem atualizar profiles de outros usuários
-- (Caso a policy de profiles também bloqueie)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'admin_update_profiles'
  ) THEN
    CREATE POLICY "admin_update_profiles"
      ON profiles
      FOR UPDATE
      USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      )
      WITH CHECK (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
      );
  END IF;
END
$$;

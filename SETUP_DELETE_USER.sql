-- ================================================
-- FUNÇÃO PARA DELETAR USUÁRIO (ADMIN ONLY) - v2
-- Execute este SQL no Supabase SQL Editor
-- ================================================

-- Primeiro, dropar a versão anterior se existir
DROP FUNCTION IF EXISTS public.delete_user_admin(UUID);

CREATE OR REPLACE FUNCTION public.delete_user_admin(target_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  caller_role TEXT;
  target_name TEXT;
BEGIN
  -- 1. Verificar se o caller é admin
  SELECT role INTO caller_role 
  FROM public.profiles 
  WHERE id = auth.uid();
  
  IF caller_role IS NULL OR caller_role != 'admin' THEN
    RETURN json_build_object('success', false, 'error', 'Apenas administradores podem excluir usuários.');
  END IF;

  -- 2. Não permitir auto-exclusão
  IF target_user_id = auth.uid() THEN
    RETURN json_build_object('success', false, 'error', 'Você não pode excluir sua própria conta.');
  END IF;

  -- 3. Buscar nome do usuário
  SELECT name INTO target_name FROM public.profiles WHERE id = target_user_id;
  
  IF target_name IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Usuário não encontrado.');
  END IF;

  -- 4. Deletar dados relacionados (cada tabela com suas colunas reais)
  -- prayer_requests: coluna user_id
  DELETE FROM public.prayer_requests WHERE prayer_requests.user_id = target_user_id;
  
  -- favorites: colunas client_id e lawyer_id
  DELETE FROM public.favorites WHERE favorites.client_id = target_user_id OR favorites.lawyer_id = target_user_id;
  
  -- urgent_calls: coluna lawyer_id
  DELETE FROM public.urgent_calls WHERE urgent_calls.lawyer_id = target_user_id;
  
  -- lawyer_events: coluna lawyer_id
  DELETE FROM public.lawyer_events WHERE lawyer_events.lawyer_id = target_user_id;
  
  -- lawyer_details: coluna id
  DELETE FROM public.lawyer_details WHERE lawyer_details.id = target_user_id;
  
  -- profiles: coluna id
  DELETE FROM public.profiles WHERE profiles.id = target_user_id;
  
  -- 5. Deletar do auth.users
  DELETE FROM auth.users WHERE auth.users.id = target_user_id;
  
  RETURN json_build_object('success', true, 'message', 'Usuário ' || target_name || ' excluído com sucesso.');
  
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Dar permissão para authenticated users chamarem
GRANT EXECUTE ON FUNCTION public.delete_user_admin(UUID) TO authenticated;

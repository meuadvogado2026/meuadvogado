# 🤖 REGRAS DO AGENTE — Advogado 2.0

Este arquivo define os protocolos comportamentais e padrões técnicos obrigatórios que o agente de AI deve seguir ao manipular este repositório.

---

## 🚫 PROIBIÇÕES CRÍTICAS (NUNCA FAÇA)

1.  **Cores Proibidas:** Nunca use cores roxas ou violetas. A identidade visual é estritamente azul escuro, azul vivo e amber.
2.  **Bypass de Aprovação:** Nunca altere o status de um advogado para `approved` sem passar pela lógica de revisão de OAB no painel admin.
3.  **Auto-Aprovação:** Um admin nunca deve ser capaz de aprovar seu próprio cadastro de advogado.
4.  **Exposição de Dados Sensíveis:** Pedidos de oração são privados. Nunca os exiba fora do contexto estrito do painel admin em `/admin/oracoes`.
5.  **Novas Especialidades:** A lista de especialidades jurídicas é fechada. Use apenas as definidas em `src/data/mock.ts`.
6.  **Deleção Destrutiva:** Nunca delete usuários via `delete()` do Supabase. Use sempre a função RPC `delete_user_admin`.

---

## ✅ DIRETRIZES OBRIGATÓRIAS (SEMPRE FAÇA)

### 🎨 Design & UI
1.  **Estética Premium:** Mantenha o design sóbrio e profissional. Use `rounded-3xl` para cards e `rounded-xl` para botões/inputs.
2.  **Feedback Visual:** Sempre use `toast` (Sonner) para sucessos e erros em operações assíncronas.
3.  **Skeleton Loading:** Use `animate-pulse` ou Skeletons enquanto os dados carregam do Supabase. Não deixe a tela em branco.
4.  **Mobile First:** Garanta que todos os componentes funcionem na navegação inferior `MobileNav`.

### 💻 Desenvolvimento & Código
1.  **Segurança de Role:** Verifique `role` do `AuthContext` antes de renderizar funcionalidades ou botões sensíveis.
2.  **Persistência de Eventos:** Atualize `lawyer_events` ao criar novas interações rastreáveis (`profile_view`, `whatsapp_click`).
3.  **Integração CEP:** Ao editar endereços, use `fetchCepData` para autopreencher cidade, estado, bairro e rua.
4.  **Tipagem Estática:** Use TypeScript rigorosamente. Evite `any` a menos que seja estritamente necessário para integração com bibliotecas de terceiros.

---

## 🔧 PADRÕES DE IMPLEMENTAÇÃO

### 1. Queries Supabase
Sempre trate erros e use `.single()` ou `.maybeSingle()` dependendo da expectativa de retorno.
```ts
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

if (error) {
  toast.error("Erro ao carregar dados");
  return;
}
```

### 2. Estrutura de Páginas de Dashboard
```tsx
export const ExemploPage = () => {
  const { user, role } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Conteúdo aqui */}
    </div>
  );
};
```

### 3. Masking & Utility
Use as funções utilitárias em `src/utils/` (como `cep.ts`) para manter a consistência de inputs.

---

## 📋 CHECKLIST PRÉ-SUBMISSÃO

- [ ] Removi logs de debug desnecessários?
- [ ] O código segue o padrão de cores (Sem Roxo)?
- [ ] Adicionei feedback de loading?
- [ ] A responsividade mobile está preservada?
- [ ] Verifiquei se a role do usuário permite esta ação?

---
*Este arquivo deve ser lido pelo agente no início de cada tarefa.*

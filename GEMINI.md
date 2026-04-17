# GEMINI.md — Advogado 2.0
> Documentação técnica e de produto da plataforma **Advogado 2.0**. Este arquivo é a fonte única de verdade para o AI e para novos desenvolvedores entenderem o projeto.

---

## 📌 VISÃO GERAL DO PRODUTO

**Nome:** Advogado 2.0 (interno: "Meu Advogado")
**Plataforma:** Web App + Android PWA (via Capacitor)
**Propósito:** Marketplace jurídico que conecta clientes a advogados qualificados por geolocalização, especialidade e validação OAB. A plataforma também conta com um componente espiritual único: uma rede de intercessão/oração para advogados e clientes.

**Slogan:** *"Encontre o seu advogado ideal com rapidez."*

---

## 🏗️ STACK TECNOLÓGICO

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19.x | Framework principal |
| TypeScript | 5.5+ | Tipagem estática |
| Vite | 6.x | Bundler e dev server |
| React Router v6 | 6.26+ | Roteamento SPA |
| TailwindCSS | 3.4+ | Estilização (utility-first) |
| shadcn/ui + Radix UI | Latest | Componentes acessíveis |
| TanStack Query | 5.x | Cache e gerenciamento de estado servidor |
| React Hook Form + Zod | Latest | Validação de formulários |
| Recharts | 2.12+ | Gráficos e analytics |
| Lucide React | 0.462+ | Ícones |
| Sonner | 1.5+ | Notificações toast |
| date-fns | 3.x | Manipulação de datas |

### Backend & Infraestrutura
| Tecnologia | Uso |
|---|---|
| Supabase | Auth, Banco de Dados PostgreSQL, Storage |
| Capacitor 8.x | Empacotamento Android (PWA → APK) |
| Vite PWA Plugin | Service Worker e manifest |
| Vercel | Deploy e hosting web |

### Capacitor Plugins
- `@capacitor/camera` — Upload de fotos
- `@capacitor/geolocation` — Localização GPS
- `@capacitor/preferences` — Armazenamento local

---

## 🗄️ MODELO DE DADOS (Supabase)

### Tabelas Principais

#### `profiles`
Tabela central de usuários (criada via trigger no Supabase Auth).
```
id          uuid (PK, FK → auth.users)
name        text
email       text
phone       text
role        text  -- 'client' | 'lawyer' | 'admin'
city        text
state       text
cep         text
street      text
neighborhood text
address_number text
lat         numeric
lng         numeric
avatar_url  text
cover_url   text
created_at  timestamptz
```

#### `lawyer_details`
Dados profissionais dos advogados (1:1 com profiles).
```
id                   uuid (PK, FK → profiles)
status               text  -- 'pending' | 'approved' | 'rejected'
oab                  text
oab_state            text
title                text
attendance_type      text  -- 'Online' | 'Presencial' | 'Híbrido'
experience_years     int
main_specialty       text
secondary_specialties text[]
mini_bio             text  (max 160 chars)
full_bio             text
whatsapp             text
instagram            text
linkedin             text
facebook             text
youtube              text
website              text
office_link          text  -- Link Google Maps
custom_link          text
rating               numeric
```

#### `lawyer_events`
Rastreamento de interações com perfis de advogados.
```
id          uuid (PK)
lawyer_id   uuid (FK → profiles)
event_type  text  -- 'profile_view' | 'whatsapp_click'
created_at  timestamptz
```

#### `favorites`
Advogados favoritados por clientes.
```
id          uuid (PK)
lawyer_id   uuid (FK → profiles)
client_id   uuid (FK → profiles)
created_at  timestamptz
```

#### `urgent_calls`
Sinalizações de contato urgente.
```
id          uuid (PK)
lawyer_id   uuid (FK → profiles)
client_id   uuid (FK → profiles)
created_at  timestamptz
```

#### `prayer_requests`
Pedidos de oração dos advogados (feature espiritual).
```
id          uuid (PK)
user_id     uuid (FK → profiles)
user_name   text
user_type   text  -- 'Advogado'
request     text  (max 1000 chars)
status      text  -- 'pending' | 'reviewed'
created_at  timestamptz
```

### Scripts SQL Relevantes
- `SETUP_DELETE_USER.sql` — Função `delete_user_admin` para deleção segura de usuários
- `SETUP_MATCH_ALGORITHM.sql` — Algoritmo de match por geolocalização
- `SETUP_METRICS.sql` — Views/funções de métricas da plataforma

---

## 🔐 AUTENTICAÇÃO & AUTORIZAÇÃO

### Sistema de Roles
| Role | Acesso |
|---|---|
| `client` | Dashboard de cliente, busca de advogados, favoritos |
| `lawyer` | Dashboard de performance, edição de perfil, benefícios |
| `admin` | Painel administrativo completo, aprovações, gestão de usuários |

### AuthContext (`src/contexts/AuthContext.tsx`)
- Gerencia: `session`, `user`, `role`, `isLoading`
- Role é lida da tabela `profiles` logo após o login
- Escuta mudanças em tempo real via `supabase.auth.onAuthStateChange`

### Proteção de Rotas (`ProtectedRoute`)
```tsx
<ProtectedRoute allowedRoles={['lawyer', 'admin']}>
  <DashboardLayout role="lawyer" />
</ProtectedRoute>
```

---

## 📄 PÁGINAS E ROTAS

### Rotas Públicas
| Rota | Componente | Descrição |
|---|---|---|
| `/` | `Landing` | Landing page marketing |
| `/buscar` | `Search` | Busca pública de advogados |
| `/advogado/:id` | `LawyerProfile` | Perfil público do advogado |
| `/login` | `Login` | Autenticação |
| `/cadastro` | `Signup` | Cadastro de novo usuário |
| `/privacidade` | `PrivacyPolicy` | Política de privacidade |
| `/termos` | `TermsOfUse` | Termos de uso |

### Dashboard Cliente
| Rota | Componente | Descrição |
|---|---|---|
| `/painel/cliente` | `ClientDashboard` | Painel principal do cliente |
| `/painel/cliente/perfil` | `ClientProfile` | Edição do perfil do cliente |
| `/painel/cliente/buscar` | `Search` | Busca de advogados (autenticado) |
| `/painel/cliente/advogado/:id` | `LawyerProfile` | Perfil do advogado (autenticado) |

### Dashboard Advogado
| Rota | Componente | Descrição |
|---|---|---|
| `/painel/advogado` | `LawyerDashboard` | Painel de performance com métricas |
| `/painel/advogado/perfil` | `LawyerProfileEdit` | Edição completa do perfil |
| `/painel/advogado/beneficios` | `LawyerBenefits` | Clube de vantagens VIP |
| `/painel/advogado/config` | `LawyerSettings` | Configurações da conta |

### Dashboard Admin
| Rota | Componente | Descrição |
|---|---|---|
| `/admin` | `AdminDashboard` | Visão geral da plataforma com KPIs |
| `/admin/aprovacoes` | `AdminApprovals` | Aprovação de advogados (OAB) |
| `/admin/usuarios` | `AdminUsers` | Gerenciamento de usuários |
| `/admin/oracoes` | `AdminPrayers` | Gestão de pedidos de oração |
| `/admin/urgencias` | `AdminUrgentCalls` | Chamadas urgentes |
| `/admin/beneficios` | `AdminBenefits` | Gestão de benefícios VIP |

---

## 🎯 REGRAS DE NEGÓCIO PRINCIPAIS

### 1. Validação OAB — Aprovação manual
- Advogado se cadastra com status `pending`
- Admin revisa na tela `/admin/aprovacoes`
- Somente advogados com status `approved` aparecem nas buscas
- **Admin NÃO pode aprovar a si mesmo**

### 2. Match por Geolocalização
- O algoritmo de match usa `lat`/`lng` do perfil do advogado (preenchidos via CEP)
- A busca para advogados online ignora geolocalização (alcance nacional)
- Advogados presenciais/híbridos são ordenados por proximidade

### 3. Especialidades
Área de atuação jurídica com lista fechada:
`Trabalhista`, `Civil`, `Família`, `Previdenciário`, `Criminal`, `Consumidor`, `Empresarial`, `Tributário`, `Imobiliário`
- 1 especialidade **principal** obrigatória para aprovação
- N especialidades **secundárias** opcionais

### 4. Completude do Perfil (Score)
Score de 0-100% calculado no dashboard do advogado:
| Item | Peso |
|---|---|
| Foto (avatar) | 15% |
| Imagem de capa | 5% |
| Biografia completa | 20% |
| Especialidade principal | 15% |
| Especialidades secundárias | 5% |
| Número da OAB | 10% |
| Cidade e Estado | 10% |
| WhatsApp | 10% |
| Instagram ou LinkedIn | 10% |

### 5. Métricas de Performance (Advogado)
- `profile_view` — registrado quando alguém acessa o perfil público
- `whatsapp_click` — registrado quando alguém clica no botão WhatsApp
- Dashboard exibe comparativo: **últimos 30 dias vs 30 dias anteriores**
- Tendências: `up` (verde), `down` (vermelho), `neutral` (cinza)

### 6. Cartão VIP
- Advogados aprovados recebem um **cartão VIP digital** (`VipCard`)
- Exibe: nome, número OAB, estado
- Pode ser apresentado em tela cheia para resgatar benefícios físicos

### 7. Pedidos de Oração (Feature Exclusiva)
- Disponível no dashboard do advogado
- Limite de 1000 caracteres
- Totalmente sigiloso — tratado apenas pela equipe admin em `/admin/oracoes`
- Status: `pending` → `reviewed`

### 8. Deleção de Usuários (Admin)
- Utiliza função SQL segura `delete_user_admin` (RPC)
- Remove dados em cascata: profiles, lawyer_details, events, favorites, urgent_calls, prayer_requests
- **Irreversível** — requer confirmação explícita do admin

### 9. Contato Direto (Sem Intermediários)
- Clientes contatam advogados **diretamente via WhatsApp**
- Sem taxa de plataforma, sem intermediação financeira
- O link do WhatsApp é montado: `https://wa.me/55{numero}`

---

## 🎨 DESIGN SYSTEM

### Identidade Visual
| Elemento | Descrição |
|---|---|
| **Tom** | Premium, sóbrio, profissional com toques de modernidade |
| **Modo** | Light mode padrão (dark apenas na Landing page) |
| **Fonte** | Padrão do sistema (sans-serif via Tailwind) |
| **Border radius** | `--radius: 0.75rem` (bordas suaves) |

### Paleta de Cores (CSS Variables)

#### Modo Light (Padrão — Dashboards)
```css
--background:           210 40% 98%;    /* Cinza quase branco */
--foreground:           222.2 84% 4.9%; /* Quase preto */
--primary:              222 47% 20%;    /* Azul escuro profissional */
--primary-foreground:   210 40% 98%;
--secondary:            214 32% 91%;    /* Azul claro */
--muted:                210 40% 96.1%;
--accent:               210 40% 96.1%;
--destructive:          0 84.2% 60.2%; /* Vermelho */
--radius:               0.75rem;
```

#### Landing Page (Dark Mode customizado)
| Token | Valor | Uso |
|---|---|---|
| Background | `#000B21` | Fundo principal escuro |
| Primary blue | `#0066FF` | CTAs, destaques, gradientes |
| Card dark | `#000814` | Cards na dark landing |
| Surface dark | `#00102A` | Superfícies secundárias |
| Gold/Amber | `#F59E0B` | VIP card, acentos premium |

### Componentes Reutilizáveis
| Componente | Descrição |
|---|---|
| `VipCard` | Cartão virtual dourado do advogado VIP |
| `LawyerCard` | Card de advogado nos resultados de busca |
| `SpecialtyPicker` | Seletor de especialidades jurídicas |
| `WhatsAppButton` | Botão verde de contato via WhatsApp |
| `MobileNav` | Navegação inferior para mobile |
| `ProtectedRoute` | Guard de rotas por role |
| `MetricCard` | Card de KPI com mini-gráfico sparkline |

### Padrões de Layout
- **Dashboard:** `max-w-7xl mx-auto`, grid responsivo `lg:grid-cols-12`
- **Cards:** `rounded-3xl border-slate-200/60 shadow-sm`
- **Botões primários:** `bg-primary text-white rounded-xl h-11 font-bold`
- **Scrollbar customizada:** `.custom-scrollbar` (5px width, thumb slate-200)
- **Animações:** `tailwindcss-animate` (accordion), `animate-spin` (loading), `animate-pulse` (skeleton)

### shadcn/ui Components em Uso
`Card`, `Button`, `Input`, `Label`, `Textarea`, `Badge`, `Dialog`, `Progress`, `Table`, `Select`, `Tabs`, `Avatar`, `Tooltip`, `Separator`, `Toast (Sonner)`

---

## 📁 ESTRUTURA DE PASTAS

```
src/
├── App.tsx                    # Roteamento principal
├── main.tsx                   # Entry point
├── globals.css                # CSS variables e tokens globais
├── assets/                    # Imagens e recursos estáticos
├── components/
│   ├── ui/                    # shadcn/ui (não editar manualmente)
│   ├── LawyerCard.tsx
│   ├── VipCard.tsx
│   ├── SpecialtyPicker.tsx
│   ├── WhatsAppButton.tsx
│   ├── MobileNav.tsx
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx         # Auth global (session, user, role)
├── data/
│   ├── mock.ts                # Lista de especialidades
│   └── locations.ts           # Lista de estados brasileiros
├── hooks/                     # Custom hooks
├── integrations/
│   └── supabase/
│       └── client.ts          # Cliente Supabase configurado
├── layouts/
│   ├── MainLayout.tsx         # Layout público (header + outlet)
│   └── DashboardLayout.tsx    # Layout padrão dos dashboards
├── lib/
│   └── utils.ts               # cn() utility (clsx + tailwind-merge)
├── pages/
│   ├── Landing.tsx
│   ├── Search.tsx
│   ├── LawyerProfile.tsx
│   ├── PrivacyPolicy.tsx
│   ├── TermsOfUse.tsx
│   ├── NotFound.tsx
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   └── dashboards/
│       ├── ClientDashboard.tsx
│       ├── ClientProfile.tsx
│       ├── LawyerDashboard.tsx
│       ├── LawyerProfileEdit.tsx
│       ├── LawyerBenefits.tsx
│       ├── LawyerSettings.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminApprovals.tsx
│       ├── AdminUsers.tsx
│       ├── AdminPrayers.tsx
│       ├── AdminUrgentCalls.tsx
│       └── AdminBenefits.tsx
└── utils/
    ├── cep.ts                 # Máscara e busca de CEP (ViaCEP)
    └── share.ts               # Web Share API + fallback clipboard
```

---

## 🧩 INTEGRAÇÕES EXTERNAS

| Serviço | Uso |
|---|---|
| **Supabase** | Auth, DB, Storage, RPC functions |
| **ViaCEP** | Autopreenchimento de endereço por CEP |
| **Google Maps** | Link de localização do escritório |
| **WhatsApp** | Contato direto (wa.me link) |
| **ImageKit** | CDN de imagens (hero da landing page) |
| **Unsplash** | Imagens de placeholder de avatar/capa |

---

## 📱 ANDROID / PWA

- **Capacitor 8.x** para geração do Android APK/AAB
- Permissões Android: `CAMERA`, `ACCESS_FINE_LOCATION`, `WRITE_EXTERNAL_STORAGE`, `READ_MEDIA_IMAGES`
- `vite-plugin-pwa` para service worker e manifest
- Keystore: `meu_advogado_keystore.jks`
- Configuração: `capacitor.config.ts`

---

## 🚀 SCRIPTS DE DESENVOLVIMENTO

```bash
npm run dev         # Servidor de desenvolvimento (Vite)
npm run build       # Build de produção
npm run build:dev   # Build em modo development
npm run lint        # ESLint
npm run preview     # Preview do build
```

---

## 🛡️ REGRAS PARA O AI (Instruções de Implementação)

### ❌ NUNCA FAÇA
1. **Purple/Violet** — Nunca usar cores roxas ou violetas. A paleta é azul escuro + azul vivo + amber.
2. **Aprovar sem validação** — Admin nunca pode aprovar advogados sem revisão de OAB.
3. **Deletar usuários sem confirmação** — Delete usa sempre a função RPC `delete_user_admin`.
4. **Expor dados sensíveis** — Pedidos de oração são 100% privados.
5. **Criar novas especialidades** — A lista de especialidades é fechada (ver `src/data/mock.ts`).

### ✅ SEMPRE FAÇA
1. **Verificar role** antes de renderizar qualquer funcionalidade sensível.
2. **Usar `toast` (Sonner)** para feedback de operações assíncronas.
3. **Skeleton loading** (`animate-pulse`) enquanto dados carregam do Supabase.
4. **`rounded-3xl`** para todos os cards principais do dashboard.
5. **Atualizar `lawyer_events`** ao criar novas interações rastreáveis.
6. **CEP → autopreenchimento** de cidade, estado, bairro e rua via `fetchCepData`.
7. **Ler `AuthContext`** para obter `user.id` antes de qualquer query Supabase.

### Padrão de Query Supabase
```ts
// ✅ Correto
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', user.id)
  .single();

if (error) throw error;
```

### Padrão de Componente de Dashboard
```tsx
// ✅ Estrutura padrão de página de dashboard
export const MinhaPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* conteúdo */}
    </div>
  );
};
```

---

## 🧪 VERIFICAÇÃO E QUALIDADE

### Checklist de Auditoria
```bash
python .agent/scripts/checklist.py .
```

### Prioridade de Execução
1. Security → 2. Lint → 3. Schema → 4. Tests → 5. UX → 6. SEO → 7. Lighthouse

### Considerações de Performance
- Queries Supabase devem ser paralelas quando não há dependência (usar `Promise.all`)
- Eventos de analytics são fire-and-forget (não bloquear a UI)
- Imagens de capa e avatar têm lazy loading implícito

---

*Última atualização: Abril 2026 — Versão Advogado 2.0*

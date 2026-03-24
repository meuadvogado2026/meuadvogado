import {
  LayoutDashboard,
  Search,
  User,
  Settings,
  PieChart,
  Users,
  ShieldCheck,
  AlertTriangle,
  HeartHandshake,
  Gift,
  Briefcase,
} from "lucide-react";

export interface NavLink {
  icon: any;
  label: string;
  path: string;
  /** Se definido, a mobile nav dispara uma ação ao invés de navegar. */
  action?: string;
}

/**
 * Retorna os links de navegação do sidebar (desktop) por role.
 */
export const getSidebarLinks = (role: 'client' | 'lawyer' | 'admin'): NavLink[] => {
  switch (role) {
    case 'client':
      return [
        { icon: LayoutDashboard, label: 'Visão Geral', path: '/painel/cliente' },
        { icon: Search, label: 'Buscar Advogados', path: '/painel/cliente/buscar' },
        { icon: User, label: 'Meu Perfil', path: '/painel/cliente/perfil' },
      ];
    case 'lawyer':
      return [
        { icon: LayoutDashboard, label: 'Meu Desempenho', path: '/painel/advogado' },
        { icon: Search, label: 'Buscar Colegas', path: '/painel/advogado/buscar' },
        { icon: Gift, label: 'Benefícios', path: '/painel/advogado/beneficios' },
        { icon: User, label: 'Editar Perfil', path: '/painel/advogado/perfil' },
        { icon: Settings, label: 'Configurações', path: '/painel/advogado/config' },
      ];
    case 'admin':
      return [
        { icon: PieChart, label: 'Métricas', path: '/admin' },
        { icon: AlertTriangle, label: 'Urgências', path: '/admin/urgencias' },
        { icon: ShieldCheck, label: 'Aprovações', path: '/admin/aprovacoes' },
        { icon: Users, label: 'Usuários', path: '/admin/usuarios' },
        { icon: HeartHandshake, label: 'Orações', path: '/admin/oracoes' },
        { icon: Gift, label: 'Benefícios', path: '/admin/beneficios' },
      ];
  }
};

/**
 * Retorna os links de navegação bottom (mobile) por role.
 * Inclui items com `action` que não são links reais (ex: abrir modal de oração).
 */
export const getMobileLinks = (role: 'public' | 'client' | 'lawyer' | 'admin'): NavLink[] => {
  switch (role) {
    case 'client':
      return [
        { icon: Search, label: 'Buscar', path: '/painel/cliente/buscar' },
        { icon: LayoutDashboard, label: 'Painel', path: '/painel/cliente' },
        { icon: User, label: 'Perfil', path: '/painel/cliente/perfil' },
        { icon: HeartHandshake, label: 'Oração', path: '', action: 'prayer' },
      ];
    case 'lawyer':
      return [
        { icon: LayoutDashboard, label: 'Painel', path: '/painel/advogado' },
        { icon: Search, label: 'Colegas', path: '/painel/advogado/buscar' },
        { icon: Gift, label: 'Benefícios', path: '/painel/advogado/beneficios' },
        { icon: User, label: 'Perfil', path: '/painel/advogado/perfil' },
        { icon: HeartHandshake, label: 'Oração', path: '', action: 'prayer' },
      ];
    case 'admin':
      return [
        { icon: PieChart, label: 'Métricas', path: '/admin' },
        { icon: AlertTriangle, label: 'Urgências', path: '/admin/urgencias' },
        { icon: ShieldCheck, label: 'Aprovações', path: '/admin/aprovacoes' },
        { icon: Gift, label: 'Benefícios', path: '/admin/beneficios' },
      ];
    default:
      return [
        { icon: Search, label: 'Buscar', path: '/buscar' },
        { icon: User, label: 'Entrar', path: '/login' },
        { icon: Briefcase, label: 'Cadastrar', path: '/cadastro' },
      ];
  }
};

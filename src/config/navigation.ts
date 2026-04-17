import {
  LayoutDashboard,
  Search,
  User,
  Settings,
  PieChart,
  Users,
  AlertTriangle,
  HeartHandshake,
  Gift,
  Briefcase,
  MapPin,
  Building,
} from "lucide-react";

export interface NavLink {
  icon: React.ElementType;
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
        { icon: User, label: 'Meu Perfil', path: '/painel/cliente/perfil' },
      ];
    case 'lawyer':
      return [
        { icon: LayoutDashboard, label: 'Meu Desempenho', path: '/painel/advogado' },
        { icon: Gift, label: 'Benefícios', path: '/painel/advogado/beneficios' },
        { icon: Settings, label: 'Configurações', path: '/painel/advogado/config' },
      ];
    case 'admin':
      return [
        { icon: PieChart, label: 'Métricas', path: '/admin' },
        { icon: AlertTriangle, label: 'Urgências', path: '/admin/urgencias' },
        { icon: Users, label: 'Usuários', path: '/admin/usuarios' },
        { icon: HeartHandshake, label: 'Orações', path: '/admin/oracoes' },
        { icon: Gift, label: 'Benefícios', path: '/admin/beneficios' },
        { icon: MapPin, label: 'Cidades', path: '/admin/cidades' },
        { icon: Building, label: 'Parceiros', path: '/admin/parceiros' },
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
        { icon: LayoutDashboard, label: 'Painel', path: '/painel/cliente' },
        { icon: User, label: 'Perfil', path: '/painel/cliente/perfil' },
        { icon: HeartHandshake, label: 'Oração', path: '', action: 'prayer' },
      ];
    case 'lawyer':
      return [
        { icon: LayoutDashboard, label: 'Painel', path: '/painel/advogado' },
        { icon: Gift, label: 'Benefícios', path: '/painel/advogado/beneficios' },
        { icon: Settings, label: 'Config', path: '/painel/advogado/config' },
        { icon: HeartHandshake, label: 'Oração', path: '', action: 'prayer' },
      ];
    case 'admin':
      return [
        { icon: PieChart, label: 'Métricas', path: '/admin' },
        { icon: AlertTriangle, label: 'Urgências', path: '/admin/urgencias' },
        { icon: Users, label: 'Usuários', path: '/admin/usuarios' },
        { icon: Gift, label: 'Benefícios', path: '/admin/beneficios' },
        { icon: Building, label: 'Parceiros', path: '/admin/parceiros' },
      ];
    default:
      return [
        { icon: Search, label: 'Buscar', path: '/buscar' },
        { icon: User, label: 'Entrar', path: '/login' },
        { icon: Briefcase, label: 'Cadastrar', path: '/cadastro' },
      ];
  }
};

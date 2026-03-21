export interface NavItem {
  name: string;
  href: string;
  position?: 'left' | 'right';
  className?: string; // Ajout de la propriété className
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Accueil',
    href: '#accueil',
    position: 'left'
  },
  {
    name: 'Résultats',
    href: '#resultats',
    position: 'left'
  },
  {
    name: 'Je m\'engage à voter',
    href: '#voter',
    position: 'right',
    className: 'bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200'
  },
];

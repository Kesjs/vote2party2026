export interface NavItem {
  name: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: 'Accueil',
    href: '#accueil',
  },
  {
    name: 'Voter',
    href: '#voter',
  },
  {
    name: 'Résultats',
    href: '#resultats',
  },
];

import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Posts',
    url: 'admin/posts',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Slider',
    url: 'admin/slider',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Category',
    url: 'admin/category',
    iconComponent: { name: 'cil-notes' }
  },
];

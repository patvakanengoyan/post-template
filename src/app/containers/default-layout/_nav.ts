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
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Users',
    url: 'admin/users',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Topics',
    url: 'admin/topics',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Topic keys',
    url: 'admin/topic-keys',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Taxonomy',
    url: 'admin/taxonomy',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Volumes',
    url: 'admin/volumes',
    iconComponent: { name: 'cil-star' }
  },
];

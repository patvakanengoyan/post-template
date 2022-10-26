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
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Topics',
    url: 'admin/topics',
    iconComponent: { name: 'cil-align-center' }
  },
  {
    name: 'Topic keys',
    url: 'admin/topic-keys',
    iconComponent: { name: 'cil-justify-center' }
  },
  {
    name: 'Taxonomy',
    url: 'admin/taxonomy',
    iconComponent: { name: 'cil-settings' }
  },
  {
    name: 'Volumes',
    url: 'admin/volumes',
    iconComponent: { name: 'cil-save' }
  },
];

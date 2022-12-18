import {SideMenu} from '../../interfaces/core/side-menu';


export const menuItemsUser: SideMenu[] = [

  // Parent Dashboard
  {
    id: 'dashboard-parent',
    title: 'Dashboard',
    icon: 'dashboard',
    hasSubMenu: false,
    parentId: null,
    routerLink: '/',
    href: null,
    target: null,
    exact: true,
  },


  // Parent Dashboard
  {
    id: 'standup-parent',
    title: 'Stand Up',
    icon: 'star',
    hasSubMenu: false,
    parentId: null,
    routerLink: 'standup',
    href: null,
    target: null,
    exact: false,
  },

  // Parent Dashboard
  {
    id: 'task-parent',
    title: 'Tasks',
    icon: 'task',
    hasSubMenu: false,
    parentId: null,
    routerLink: 'tasks',
    href: null,
    target: null,
    exact: true,
  },

  // Parent Dashboard
  {
    id: 'kpi-parent',
    title: 'KPI Reports',
    icon: 'event',
    hasSubMenu: false,
    parentId: null,
    routerLink: 'kpi-reports',
    href: null,
    target: null,
    exact: true,
  },

  // Parent
  {
    id: 'admission-user-parent',
    title: 'Admission',
    icon: 'payments',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'admission-user-1',
    title: 'All Admission',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'admission-user-parent',
    routerLink: 'admission/all-admission',
    href: null,
    target: null
  },
  {
    id: 'admission-user-2',
    title: 'Admission Target',
    icon: 'stop',
    hasSubMenu: false,
    parentId: 'admission-user-parent',
    routerLink: 'admission/all-admission-target',
    href: null,
    target: null
  },
  // Parent
  {
    id: 'project-parent',
    title: 'Project',
    icon: 'sell',
    hasSubMenu: false,
    parentId: null,
    routerLink: 'projects',
    href: null,
    target: null
  },

  // {
  //   id: 'project-parent',
  //   title: 'Project',
  //   icon: 'sell',
  //   hasSubMenu: true,
  //   parentId: null,
  //   routerLink: null,
  //   href: null,
  //   target: null
  // },
  // {
  //   id: 'project-1',
  //   title: 'Project',
  //   icon: 'stop',
  //   hasSubMenu: false,
  //   parentId: 'project-parent',
  //   routerLink: 'project/all-project',
  //   href: null,
  //   target: null
  // },

  // Parent Support
  {
    id: '10',
    title: 'Go Live',
    icon: 'live_tv',
    hasSubMenu: false,
    parentId: null,
    routerLink: null,
    href: 'https://discord.gg/HTVE85AzcG',
    target: '_blank'
  },

  // Parent Support
  {
    id: '11',
    title: 'Support',
    icon: 'support_agent',
    hasSubMenu: false,
    parentId: null,
    routerLink: null,
    href: 'https://softlabit.com/',
    target: '_blank'
  },

];


import {Page} from '../../interfaces/page';
import {Select} from '../../interfaces/core/select';

export const PAGES: Page[] = [
  // {_id: '1', pageId: '1', routerLink: '/admin/dashboard', name: 'Dashboard'},
  {_id: '1', pageId: '2', routerLink: '/admin/customization', name: 'Customize'},
  {_id: '2', pageId: '', routerLink: '/admin/products', name: 'Product'},
  {_id: '3', pageId: '1', routerLink: '/admin/categories', name: 'Categories'},
  {_id: '4', pageId: '4', routerLink: '/admin/sales', name: 'Sales'},
  {_id: '6', pageId: '51', routerLink: '/admin/roles', name: 'Roles'},
  // {_id: '4', pageId: '1', routerLink: '/admin/roles', name: 'Roles'},
];

export const MODIFIED_ACCESS: Select[] = [
  {value: 1, viewValue: 'Read'},
  {value: 2, viewValue: 'Write'},
  {value: 3, viewValue: 'Delete'},
];

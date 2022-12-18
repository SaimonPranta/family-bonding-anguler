import {MenuAdmin} from '../../interfaces/core/menu-admin';



export const menuItemsSuperAdmin: MenuAdmin[] = [

  // Parent Dashboard
  // {
  //   id: 'dashboard-parent',
  //   title: 'Dashboard',
  //   icon: 'dashboard',
  //   hasSubMenu: false,
  //   parentId: null,
  //   routerLink: 'dashboard',
  //   href: null,
  //   target: null
  // },

  {
    id: 'address-parent',
    title: 'Address',
    icon: 'dashboard_customize',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },

  {
    id: 'continent-child-2',
    title: 'continent',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'address-parent',
    routerLink: 'address/all-continents',
    href: null,
    target: null
  },

  {
    id: 'country-child-2',
    title: 'Country',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'address-parent',
    routerLink: 'address/all-countries',
    href: null,
    target: null
  },
  {
    id: 'state-child-2',
    title: 'State/Division',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'address-parent',
    routerLink: 'address/all-divisions',
    href: null,
    target: null
  },
  {
    id: 'districts-child-2',
    title: 'District/Counties/CC',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'address-parent',
    routerLink: 'address/all-districts',
    href: null,
    target: null
  },
  {
    id: 'sub-districts-child-2',
    title: 'Sub-District/Municipalities/Ward',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'address-parent',
    routerLink: 'address/all-sub-districts',
    href: null,
    target: null
  },

  {
    id: 'union-child-2',
    title: 'Union/Ward',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'address-parent',
    routerLink: 'address/all-unions',
    href: null,
    target: null
  },


  // Parent Support
  {
    id: 'member-request',
    title: 'Member Request',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'family-admin-child-2',
    title: 'Family Admin',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'member-request',
    routerLink: 'member-request/family-admin-child-2',
    href: null,
    target: null
  },
  {
    id: 'buniness-management-child-2',
    title: 'Business Manager',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'member-request',
    routerLink: 'member-request/family-admin-child-2',
    href: null,
    target: null
  },

  // Parent Support
  {
    id: 'user-create',
    title: 'User Create',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'ads-review-child-2',
    title: 'Ads Review',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'user-create',
    routerLink: 'user-create/ads-review-child-2',
    href: null,
    target: null
  },
  {
    id: 'eoi-review-child-2',
    title: 'EOI Review',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'user-create',
    routerLink: 'user-create/eoi-review-child-2',
    href: null,
    target: null
  },
  {
    id: 'member-review-child-2',
    title: 'Member Review',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'user-create',
    routerLink: 'user-create/member-review-child-2',
    href: null,
    target: null
  },
  {
    id: 'survey-review-child-2',
    title: 'Survey Review',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'user-create',
    routerLink: 'user-create/survey-review-child-2',
    href: null,
    target: null
  },
  {
    id: 'poll-review-child-2',
    title: 'Poll Review',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'user-create',
    routerLink: 'user-create/poll-review-child-2',
    href: null,
    target: null
  },

  // Parent Support
  {
    id: 'platform-traffic',
    title: 'Platform Traffic',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'audiance',
    title: ' audiance',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    sideicon:false,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'refer',
    title: ' Refer',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'revenue',
    title: ' Revenue',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  {
    id: 'ads-view-child-2',
    title: 'Ads View',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'revenue',
    routerLink: 'revenue/ads-view-child-2',
    href: null,
    target: null
  },
  {
    id: 'kyc-verification-child-2',
    title: 'KYC(PV) Verification',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'revenue',
    routerLink: 'revenue/ads-view-child-2',
    href: null,
    target: null
  },
  {
    id: 'eoi-child-2',
    title: 'EOI',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'revenue',
    routerLink: 'revenue/eoi-child-2',
    href: null,
    target: null
  },
  {
    id: 'polls-child-2',
    title: 'Polls',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'revenue',
    routerLink: 'revenue/polls-child-2',
    href: null,
    target: null
  },
  {
    id: 'event-ai-attandance-child-2',
    title: 'Event AI Attandance',
    icon: 'arrow_right',
    hasSubMenu: false,
    parentId: 'revenue',
    routerLink: 'revenue/event-ai-attandance-child-2',
    href: null,
    target: null
  },

  // Parent Support
  {
    id: 'news-letter',
    title: 'News Letter',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  // Parent Support
  {
    id: 'mail',
    title: 'Mail',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },
  // Parent Support
  {
    id: 'backup',
    title: 'Backup',
    icon: 'arrow_right',
    hasSubMenu: true,
    parentId: null,
    routerLink: null,
    href: null,
    target: null
  },


  {
    id: 'support-parent',
    title: 'Support',
    icon: 'support_agent',
    hasSubMenu: false,
    parentId: null,
    routerLink: null,
    href: 'https://softlabit.com/',
    target: '_blank'
  },


];


//
//   // Parent Customization
//   {
//     id: 'customization-parent',
//     title: 'Customization',
//     icon: 'dashboard_customize',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   // {
//   //   id: 'customization-child-1',
//   //   title: 'Category Menu',
//   //   icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: 'customization-parent',
//   //   routerLink: 'customization/all-category-menu',
//   //   href: null,
//   //   target: null
//   // },
//
//   {
//     id: 'customization-child-2',
//     title: 'Carousel',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'customization-parent',
//     routerLink: 'customization/all-carousels',
//     href: null,
//     target: null
//   },
//   {
//     id: 'customization-child-3',
//     title: 'Shop Information',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'customization-parent',
//     routerLink: 'customization/shop-information',
//     href: null,
//     target: null
//   },
//   {
//     id: 'customization-child-4',
//     title: 'Story',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'customization-parent',
//     routerLink: 'customization/all-story',
//     href: null,
//     target: null
//   },
//   {
//     id: 'customization-child-5',
//     title: 'Popup',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'customization-parent',
//     routerLink: 'customization/all-popup',
//     href: null,
//     target: null
//   },
//   // Parent Products
//   //catalog parent
//   {
//     id: 'catalog-parent',
//     title: 'Catalog',
//     icon: 'category',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   // {
//   //   id: 'b1',
//   //   title: 'Attributes',
//   //   icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: '3',
//   //   routerLink: 'attributes',
//   //   href: null,
//   //   target: null
//   // },
//   {
//     id: 'catalog-child-1',
//     title: 'Categories',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'catalog-parent',
//     routerLink: 'catalog/all-categories',
//     href: null,
//     target: null
//   },
//   {
//     id: 'catalog-child-1',
//     title: 'Sub Categories',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'catalog-parent',
//     routerLink: 'catalog/all-sub-categories',
//     href: null,
//     target: null
//   },
//   {
//     id: 'catalog-child-2',
//     title: 'Brands',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'catalog-parent',
//     routerLink: 'catalog/all-brands',
//     href: null,
//     target: null
//   },
//   {
//     id: 'catalog-child-3',
//     title: 'Tags',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'catalog-parent',
//     routerLink: 'catalog/all-tags',
//     href: null,
//     target: null
//   },
//   // {
//   //   id: 'catalog-child-4',
//   //   title: 'Variations',
//   //   icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: 'catalog-parent',
//   //   routerLink: 'catalog/all-variations',
//   //   href: null,
//   //   target: null
//   // },
//   // Parent Products
//   {
//     id: 'products-parent',
//     title: 'Products',
//     icon: 'view_list',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   {
//     id: 'products-child-1',
//     title: 'Products List',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'products-parent',
//     routerLink: 'product/all-categories',
//     href: null,
//     target: null
//   },
//   {
//     id: 'products-child-2',
//     title: 'Add Product',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'products-parent',
//     routerLink: 'product/add-category',
//     href: null,
//     target: null
//   },
//   // {
//   //   id: 'products-child-3',
//   //   title: 'Test Variation',
//   //   icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: 'products-parent',
//   //   routerLink: 'product/test-variation',
//   //   href: null,
//   //   target: null
//   // },
//
//   // Parent Sales
//   {
//     id: 'sales-parent',
//     title: 'Sales',
//     icon: 'local_mall',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   {
//     id: 'sales-child-1',
//     title: 'Order List',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'sales-parent',
//     routerLink: 'sales/all-orders',
//     href: null,
//     target: null
//   },
//   {
//     id: 'sales-child-2',
//     title: 'Add Order',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'sales-parent',
//     routerLink: 'sales/add-order',
//     href: null,
//     target: null
//   },
//   {
//     id: 'sales-child-3',
//     title: 'Transactions',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'sales-parent',
//     routerLink: 'sales/transaction',
//     href: null,
//     target: null
//   },
//   {
//     id: 'sales-child-4',
//     title: 'Shipping Charge',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'sales-parent',
//     routerLink: 'sales/shipping-charge',
//     href: null,
//     target: null
//   },
//   // {
//   //   id: 'sales-child-3',
//   //   title: 'Best Selling Products',
//   //   icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: 'sales-parent',
//   //   routerLink: 'best-sell-products',
//   //   href: null,
//   //   target: null
//   // },
//   // {
//   //   id: 'sales-child-3',
//   //   title: 'Warranty Dashboard',
//   //    icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: 'sales-parent',
//   //   routerLink: 'warranty-dashboard',
//   //   href: null,
//   //   target: null
//   // },
//   // {
//   //   id: 'sales-child-3',
//   //   title: 'Product Authenticators',
//   //   icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: 'sales-parent',
//   //   routerLink: 'product-authenticators',
//   //   href: null,
//   //   target: null
//   // },
//   // Parent Offer
//   {
//     id: 'offer-parent',
//     title: 'Offers',
//     icon: 'local_offer',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   {
//     id: 'offer-child-1',
//     title: 'Promo Offer',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'offer-parent',
//     routerLink: 'offers/promo-offer',
//     href: null,
//     target: null
//   },
//   {
//     id: 'offer-child-2',
//     title: 'Coupon',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'offer-parent',
//     routerLink: 'offers/coupons',
//     href: null,
//     target: null
//   },
//   // {
//   //   id: 'offer-child-3',
//   //   title: 'Featured Product',
//   //   icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: 'offer-parent',
//   //   routerLink: 'featured-product',
//   //   href: null,
//   //   target: null
//   // },
//   // {
//   //   id: 'offer-child-4',
//   //   title: 'Featured Category',
//   //   icon: 'arrow_right',
//   //   hasSubMenu: false,
//   //   parentId: 'offer-parent',
//   //   routerLink: 'featured-category',
//   //   href: null,
//   //   target: null
//   // },
//   // {
//   //     id: 'offer-child-5',
//   //     title: 'Product Banner',
//   //     icon: 'arrow_right',
//   //     hasSubMenu: false,
//   //     parentId: 'offer-parent',
//   //     routerLink: 'product-list-banner',
//   //     href: null,
//   //     target: null
//   //   },
//   // Parent Coupons
//   {
//     id: '8',
//     title: 'Coupons',
//     icon: 'vpn_key',
//     hasSubMenu: false,
//     parentId: '745Z',
//     routerLink: 'coupons',
//     href: null,
//     target: null
//   },
//   {
//     id: '74BRY',
//     title: 'Banner',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: '745Z',
//     routerLink: 'banner',
//     href: null,
//     target: null
//   },
//   {
//     id: '932r',
//     title: 'Promotional Offer',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: '745Z',
//     routerLink: 'promotional-offer',
//     href: null,
//     target: null
//   },
//   {
//     id: '1024',
//     title: 'Offer products',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: '745Z',
//     routerLink: 'offer-products',
//     href: null,
//     target: null
//   },
//   // Parent Gallery Folder
//   {
//     id: 'gallery-parent',
//     title: 'Gallery',
//     icon: 'collections',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   {
//     id: 'gallery-child-1',
//     title: 'Folders',
//     icon: 'folder',
//     hasSubMenu: false,
//     parentId: 'gallery-parent',
//     routerLink: 'gallery/all-folders',
//     href: null,
//     target: null
//   },
//   {
//     id: 'gallery-child-2',
//     title: 'Images',
//     icon: 'collections',
//     hasSubMenu: false,
//     parentId: 'gallery-parent',
//     routerLink: 'gallery/all-images',
//     href: null,
//     target: null
//   },
//
//
//   // Parent Additional Pages
//   {
//     id: 'additional-page-parent',
//     title: 'Additional Pages',
//     icon: 'offline_bolt',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   {
//     id: 'additional-page-child-1',
//     title: 'Page List',
//     icon: 'group_add',
//     hasSubMenu: false,
//     parentId: 'additional-page-parent',
//     routerLink: 'additional-pages/page-list',
//     href: null,
//     target: null
//   },
//   // Parent Customers
//   {
//     id: 'user-parent',
//     title: 'Customer',
//     icon: 'people',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   {
//     id: 'user-child-1',
//     title: 'All Customer',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'user-parent',
//     routerLink: 'user/all-user',
//     href: null,
//     target: null
//   },
//   {
//     id: 'user-child-2',
//     title: 'Add Customer',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'user-parent',
//     routerLink: 'user/add-user',
//     href: null,
//     target: null
//   },
//   //admin control
//   {
//     id: 'admin-control-parent',
//     title: 'Admin Control',
//     icon: 'offline_bolt',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   // {
//   //   id: '51',
//   //   title: 'Roles',
//   //   icon: 'offline_bolt',
//   //   hasSubMenu: false,
//   //   parentId: '631',
//   //   routerLink: 'roles',
//   //   href: null,
//   //   target: null
//   // },
//   // Parent Users
//   {
//     id: 'admin-control-child-1',
//     title: 'All Admins',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'admin-control-parent',
//     routerLink: 'admin-control/all-admins',
//     href: null,
//     target: null
//   },
// // Parent
//   {
//     id: 'blog-area-parent',
//     title: 'Blog Area',
//     icon: 'rss_feed',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   {
//     id: 'blog-area-child-1',
//     title: 'Blogs',
//     // icon: 'people',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'blog-area-parent',
//     routerLink: 'blogs/all-countries',
//     href: null,
//     target: null
//   },
//   {
//     id: 'blog-area-child-2',
//     title: 'Add Blog',
//     // icon: 'people',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'blog-area-parent',
//     routerLink: 'blogs/add-country',
//     href: null,
//     target: null
//   },
//
//   // Parent
//   {
//     id: 'contact-parent',
//     title: 'Contact Us',
//     icon: 'drafts',
//     hasSubMenu: true,
//     parentId: null,
//     routerLink: null,
//     href: null,
//     target: null
//   },
//   {
//     id: 'contact-child-1',
//     title: 'Newsletter',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'contact-parent',
//     routerLink: 'contact-us/newsletter',
//     href: null,
//     target: null
//   },
//   {
//     id: 'contact-child-2',
//     title: 'Contact Data',
//     icon: 'arrow_right',
//     hasSubMenu: false,
//     parentId: 'contact-parent',
//     routerLink: 'contact-us/contact-data',
//     href: null,
//     target: null
//   },
//
//   // Parent Reviews
//   // {
//   //   id: 'reviews-and-discussion-parent',
//   //   title: 'Review and Discussion',
//   //   icon: 'offline_bolt',
//   //   hasSubMenu: true,
//   //   parentId: null,
//   //   routerLink: null,
//   //   href: null,
//   //   target: null
//   // },
//   // {
//   //   id: 'reviews-and-discussion-child-1',
//   //   title: 'Reviews',
//   //   icon: 'reviews',
//   //   hasSubMenu: false,
//   //   parentId: 'reviews-and-discussion-parent',
//   //   routerLink: 'reviews',
//   //   href: null,
//   //   target: null
//   // },
//   // {
//   //   id: 'reviews-and-discussion-child-2',
//   //   title: 'Discussion',
//   //   icon: 'reviews',
//   //   hasSubMenu: false,
//   //   parentId: 'reviews-and-discussion-parent',
//   //   routerLink: 'discussions',
//   //   href: null,
//   //   target: null
//   // },
//   //backup and restore
//   {
//     id: 'review',
//     title: 'Review',
//     icon: 'warning',
//     hasSubMenu: false,
//     parentId: null,
//     routerLink: 'review',
//     href: null,
//     target: null
//   },

export default [
  {
    path: 'admin',
    meta: { requiresAuth: true, roles: 'admin' },
    name: 'AdminLayout',
    redirect: {
      name: 'AdminPage'
    }
  },
  {
    path: 'admin',
    meta: { requiresAuth: true, roles: 'admin' },
    name: 'AdminPage',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `pages/admin/Overview.vue`
      )
  },
  {
    path: 'users',
    meta: { requiresAuth: true, roles: 'admin' },
    name: 'ManageUsers',
    component: () =>
      /* webpackChunkName: "routes" */
      import(`pages/admin/ManageUsers.vue`)
  },
  {
    path: 'suppliers',
    meta: { requiresAuth: true, roles: 'admin' },
    name: 'Suppliers',
    component: () =>
      /* webpackChunkName: "routes" */
      import(`pages/admin/Suppliers.vue`)
  },
  {
    path: 'products',
    meta: { requiresAuth: true, roles: 'admin' },
    name: 'Products',
    component: () =>
      /* webpackChunkName: "routes" */
      import(`pages/admin/Products.vue`)
  },
  {
    path: 'orders',
    meta: { requiresAuth: true, roles: 'admin' },
    name: 'Orders',
    component: () =>
      /* webpackChunkName: "routes" */
      import(`pages/admin/Orders.vue`)
  }
];

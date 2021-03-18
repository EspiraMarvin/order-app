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
  }
];

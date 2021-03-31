export default [
  {
    path: '/',
    meta: { requiresAuth: true, roles: 'normal' },
    name: 'Root',
    redirect: {
      name: 'UserLogin'
    }
  },
  {
    path: '/dashboard',
    meta: { requiresAuth: true, roles: 'normal' },
    name: 'Root',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: 'dashboard',
    meta: { requiresAuth: true, roles: 'normal' },
    name: 'Dashboard',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `pages/dashboard/Dashboard.vue`
      )
  }
];

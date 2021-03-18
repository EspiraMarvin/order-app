export default [
  {
    path: 'login',
    meta: { requiresAuth: false, public: true },
    name: 'UserLogin',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `pages/auth/UserLogin.vue`
      )
  },
  {
    path: 'register',
    meta: { requiresAuth: false, public: true },
    name: 'UserRegister',
    component: () =>
      import(
        /* webpackChunkName: "routes" */
        `pages/auth/UserRegister.vue`
      )
  }
];

import AuthRoutes from './auth';
import AdminRoutes from './admin';
import NormalRoutes from './normal';
const routes = [
  {
    path: '/',
    meta: { requiresAuth: true, roles: 'normal' },
    component: () => import('layouts/MainLayout.vue'),
    children: [...NormalRoutes]
  },
  {
    path: '/auth',
    meta: { requiresAuth: false },
    component: () => import('layouts/AuthLayout.vue'),
    children: [...AuthRoutes]
  },
  {
    path: '/admin',
    meta: { requiresAuth: true, roles: 'admin' },
    component: () => import('layouts/AdminLayout.vue'),
    children: [...AdminRoutes]
  },

  {
    path: '*',
    meta: { requiresAuth: false },
    redirect: {
      path: '/404'
    }
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/errors/Error404.vue')
  });
}

export default routes;

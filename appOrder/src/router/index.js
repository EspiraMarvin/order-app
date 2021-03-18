import Vue from 'vue';
import VueRouter from 'vue-router';
import { Store as store } from '../store/index';

import routes from './routes';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  /**
   * Before a route is resolved we check for
   * the token if the route is marked as
   * requireAuth.
   */
  Router.beforeEach((to, from, next) => {
    // access control
    const auth = to.meta.requiresAuth;
    const pathRole = to.meta.roles || false;

    /**
     * it's a public path and
     * doesn't require authentication, just proceed
     */
    if (!store.getters.LOGGED_IN && !auth) {
      next();
    }

    /**
     * If route requires a logged in user;
     * and the user is not authenticated redirect to login
     */
    if (!store.getters.LOGGED_IN && auth) {
      next({
        name: 'UserLogin'
      });
    }

    /**
     * If route requires auth
     * And user is logged in, check roles and proceed
     * Or if user has Admin role, proceed
     */
    if (store.getters.LOGGED_IN && auth) {
      const userRole = store.getters.GET_CURRENT_USER.relationships.roles[0].name;
      if (pathRole === userRole || userRole === 'admin') {
        next();
      } else {
        next({
          name: 'UserLogin'
        });
      }
    }

    /**
     * if route doesn't require auth
     * and user is logged in just proceed
     */
    if (store.getters.LOGGED_IN && !auth) {
      next();
    }
  });

  return Router;
}

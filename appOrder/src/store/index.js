import Vue from 'vue';
import Vuex from 'vuex';

import commonStore from './modules/common/index';
import userStore from './modules/users/index';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export const Store = new Vuex.Store({
  modules: {
    commonStore,
    userStore
  },

  strict: process.env.DEV
});

export default function(/* { ssrContext } */) {
  return Store;
}

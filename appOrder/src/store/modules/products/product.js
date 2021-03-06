import { http } from 'src/api/service';
import { appendEditForm, appendForm } from 'src/helpers/commonFunctions';

const state = () => ({
  products: {},
  fetchingProducts: false,
  addingProduct: false
});

const getters = {
  GET_FETCHING_PRODUCTS: state => state.fetchingProducts,
  GET_PRODUCTS: state => state.products,
  GET_ADDING_PRODUCT: state => state.addingProduct
};

const mutations = {
  SET_FETCHING_PRODUCTS(state, data) {
    state.fetchingProducts = data;
  },

  SET_PRODUCTS(state, data) {
    state.products = data;
  },

  SET_ADDING_PRODUCT(state, data) {
    state.addingProduct = data;
  }
};

const actions = {
  ADD_PRODUCT(context, form) {
    context.commit('SET_ADDING_PRODUCT', true);
    http
      .post('products/add', appendForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_PRODUCT', false);
        let alert = {
          type: 'positive',
          message: 'Product Added Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_PRODUCTS', { page: 1 });
      })
      .catch(error => {
        context.commit('SET_ADDING_PRODUCT', false);
        let alert = {
          type: 'negative',
          message: 'Error Adding product',
          position: 'top'
        };
        if (error.message && error.response.data && error.response.data.message) {
          alert.message = error.response.data.message;
        }
        context.commit('SET_NOTIFICATION', alert, { root: true });
        if (error.message && error.response.data && error.response.data.errors) {
          const errors = Object.values(error.response.data.errors);
          context.commit('SET_ERRORS', errors, { root: true });
        }
      });
  },

  FETCH_PRODUCTS(context, pagination) {
    context.commit('SET_FETCHING_PRODUCTS', true);
    http
      .get(`products/index?page=${pagination.page}&filters=${JSON.stringify(pagination)}`)
      .then(({ data }) => {
        context.commit('SET_FETCHING_PRODUCTS', false);
        context.commit('SET_PRODUCTS', data);
      })
      .catch(error => {
        context.commit('SET_FETCHING_PRODUCTS', false);
        let alert = {
          type: 'negative',
          message: 'Failed to load Products',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message) {
          alert.message = error.response.data.message;
        }
        context.commit('SET_NOTIFICATION', alert, { root: true });
      });
  },

  EDIT_PRODUCT(context, form) {
    context.commit('SET_ADDING_PRODUCT', true);

    http
      .post(`products/${form.id}/update`, appendEditForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_PRODUCT', false);
        let alert = {
          type: 'positive',
          message: 'Edit Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_PRODUCTS', { page: 1 });
      })
      .catch(error => {
        context.commit('SET_ADDING_PRODUCT', false);
        let alert = {
          type: 'negative',
          message: 'Edit Unsuccessful',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message) {
          alert.message = error.response.data.message;
        }
        context.commit('SET_NOTIFICATION', alert, { root: true });
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = Object.values(error.response.data.errors);
          context.commit('SET_ERRORS', errors, { root: true });
        }
      });
  },

  DELETE_PRODUCT(context, id) {
    // eslint-disable-next-line no-unused-vars
    http
      .delete(`products/${id}/delete`)
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        let alert = {
          type: 'positive',
          message: 'Delete Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_PRODUCTS', { page: 1 });
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

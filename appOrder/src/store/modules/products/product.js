import { baseUrl, http } from 'src/api/service';
import axios from 'axios';
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
  SET_FETCHING_PRODUCTS(state, value) {
    state.fetchingProducts = value;
  },

  SET_PRODUCTS(state, value) {
    state.products = value;
  },

  SET_ADDING_PRODUCT(state, value) {
    state.addingProduct = value;
  }
};

const actions = {
  ADD_PRODUCT(context, form) {
    context.commit('SET_ADDING_PRODUCT', true);
    axios
      .post(baseUrl + 'add-product/', appendForm(form))
      .then(({ data }) => {
        context.commit('SET_ADDING_PRODUCT', false);
        let alert = {
          type: 'positive',
          message: 'Product Added Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
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

  FETCH_PRODUCTS(context, filters) {
    context.commit('SET_FETCHING_PRODUCTS', true);
    http
      .get(`products?page=${filters.page} &filters=${JSON.stringify(filters)}`)
      .then(({ data }) => {
        context.commit('SET_FETCHING_PRODUCTS', false);
        context.commit('SET_PRODUCTS', data);
        // console.log('products data', data)
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
      .post(baseUrl + 'edit-product/' + form.id, appendEditForm(form))
      .then(({ data }) => {
        context.commit('SET_ADDING_PRODUCT', false);
        let alert = {
          type: 'positive',
          message: 'Edit Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
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
    context.commit('SET_ADDING_PRODUCT', true);
    http.delete(baseUrl + 'delete-product/' + id).then(({ data }) => {
      context.commit('SET_ADDING_PRODUCT', false);
      let alert = {
        type: 'positive',
        message: 'Delete Successful',
        position: 'top'
      };
      context.commit('SET_NOTIFICATION', alert, { root: true });
      context.commit('SET_ADDING_PRODUCT', false);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

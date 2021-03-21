import { baseUrl, http } from 'src/api/service';
import axios from 'axios';
import { appendEditForm, appendForm } from 'src/helpers/commonFunctions';

const state = () => ({
  suppliers: {},
  fetchingSuppliers: false,
  addingSupplier: false
});

const getters = {
  GET_FETCHING_SUPPLIERS: state => state.fetchingSuppliers,
  GET_SUPPLIERS: state => state.suppliers,
  GET_ADDING_SUPPLIER: state => state.addingSupplier
};

const mutations = {
  SET_FETCHING_SUPPLIERS(state, data) {
    state.fetchingSuppliers = data;
  },

  SET_SUPPLIERS(state, data) {
    state.suppliers = data;
  },

  SET_ADDING_SUPPLIER(state, data) {
    state.addingSupplier = data;
  }
};

const actions = {
  ADD_SUPPLIER(context, form) {
    context.commit('SET_ADDING_SUPPLIER', true);
    axios
      .post(baseUrl + 'supplier/add', appendForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_SUPPLIER', false);
        let alert = {
          type: 'positive',
          message: 'Supplier Added Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_SUPPLIERS', { page: 1 });
      })
      .catch(error => {
        context.commit('SET_ADDING_SUPPLIER', false);
        let alert = {
          type: 'negative',
          message: 'Error Adding Supplier',
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

  FETCH_SUPPLIERS(context, pagination) {
    context.commit('SET_FETCHING_SUPPLIERS', true);
    http
      .get(`suppliers/index?page=${pagination.page}&filters=${JSON.stringify(pagination)}`)
      .then(({ data }) => {
        context.commit('SET_FETCHING_SUPPLIERS', false);
        context.commit('SET_SUPPLIERS', data);
        // console.log('suppliers data', data)
      })
      .catch(error => {
        context.commit('SET_FETCHING_SUPPLIERS', false);
        let alert = {
          type: 'negative',
          message: 'Failed to load Suppliers',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message) {
          alert.message = error.response.data.message;
        }
        context.commit('SET_NOTIFICATION', alert, { root: true });
      });
  },

  EDIT_SUPPLIER(context, form) {
    context.commit('SET_ADDING_SUPPLIER', true);
    http
      .post(`suppliers/${form.id}/update`, appendEditForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_SUPPLIER', false);
        let alert = {
          type: 'positive',
          message: 'Supplier Edited Successfully',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_SUPPLIERS', { page: 1 });
      })
      .catch(error => {
        context.commit('SET_ADDING_SUPPLIER', false);
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

  DELETE_SUPPLIER(context, id) {
    http
      .delete(`suppliers/${id}/delete`)
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        let alert = {
          type: 'positive',
          message: 'Delete Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_SUPPLIERS', { page: 1 });
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

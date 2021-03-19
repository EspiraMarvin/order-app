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
      .post(baseUrl + 'add-supplier/', appendForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_SUPPLIER', false);
        let alert = {
          type: 'positive',
          message: 'Supplier Added Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
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

  FETCH_SUPPLIERS(context, filters) {
    context.commit('SET_FETCHING_SUPPLIERS', true);
    http
      .get(`suppliers?page=${filters.page}&filters=${JSON.stringify(filters)}`)
      .then(({ data }) => {
        console.log('supplier', data);
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
      .post(baseUrl + 'edit-supplier/' + form.id, appendEditForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_SUPPLIER', false);
        let alert = {
          type: 'positive',
          message: 'Edit Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
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
    context.commit('SET_ADDING_SUPPLIER', true);
    // eslint-disable-next-line no-unused-vars
    http.delete(baseUrl + 'delete-supplier/' + id).then(({ data }) => {
      context.commit('SET_ADDING_SUPPLIER', false);
      let alert = {
        type: 'positive',
        message: 'Delete Successful',
        position: 'top'
      };
      context.commit('SET_NOTIFICATION', alert, { root: true });
      context.commit('SET_ADDING_USER', false);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

import { http } from 'src/api/service';
import { appendEditForm, appendForm } from 'src/helpers/commonFunctions';

const state = () => ({
  orders: {},
  fetchingOrders: false,
  addingOrder: false
});

const getters = {
  GET_FETCHING_ORDERS: state => state.fetchingOrders,
  GET_ORDERS: state => state.orders,
  GET_ADDING_ORDER: state => state.addingOrder
};

const mutations = {
  SET_ADDING_ORDER(state, data) {
    state.addingOrder = data;
  },

  SET_FETCHING_ORDERS(state, data) {
    state.fetchingOrders = data;
  },

  SET_ORDERS(state, data) {
    state.orders = data;
  }
};

const actions = {
  ADD_ORDER(context, form) {
    context.commit('SET_ADDING_ORDER', true);
    http
      .post('orders/add', appendForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_ORDER', false);
        let alert = {
          type: 'positive',
          message: 'Order Added Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
      })
      .catch(error => {
        context.commit('SET_ADDING_ORDER', false);
        let alert = {
          type: 'negative',
          message: 'Error Adding Order',
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

  FETCH_ORDERS(context, pagination) {
    context.commit('SET_FETCHING_ORDERS', true);
    http
      .get(`orders/index?page=${pagination.page}&filters=${JSON.stringify(pagination)}`)
      .then(({ data }) => {
        context.commit('SET_FETCHING_ORDERS', false);
        context.commit('SET_ORDERS', data);
      })
      .catch(error => {
        context.commit('SET_FETCHING_ORDERS', false);
        let alert = {
          type: 'negative',
          message: 'Failed to load Orders',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message) {
          alert.message = error.response.data.message;
        }
        context.commit('SET_NOTIFICATION', alert, { root: true });
      });
  },

  EDIT_ORDER(context, form) {
    context.commit('SET_ADDING_ORDER', true);

    http
      .post(`orders/${form.id}/update`, appendEditForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_ORDER', false);
        let alert = {
          type: 'positive',
          message: 'Edit Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_ORDERS', { page: 1 });
      })
      .catch(error => {
        context.commit('SET_ADDING_ORDER', false);
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

  DELETE_ORDER(context, id) {
    http
      .delete(`orders/${id}/delete`)
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        let alert = {
          type: 'positive',
          message: 'Delete Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_ORDERS', { page: 1 });
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

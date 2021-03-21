import { baseUrl, http } from 'src/api/service';
import axios from 'axios';
import { appendEditForm, appendForm } from 'src/helpers/commonFunctions';
import appStorage from 'src/helpers/appStorage';

const state = () => ({
  token: localStorage.getItem('access_token') || null,
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  fetchingUsers: false,
  addingUser: false,
  users: {}
});

const getters = {
  LOGGED_IN: state => state.token !== null,
  GET_TOKEN: state => state.token,
  GET_CURRENT_USER: state => state.currentUser,
  GET_FETCHING_USERS: state => state.fetchingUsers,
  GET_USERS: state => state.users,
  GET_ADDING_USER: state => state.addingUser
};

const mutations = {
  SET_FETCHING_USERS(state, data) {
    state.fetchingUsers = data;
  },

  SET_USERS(state, data) {
    state.users = data;
  },

  SET_ADDING_USER(state, data) {
    state.addingUser = data;
  },

  SET_TOKEN(state, data) {
    state.token = data;
  },

  SET_CURRENT_USER(state, data) {
    state.currentUser = data;
  }
};

const actions = {
  LOGIN_USER(context, form) {
    context.commit('SET_ADDING_USER', true);
    axios
      .post(baseUrl + 'auth/login', appendForm(form))
      .then(({ data }) => {
        context.commit('SET_TOKEN', data.token);
        context.commit('SET_CURRENT_USER', data.user);

        appStorage.storeAccessToken(data.token);
        appStorage.storeCurrentUser(JSON.stringify(data.user));
        let alert = {
          type: 'positive',
          message: 'Login Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        // appStorage.storeAccessToken(data.access_token);
        // appStorage.storeCurrentUser(JSON.stringify(data.user));
        // context.commit('SET_TOKEN', data.access_token);
        // context.commit('SET_CURRENT_USER', data.user);
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.commit('SET_ADDING_USER', false);
      })
      .catch(error => {
        context.commit('SET_ADDING_USER', false);
        let alert = {
          type: 'negative',
          message: 'Error logging in',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message) {
          alert.message = error.response.data.message;
        }
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.commit('SET_ADDING_USER', false);
      });
  },

  ADD_USER(context, form) {
    context.commit('SET_ADDING_USER', true);

    axios
      .post(baseUrl + 'auth/register', appendForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_USER', false);
        let alert = {
          type: 'positive',
          message: 'User Added Successfully',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_USERS', { page: 1 });
      })
      .catch(error => {
        context.commit('SET_ADDING_USER', false);
        let alert = {
          type: 'negative',
          message: 'Error signing in',
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

  FETCH_USERS(context, pagination) {
    context.commit('SET_FETCHING_USERS', true);
    http
      .get(`users/index?page=${pagination.page}&filters=${JSON.stringify(pagination)}`)
      .then(({ data }) => {
        context.commit('SET_FETCHING_USERS', false);
        context.commit('SET_USERS', data);
      })
      .catch(error => {
        context.commit('SET_FETCHING_USERS', false);
        let alert = {
          type: 'negative',
          message: 'Failed to load users',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message) {
          alert.message = error.response.data.message;
        }
        context.commit('SET_NOTIFICATION', alert, { root: true });
      });
  },

  EDIT_USER(context, form) {
    context.commit('SET_ADDING_USER', true);
    http
      .post(`users/${form.id}/update`, appendEditForm(form))
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        context.commit('SET_ADDING_USER', false);
        let alert = {
          type: 'positive',
          message: 'User Updated Successfully',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_USERS', { page: 1 });
      })
      .catch(error => {
        context.commit('SET_ADDING_USER', false);
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

  DELETE_USER(context, id) {
    http
      .delete(`users/${id}/delete`)
      // eslint-disable-next-line no-unused-vars
      .then(({ data }) => {
        let alert = {
          type: 'positive',
          message: 'Delete Successful',
          position: 'top'
        };
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.dispatch('FETCH_USERS', { page: 1 });
      })
      .catch(error => {
        context.commit('SET_ADDING_USER', false);
        let alert = {
          type: 'negative',
          message: 'Delete Unsuccessful',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message) {
          alert.message = error.response.data.message;
        }
        context.commit('SET_NOTIFICATION', alert, { root: true });
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

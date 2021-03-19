import { http } from 'src/api/service';

const state = () => ({
  roles: {},
  addingRole: false,
  fetchingRoles: false
});

const getters = {
  GET_ROLES: state => state.roles,
  GET_ADDING_ROLE: state => state.addingRole,
  GET_FETCHING_ROLES: state => state.fetchingRoles
};

const mutations = {
  SET_ROLES(state, data) {
    state.roles = data;
  },
  SET_ADDING_ROLE(state, data) {
    state.addingRole = data;
  },
  SET_FETCHING_ROLES(state, data) {
    state.fetchingRoles = data;
  }
};

const actions = {
  FETCH_ROLES(context, page) {
    context.commit('SET_FETCHING_ROLES', true);
    http
      .get(`users/roles/get?page=${page}`)
      .then(({ data }) => {
        context.commit('SET_FETCHING_ROLES', false);
        context.commit('SET_ROLES', data);
      })
      .catch(error => {
        context.commit('SET_FETCHING_ROLES', false);
        console.log(error);
        let alert = {
          type: 'negative',
          message: 'Could not fetch roles at the moment',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message)
          alert.message = error.response.data.message;
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

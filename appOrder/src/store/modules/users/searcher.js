import { http } from 'src/api/service';
import { appendForm } from 'src/mixins/SentiHelpers';

const state = () => ({
  contactProfile: {},
  fetchingContactProfile: false
});

const getters = {
  GET_CONTACT_PROFILE: state => state.contactProfile,
  GET_FETCHING_CONTACT_PROFILE: state => state.fetchingContactProfile
};

const mutations = {
  SET_CONTACT_PROFILE(state, value) {
    state.contactProfile = value;
  },
  SET_FETCHING_CONTACT_PROFILE(state, value) {
    state.fetchingContactProfile = value;
  }
};

const actions = {
  SEARCH_CONTACT(context, form) {
    context.commit('SET_CONTACT_PROFILE', {});
    context.commit('SET_FETCHING_CONTACT_PROFILE', true);
    http
      .post('contacts/full-search', appendForm(form))
      .then(({ data }) => {
        context.commit('SET_FETCHING_CONTACT_PROFILE', false);
        context.commit('SET_CONTACT_PROFILE', data.data);
      })
      .catch(error => {
        console.log(error);
        context.commit('SET_FETCHING_CONTACT_PROFILE', false);
        let alert = {
          type: 'negative',
          message: 'Error searching contact profile, please try again later',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message)
          alert.message = error.response.data.message;
        context.commit('SET_NOTIFICATION', alert, { root: true });
        //take validation errors
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = Object.values(error.response.data.errors);
          context.commit('SET_ERRORS', errors, { root: true });
        }
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

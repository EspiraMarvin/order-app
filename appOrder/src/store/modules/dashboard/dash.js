import { http } from 'src/api/service';

const state = () => ({
  chartsData: {},
  fetchingChartsData: false
});

const getters = {
  GET_CHARTS_DATA: state => state.chartsData,
  GET_FETCHING_CHARTS_DATA: state => state.fetchingChartsData
};

const mutations = {
  SET_CHARTS_DATA(state, value) {
    state.chartsData = value;
  },
  SET_FETCHING_CHARTS_DATA(state, value) {
    state.fetchingChartsData = value;
  }
};

const actions = {
  FETCH_CHARTS_DATA(context, page) {
    context.commit('SET_FETCHING_CHARTS_DATA', true);
    http
      .get(`dashboard/admin?page=${page}`)
      .then(({ data }) => {
        context.commit('SET_FETCHING_CHARTS_DATA', false);
        context.commit('SET_CHARTS_DATA', data);
      })
      .catch(error => {
        console.log(error);
        let alert = {
          type: 'negative',
          message: 'Error occurred fetching dashboard charts',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message)
          alert.message = error.response.data.message;
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.commit('SET_FETCHING_CHARTS_DATA', false);
      });
  },
  FETCH_COLLECTOR_CHARTS_DATA(context, page) {
    context.commit('SET_FETCHING_CHARTS_DATA', true);
    http
      .get(`dashboard/collector/admin?page=${page}`)
      .then(({ data }) => {
        context.commit('SET_FETCHING_CHARTS_DATA', false);
        context.commit('SET_CHARTS_DATA', data);
      })
      .catch(error => {
        console.log(error);
        let alert = {
          type: 'negative',
          message: 'Error occurred fetching dashboard charts',
          position: 'top'
        };
        if (error.response && error.response.data && error.response.data.message)
          alert.message = error.response.data.message;
        context.commit('SET_NOTIFICATION', alert, { root: true });
        context.commit('SET_FETCHING_CHARTS_DATA', false);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

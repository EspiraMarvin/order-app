<template>
  <q-layout view="lHh Lpr lFf">
    <main-nav />
    <q-page-container>
      <router-view />

      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
import MainNav from '../components/navigations/MainNav';

export default {
  name: 'MainLayout',

  components: {
    MainNav
  },
  created() {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

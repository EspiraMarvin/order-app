<template>
  <q-layout view="lHh Lpr lFf">
    <admin-nav />
    <q-page-container>
      <router-view />

      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>
  </q-layout>
</template>

<script>
import AdminNav from '../components/navigations/AdminNav';

export default {
  name: 'AdminLayout',
  components: {
    AdminNav
  }
};
</script>

<style scoped></style>

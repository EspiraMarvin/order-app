<template>
  <div>
    <q-header elevated>
      <q-toolbar class="text-white">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        <q-space></q-space>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-amber-3">
      <q-list class="theme text-black">
        <q-toolbar>
          <q-toolbar-title class="text-center"> Hi, {{ currentUser.name }} </q-toolbar-title>
        </q-toolbar>

        <router-link :to="{ name: 'AdminPage' }" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="dashboard"></q-icon>
            </q-item-section>

            <q-item-section>
              Overview
            </q-item-section>
          </q-item>
        </router-link>

        <router-link :to="{ name: 'ManageUsers' }" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="eva-person-outline"></q-icon>
            </q-item-section>

            <q-item-section>
              users
            </q-item-section>
          </q-item>
        </router-link>

        <router-link :to="{ name: 'Suppliers' }" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="eva-people-outline"></q-icon>
            </q-item-section>

            <q-item-section>
              Suppliers
            </q-item-section>
          </q-item>
        </router-link>

        <router-link :to="{ name: 'Products' }" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="eva-clipboard-outline"></q-icon>
            </q-item-section>

            <q-item-section>
              Products
            </q-item-section>
          </q-item>
        </router-link>

        <router-link :to="{ name: 'Orders' }" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="eva-shopping-cart-outline"></q-icon>
            </q-item-section>

            <q-item-section>
              Orders
            </q-item-section>
          </q-item>
        </router-link>

        <router-link to="" class="router-link">
          <q-item clickable @click="logoutUser">
            <q-item-section avatar>
              <q-icon name="lock"></q-icon>
            </q-item-section>
            <q-item-section>
              Logout
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </q-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import appStorage from '../../helpers/appStorage';

export default {
  name: 'AdminNav',
  data() {
    return {
      leftDrawerOpen: false,
      title: 'Orders - Administration'
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'GET_CURRENT_USER'
    })
  },
  methods: {
    logoutUser() {
      appStorage.clearLocalStorage();
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
}
</style>

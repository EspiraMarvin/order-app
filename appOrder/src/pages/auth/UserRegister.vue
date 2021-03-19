<template>
  <q-page class="">
    <q-card elevated class="q-pa-xs q-ma-xs">
      <div class="row q-pa-lg">
        <div class="col-md-8 md">
          <q-toolbar> </q-toolbar>
          <div class="justify-center text-center">
            Contribute and see your contributions in real time
          </div>
        </div>
        <div class="col-md-4 col-xs-12">
          <q-toolbar class="text-center">
            <q-img :src="logoUrl" class="icon-image" spinner-color="primary" />
          </q-toolbar>
          <div class="inset-shadow">
            <h6 class="text-weight-bold text-center">Login Here</h6>
            <q-form class="q-gutter-md" ref="loginForm">
              <q-input
                type="text"
                v-model="form.name"
                label="Name *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type your name']"
              />
              <q-input
                type="email"
                v-model="form.email"
                label="Email *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type your email']"
              />
              <q-input
                type="text"
                v-model="form.phone"
                label="Phone Number*"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type your phone number']"
              />

              <q-input
                type="password"
                v-model="form.password"
                label="Password *"
                lazy-rules
                :rules="[val => (val !== null && val !== '') || 'Please type your Password']"
              />
            </q-form>

            <div class="row q-mt-lg float-right">
              <div class="col-md-12 col-xs-12">
                <q-btn
                  class="q-pl-md q-pr-md q-mr-md text-capitalize rounded-borders"
                  label="Register"
                  @click="btnRegister"
                  color="primary"
                  :loading="loading"
                  :disable="loading"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>
            </div>
            <br />
            <br />

            <div class="row q-mt-xl text-center">
              <div class="col-md-6 col-xs-6 col-sm-6 text-center">
                <q-btn
                  flat
                  color="secondary"
                  label="Have Account?"
                  @click="btnLoginPage"
                  class="text-capitalize rounded-borders float-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonFunctions from '../../mixins/commonFunctions';

export default {
  name: 'UserRegister',
  mixins: [commonFunctions],
  created() {},
  data() {
    return {
      logoUrl: '../appChama/src/statics/images/order_icon.png',
      form: {
        name: '',
        email: '',
        password: '',
        phone: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      loading: 'GET_ADDING_USER'
    })
  },
  methods: {
    ...mapActions({
      registerUser: 'REGISTER_USER'
    }),

    btnRegister() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.registerUser(this.form);
        }
      });
    },

    btnLoginPage() {
      this.$router.push({ name: 'UserLogin' });
    }
  }
};
</script>

<style scoped></style>

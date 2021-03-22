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
                type="email"
                v-model="form.email"
                label="Email *"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Please type your email']"
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
                  label="Login"
                  @click="btnLogin"
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

            <div class="row q-mt-xl">
              <div class="col-md-6 col-xs-6 col-sm-6 float-right">
                <q-btn
                  flat
                  label="Forgot Password?"
                  @click="btnForgotPwd"
                  color="secondary"
                  class="text-capitalize rounded-borders"
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
// import { token, http } from '../../boot/service';

export default {
  name: 'UserLogin',
  mixins: [commonFunctions],
  created() {
    this.loginSuccess();
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      defaultForm: {
        email: '',
        password: ''
      },
      logoUrl: 'statics/images/order_icon.png'
    };
  },
  computed: {
    ...mapGetters({
      loading: 'GET_ADDING_USER',
      loggedIn: 'LOGGED_IN',
      currentUser: 'GET_CURRENT_USER'
    })
  },

  methods: {
    ...mapActions({
      loginUser: 'LOGIN_USER'
    }),

    btnLogin() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loginUser(this.form);
          this.$router.replace({ name: 'AdminLayout' });
        }
      });
    },

    btnForgotPwd() {},

    loginSuccess() {
      if (this.loggedIn) {
        if (this.currentUser.relationships.roles[0].name === 'admin') {
          this.$router.replace({ name: 'AdminLayout' });
        } else if (this.currentUser.relationships.roles[0].name === 'admin') {
          this.$router.replace({ name: 'Dashboard' });
        }
        // this.$router.replace({ name: 'Dashboard' });
      }
    }
  },
  watch: {
    currentUser: {
      handler() {
        this.$router.push('/admin/admin');
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.icon-image {
  overflow: hidden;
  background-color: #ffecb3;
  border: 1px solid #1976d2;
  border-radius: 4px;
  box-sizing: border-box;
  width: 90%;
  height: 90%;
  margin: 0 8px 8px 0;
  display: inline-block;
}
</style>

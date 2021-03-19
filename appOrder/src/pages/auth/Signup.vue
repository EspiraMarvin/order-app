<template>
  <div class="q-pa-md-xl fixed-center" style="min-width: 310px; width: 60%">
    <h5 class="inset-shadow text-weight-bold" style="text-align: center;width: 100%">
      ACCOUNT SIGNUP
    </h5>
    <q-form class="q-gutter-md">
      <q-input
        type="name"
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
        filled
        type="password"
        v-model="form.password"
        label="Password *"
        lazy-rules
        :rules="[val => (val !== null && val !== '') || 'Please type your Password']"
      />

      <q-toggle v-model="form.accept" label="I accept the license and terms" />
    </q-form>
    <div>
      <q-btn
        label="Submit"
        type="submit"
        color="primary"
        :loading="loading"
        @click="buttonSubmit"
      />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonFunctions from '../../mixins/commonFunctions';

export default {
  name: 'register',
  mixins: [commonFunctions],

  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        accept: ''
      },
      defaultForm: {
        name: '',
        email: '',
        password: '',
        accept: ''
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
      signUser: 'SIGNUP_USER'
    }),
    buttonSubmit() {
      this.signUser(this.form);
      // Object.assign(this.form,this.defaultForm)

      setTimeout(() => {
        Object.assign(this.form, this.defaultForm);
      }, 1000);
    }
  }
};
</script>

<style scoped></style>

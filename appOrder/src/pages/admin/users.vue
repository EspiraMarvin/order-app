<template>
  <div class="q-pa-md">
    <q-table
      title="List of Users"
      :data="users.data"
      :columns="columns"
      row-key="id"
      :filter="pagination.filter"
      :pagination.sync="pagination"
      :loading="loadingUsers"
      @request="onPageChange"
      selection="single"
      :selected.sync="selected"
      hide-bottom
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="1000"
          v-model="pagination.filter"
          placeholder="Search"
          class="q-mr-xl"
          clearable
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          label="Add User"
          color="gray"
          class="q-mr-sm text-black q-pl-md q-pr-md"
          @click="buttonCreate"
        />
        <q-btn
          label="Edit User"
          color="gray"
          class="q-mr-sm text-black q-pl-md q-pr-md"
          @click="buttonEdit"
        />
        <q-btn
          label="Delete User"
          color="gray"
          class="q-mr-sm text-black q-pl-md q-pr-md"
          @click="buttonDelete"
        />
      </template>
    </q-table>

    <q-dialog v-model="createEditUserDialog">
      <q-card elevated style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <q-toolbar>
            <q-toolbar-title>{{ dialogTitle }}</q-toolbar-title>
          </q-toolbar>
          <q-form ref="addUserForm">
            <div class="row">
              <div class="col-md-6 col-xs-6 q-pa-md">
                <q-input
                  filled
                  v-model="form.name"
                  label="Name *"
                  type="text"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Please enter name']"
                />
              </div>
              <div class="col-md-6 col-xs-6 q-pa-md">
                <q-input
                  filled
                  v-model="form.email"
                  label="Email *"
                  type="email"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Please enter email']"
                />
              </div>
              <div class="col-md-6 col-xs-6 q-pa-md">
                <q-input
                  filled
                  v-model="form.phone"
                  label="Phone *"
                  type="tel"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Please enter phone number']"
                />
              </div>
              <div class="col-md-6 col-xs-6 q-pa-md">
                <q-input
                  filled
                  v-model="form.id_no"
                  label="id_no *"
                  type="number"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Please enter phone number']"
                />
              </div>
              <div v-if="!editting" class="col-md-6 col-xs-6 q-pa-md">
                <q-input
                  filled
                  type="password"
                  v-model="form.password"
                  label="Password *"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please enter password at least 6 characters'
                  ]"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>

        <!-- buttons example -->
        <q-card-actions align="right">
          <q-btn color="info" class="q-pl-md q-pr-md" outline label="Cancel" @click="closeDialog" />
          <q-btn
            label="Save"
            @click="btnSave"
            :disabled="addingUser"
            :loading="addingUser"
            outline
            color="primary"
            class="q-pl-md q-pr-md"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <template>
      <div class="row q-mt-md">
        <div class="col-md-4"></div>
        <div class="col-md-2">
          <span>Records per page: </span>
          <select @change="onSelectValue" v-model="pagination.rowsPerPage" class="select">
            <option v-for="(item, index) in options" :value="item.value" :key="index">{{
              item.label
            }}</option>
          </select>
        </div>

        <div class="col-md-4">
          <q-pagination
            @input="onRequest"
            v-model="pagination.page"
            :max="pagination.last_page"
            direction-links
            boundary-links
            :max-pages="1"
            :ellipses="true"
          >
          </q-pagination>
        </div>
        <div class="col-md-2">
          <span>Total Records: {{ pagination.rowsNumber }} </span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import commonMixins from '../mixins/commonMixins';
import { cloneDeep } from 'lodash';

export default {
  name: 'users',
  mixins: [commonMixins],
  created() {
    this.$store.dispatch('FETCH_USERS', this.pagination);
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        id_no: '',
        id: '',
        password: ''
      },
      selected: [],
      dialogTitle: '',
      editting: false,
      createEditUserDialog: false,
      filter: '',
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10,
        filter: '',
        last_page: 1
      },
      options: [
        { value: 3, label: 3 },
        { value: 5, label: 5 },
        { value: 7, label: 7 },
        { value: 10, label: 10 },
        { value: 15, label: 15 },
        { value: 25, label: 25 },
        { value: 50, label: 50 }
      ]
    };
  },
  computed: {
    ...mapGetters({
      loadingUsers: 'GET_FETCHING_USERS',
      users: 'GET_USERS',
      addingUser: 'GET_ADDING_USER'
    }),
    columns() {
      let columnObjects = [];
      if (this.users.data && this.users.data.length) {
        let firstValues = this.users.data[0];
        let headerArray = Object.keys(firstValues);
        headerArray.map(header => {
          if (header !== 'relationships' && header !== 'type') {
            let obj1 = {
              name: header,
              sortable: true,
              label: this.formatString(header),
              field: header,
              headerClasses: 'text-capitalize bg-grey-4'
            };
            columnObjects.push(obj1);
          }
        });
      }
      return columnObjects;
    }
  },
  watch: {
    users: {
      deep: true,
      handler() {
        if (this.users.hasOwnProperty('meta')) {
          this.pagination.page = this.users.meta.current_page;
          this.pagination.rowsPerPage = this.users.meta.per_page;
          this.pagination.rowsNumber = this.users.meta.total;
          this.pagination.last_page = this.users.meta.last_page;
        }
      }
    },
    addingUser: {
      handler() {
        if (!this.addingUser) {
          this.closeDialog();
          this.selected = [];
          this.$store.dispatch('FETCH_USERS', this.pagination);
        }
      }
    }
  },
  methods: {
    onPageChange(data) {
      console.log(data);
      if (data.filter) data.pagination.filter = data.filter;

      this.$store.dispatch('FETCH_USERS', data.pagination);
    },

    onRequest(val) {
      this.pagination.page = val;
      this.$store.dispatch('FETCH_USERS', this.pagination);
    },

    onSelectValue(val) {
      this.$store.dispatch('FETCH_USERS', this.pagination);
    },
    buttonCreate() {
      this.editting = false;
      this.createEditUserDialog = true;
      this.dialogTitle = 'Create User';
    },
    buttonEdit() {
      if (this.selected.length == 0) {
        return;
      }
      this.editting = true;
      this.createEditUserDialog = true;
      this.dialogTitle = 'Edit User';
      this.form = cloneDeep(this.selected[0]);
      console.log(this.selected[0]);
    },
    closeDialog() {
      this.editting = false;
      this.createEditUserDialog = false;
    },
    btnSave() {
      if (!this.editting) {
        this.saveUser(this.form);
      } else {
        this.editUser(this.form);
      }
    },
    buttonDelete() {
      if (this.selected.length == 0) {
        return;
      }
      this.deleteUser(this.selected[0].id);
    },
    ...mapActions({
      editUser: 'EDIT_USER',
      saveUser: 'SIGNUP_USER',
      deleteUser: 'DELETE_USER'
    })
  }
};
</script>

<style scoped>
.custom-cased {
  text-transform: capitalize !important;
}
.select {
  border: none;
  border: 0;
}
</style>

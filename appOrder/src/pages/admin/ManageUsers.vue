<template>
  <q-page>
    <q-card elevated class="q-pa-md q-ma-md">
      <q-table
        title="Users List"
        :data="usersResult.data"
        :columns="tableHeaders"
        row-key="id"
        :loading="loadingUsers"
        :filter="pagination.filter"
        :pagination.sync="pagination"
        @request="onRequest"
        hide-bottom
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-capitalize text-black"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template v-slot:top-right>
          <q-input
            v-if="false"
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
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <template v-for="col in props.cols">
              <q-td class="text-center" v-if="col.name !== 'actions'" :key="col.name">
                {{ props.row[col.name] }}
              </q-td>
              <q-td v-if="col.name === 'actions'" :key="col.name">
                <q-btn
                  class="q-ma-xs"
                  outline
                  color="secondary"
                  icon="visibility"
                  @click="buttonView(props.row)"
                ></q-btn>
                <q-btn
                  class="q-ma-xs"
                  outline
                  color="positive"
                  icon="edit"
                  @click="buttonEdit(props.row)"
                ></q-btn>
                <q-btn
                  class="q-ma-xs"
                  outline
                  @click="buttonDelete(props.row)"
                  color="negative"
                  icon="delete"
                ></q-btn>
              </q-td>
            </template>
          </q-tr>
        </template>
      </q-table>
      <div class="row">
        <div class="col-md-8 q-pa-md float-right">
          <q-pagination
            class="float-right"
            @input="onPageChange"
            v-model="pagination.page"
            :max="pagination.last_page"
            direction-links
            boundary-links
            :max-pages="1"
            :ellipses="true"
          >
          </q-pagination>
        </div>
        <div class="col-md-4 q-pa-md">
          <span class="q-pt-xl-lg">Total Records: {{ pagination.rowsNumber }} </span>
        </div>
      </div>
    </q-card>

    <!-- dialogs -->
    <q-dialog v-model="confirm" transition-show="rotate" transition-hide="rotate" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="white" text-color="red" />
          <span class="q-ml-sm">This Action Deletes User. Proceed? </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click="proceedDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="createEditUserDialog">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title>{{ dialogTitle }}</q-toolbar-title>
        </q-toolbar>
        <hr />
        <q-card-section class="q-pt-none">
          <q-form ref="userForm">
            <q-input
              filled
              v-model="userForm.name"
              label="Name *"
              type="text"
              :disable="viewing"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Name Required']"
            />
            <q-input
              filled
              v-model="userForm.email"
              label="Email *"
              type="email"
              :disable="viewing"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Email Required']"
            />
            <q-input
              filled
              v-model="userForm.password"
              label="Password *"
              type="password"
              :disable="viewing"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Password Required']"
            />
            <q-select
              label="Role"
              filled
              emit-value
              map-options
              :disable="viewing"
              transition-show="scale"
              transition-hide="scale"
              v-model="userForm.role_id"
              :options="rolesResult.data"
              option-value="id"
              option-label="name"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white" v-show="!viewing">
          <q-btn label="Close" class="q-pl-md q-pr-md q-mr-md" v-close-popup />
          <q-btn
            class="q-pl-md q-pr-md q-mr-md"
            label="Save"
            @click="btnSave"
            outline
            color="primary"
            :loading="addingUser"
            :disable="addingUser"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- end dialogs -->
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CommonMixins from '../../mixins/commonFunctions';
import { cloneDeep } from 'lodash';
export default {
  name: 'ManageUsers',
  mixins: [CommonMixins],
  created() {
    this.$store.commit('SET_DASHBOARD_TITLE', 'Users Management');
    this.$store.dispatch('FETCH_USERS', this.pagination);
    this.$store.dispatch('FETCH_ROLES', 1);
  },
  data() {
    return {
      userForm: {
        id: '',
        name: '',
        email: '',
        role_id: ''
      },
      filter: '',
      selected: [],
      confirm: false,
      createEditUserDialog: false,
      deleteId: '',
      editing: false,
      viewing: false,
      dialogTitle: '',
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10,
        filter: '',
        last_page: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      loadingUsers: 'GET_FETCHING_USERS',
      usersResult: 'GET_USERS',
      addingUser: 'GET_ADDING_USER',
      rolesResult: 'GET_ROLES'
    }),
    tableHeaders() {
      let columnObjects = [];
      if (this.usersResult.data && this.usersResult.data.length) {
        let firstValue = this.usersResult.data[0];
        let headerArray = Object.keys(firstValue);
        headerArray.map(header => {
          if (header !== 'relationships' && header !== 'type') {
            let obj1 = {
              name: header,
              sortable: true,
              label: this.formatString(header),
              field: header,
              headerClasses: 'bg-grey-3',
              align: 'center'
            };
            columnObjects.push(obj1);
          }
        });
        columnObjects.push({
          name: 'actions',
          sortable: false,
          label: 'Actions',
          field: 'actions',
          headerClasses: 'bg-grey-3',
          align: 'center'
        });
      }
      return columnObjects;
    }
  },
  methods: {
    ...mapActions({
      addUser: 'ADD_USER',
      deleteUser: 'DELETE_USER',
      editUser: 'EDIT_USER'
    }),
    onPageChange(data) {
      this.pagination.page = data;
      this.$store.dispatch('FETCH_USERS', this.pagination);
    },
    onRequest(data) {
      if (data.filter) {
        data.pagination.filter = data.filter;
        this.$store.dispatch('FETCH_USERS', data.pagination);
      }
    },
    buttonCreate() {
      this.editing = false;
      this.viewing = false;
      this.createEditUserDialog = true;
      this.dialogTitle = 'Create User';
    },
    buttonEdit(row) {
      let row2 = cloneDeep(row);
      this.viewing = false;
      this.editing = true;

      this.userForm.id = row2.id;
      this.userForm.name = row2.name;
      this.userForm.email = row2.email;
      this.userForm.role_id = row2.relationships.roles[0].id;
      this.createEditUserDialog = true;
      this.dialogTitle = 'Edit User';
    },
    buttonView(row) {
      this.viewing = true;
      this.userForm.name = row.name;
      this.userForm.email = row.email;
      this.userForm.role_id = row.relationships.roles[0].id;
      this.createEditUserDialog = true;
      this.dialogTitle = 'View User';
    },
    buttonDelete(row) {
      this.confirm = true;
      this.deleteId = row.id;
    },
    proceedDelete() {
      this.confirm = false;
      this.deleteUser(this.deleteId);
    },
    btnSave() {
      console.log('clicked');
      this.$refs.userForm.validate().then(success => {
        if (success) {
          if (!this.editing) {
            console.log('success', success);
            this.addUser(this.userForm);
          } else {
            this.editUser(this.userForm);
          }
        } else {
          this.orderNotify('negative', 'Please fill all required fields *', 'top');
        }
      });
    }
  },
  watch: {
    addingUser: {
      handler() {
        if (!this.addingUser) {
          this.createEditUserDialog = false;
        }
      }
    },
    usersResult: {
      deep: true,
      handler() {
        // eslint-disable-next-line no-prototype-builtins
        if (this.usersResult.hasOwnProperty('meta')) {
          this.pagination.page = this.usersResult.meta.current_page;
          this.pagination.rowsPerPage = this.usersResult.meta.per_page;
          this.pagination.rowsNumber = this.usersResult.meta.total;
          this.pagination.last_page = this.usersResult.meta.last_page;
        }
      }
    }
  }
};
</script>

<style scoped></style>

<!--
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
      class="my-sticky-column-table"
      hide-bottom
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <template v-for="col in props.cols">
            <q-th
              :key="col.name"
              :props="props"
              v-if="col.name !== 'id'"
              class="text-capitalize text-black"
            >
              {{ col.label }}
            </q-th>
          </template>
        </q-tr>
      </template>
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <template v-for="(col, index) in props.cols">
            <q-td
              class="text-center"
              v-if="col.name !== 'id' && col.name !== 'created_at' && col.name !== 'updated_at'"
              :key="index"
            >
              {{ props.row[col.name] }}
            </q-td>
            <q-td
              class="text-center"
              v-if="col.name === 'created_at' || col.name === 'updated_at'"
              :key="index"
            >
              {{ prettyDateTime(props.row[col.name]) }}
            </q-td>
          </template>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="createEditUserDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <q-toolbar>
            &lt;!&ndash;            <q-toolbar-title>{{ dialogTitle }}</q-toolbar-title>&ndash;&gt;
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
                  label="Phone Number *"
                  type="number"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Please enter phone number']"
                />
              </div>
              <div class="col-md-6 col-xs-6 q-pa-md">
                <q-input
                  filled
                  v-model="form.id_no"
                  label="ID Number *"
                  type="number"
                  lazy-rules
                  :rules="[val => (val && val.length > 0) || 'Please enter ID number']"
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
            <option v-for="(item, index) in options" :value="item.value" :key="index">
              {{ item.label }}
            </option>
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
import commonFunctions from '../../mixins/commonFunctions';
import { cloneDeep } from 'lodash';
import moment from 'moment';

export default {
  name: 'ManageUsers',
  mixins: [commonFunctions],
  created() {
    this.$store.dispatch('FETCH_USERS', this.pagination);
  },

  data() {
    return {
      counter: 0,
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
              // sort: (a, b, rowA, rowB) => myCompareFunction(rowA, rowB),
              label: this.formatString(header),
              field: header,
              align: 'center',
              headerClasses: 'text-capitalize bg-grey-4',
              sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
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
        // eslint-disable-next-line no-prototype-builtins
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
    ...mapActions({
      editUser: 'EDIT_USER',
      saveUser: 'REGISTER_USER',
      deleteUser: 'DELETE_USER'
    }),

    onPageChange(data) {
      if (data.filter) data.pagination.filter = data.filter;

      this.$store.dispatch('FETCH_USERS', data.pagination);
    },

    onRequest(val) {
      this.pagination.page = val;
      this.$store.dispatch('FETCH_USERS', this.pagination);
    },

    // eslint-disable-next-line no-unused-vars
    onSelectValue(val) {
      this.$store.dispatch('FETCH_USERS', this.pagination);
    },
    buttonCreate() {
      this.editting = false;
      this.createEditUserDialog = true;
      this.dialogTitle = 'Create User';
    },
    buttonEdit() {
      if (this.selected.length === 0) {
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
        console.log('save clicked');
        this.saveUser(this.form);
      } else {
        this.editUser(this.form);
      }
    },
    buttonDelete() {
      if (this.selected.length === 0) {
        return;
      }
      this.deleteUser(this.selected[0].id);
    },

    prettyDate(dd) {
      return moment(dd)
        .utc(true)
        .format('DD/MM/YYYY');
    },

    prettyDateTime(dd) {
      return moment(dd)
        .utc(true)
        .format('DD/MM/YYYY HH:mm:ss');
    },

    incrementCounter() {
      this.counter += 1;
    }
  }
};
</script>

<style lang="sass">
.my-sticky-column-table
  thead tr:first-child th:first-child
    background-color: #fff
  td:first-child
    background-color: #f5f5dc
  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
-->

<template>
  <q-page>
    <q-card elevated class="q-pa-md q-ma-md">
      <q-table
        title="Suppliers List"
        :data="suppliersResult.data"
        :columns="tableHeaders"
        row-key="id"
        :loading="loadingSuppliers"
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
            label="Add Supplier"
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
              <q-td v-if="col.name === 'actions'" :key="col.name" align="center">
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
          <span class="q-ml-sm">This Action Deletes Supplier. Proceed? </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click="proceedDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="createEditSupplierDialog">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title>{{ dialogTitle }}</q-toolbar-title>
        </q-toolbar>
        <hr />
        <q-card-section class="q-pt-none">
          <q-form ref="supplierForm">
            <q-input
              filled
              v-model="supplierForm.name"
              label="Name *"
              type="text"
              :disable="viewing"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Name Required']"
            />
            <div v-show="viewing">
              <p class="text-center">Products List</p>
              <template v-if="supplierProducts.length">
                <p class="text-center">Total: {{ supplierProducts.length }}</p>
                <q-list bordered v-for="product in supplierProducts" :key="product.id">
                  <q-item>
                    <q-item-section> {{ product.name }} </q-item-section>
                  </q-item>
                </q-list>
              </template>
              <template v-else>
                <p class="text-center">No Products for this Supplier</p>
              </template>
            </div>
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
            :loading="addingSupplier"
            :disable="addingSupplier"
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
  name: 'Suppliers',
  mixins: [CommonMixins],
  created() {
    this.$store.dispatch('FETCH_SUPPLIERS', this.pagination);
  },
  data() {
    return {
      supplierForm: {
        id: '',
        name: '',
      },
      filter: '',
      selected: [],
      supplierProducts: [],
      confirm: false,
      createEditSupplierDialog: false,
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
      loadingSuppliers: 'GET_FETCHING_SUPPLIERS',
      suppliersResult: 'GET_SUPPLIERS',
      addingSupplier: 'GET_ADDING_SUPPLIER',
      productsResult: 'GET_PRODUCTS'
    }),
    tableHeaders() {
      let columnObjects = [];
      if (this.suppliersResult.data && this.suppliersResult.data.length) {
        let firstValue = this.suppliersResult.data[0];
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
      addSupplier: 'ADD_SUPPLIER',
      deleteSupplier: 'DELETE_SUPPLIER',
      editSupplier: 'EDIT_SUPPLIER'
    }),
    onPageChange(data) {
      this.pagination.page = data;
      this.$store.dispatch('FETCH_SUPPLIERS', this.pagination);
    },
    onRequest(data) {
      if (data.filter) {
        data.pagination.filter = data.filter;
        this.$store.dispatch('FETCH_SUPPLIERS', data.pagination);
      }
    },
    buttonCreate() {
      this.editing = false;
      this.viewing = false;
      this.createEditSupplierDialog = true;
      this.dialogTitle = 'Create Supplier';
    },
    buttonEdit(row) {
      let row2 = cloneDeep(row);
      this.viewing = false;
      this.editing = true;

      this.supplierForm.id = row2.id;
      this.supplierForm.name = row2.name;
      this.createEditSupplierDialog = true;
      this.dialogTitle = 'Edit Supplier';
    },
    buttonView(row) {
      // get products relationships
      this.supplierProducts = row.relationships.products;
      // display view
      this.viewing = true;
      this.supplierForm.name = row.name;
      this.createEditSupplierDialog = true;
      this.dialogTitle = 'View Supplier';
    },
    buttonDelete(row) {
      this.confirm = true;
      this.deleteId = row.id;
    },
    proceedDelete() {
      this.confirm = false;
      this.deleteSupplier(this.deleteId);
    },
    btnSave() {
      this.$refs.supplierForm.validate().then(success => {
        if (success) {
          if (!this.editing) {
            this.addSupplier(this.supplierForm);
          } else {
            this.editSupplier(this.supplierForm);
          }
        } else {
          this.orderNotify('negative', 'Please fill all required fields *', 'top');
        }
      });
    }
  },
  watch: {
    addingSupplier: {
      handler() {
        if (!this.addingSupplier) {
          this.createEditSupplierDialog = false;
        }
      }
    },
    suppliersResult: {
      deep: true,
      handler() {
        // eslint-disable-next-line no-prototype-builtins
        if (this.suppliersResult.hasOwnProperty('meta')) {
          this.pagination.page = this.suppliersResult.meta.current_page;
          this.pagination.rowsPerPage = this.suppliersResult.meta.per_page;
          this.pagination.rowsNumber = this.suppliersResult.meta.total;
          this.pagination.last_page = this.suppliersResult.meta.last_page;
        }
      }
    }
  }
};
</script>

<style scoped></style>

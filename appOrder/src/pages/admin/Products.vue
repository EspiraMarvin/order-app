<template>
  <q-page>
    <q-card elevated class="q-pa-md q-ma-md">
      <q-table
        title="Products List"
        :data="productsResult.data"
        :columns="tableHeaders"
        row-key="id"
        :loading="loadingProducts"
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
            label="Add Product"
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
          <span class="q-ml-sm">This Action Deletes User. Proceed? </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click="proceedDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="createEditProductDialog">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title>{{ dialogTitle }}</q-toolbar-title>
        </q-toolbar>
        <hr />
        <q-card-section class="q-pt-none">
          <q-form ref="productForm">
            <q-input
              filled
              v-model="productForm.name"
              label="Name *"
              type="text"
              :disable="viewing"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Name Required']"
            />
            <q-input
              filled
              v-model="productForm.description"
              label="Description *"
              type="text"
              :disable="viewing"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Description Required']"
            />
            <q-input
              filled
              v-model="productForm.quantity"
              label="Quantity *"
              type="text"
              :disable="viewing"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Quantity Required']"
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
            :loading="addingProduct"
            :disable="addingProduct"
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
  name: 'Products',
  mixins: [CommonMixins],
  created() {
    this.$store.dispatch('FETCH_PRODUCTS', this.pagination);
  },
  data() {
    return {
      productForm: {
        id: '',
        name: '',
        description: '',
        quantity: ''
      },
      filter: '',
      selected: [],
      confirm: false,
      createEditProductDialog: false,
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
      loadingProducts: 'GET_FETCHING_PRODUCTS',
      productsResult: 'GET_PRODUCTS',
      addingProduct: 'GET_ADDING_PRODUCT'
    }),
    tableHeaders() {
      let columnObjects = [];
      if (this.productsResult.data && this.productsResult.data.length) {
        let firstValue = this.productsResult.data[0];
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
      addProduct: 'ADD_PRODUCT',
      deleteProduct: 'DELETE_PRODUCT',
      editProduct: 'EDIT_PRODUCT'
    }),
    onPageChange(data) {
      this.pagination.page = data;
      this.$store.dispatch('FETCH_PRODUCTS', this.pagination);
    },
    onRequest(data) {
      if (data.filter) {
        data.pagination.filter = data.filter;
        this.$store.dispatch('FETCH_PRODUCTS', data.pagination);
      }
    },
    buttonCreate() {
      this.editing = false;
      this.viewing = false;
      this.createEditProductDialog = true;
      this.dialogTitle = 'Create Product';
    },
    buttonEdit(row) {
      let row2 = cloneDeep(row);
      this.viewing = false;
      this.editing = true;

      this.productForm.id = row2.id;
      this.productForm.name = row2.name;
      this.productForm.description = row2.description;
      this.productForm.quantity = row2.quantity;
      this.createEditProductDialog = true;
      this.dialogTitle = 'Edit Product';
    },
    buttonView(row) {
      this.viewing = true;
      this.productForm.name = row.name;
      this.productForm.description = row.description;
      this.productForm.quantity = row.quantity;
      this.createEditProductDialog = true;
      this.dialogTitle = 'View Product';
    },
    buttonDelete(row) {
      this.confirm = true;
      this.deleteId = row.id;
    },
    proceedDelete() {
      this.confirm = false;
      this.deleteProduct(this.deleteId);
    },
    btnSave() {
      this.$refs.productForm.validate().then(success => {
        if (success) {
          if (!this.editing) {
            this.addProduct(this.productForm);
          } else {
            this.editProduct(this.productForm);
          }
        } else {
          this.orderNotify('negative', 'Please fill all required fields *', 'top');
        }
      });
    }
  },
  watch: {
    addingProduct: {
      handler() {
        if (!this.addingProduct) {
          this.createEditProductDialog = false;
        }
      }
    },
    productsResult: {
      deep: true,
      handler() {
        // eslint-disable-next-line no-prototype-builtins
        if (this.productsResult.hasOwnProperty('meta')) {
          this.pagination.page = this.productsResult.meta.current_page;
          this.pagination.rowsPerPage = this.productsResult.meta.per_page;
          this.pagination.rowsNumber = this.productsResult.meta.total;
          this.pagination.last_page = this.productsResult.meta.last_page;
        }
      }
    }
  }
};
</script>

<style scoped></style>

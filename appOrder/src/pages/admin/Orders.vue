<template>
  <q-page>
    <q-card elevated class="q-pa-md q-ma-md">
      <q-table
        title="Orders List"
        :data="ordersResult.data"
        :columns="tableHeaders"
        row-key="id"
        :loading="loadingOrders"
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
            label="Add Order"
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
          <span class="q-ml-sm">This Action Deletes Order. Proceed? </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="red" @click="proceedDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="createEditOrderDialog">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-toolbar>
          <q-toolbar-title>{{ dialogTitle }}</q-toolbar-title>
        </q-toolbar>
        <hr />
        <q-card-section class="q-pt-none">
          <q-form ref="orderForm">
            <q-input
              filled
              v-model="orderForm.order_no"
              label="Order Number *"
              type="text"
              :disable="viewing"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Order Number Required']"
            />
            <q-select
              v-if="!editing"
              label="Product"
              filled
              map-options
              multiple
              :disable="viewing"
              v-model="products"
              :options="productsResult.data"
              option-value="product_id"
              option-label="name"
            />
            <div v-show="viewing">
              <p class="text-center q-mt-sm">Order Details</p>
              <template v-if="orderDetails.length">
                <p class="text-center">Total: {{ orderDetails.length }}</p>
                <q-list bordered v-for="product in orderDetails" :key="product.id">
                  <q-item>
                    <q-item-section>Name: {{ product.name }} </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Description: {{ product.description }} </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Quantity: {{ product.quantity }} </q-item-section>
                  </q-item>
                </q-list>
              </template>
              <template v-else>
                <p class="text-center">No Order Details</p>
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
            :loading="addingOrder"
            :disable="addingOrder"
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
  name: 'Orders',
  mixins: [CommonMixins],
  created() {
    this.$store.dispatch('FETCH_ORDERS', this.pagination);
  },
  data() {
    return {
      orderForm: {
        id: '',
        order_no: '',
        products: []
      },
      products: [],
      filter: '',
      selected: [],
      orderDetails: [],
      confirm: false,
      createEditOrderDialog: false,
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
      loadingOrders: 'GET_FETCHING_ORDERS',
      ordersResult: 'GET_ORDERS',
      addingOrder: 'GET_ADDING_ORDER',
      productsResult: 'GET_PRODUCTS'
    }),
    tableHeaders() {
      let columnObjects = [];
      if (this.ordersResult.data && this.ordersResult.data.length) {
        let firstValue = this.ordersResult.data[0];
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
      addOrder: 'ADD_ORDER',
      deleteOrder: 'DELETE_ORDER',
      editOrder: 'EDIT_ORDER'
    }),
    onPageChange(data) {
      this.pagination.page = data;
      this.$store.dispatch('FETCH_ORDERS', this.pagination);
    },
    onRequest(data) {
      if (data.filter) {
        data.pagination.filter = data.filter;
        this.$store.dispatch('FETCH_ORDERS', data.pagination);
      }
    },
    buttonCreate() {
      this.editing = false;
      this.viewing = false;
      this.createEditOrderDialog = true;
      this.dialogTitle = 'Create Order';
    },
    buttonEdit(row) {
      let row2 = cloneDeep(row);
      this.viewing = false;
      this.editing = true;

      this.orderForm.id = row2.id;
      this.orderForm.order_no = row2.order_no;
      this.orderForm.products = row2.products;
      this.createEditOrderDialog = true;
      this.dialogTitle = 'Edit Product';
    },
    buttonView(row) {
      // get products relationships/ order details
      this.orderDetails = row.relationships.products;
      this.viewing = true;
      this.orderForm.order_no = row.order_no;
      this.orderForm.products = row.relationships.products;
      this.createEditOrderDialog = true;
      this.dialogTitle = 'View Order';
    },
    buttonDelete(row) {
      this.confirm = true;
      this.deleteId = row.id;
    },
    proceedDelete() {
      this.confirm = false;
      this.deleteOrder(this.deleteId);
    },
    btnSave() {
      this.$refs.orderForm.validate().then(success => {
        if (success) {
          if (!this.editing) {
            this.orderForm.products = this.products.map(product => product.id);
            this.addOrder(this.orderForm);
          } else {
            this.editOrder(this.orderForm);
          }
        } else {
          this.orderNotify('negative', 'Please fill all required fields *', 'top');
        }
      });
    }
  },
  watch: {
    addingOrder: {
      handler() {
        if (!this.addingOrder) {
          this.createEditOrderDialog = false;
        }
      }
    },
    ordersResult: {
      deep: true,
      handler() {
        // eslint-disable-next-line no-prototype-builtins
        if (this.ordersResult.hasOwnProperty('meta')) {
          this.pagination.page = this.ordersResult.meta.current_page;
          this.pagination.rowsPerPage = this.ordersResult.meta.per_page;
          this.pagination.rowsNumber = this.ordersResult.meta.total;
          this.pagination.last_page = this.ordersResult.meta.last_page;
        }
      }
    }
  }
};
</script>

<style scoped></style>

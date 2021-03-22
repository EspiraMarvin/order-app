<template>
  <q-page>
    <div class="q-pa-md q-ma-md" :loading="loadingCharts">
      <div class="row q-pa-md">
        <div class="col-md-12">
          <q-toolbar>
            <q-toolbar-title>Products Progress Line Graph</q-toolbar-title>
          </q-toolbar>
          <VeLine :data="filteredData" :colors="gradient"></VeLine>
        </div>
      </div>

      <div class="row q-pa-md">
        <div class="col-md-12">
          <q-toolbar>
            <q-toolbar-title>Products Progress Bar Graph</q-toolbar-title>
          </q-toolbar>
          <HistoGram :data="filteredData" :colors="gradient"></HistoGram>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import VeLine from 'v-charts/lib/line.common';
import HistoGram from 'v-charts/lib/histogram.common';
export default {
  name: 'Overview',
  components: { VeLine, HistoGram },
  created() {
    this.$store.dispatch('FETCH_CHARTS_DATA', 1);
  },
  data() {
    return {
      gradient: [
        '#4e73df',
        '#FF5252',
        '#009688',
        '#2985ef',
        '#42b983',
        '#757575',
        '#455A64',
        '#607D8B',
        '#795548',
        '#512DA8',
        '#FF4081',
        '#FBC02D'
      ],
      columns: ['ProductName', 'Orders', 'Suppliers']
    };
  },
  computed: {
    ...mapGetters({
      chartsData: 'GET_CHARTS_DATA',
      loadingCharts: 'GET_FETCHING_CHARTS_DATA'
    }),
    sanitizeData() {
      let columnObjects = [];
      if (this.chartsData.data && this.chartsData.data.length) {
        this.chartsData.data.map(row => {
          let obj1 = {
            ProductName: row.name,
            Orders: row.orders_count,
            Suppliers: row.suppliers_count
          };
          columnObjects.push(obj1);
        });
      }
      return columnObjects;
    },
    filteredData() {
      return {
        rows: this.sanitizeData,
        columns: this.columns
      };
    }
  }
};
</script>

<style scoped></style>

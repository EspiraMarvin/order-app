import { baseUrl, http } from 'src/api/service';
import axios from 'axios';
import { appendEditForm, appendForm } from 'src/helpers/commonFunctions';


const state = () => ({
  suppliers: {},
  fetchingSuppliers: false,
  addingSupplier: false
})

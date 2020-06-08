  
<template>
  <div>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="fullPage"
        :width=200
        :height=200
        color="#2bb898"
        backgroundColor="#fff"
        :opacity= 0.5>
        </loading>
    </div>

    <b-card class="mega-dashboard">
      <template v-slot:header>
        <h1 class="mb-0"><b-icon icon="table"></b-icon> Data User</h1>
      </template>
      <b-row>
        <b-col cols="8" md="8" class="text-right">
          <b-form-group
            class="mb-0"
          >
            <b-input-group size="md">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Cari Data User"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''" class="rounded-0 btn-mega"><b-icon icon="search" class="form-icon"></b-icon></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col cols="4" offset-md="1" md="3"  class="">
          <b-form-group
          label="Show"
          label-cols="4"
          label-cols-md="6"
          label-cols-lg="6"
          label-cols-xl="4"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="md"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        
        <!-- <b-col cols="12" lg="3" class="text-right  mt-3 mt-md-1 mt-lg-0">
          <b-button class="btn-mega btn-block" @click="addDataSettlement()">Add Form Settlement</b-button>
        </b-col> -->
        
      </b-row>

      <div class="mega-dashboard-line"></div>   
      <!-- Table Dashboard -->
      <b-row class="mt-3 px-4 mega-table-dashboard">
        <div class="table-responsive">
          <b-table 
          stacked="md"
          class=" text-center table-bordered " 
          hover 
          :fields="fieldsTableUser" 
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          >            
          </b-table>        
          </div>       
      </b-row>    
      <div class="mega-dashboard-line mt-3"></div>     
      <b-col cols="12" md="6" offset-md="6" offset-lg="9" lg="3" class=" mt-3 mt-md-3 mt-lg-3 px-0">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="md"
            class="my-0"
          ></b-pagination>
      </b-col>
             
    </b-card>
    <!-- END Table Dashboard -->                
  </div>
</template>

<script>
// import axios from 'axios'
// import Swal from 'sweetalert2'
import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components:{
    Loading
  },
  data(){
    return {
      isLoading: false,
      fullPage: true,
      filter: null,
      sortDesc: false,
      user:'',
      dataCostTypes:'',
      fieldsTableUser: ['no','NIP','nama','jabatan','nomor_handphone','foto_profil','scan_KTP','username','password','alamat'],
      perPage: 5,
      pageOptions: [5, 10, 15],
      currentPage: 1,
      totalRows: 6,
    }
  },

  mounted() {
    this.userData()
    
  },

  computed: {

  },

  methods: {
    userData(){
      this.user = window.localStorage.getItem('name');
    },
  }
}
</script>

<style lang="scss">

.mega-dashboard-line{
    width: 100%;
    border-bottom: 1px solid #e9edf1;
}

.form-logo{
  width: 10rem;
}

.delete-row{
  color:red;
  font-weight: 800;
  cursor: pointer;
}

.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #2bb898;
    border-color: #2bb898;
    
}
.page-item .page-link{
  outline: none;
    box-shadow: none !important;
}

.b-table-details{
  background: #e9edf1 !important;
  td{
    border: 0px !important;
  }
  th{
    border: 1px solid #fff !important;
  }
  .table-hover thead tr:hover th {
  color: #fff;
}
}

@media (min-width: 768px) and (max-width: 2000px) {
  .mega-table-dashboard table{
    min-width: 1000px !important;
  }
}

@media (max-width: 767.98px) {
  .mega-table-dashboard {

      table tr{
      margin-top: 20px;
      -webkit-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
      -moz-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
      box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29); 
    }
  }

    
  .b-table-details{
    table tr {
      -webkit-box-shadow: none !important;
      -moz-box-shadow: none !important;
      box-shadow: none !important;
    } 
  }
}





</style>

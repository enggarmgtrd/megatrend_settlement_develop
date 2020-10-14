  
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
        <h1 class="mb-0"><b-icon icon="table"></b-icon> Data Trip</h1>
      </template>
      <b-row>
        <b-col cols="12" sm="8" md="6" lg="8" class="text-right">
          <b-form-group
            class="mb-0"
          >
            <b-input-group size="md">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Cari Data Trip"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''" class="rounded-0 btn-mega"><b-icon icon="search" class="form-icon"></b-icon></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col cols="12" sm="4" offset-md="1" md="5" lg="3" class="mt-2 mt-sm-0">
          <b-form-group
          label="Show"
          label-cols="2"
          label-cols-sm="4"
          label-cols-md="4"
          label-cols-lg="5"
          label-cols-xl="4"
          >
          <b-input-group size="md">
            <b-form-select
              style="cursor: pointer;"
              v-model="perPage"
              id="perPageSelect"
              size="md"
              :options="pageOptions"
            ></b-form-select>
            <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''" class="rounded-0 btn-mega"><b-icon icon="chevron-down"></b-icon></b-button>
              </b-input-group-append>
            </b-input-group>
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
          items="" 
          class=" text-center table-bordered " 
          hover 
          :fields="fieldsTableDashboard" 
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
//import axios from 'axios'
//import Swal from 'sweetalert2'
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
      dataForm:[],
      fieldsTableDashboardAdmin: ['no',{key: 'date',label: 'Tanggal', sortable: true},'supir','no._mobil', 'helper', 'kilometer_akhir', 'saldo_e-toll','uang_jalan', 'total_biaya', 'sisa_uang_jalan','detail_biaya', 'actions'],
      fieldsTableDashboardSupir: ['no',{key: 'date',label: 'Tanggal', sortable: true},'no._mobil', 'helper', 'kilometer_akhir', 'saldo_e-toll','uang_jalan', 'total_biaya', 'sisa_uang_jalan'],
      perPage: 10,
      pageOptions: [10, 25, 50],
      currentPage: 1,
      totalRows: 20,
    }
  },

  mounted() {
    this.userData(),
    this.loadDataDashboard()
    
  },

  computed: {
    fieldsTableDashboard(){
      let isAdmin = window.localStorage.getItem('admin')
      if(isAdmin == 'true'){
        return this.fieldsTableDashboardAdmin
      }else{
        return this.fieldsTableDashboardSupir
      }
    },
    
  },

  methods: {
    userData(){
      this.user = window.localStorage.getItem('name');
    },

    mileAgeFormat(value) {
        let val = (value/1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
  }
}
</script>

<style lang="scss">

.mega-dashboard{
  .btn-mega{
    color: #fff;
    font-weight: 500 !important;
    background: #2bb898 !important;
    border-radius: 0px !important;
    border: none !important;
    cursor: default;
    
    
    &:hover{
      background: #2bb898 !important;
      color: #fff;
      transition: .5s;
      
    }
    &:focus{
      outline: none;
      box-shadow: none !important;
    }
  }
}

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

@media (min-width: 1600px) and (max-width: 2000px) {
  .mega-table-dashboard table{
    min-width: 1280px !important;
  }
}

@media (min-width: 1024px) and (max-width: 1365.98px) {
  .mega-table-dashboard table{
    width: 1000px !important;
    font-size: 90%;
  }
}

@media (min-width: 768px) and (max-width: 1023.98px) {
  .mega-table-dashboard table{
    width: 1000px !important;
    font-size: 90%;
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



// @media (min-width: 0px) and (max-width: 576px){
//   body{
//     overflow-y: hidden !important;
//   }
//   .mega-table-dashboard {
//     max-height: 56vh;
//   }
// }

// @media (min-width: 576px){
//   .mega-table-dashboard {
//     max-height: 62vh;
//   }
// }

// @media (min-width: 768px){
//   .mega-table-dashboard {
//     max-height: 71vh;
//   }
// }

// @media (min-width: 1023.98px){
//   .mega-table-dashboard {
//     max-height: 77vh;
//   }
// }
// @media (min-width: 1365.98px){
//   .mega-table-dashboard {
//     max-height: 56vh;
//   }
// }

// @media (min-width: 1559.98px){
//   .mega-table-dashboard {
//     max-height: 68vh;
//   }
// }


</style>

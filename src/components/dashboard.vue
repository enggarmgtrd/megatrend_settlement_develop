  
<template>
  <div>
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
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
        <h1 class="mb-0"><b-icon icon="table"></b-icon> Data Settlement</h1>
      </template>
      <b-row align-h="between">
        <b-col md="12" lg="4" class="text-right">
          <b-form-group
            class="mb-0"
          >
            <b-input-group size="md">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Cari Data Settlement"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''" class="rounded-0 btn-mega"><b-icon icon="search" class="form-icon"></b-icon></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6" lg="2" class=" mt-2 mt-md-3 mt-lg-0">
          <b-form-group
          label="Show"
          label-cols-sm="3"
          label-cols-lg="5"
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

        <b-col cols="12" md="6" lg="3" class=" mt-1 mt-md-3 mt-lg-0">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="md"
            class="my-0"
          ></b-pagination>
        </b-col>
        
        <b-col cols="12" lg="3" class="text-right  mt-3 mt-md-1 mt-lg-0">
          <b-button class="btn-mega btn-block" @click="addDataSettlement()">Add Form Settlement</b-button>
        </b-col>
        
      </b-row>

      <!-- Table Dashboard -->
      <b-row class="mt-3 px-4">      
        <div class="table-responsive mega-table-dashboard">
          <b-table 
          stacked="md"
          :items="dataForm" 
          class=" text-center table-bordered " 
          hover 
          :fields="fieldsTableDashboard" 
          :filter="filter"
          :per-page="perPage"
          :current-page="currentPage"
          >
            <template v-slot:cell(no)="data">
              {{ data.index + 1 }}
            </template>
            <template v-slot:cell(no._mobil)="data">
              {{ data.item.fleet.no}}
            </template>
            <template v-slot:cell(tanggal)="data">
              {{ data.item.date}}
            </template>
            <template v-slot:cell(helper)="data">
              {{ data.item.helper.name}}
            </template>
            <template v-slot:cell(kilometer_akhir)="data">
              {{ mileAgeFormat(data.item.mileage)}}
            </template>
            <template v-slot:cell(saldo_e-toll)="data">
              {{ data.item.emoney_balance | currency}}
            </template>
            <template v-slot:cell(uang_jalan)="data">
              {{ data.item.pocket_money | currency}}
            </template>
            <template v-slot:cell(total_biaya)="data">
              {{ data.item.totalCost | currency}}
            </template>
            <template v-slot:cell(sisa_uang_jalan)="data">
              {{data.item.pocket_money - data.item.totalCost | currency}}
            </template>
            <template v-slot:cell(actions)="data">
              <b-button class="btn-sm btn-mega-3 mr-1 mb-1" @click="editDataSettlement(data.item.id)"><b-icon-pencil></b-icon-pencil></b-button>
              <b-button class="btn-sm btn-mega-2 mr-1 mb-1" @click="deleteDataSettlement(data.item.id)"><b-icon-trash></b-icon-trash></b-button>
            </template>                  
                              
          </b-table>        
          </div>       
      </b-row>             
    </b-card>
    <!-- END Table Dashboard -->                
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
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
      fieldsTableDashboardAdmin: ['no',{key: 'tanggal', sortable: true},'no._mobil', 'helper', 'kilometer_akhir', 'saldo_e-toll','uang_jalan', 'total_biaya', 'sisa_uang_jalan', 'actions'],
      fieldsTableDashboardSupir: ['no',{key: 'tanggal', sortable: true},'no._mobil', 'helper', 'kilometer_akhir', 'saldo_e-toll','uang_jalan', 'total_biaya', 'sisa_uang_jalan'],
      perPage: 5,
      pageOptions: [5, 10, 15],
      currentPage: 1,
      totalRows: 6,
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

    loadDataDashboard(){
      let token = window.localStorage.getItem('token')
      let id = window.localStorage.getItem('id')
      console.log(id)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      axios.get('https://fleet.megatrend.xyz/api/user/'+id,config).then(res => {
      console.log(res)
      this.dataForm = res.data.fleet_trips.reverse()
      console.log(this.dataForm)
      }).catch ((err) => {
      console.log(err);
      })  
    },

    addDataSettlement(){
      this.$router.push('form')
    },

    editDataSettlement(index){
      this.$router.push('form-update/'+index)
    },
    
    deleteDataSettlement(id){
      let token = window.localStorage.getItem('token')
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      Swal.fire({
        title: 'Kamu yakin ?',
        text: "File yang telah dihapus tidak akan bisa muncul kembali !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Hapus'
      }).then((result) => {
        if (result.value) {
          axios.delete('https://fleet.megatrend.xyz/api/fleet-trip/'+id, config).then(res =>{
          console.log(res)
            Swal.fire({
              icon: 'success',
              title: 'Data Berhasil Dihapus',
              showConfirmButton: false,
              timer: 1500
            })  
          return this.loadDataDashboard()
          });        
        }
       })    
    },
  }
}
</script>

<style lang="scss">

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
@media (min-width: 767.98px) and (max-width: 1280px) {
  .mega-table-dashboard table{
    width: 1200px !important;
  }
}

@media (max-width: 767.98px) {
  .mega-table-dashboard table tr{
    margin-top: 20px;
    -webkit-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
    -moz-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
    box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29); 
    }
}


</style>

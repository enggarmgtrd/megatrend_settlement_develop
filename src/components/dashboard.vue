  
<template>
  <div>
    <navbar></navbar>

    <b-container>
      <b-row class="justify-content-md-center mt-3">
        <b-col cols="12" > 
           <b-card>
            <b-card class="mt-3">
              <b-row align-h="between">
                <b-col cols="8" class="text-right">
                  <b-form-group
                    class="mb-0"
                  >
                    <b-input-group size="md">
                      <b-form-input
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="Cari Data Settlement"
                        style="height: 36px;"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''" class="rounded-0 btn-mega-2" style="height: 36px;"><b-icon icon="search" class="form-icon"></b-icon></b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col cols="4" class="text-right"><b-button class="btn-mega btn-block" @click="addDataSettlement()">Add Form Settlement</b-button></b-col>
              </b-row>

              <!-- Table Dashboard -->
              <b-row class="mt-3">      
                  <b-table responsive :items="dataForm" class="text-center" hover :fields="fieldsTableDashboard" :filter="filter">
                    <template v-slot:cell(no)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template v-slot:cell(fleet)="data">
                      {{ data.item.fleet.no}}
                    </template>
                    <template v-slot:cell(helper)="data">
                      {{ data.item.helper.name}}
                    </template>
                    <template v-slot:cell(costs)="data">
                      {{ data.item.costs[0].amount}}
                    </template>
                    <template v-slot:cell(action)="data">
                      <b-button class="btn-sm btn-mega-3 mr-1 mb-1" @click="editDataSettlement(data.item.id)"><b-icon-pencil></b-icon-pencil></b-button>
                      <b-button class="btn-sm btn-mega-2 mr-1 mb-1" @click="deleteDataSettlement(data.item.id)"><b-icon-trash></b-icon-trash></b-button>
                    </template>                  
                                      
                  </b-table>               
              </b-row>             
            </b-card>
            <!-- END Table Dashboard -->            
           </b-card>
        </b-col>        
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './navbar'
import Swal from 'sweetalert2'
export default {
  components:{
    Navbar
  },
  data(){
    return {
      filter: null,
      sortDesc: false,
      user:'',
      dataForm:[],
      fieldsTableDashboardAdmin: ['no',{key: 'date', sortable: true},'fleet', 'helper', 'mileage', 'emoney_balance','pocket_money', 'costs', 'totalCost', 'action'],
      fieldsTableDashboardSupir: ['no',{key: 'date', sortable: true},'date','fleet', 'helper', 'mileage', 'emoney_balance','pocket_money', 'costs', 'totalCost'],
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
    }  
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

<style scoped>

.navbar{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background: #fff !important;
}

.form-logo{
  width: 10rem;
}

.delete-row{
  color:red;
  font-weight: 800;
  cursor: pointer;
}

</style>

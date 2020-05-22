  
<template>
  <div>
    <navbar></navbar>

    <b-container>
      <b-row class="justify-content-md-center mt-3">
        <b-col cols="12" > 
           <b-card>
            <b-card class="mt-3">
              <b-row align-h="between">
                <b-col cols="6"><h4>Selamat Datang <span>{{user}}</span></h4></b-col>
                <b-col cols="6" class="text-right"><b-button class="btn-mega" @click="goToForm()">Add Form Settlement</b-button></b-col>
              </b-row>

              <!-- Table Dashboard -->
              <b-row class="mt-3">
                <b-col class="table-responsive">
                  <table class="text-center table table-striped table-hovered table-bordered">
                    <thead>
                      <tr>
                        <th  v-for="ftd in fieldsTableDashboard" :key="ftd.index">{{ftd}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="df in dataForm" :key="df.id">
                        <td>{{df.date}}</td>
                        <td>{{df.fleet_id}}</td>
                        <td>{{df.helper_id}}</td>
                        <td>{{df.mileage}}</td>
                        <td>{{df.emoney_balance | currency}}</td>
                        <td>{{df.costs[0].amount | currency}}</td>
                        <td>{{df.pocket_money | currency}}</td>
                        <td>{{df.totalCost | currency}}</td>
                        <td>
                          <b-button class="btn-sm btn-mega-3 mr-1 mb-1" @click="editDataForm(df.id)"><b-icon-pencil></b-icon-pencil></b-button>
                          <b-button class="btn-sm btn-mega-2 mr-1 mb-1" @click="deleteDataForm(dataForm, df.id)"><b-icon-trash></b-icon-trash></b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </b-col>
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
export default {
  components:{
    Navbar
  },
  data(){
    return {
      user:'',
      dataForm:[],
      fieldsTableDashboardSupir: ['Tanggal','Mobil', 'Helper', 'Kilometer Akhir', 'Saldo E-Toll','Total Uang Jalan', 'Uang Jalan', 'Total Biaya', 'Action'],
      fieldsTableDashboardAdmin: ['Tanggal','Supir','Mobil', 'Helper', 'Kilometer Akhir', 'Saldo E-Toll','Total Uang Jalan', 'Uang Jalan', 'Total Biaya', 'Action']
    }
  },

  created(){
      
  },

  mounted() {
    this.loadDataDashboard(),
    this.userData()
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

    loadDataDashboard(){
      let token = window.localStorage.getItem('token')
      let id = window.localStorage.getItem('id')
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      axios.get('https://fleet.megatrend.xyz/api/user/'+id,config).then(res => {
      this.dataForm = res.data.fleet_trips
      console.log(this.dataForm)
      }).catch ((err) => {
      console.log(err);
      })  
    },

    deleteDataForm(dataFoem, id){
      let token = window.localStorage.getItem('token')
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      axios.delete('https://fleet.megatrend.xyz/api/user/'+id, config).then(res =>{
        this.dataForm.splice(id, 1)
        console.log(res)
      });
    },

    editDataForm(index){
      this.$router.push('form-update/'+index)
    },
    
    goToForm(){
      this.$router.push('form')
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

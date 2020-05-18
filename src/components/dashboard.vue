  
<template>
<div class="bg-white"> 
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="fixed-top border-bottom">
      <b-navbar-brand href="#">
        <router-link to="/"><b-img :src="require('../assets/logo-mega-full.png')" fluid alt="Responsive image" class="form-logo"></b-img></router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              {{user}}
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
           <b-dropdown-item  @click="logout()"><b-link>Logout</b-link></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container style="margin-top: 70px;">
      <b-row class="justify-content-md-center">
        <b-col cols="12" > 
           <b-card>
            <b-card class="mt-3">
              <b-row align-h="between">
                <b-col cols="4"><h4>Selamat Datang {{user}}</h4></b-col>
                <b-col cols="3" class="text-right"><b-button variant="warning" @click="goToForm()">Add Form Settlement</b-button></b-col>
              </b-row>

              <!-- Table Dashboard -->
              <b-row class="mt-3">
                <b-col>
                  <table class="table table-striped table-hovered table-bordered">
                    <thead>
                      <tr>
                        <th  v-for="ftd in fieldsTableDashboard" :key="ftd.index">{{ftd}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="df in dataForm" :key="df.index">
                        <td></td>
                        <td>{{df.fleet_id}}</td>
                        <td>{{df.helper_id}}</td>
                        <td>{{df.mileage}}</td>
                        <td>{{df.emoney_balance}}</td>
                        <td>{{df.costs[0].amount}}</td>
                        <td>{{df.pocket_money}}</td>
                        <td>{{df.totalCost}}</td>
                        <td><h4 class="delete-row ml-3" @click="deleteTable(tb.index)">&times;</h4></td>
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
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
      return {
        user: '',
        dataForm:[],
        fieldsTableDashboard: ['Tanggal','Mobil', 'Helper', 'Kilometer Akhir', 'Saldo E-Toll','Total Uang Jalan', 'Uang Makan', 'Total Biaya Parkir', 'Action']
      }
    },

    created(){
       this.checkUserNotLogin()
    },

    mounted() {
      this.userData(),
      this.loadDataDashboard()
    },

    computed: {
      
    },

    methods: {
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
      // -------------------------------------------------
      checkUserNotLogin(){
        if( !window.localStorage.getItem('token')){
          this.$router.push('login'); 
        }
      },
      // -------------------------------------------------
      
      // -------------------------------------------------
      goToForm(){
        this.$router.push('form')
      },
      // -------------------------------------------------

      //-------------------------------------------------- 
      userData(){
        this.user = window.localStorage.getItem('name');
      },
      //--------------------------------------------------

      //--------------------------------------------------
      logout(){ 
        localStorage.clear();
        this.$router.push('login');  
      }
      //--------------------------------------------------
  }
}
</script>

<style scoped>

.bg-white{
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(229,229,229);
  background: linear-gradient(180deg, rgba(229,229,229,1) 0%, rgba(0,36,120,1) 0%, rgba(23,59,143,1) 51%, rgba(85,136,255,1) 100%);
  }

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

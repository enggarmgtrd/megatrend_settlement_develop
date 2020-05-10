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
              User
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
           <b-dropdown-item><b-link to="/">Logout</b-link></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container style="margin-top: 70px;">
      <b-row>
        <b-col></b-col>
        <b-col cols="8">          
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <div v-for="form in forms" :key= "form.index">
          <b-card class="mt-3" v-if ="form.type == 'select'">              
            <b-form-group 
            id="input-group-3" 
            :label="form.label + '*'" 
            label-for="input-3">
              
              <b-form-select
              id="input-3"             
              :options="form.options"
              v-model="form.model"
              required
            >
              <template v-slot:first>
                  <b-form-select-option value="" disabled>--Pilih {{form.label}} --</b-form-select-option>
              </template>

            </b-form-select>
          </b-form-group>
          </b-card>
          <b-card class="mt-3" v-if ="form.type == 'number'">
            <b-form-group
              id="input-group-1"
              :label="form.label + '*'"
              label-for="input-1"
              description=""
            >
              <b-form-input
                id="input-1"
                type="number"
                required
                placeholder=""
              ></b-form-input>
            </b-form-group>
          </b-card>
          <b-card class="mt-3" v-if ="form.type == 'radio'">
            <b-form-group :label="form.label + '*'">
             <div v-for="rit in form.options" :key="rit.index">
                <b-form-radio  name="some-radios" :value="form.options.value">{{rit.name}}</b-form-radio>
             </div>
              
            </b-form-group>
          </b-card>
          </div>

            <b-button type="submit" variant="warning" @click="add()" class="my-3 btn-lg btn-block">Submit</b-button>
          
        </b-col>
        <b-col></b-col>
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
        dataForm:{
          supir:''
        },
        forms: [
          {
            'label': 'Supir ',
            'type' : 'select',
            'model': '',
            'options': []
          },
          {
            'label': 'Mobil ',
            'type' : 'select',
            'options': []
          },
          {
            'label': 'Helper ',
            'type' : 'select',
            'options': []
          },
          {
            'label': 'Kilometer Akhir ',
            'type': 'number'
          },
          {
            'label': 'Total Uang Jalan ',
            'type': 'number'
          },
          {
            'label': 'Jumlah Rit ',
            'type': 'radio',
            'options': []
          },
          {
            'label': 'Uang Makan ',
            'type': 'number'
          },
          {
            'label': 'Jumlah Biaya Parkir ',
            'type': 'number'
          },
          {
            'label': 'Rincian Biaya Parkir ',
            'type': 'number'
          },
          {
            'label': 'Jumlah Biaya Lain-lain ',
            'type': 'number'
          },
          {
            'label': 'Rincian Biaya Lain-lain',
            'type': 'number'
          },
          {
            'label': 'Saldo E-Toll',
            'type': 'number'
          }
        ],
      }
    },

    mounted() {
      this.loadSupirData(),
      this.loadMobilData(),
      this.loadHelperData(),
      this.loadRitData()
    },
    methods: {
    loadSupirData(){
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        this.forms[0].options = res.data //respon dari rest api dimasukan ke helpers
        
        console.log(this.forms[0].options)
        
              
        this.forms[0].options.forEach((element) => {
          element.text = element.name, 
          element.value = element.name
        })
        
      }).catch ((err) => {
        console.log(err);
      })
    },
    loadMobilData(){
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        this.forms[1].options = res.data //respon dari rest api dimasukan ke helpers
        console.log(this.forms[1].options)
        
              
        this.forms[1].options.forEach((element) => {
          element.text = element.name, 
          element.value = element.name
        })
        
      }).catch ((err) => {
        console.log(err);
      })
    },
    loadHelperData(){
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        this.forms[2].options = res.data //respon dari rest api dimasukan ke helpers
        console.log(this.forms[2].options)
        
              
        this.forms[2].options.forEach((element) => {
          element.text = element.name, 
          element.value = element.name
        })
        
      }).catch ((err) => {
        console.log(err);
      })
    },
    loadRitData(){
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        this.forms[5].options = res.data //respon dari rest api dimasukan ke helpers
        console.log(this.forms[5].options)
        
              
        this.forms[5].options.forEach((element) => {
          element.text = element.name, 
          element.value = element.name
        })
        
      }).catch ((err) => {
        console.log(err);
      })
    }
   },
   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-white{
  min-height: 100vh;
  min-width: 100vw;
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
</style>

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

    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">          
          <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
          <b-form >
            <b-card style="margin-top: 4.5rem;">
              <b-form-group id="input-group-3" label="Nama*" label-for="">
                <b-form-select v-model="name" v-on:change="getSelectedItem">
                  <option value="null" disabled>Pilih Salah Satu</option>
                  <option v-for="help in helpers" :key="help.id" v-bind:value="help.value">
                     {{ help.id }} {{ help.name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-3" label="Mobil*" label-for="">
                <b-form-select v-model="cars" v-on:change="getSelectedItem">
                  <option value="null" disabled>Pilih Salah Satu</option>
                  <option v-for="help in helpers" :key="help.id" v-bind:value="help.value">
                     {{ help.id }} {{ help.name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-3" label="Helper*" label-for="">
                <b-form-select v-model="helper" v-on:change="getSelectedItem">
                  <option value="null" disabled>Pilih Salah Satu</option>
                  <option v-for="help in helpers" :key="help.id" v-bind:value="help.value">
                     {{ help.id }} {{ help.name }}
                  </option>
                </b-form-select>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-2" label="Kilometer Akhir*" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.kilometer"
                  required
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-2" label="Total Uang Jalan*" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.uang_jalan"
                  required
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group label="Jumlah Rit*">
                <b-form-radio v-model="form.rit" name="some-radios" value="1">1 Rit</b-form-radio>
                <b-form-radio v-model="form.rit" name="some-radios" value="2">2 Rit</b-form-radio>
                <b-form-radio v-model="form.rit" name="some-radios" value="3">3 Rit</b-form-radio>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-2" label="Uang Makan*" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.uang_makan"
                  required
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-2" label="Jumlah Biaya Parkir*" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.biaya_parkir"
                  required
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-2" label="Rincian Biaya Parkir*" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.rincian_biaya_parkir"
                  required
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-2" label="Jumlah Biaya Lain-lain*" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.kilometer"
                  required
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-2" label="Rincian Biaya Lain-lain*" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.kilometer"
                  required
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-card>
            <b-card class="mt-3">
              <b-form-group id="input-group-2" label="Saldo E-Toll*" label-for="input-2">
                <b-form-input
                  id="input-2"
                  type="number"
                  v-model="form.rincian_biaya_lain"
                  required
                  placeholder="0"
                ></b-form-input>
              </b-form-group>
            </b-card>

            <b-button type="submit" variant="warning" class="my-3 btn-lg btn-block">Submit</b-button>
         </b-form>
          
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
  data() {
      return {
        form: {
          name: null,
          car: null,
          helper: null,
          kilometer: null,
          uang_jalan: null,
          uang_makan: null,
          biaya_parkir: null,
          rincian_biaya_parkir: null,
          biaya_lain: null,
          rincian_biaya_lain: null,
          rit: null

        },
        names: [{ text: 'Pilih salah satu', value: null }, 'Herdi', 'Syukron', 'Roni',],
        cars: [{ text: 'Pilih salah satu', value: null }, 'L300', 'Engkel', 'Dobel',],
        helpers: [],
        show: true
      }
    },
    mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        this.helpers = res.data //respon dari rest api dimasukan ke helpers
        console.log(this.helpers)
      }).catch ((err) => {
        console.log(err);
      })
    }
   }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-white{
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

  
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
      <b-row class="justify-content-md-center">
        <b-col cols="8" >          
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

            <!-- TABLE BIAYA -->
            <b-card class="mt-3" v-if ="form.type =='table'">
              <b-row>
                <b-col class="text-right">
                  <b-button variant="warning" @click="showModal()">Tambah Jumlah Biaya</b-button>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col>
                  <b-table striped hover :items="tableBiaya" :fields="fieldsTableBiaya"></b-table>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-right">
                    <h4>Total Biaya : {{totalBiaya}}</h4>
                </b-col>
              </b-row>
            </b-card>
            <!-- END TABLE BIAYA -->

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
                  <b-form-radio v-model="form.model" name="some-radios" :value="rit.value">{{rit.name}}</b-form-radio>
              </div>
                
              </b-form-group>
            </b-card>

          </div>
            <b-button type="submit" variant="warning" @click="add()" class="my-3 btn-lg btn-block">Submit</b-button>         
        </b-col>

        <!-- MODAL -->
        <div>
          <b-modal ref="tambahJumlahBiaya" hide-footer>
            <template v-slot:modal-title>
              Tambah Jumlah Biaya
            </template>
              <div v-for="formJB in formJumlahBiaya" :key="formJB.index">
                <b-col v-if="formJB.type == 'number'">
                  <b-form-group id="input-group-2" label="Jumlah Biaya" label-for="input-2">
                    <b-form-input
                      id="input-2"
                      type="number"
                      v-model.number="formJB.model"
                      required
                      placeholder="0"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col v-if="formJB.type == 'select'">
                  <b-form-group id="input-group-3" label="Jenis Biaya" label-for="input-3">
                    <b-form-select
                      id="input-3"
                      v-model="formJB.model"
                      :options="formJB.options"
                      required
                      style="width: 100%"
                    >
                    <template v-slot:first>
                        <b-form-select-option value="" disabled>--Pilih Biaya--</b-form-select-option>
                    </template>
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col v-if="formJB.type == 'textArea'">
                  <label>Keterangan:</label>
                  <b-form-textarea
                    id="textarea"
                    label="Keterangan"
                    v-model="formJB.model"
                    placeholder="Keterangan"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
              </b-col>
              </div>
            <b-button class="mt-3 btn-warning" block @click="tambahJumlahBiaya()">Simpan</b-button>
          </b-modal>
        </div>
        <!-- END MODAL -->
        
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
        forms: [
          {
            'label': 'Mobil ',
            'type' : 'select',
            'model': '',
            'options': []
          },
          {
            'label': 'Helper ',
            'type' : 'select',
            'model': '',
            'options': []
          },
          {
            'label': 'Kilometer Akhir ',
            'type': 'number',
            'model': 0
          },
          {
            'label': 'Saldo E-Toll',
            'type': 'number',
            'model': 0
          },
          {
            'label': 'Total Uang Jalan ',
            'type': 'number',
            'model': 0
          },
          {
            'label': 'Jumlah Rit ',
            'type': 'radio',
            'model': 0,
            'options': [
              {
                name: '1',
                value: 1
              },
              {
                name: '2',
                value: 2
              },
              {
                name: '3',
                value: 3
              },
            ]
          },
          {
            'label': 'Uang Makan ',
            'type': 'number',
            'model': 0
          },
          {
            'type': 'table'
          }
        ],
        formJumlahBiaya:[
          {
            'label': 'Jumlah Biaya',
            'type': 'number',
            'model': null
          },
          {
            'label': 'Jenis Biaya ',
            'type' : 'select',
            'model': '',
            'options': [
              {
                'text': 'Biaya Parkir',
                'value': 'Biaya Parkir',
              },
              {
                'text': 'Biaya Lain-lain',
                'value': 'Biaya lain-lain',
              }
            ]
          },
          {
            'label': 'Keterangan',
            'type': 'textArea',
            'model': ''
          }
        ],
        dataForm:{},
        fieldsTableBiaya: ['jenis_biaya', 'jumlah_biaya', 'keterangan'],
        tableBiaya: []
      }
    },

    mounted() {
      this.loadMobilData(),
      this.loadHelperData()
    },

    computed: {
      totalBiaya: function(){

              return this.tableBiaya.reduce(function(total, item){
                return total + item.jumlah_biaya; 
              },0);
            },
    },

    methods: {
      showModal() {
        this.$refs['tambahJumlahBiaya'].show()
      },
    loadMobilData(){
        axios.get('https://fleet.megatrend.xyz/api/coba').then(res => {
        this.forms[0].options = res.data.fleets //respon dari rest api dimasukan ke helpers
        console.log(res.data)
        console.log(this.forms[1].options)
        
              
        this.forms[0].options.forEach((element) => {
          element.text = element.no, 
          element.value = element.id
        })
        
      }).catch ((err) => {
        console.log(err);
      })
    },
    loadHelperData(){
        axios.get('https://fleet.megatrend.xyz/api/coba').then(res => {
        this.forms[1].options = res.data.helpers //respon dari rest api dimasukan ke helpers
        console.log(this.forms[1].options)
        
              
        this.forms[1].options.forEach((element) => {
          element.text = element.name, 
          element.value = element.name
        })
        
      }).catch ((err) => {
        console.log(err);
      })
    },
    add(){
      this.dataForm = {
        mobil : this.forms[0].model,
        helper : this.forms[1].model,
        kilometerAkhir : this.forms[2].model,
        saldoEtoll : this.forms[3].model,
        totalUangJalan : this.forms[4].model,
        jumlahRit : this.forms[5].model,
        uangMakan : this.forms[6].model,
        rincianBiayaParkir : this.forms[7].model,
        jumlahBiayaLain : this.forms[8].model,
        rincianBiayaLain : this.forms[9].model,
        
      }
      return console.log(this.dataForm.jumlahRit)
   },
   tambahJumlahBiaya(){
     this.tableBiaya.push({
       jumlah_biaya: this.formJumlahBiaya[0].model,
       jenis_biaya: this.formJumlahBiaya[1].model,
       keterangan: this.formJumlahBiaya[2].model
     })
     this.formJumlahBiaya[0].model = null
     this.formJumlahBiaya[1].model = ''
     this.formJumlahBiaya[2].model = ''
     console.log(this.tableBiaya)

     return this.$refs['tambahJumlahBiaya'].hide()

   }
   
  }
}
</script>

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

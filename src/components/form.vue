  
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
        <b-col cols="8" >

          <!-- FORM SETTLEMENT -->
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(addForm)">
          <div v-for="form in forms" :key= "form.index">

            <!-- FORM SELECT -->
            <b-card class="mt-3" v-if ="form.type == 'select'">              
              <b-form-group 
                id="input-group-3" 
                :label="form.label + '*'" 
                label-for="input-3">
                <ValidationProvider rules="required" :name="form.label" v-slot="{ classes,errors }" :bails="false">
                  <div class="control" :class="classes">
                    <b-form-select
                      id="input-3"             
                      :options="form.options"
                      v-model="form.model"
                    >
                    <template v-slot:first>
                      <b-form-select-option value="" disabled>--Pilih {{form.label}} --</b-form-select-option>
                    </template>
                    </b-form-select>
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>
            </b-card>
            <!-- FORM SELECT -->

            <!-- FORM INPUT -->
            <b-card class="mt-3" v-if ="form.type == 'number'">
              <b-form-group
                id="input-group-1"
                :label="form.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form.label" v-slot="{ classes,errors }" :bails="false"  v-if="form.label == 'Kilometer Akhir '">
              <!-- Currency without prefix & suffix -->
              <div class="control" :class="classes">
                <currency-input            
                  class="form-control"
                  :class="classes"
                  v-model.number="form.model"
                  :currency="null"
                  locale="de"
                  :distraction-free="false"
                  placeholder="0"
                  :precision="{min: 0,max: 20}"
                />
                <span>{{ errors[0] }}</span>
              </div>
              <!-- END Currency without prefix & suffix -->
              </ValidationProvider>

              <ValidationProvider rules="required" :name="form.label" v-slot="{ classes,errors }" :bails="false"  v-if="form.label != 'Kilometer Akhir '">
              <!-- Currency with prefix & suffix -->
              <div class="control" :class="classes">
                <currency-input v-if="form.label != 'Kilometer Akhir '"
                  class="form-control"
                  v-model.number="form.model"
                  :currency="{prefix:'Rp. ', suffix:null}"
                  locale="de"
                  :distraction-free="false"
                  placeholder="0"
                  :precision="{min: 0,max: 20}"
                />
                <span>{{ errors[0] }}</span>
              </div>
              <!-- END Currency with prefix & suffix -->
               </ValidationProvider>
              </b-form-group>
            </b-card>
            <!-- END FORM INPUT -->
            
            <!-- FORM RADIO -->
            <b-card class="mt-3" v-if ="form.type == 'radio'">
              <b-form-group :label="form.label + '*'">
                <div v-for="rit in form.options" :key="rit.index">
                    <b-form-radio v-model="form.model" name="some-radios" :value="rit.value">{{rit.name}}</b-form-radio>
                </div>
              </b-form-group>
            </b-card>
            <!-- END FORM RADIO -->

            <!-- TABLE BIAYA -->
            <b-card class="mt-3" v-if ="form.type =='table'">

              <b-row>
                <b-col class="text-left py-1">
                  <h4>Table Biaya</h4>
                </b-col>
                <b-col class="text-right">
                  <b-button variant="warning" @click="showModalTambahJumlahBiaya()">Tambah Jumlah Biaya</b-button>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col>
                  <table class="table table-striped table-hovered table-bordered">
                    <thead>
                      <tr>
                        <th  v-for="ftb in fieldsTableBiaya" :key="ftb.index">{{ftb}}</th>
                      </tr>
                    </thead>
                    <tbody v-if="!tableBiaya.length">      
                       <td colspan="4" class=" text-center"><h5>No Data</h5></td>                    
                    </tbody>
                    <tbody>
                      <tr v-for="tb in tableBiaya" :key="tb.index">
                        <td>{{tb.fleet_trip_cost_type_id}}</td>
                        <td>{{tb.amount}}</td>
                        <td>{{tb.description}}</td>
                        <td><h4 class="delete-row ml-3" @click="deleteTable(tb.index)">&times;</h4></td>
                      </tr>
                    </tbody>
                  </table>
                </b-col>
              </b-row>

              <b-row>
                <b-col class="text-right">
                    <h4>Total Biaya : {{totalBiaya | currency}}</h4>
                </b-col>
              </b-row>              
              <b-row v-if="!tableBiayaError">
                <h6 class="pl-3 text-danger">*Table Biaya tidak boleh kosong</h6>
              </b-row>
            </b-card>
            <!-- END TABLE BIAYA -->            
          </div>
            <b-button type="submit" variant="warning" class="my-3 btn-lg btn-block">Submit</b-button> 
            </form>
          </ValidationObserver>   
          <!-- END FORM SETTLEMENT -->     
        </b-col>
        

        <!-- MODAL -->
        <div>
          <b-modal ref="tambahJumlahBiaya" hide-footer>
            <template v-slot:modal-title>
              Tambah Jumlah Biaya
            </template>
            <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(tambahJumlahBiaya)">
              <div v-for="formJB in formJumlahBiaya" :key="formJB.index">
                <b-col v-if="formJB.type == 'number'">
                  <b-form-group id="input-group-2" :label="formJB.label" label-for="input-2">
                    <ValidationProvider rules="required" :name="formJB.label" v-slot="{ classes,errors }" :bails="false" >
                      <!-- Currency with prefix & suffix -->
                      <div class="control" :class="classes">
                        <currency-input
                          class="form-control"
                          v-model.number="formJB.model"
                          :currency="{prefix:'Rp. ',suffix:null}"
                          :distraction-free="false"
                          locale="de"
                          placeholder="0"
                        />
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </b-form-group>
                </b-col>
                <b-col v-if="formJB.type == 'select'">
                  <b-form-group id="input-group-3" label="Jenis Biaya" label-for="input-3">
                    <ValidationProvider rules="required" :name="formJB.label" v-slot="{ classes,errors }" :bails="false">
                      <div class="control" :class="classes">
                        <b-form-select
                          id="input-3"
                          v-model="formJB.model"
                          :options="formJB.options"
                          style="width: 100%"
                        >
                        
                        <template v-slot:first>
                            <b-form-select-option value="" disabled>--Pilih Biaya--</b-form-select-option>
                        </template>
                        </b-form-select>
                        <span>{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
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
            <b-button type="submit" class="mt-3 btn-warning">Simpan</b-button>
            </form>
            </ValidationObserver>
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
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


export default {
    data(){
      return {
        id: 0,
        user: '',
        tableBiayaError: true,
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
            'model': null
          },
          {
            'label': 'Saldo E-Toll',
            'type': 'number',
            'model': null
          },
          {
            'label': 'Total Uang Jalan ',
            'type': 'number',
            'model': null
          },
          {
            'label': 'Jumlah Rit ',
            'type': 'radio',
            'model': null,
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
            'model': null
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
                'value': 1,
              },
              {
                'text': 'Biaya Lain-lain',
                'value':2,
              }
            ]
          },
          {
            'label': 'Keterangan',
            'type': 'textArea',
            'model': ''
          }
        ],

        dataForm:[],

        fieldsTableBiaya: ['Jenis Biaya', 'Jumlah Biaya', 'Keterangan', 'Action'],

        tableBiaya: []
      }
    },

    created(){
       this.checkUserNotLogin()
    },

    mounted() {
      this.loadData(),
      this.userIdData(),
      this.userData()
    },

    computed: {
      //--------------------------------------------------
      totalBiaya: function(){
        return this.tableBiaya.reduce(function(total, item){
          return total + item.jumlah_biaya; 
        },0);
      }
      //--------------------------------------------------
    },

    methods: {
      // -------------------------------------------------
      checkUserNotLogin(){
        if( !window.localStorage.getItem('token')){
          this.$router.push('login'); 
        }
      },
      // -------------------------------------------------

      //-------------------------------------------------- 
      userIdData(){
        this.id = parseInt(window.localStorage.getItem('id'),10);
      },
      userData(){
        this.user = window.localStorage.getItem('name');
      },
      //-------------------------------------------------- 

      //--------------------------------------------------
      showModalTambahJumlahBiaya() {
        this.$refs['tambahJumlahBiaya'].show()
        this.formJumlahBiaya[0].model = null
        this.formJumlahBiaya[1].model = ''
        this.formJumlahBiaya[2].model = ''
      },
      //--------------------------------------------------

      //--------------------------------------------------
      loadData(){
        let token = window.localStorage.getItem('token')
        let id = window.localStorage.getItem('id')
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        axios.get('https://fleet.megatrend.xyz/api/fleet-trip/create?id=' + id,config).then(res => {
          this.forms[0].options = res.data.fleets
          this.forms[1].options = res.data.helpers 
        
          this.forms[0].options.forEach((element) => {
            element.text = element.no, 
            element.value = element.id
          })
              
          this.forms[1].options.forEach((element) => {
            element.text = element.name, 
            element.value = element.id
          })
        console.log(res)
        }).catch ((err) => {
        console.log(err);
        })  
      },
      //--------------------------------------------------

      //Adform
      addForm(){
        // Cek apakah semua form dan table Biaya sudah terisi
        if(this.tableBiaya != ''){

        // Jika berhasil maka:

          // Simpan data ke database
          this.dataForm = {
            fleet_id : this.forms[0].model,
            user_id: this.id,
            helper_id : this.forms[1].model,
            mileage : this.forms[2].model,
            pocket_money : this.forms[4].model,
            emoney_balance : this.forms[3].model,
            costs: this.tableBiaya      
          }

          let token = window.localStorage.getItem('token')
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
          axios.post('https://fleet.megatrend.xyz/api/fleet-trip',this.dataForm, config).then(res=>{
            console.log(res)
          })
          
        
        // Tampilkan Alert Jika data Berhasil Disimpan
          Swal.fire({
          icon: 'success',
          title: 'Data berhasil disimpan',
          showConfirmButton: false,
          timer: 1500
        })


        // Jika data berhasil disimpan, pindahkan halaman ke halaman dashboard
        this.$router.push('dashboard')
        }
  

      // Jika data Gagal disimpan
      else{
        // Rubah state TableBiayaError menjadi false agar tampil notice jika table biaya masih kosong
        this.tableBiayaError = false

        // setelah itu tampilkan Alert Gagal menyimpan Data
        Swal.fire({
          icon: 'error',
          title: 'Data gagal disimpan',
          showConfirmButton: false,
          timer: 1500
        })
      }

      },
      // End Add Form--------------------------------------------------

      //--------------------------------------------------
      tambahJumlahBiaya(){
        this.tableBiaya.push({
          fleet_trip_cost_type_id: this.formJumlahBiaya[1].model,
          amount: this.formJumlahBiaya[0].model,
          description: this.formJumlahBiaya[2].model
        })
        console.log(this.tableBiaya)

        return this.$refs['tambahJumlahBiaya'].hide()

      },
      
      //--------------------------------------------------
      deleteTable(index){
        this.tableBiaya.splice(index,1)
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

<style lang="scss" scoped>

.bg-white{
  width: 100%;
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

.control{
    width: 100%
    span{
      display: block
    }
    input{
      padding: 5px 10px
    }
    &.invalid{
      input, span{
        color: #EB0600;
        font-size: 14px;
      }
      input{
        border: 1px #EB0600 solid
      }
    }
    &.valid{
      input, span{
        color: #045929
      }
      input{
        border: 1px #045929 solid
      }
    }

    select{
      padding: 5px 10px
    }
    &.invalid{
      select, span{
        color: #EB0600;
        font-size: 14px;
      }
      select{
        border: 1px #EB0600 solid
      }
    }
    &.valid{
      select, span{
        color: #045929
      }
      select{
        border: 1px #045929 solid
      }
    }
  }
</style>

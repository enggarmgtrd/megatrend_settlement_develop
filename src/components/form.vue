<template>
  <div>
    <navbar></navbar>

    <b-container>
      <b-row class="justify-content-md-center">
        <b-col lg="8" sm="12">

          <!-- FORM SETTLEMENT -->
          <ValidationObserver ref="form">
            <form @submit.prevent="addForm">
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
                  <b-button class="btn-mega" @click="showModalTambahJumlahBiaya()">Tambah Jumlah Biaya</b-button>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col class="table-responsive">
                  <table class="text-center table table-striped table-hovered table-bordered">
                    <thead>
                      <tr>
                        <th v-for="ftb in fieldsTableBiaya" :key="ftb.index">{{ftb}}</th>
                      </tr>
                    </thead>
                    <tbody v-if="!tableBiaya.length">      
                       <td colspan="4" class=" text-center"><h5>No Data</h5></td>                    
                    </tbody>
                    <tbody>
                      <tr v-for="tb in tableBiaya" :key="tb.index">
                        <td>{{tb.fleet_trip_cost_type_id}}</td>
                        <td>{{tb.amount | currency}}</td>
                        <td>{{tb.description}}</td>
                        <td>
                          <b-button class="btn-sm btn-mega-2" @click="deleteJumlahBiaya(tb.index)"><b-icon-trash-fill></b-icon-trash-fill></b-button>
                        </td>
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
            <b-row>
              <b-col cols="8">
                <b-button type="submit" variant="warning" class="my-3 btn-lg btn-block btn-mega">Submit</b-button> 
              </b-col>
              <b-col cols="4">
                <b-button type="submit" variant="warning" class="my-3 btn-lg btn-mega-2 btn-block" @click="back()">Back</b-button> 
              </b-col>
            </b-row>
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
                          :precision="{min: 0,max: 20}"
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
                  <b-button type="submit" class="mt-3 btn btn-block btn-lg btn-mega">Simpan</b-button>
              </b-col>
              </div>
            
            </form>
            </ValidationObserver>
          </b-modal>
        </div>
        <!-- END MODAL -->
        
      </b-row>
    </b-container>
  </div>

</template>

<script>
import axios from 'axios'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import Navbar from './navbar'

export default {
  components:{
    Navbar
  },
    data(){
      return {
        id: 0,
        idEditForm: parseInt(this.$route.params.dataForm_id, 10),
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
          // {
          //   'label': 'Jumlah Rit ',
          //   'type': 'radio',
          //   'model': null,
          //   'options': [
          //     {
          //       name: '1',
          //       value: 1
          //     },
          //     {
          //       name: '2',
          //       value: 2
          //     },
          //     {
          //       name: '3',
          //       value: 3
          //     },
          //   ]
          // },
          // {
          //   'label': 'Uang Makan ',
          //   'type': 'number',
          //   'model': null
          // },
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
            'options': []
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
       
    },

    mounted() {
      this.loadData(),
      this.userIdData(),
      this.loadDataEdit()
    },

    computed: {
/* ------------------------- Menampilkan Total Biaya pada table ------------------------ */
      totalBiaya(){
        return this.tableBiaya.reduce(function(total, item){
          return total + item.amount; 
        },0);
      }
/* ----------------------- End menampilkan Total Biaya pada table---------------------- */     
    },


    methods: {

/* ------------ Menangkap user id dan merubahnya menjadi integer ------------ */
      userIdData(){
        this.id = parseInt(window.localStorage.getItem('id'),10);
      },
/* ------------ End Menangkap user id dan merubahnya menjadi integer ------------ */
 
      showModalTambahJumlahBiaya() {
        this.$refs['tambahJumlahBiaya'].show()
        this.formJumlahBiaya[0].model = null
        this.formJumlahBiaya[1].model = ''
        this.formJumlahBiaya[2].model = ''
      },
      

/* ------------------ Mengambil data Json untuk form select ----------------- */
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
          this.formJumlahBiaya[1].options = res.data.costTypes
        
          this.forms[0].options.forEach((element) => {
            element.text = element.no, 
            element.value = element.id
          })
              
          this.forms[1].options.forEach((element) => {
            element.text = element.name, 
            element.value = element.id
          })
          this.formJumlahBiaya[1].options.forEach((element) => {
            element.text = element.name,
            element.value = element.id
          })
        // console.log(res)
        }).catch ((err) => {
          console.log(err);
        })  
      },
/* ------------------ End Mengambil data Json untuk form select ----------------- */

loadDataEdit(){
  let token = window.localStorage.getItem('token')
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        axios.get('https://fleet.megatrend.xyz/api/fleet-trip/'+this.idEditForm+'/edit',config).then(res => {
        console.log(res)
        this.forms[0].model = res.data.fleet.id,
        this.forms[1].model = res.data.helper.id,
        this.forms[2].model = res.data.mileage,
        this.forms[3].model = res.data.emoney_balance
        this.forms[4].model = res.data.pocket_money
        this.tableBiaya = res.data.costs
        }).catch ((err) => {
          console.log(err);
        })  
},
      

/* --------------------------- Menyimpan Data Form -------------------------- */
      addForm(){
        
        this.$refs.form.validate().then(success => {
          // Jika Form DAN Table Biaya kosong, GAGALKAN
          if (!success && this.tableBiaya.length == 0) {
            this.tableBiayaError =false
            Swal.fire({
              icon: 'error',
              title: 'Data gagal disimpan',
              showConfirmButton: false,
              timer: 1500
            })         
            return;
          }

          // Jika Form Kosong TAPI Table Biaya ada isinya, GAGALKAN
          else if(!success && this.tableBiaya.length > 0){
            this.tableBiayaError =true
            Swal.fire({
              icon: 'error',
              title: 'Data gagal disimpan',
              showConfirmButton: false,
              timer: 1500
            })
            return;
          }

          // Jika Form ada isinya TAPI Table Biaya Kosong, GAGALKAN
          else if(success && this.tableBiaya.length == 0){
            this.tableBiayaError =false
            Swal.fire({
              icon: 'error',
              title: 'Data gagal disimpan',
              showConfirmButton: false,
              timer: 1500
            })
            return;
          }
          
          else{
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
            console.log(this.dataForm);          
          
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
        });

      },
/* --------------------------- End Menyimpan Data Form -------------------------- */


        /* --------------------------- Menyimpan Data Form -------------------------- */
              updateForm(){
                
                this.$refs.form.validate().then(success => {
                  // Jika Form DAN Table Biaya kosong, GAGALKAN
                  if (!success && this.tableBiaya.length == 0) {
                    this.tableBiayaError =false
                    Swal.fire({
                      icon: 'error',
                      title: 'Data gagal disimpan',
                      showConfirmButton: false,
                      timer: 1500
                    })         
                    return;
                  }
        
                  // Jika Form Kosong TAPI Table Biaya ada isinya, GAGALKAN
                  else if(!success && this.tableBiaya.length > 0){
                    this.tableBiayaError =true
                    Swal.fire({
                      icon: 'error',
                      title: 'Data gagal disimpan',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    return;
                  }
        
                  // Jika Form ada isinya TAPI Table Biaya Kosong, GAGALKAN
                  else if(success && this.tableBiaya.length == 0){
                    this.tableBiayaError =false
                    Swal.fire({
                      icon: 'error',
                      title: 'Data gagal disimpan',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    return;
                  }
                  
                  else{
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
                    axios.patch('https://fleet.megatrend.xyz/api/fleet-trip/'+this.idEditForm,this.dataForm, config).then(res=>{
                      console.log(res)
                    })
                    console.log(this.dataForm);          
                  
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
                });
        
              },
        /* --------------------------- End Menyimpan Data Form -------------------------- */
 
/* --------------------------- Menambah Data Biaya -------------------------- */
      tambahJumlahBiaya(){
        this.tableBiaya.push({
          fleet_trip_cost_type_id: this.formJumlahBiaya[1].model,
          amount: this.formJumlahBiaya[0].model,
          description: this.formJumlahBiaya[2].model
        })
        console.log(this.tableBiaya)
        this.tableBiayaError = true

        return this.$refs['tambahJumlahBiaya'].hide()

      },       
/* --------------------------- End Menambah Data Biaya -------------------------- */

      deleteJumlahBiaya(index){
        this.tableBiaya.splice(index,1)
      },

      back(){
        this.$router.push('dashboard')
      },
      
     
  }
}
</script>

<style lang="scss" scoped>

.navbar{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background: #fff !important;
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

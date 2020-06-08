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
        :opacity= 0.5></loading>
    </div>

    <b-card class="">
      <template v-slot:header>
        <h1 class="mb-0"><b-icon icon="pencil-square"></b-icon> {{titleForm}}</h1>
      </template>
      <ValidationObserver ref="form">
        <form @submit.prevent="addForm" class="mega-form-settlement">
          <b-row>

            <b-col cols="12" lg="6">
              <b-form-group  
                :label="form_mobil.label + '*'" 
                >
                <ValidationProvider rules="required" :name="form_mobil.label" v-slot="{ classes,errors }" :bails="false">
                  <div class="control" :class="classes">
                    <b-form-select
                      id="input-3"             
                      :options="form_mobil.options"
                      v-model="form_mobil.model"
                    >
                    <template v-slot:first>
                      <b-form-select-option value="" disabled>--Pilih {{form_mobil.label}} --</b-form-select-option>
                    </template>
                    </b-form-select>
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="6">
              <b-form-group  
                :label="form_helper.label + '*'" 
                >
                <ValidationProvider rules="required" :name="form_helper.label" v-slot="{ classes,errors }" :bails="false">
                  <div class="control" :class="classes">
                    <b-form-select
                      id="input-3"             
                      :options="form_helper.options"
                      v-model="form_helper.model"
                    >
                    <template v-slot:first>
                      <b-form-select-option value="" disabled>--Pilih {{form_helper.label}} --</b-form-select-option>
                    </template>
                    </b-form-select>
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="4">
              <b-form-group
                id="input-group-1"
                :label="form_mileage.label + '*'"
                label-for="input-1"
                description=""
              >
                <ValidationProvider rules="required" :name="form_mileage.label" v-slot="{ classes,errors }" :bails="false">
                <!-- Currency without prefix & suffix -->
                  <div class="control" :class="classes">
                    <currency-input            
                      class="form-control"
                      :class="classes"
                      v-model.number="form_mileage.model"
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
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="4">
              <b-form-group
                id="input-group-1"
                :label="form_emoney.label + '*'"
                label-for="input-1"
                description=""
              >
                <ValidationProvider rules="required" :name="form_emoney.label" v-slot="{ classes,errors }" :bails="false">
                <!-- Currency with prefix & suffix -->
                <div class="control" :class="classes">
                  <currency-input
                    class="form-control"
                    v-model.number="form_emoney.model"
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
            </b-col>

            <b-col cols="12" lg="4">
              <b-form-group
                id="input-group-1"
                :label="form_pocketMoney.label + '*'"
                label-for="input-1"
                description=""
              >
                <ValidationProvider rules="required" :name="form_pocketMoney.label" v-slot="{ classes,errors }" :bails="false">
                <!-- Currency with prefix & suffix -->
                <div class="control" :class="classes">
                  <currency-input
                    class="form-control"
                    v-model.number="form_pocketMoney.model"
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
            </b-col>

            <b-col cols="12" class="">
              <b-row>
                <b-col class="text-left py-1">
                  <span>Table Biaya *</span>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button variant="primary" class="btn-mega-4 btn" @click="showModalTambahJumlahBiaya()"><b-icon icon="plus"></b-icon>Tambah Jumlah Biaya</b-button>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col class="table-responsive mega-table-biaya">
                  <b-table :items="tableBiaya" class="text-center table-bordered" hover :fields="fieldsTableBiaya" stacked="md" show-empty>
                    <template v-slot:cell(no)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template v-slot:cell(jenis_biaya)="data">
                      {{ data.item.fleet_trip_cost_type_id.name }}
                    </template>
                    <template v-slot:cell(jumlah_biaya)="data">
                      {{ data.item.amount | currency}}
                    </template>
                    <template v-slot:cell(keterangan)="data">
                      {{ data.item.description }}
                    </template>
                    <template v-slot:cell(actions)="data">
                      <b-button class="btn-sm btn-mega-3 mr-1 mb-1" @click="editJumlahBiaya(data.index)"><b-icon-pencil></b-icon-pencil></b-button>
                      <b-button class="btn-sm btn-mega-2 mr-1 mb-1" @click="deleteJumlahBiaya(data.index)"><b-icon-trash></b-icon-trash></b-button>
                    </template>   
                  </b-table>
                  <b-row v-if="!tableBiayaError">
                    <span class="pl-4 mt-1" style="color: #EB0600; font-size: 1.4ren;">*Table Biaya tidak boleh kosong</span>
                  </b-row>
                </b-col>              
              </b-row>

              
              <b-row>
                <b-col class="mega-form-settlement__total,">
                    <h1>Total Biaya : {{totalBiaya | currency}}</h1>
                </b-col>
              </b-row>              
            </b-col>

            <b-col cols="8">
              <b-button type="submit" variant="warning" class="my-3 btn-lg btn-block btn-mega">Simpan</b-button> 
            </b-col>
            <b-col cols="4">
              <b-button type="submit" variant="warning" class="my-3 btn-lg btn-mega-2 btn-block" @click="back()">Kembali</b-button> 
            </b-col>

          </b-row>
        </form>
      </ValidationObserver>

    </b-card>

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
              <label>{{formJB.label}}</label>
              <b-form-group>
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
              <b-button type="submit" class="mt-3 btn btn-block btn-lg btn-mega">Tambahkan</b-button>
          </b-col>
          </div>
        
        </form>
        </ValidationObserver>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// ES6 Modules or TypeScript
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
        titleForm: 'Tambah Data Settlement',
        id: 0,
        driver:'',
        idEditForm: parseInt(this.$route.params.dataForm_id, 10),
        tableBiayaError: true,
        tableBiayaId : 0,
        updateTableBiaya: null,
        isLoading: false,
        fullPage: true,
        form_mobil:{
          'label': 'Mobil ',
          'type' : 'select',
          'model': '',
          'options': []
        },
        form_helper:{
          'label': 'Helper ',
          'type' : 'select',
          'model': '',
          'options': []
        },
        form_mileage:{
            'label': 'Kilometer Akhir ',
            'type': 'number',
            'model': null
        },
        form_emoney:{
            'label': 'Saldo E-Toll ',
            'type': 'number',
            'model': null
        },
        form_pocketMoney:{
            'label': 'Uang Jalan ',
            'type': 'number',
            'model': null
        },
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
            'label': 'Uang Jalan ',
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
            'model': {},
            'options': []
          },
          {
            'label': 'Keterangan',
            'type': 'textArea',
            'model': ''
          }
        ],
        dataForm:[],
        fieldsTableBiaya: ['no','jenis_biaya', 'jumlah_biaya', 'keterangan', 'actions'],
        tableBiaya: []
      }
    },
    created() {
      this.loadData(),
      this.userIdData()
    },
    computed: {
      totalBiaya(){
        return this.tableBiaya.reduce(function(total, item){
          return total + item.amount; 
        },0);
      },
    },
    methods: {
      userIdData(){
        this.id = parseInt(window.localStorage.getItem('id'),10);
        this.driver = window.localStorage.getItem('name')
      },
      
      loadData(){
        this.isLoading = true
        let token = window.localStorage.getItem('token')
        let id = window.localStorage.getItem('id')
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        axios.get('https://fleet.megatrend.xyz/api/fleet-trip/create?id=' + id,config).then(res => {
          console.log(res.data);
          
          this.form_mobil.options = res.data.fleets
          this.form_helper.options = res.data.helpers 
          this.formJumlahBiaya[1].options = res.data.costTypes
          console.log(this.formJumlahBiaya);
          
        
          this.form_mobil.options.forEach((element) => {
            element.text = element.no, 
            element.value = element.id
          })
              
          this.form_helper.options.forEach((element) => {
            element.text = element.name, 
            element.value = element.id
          })
          this.formJumlahBiaya[1].options.forEach((element) => {
            element.text = element.name,
            element.value = {
              id: element.id,
              name: element.name
            }
          })
          setTimeout(() => {
                  this.isLoading = false
          },500)
          this.loadDataEdit()
        // console.log(res)
        }).catch ((err) => {
          console.log(err);
        })  
      },
  
      loadDataEdit(){
        console.log(this.formJumlahBiaya[1].options)
        if(isNaN(this.idEditForm))return
          this.titleForm = 'Edit Data Settlement'
          let token = window.localStorage.getItem('token')
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
          axios.get('https://fleet.megatrend.xyz/api/fleet-trip/'+this.idEditForm+'/edit',config).then(res => {
          console.log(res.data)
          
          this.driver = res.data.user_id
          this.form_mobil.model = res.data.fleet_id,
          this.form_helper.model = res.data.helper.id,
          this.form_mileage.model = res.data.mileage,
          this.form_emoney.model = res.data.emoney_balance
          this.form_pocketMoney.model = res.data.pocket_money

          res.data.costs.forEach((element)=>{
            element.fleet_trip_cost_type_id = this.formJumlahBiaya[1].options.find((option) => {
              return option.id == element.fleet_trip_cost_type_id
            })
          })
          
          this.tableBiaya = res.data.costs
          console.log('cek')
          console.log(this.tableBiaya)
         
          }).catch ((err) => {
            console.log(err.res);
          })  
      },
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
          // // Jika Form ada isinya TAPI Table Biaya Kosong, GAGALKAN
          // else if(success && this.tableBiaya.length == 0){
          //   this.tableBiayaError =false
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'Data gagal disimpan',
          //     showConfirmButton: false,
          //     timer: 1500
          //   })
          //   return;
          // }

          // Jika Total Biaya melebihi uang jalan, GAGALKAN
          else if(this.form_pocketMoney.model < this.totalBiaya){
            Swal.fire(
             'Data gagal disimpan',
             'Total Biaya tidak boleh melebihi Uang Jalan',
             'error'
            )
            return;
          }
          
          else{
            this.isLoading = true
            this.tableBiaya.forEach((element) => {
                element.fleet_trip_cost_type_id = element.fleet_trip_cost_type_id.id
              })
            
            // Simpan data ke database
            this.dataForm = {
              fleet_id : this.form_mobil.model,
              user_id: this.id,
              helper_id : this.form_helper.model,
              mileage : this.form_mileage.model,
              pocket_money : this.form_pocketMoney.model,
              emoney_balance : this.form_emoney.model,
              // driver : this.forms[3].model,
              costs: this.tableBiaya
            }            
            if (isNaN(this.idEditForm)){
                let token = window.localStorage.getItem('token')
                let config = {
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                }
                axios.post('https://fleet.megatrend.xyz/api/fleet-trip',this.dataForm, config).then(res=>{
                  console.log('cek')
                  console.log(res.data)
                  setTimeout(() => {
                      this.isLoading = false
                  },1000)
                  // Tampilkan Alert Jika data Berhasil Disimpan
                  Swal.fire({
                  icon: 'success',
                  title: 'Data berhasil disimpan',
                  showConfirmButton: false,
                  timer: 1500
                })
                // Jika data berhasil disimpan, pindahkan halaman ke halaman dashboard
                this.$router.push('/data-settlement')
                }).catch ((err) => {
                  console.log(err.response);
                }) 
                
            }
            else{
                this.isLoading = true
                this.dataForm.user_id = this.driver
                let token = window.localStorage.getItem('token')
                let config = {
                  headers: {
                    'Authorization': 'Bearer ' + token
                  }
                }
                axios.patch('https://fleet.megatrend.xyz/api/fleet-trip/'+this.idEditForm, this.dataForm, config).then(res=>{
                    console.log(res)
                    setTimeout(() => {
                      this.isLoading = false
                    },1000)
                    // Tampilkan Alert Jika data Berhasil Disimpan
                    Swal.fire({
                      icon: 'success',
                      title: 'Data berhasil disimpan',
                      showConfirmButton: false,
                      timer: 1500
                    })
            
                    // Jika data berhasil disimpan, pindahkan halaman ke halaman dashboard
                    return this.$router.push('/data-settlement')
                }).catch ((err) => {
                    console.log(err);
                  }) 
            }           
          }
        });
      },
      showModalTambahJumlahBiaya() {
        this.$refs['tambahJumlahBiaya'].show()
        this.formJumlahBiaya[0].model = null
        this.formJumlahBiaya[1].model = ''
        this.formJumlahBiaya[2].model = ''
      },
      tambahJumlahBiaya(){
        if(this.updateTableBiaya == null && this.formJumlahBiaya[2].model == ''){
          this.formJumlahBiaya[2].model = 'Tidak ada keterangan'
          this.tableBiaya.push({
          fleet_trip_cost_type_id: this.formJumlahBiaya[1].model,
          amount: this.formJumlahBiaya[0].model,
          description: this.formJumlahBiaya[2].model
         })
         this.tableBiayaId++
         console.log(this.tableBiaya)
        }
        else if(this.updateTableBiaya == null){
          this.tableBiaya.push({
          fleet_trip_cost_type_id: this.formJumlahBiaya[1].model,
          amount: this.formJumlahBiaya[0].model,
          description: this.formJumlahBiaya[2].model
         })
         this.tableBiayaId++
         console.log(this.tableBiaya)
        }
        else{
          this.tableBiaya.splice(this.updateTableBiaya,1, 
          {
            amount:this.formJumlahBiaya[0].model,
            fleet_trip_cost_type_id: this.formJumlahBiaya[1].model,
            description: this.formJumlahBiaya[2].model
          })
          console.log(this.tableBiaya)
          this.updateTableBiaya = null
        }
        
        return this.$refs['tambahJumlahBiaya'].hide()
      },       
      deleteJumlahBiaya(index){
        console.log(index)
        this.tableBiaya.splice(index,1)
      },
      editJumlahBiaya(index){
        this.updateTableBiaya = index
        console.log(index)
        console.log(this.updateTableBiaya)
        console.log(this.formJumlahBiaya[1].model)
        console.log(this.tableBiaya[index].fleet_trip_cost_type_id.id)
        this.$refs['tambahJumlahBiaya'].show()

        this.formJumlahBiaya[0].model = this.tableBiaya[index].amount
        this.formJumlahBiaya[2].model = this.tableBiaya[index].description
        if(isNaN(this.idEditForm)){
          this.formJumlahBiaya[1].model = this.tableBiaya[index].fleet_trip_cost_type_id
        }
        else if(!isNaN(this.idEditForm) && this.tableBiaya[index].fleet_trip_cost_type_id.text.length == 0){
          this.formJumlahBiaya[1].model = this.tableBiaya[index].fleet_trip_cost_type_id
        }
        else{
          this.formJumlahBiaya[1].model = this.tableBiaya[index].fleet_trip_cost_type_id.value
        }
        
      },
      back(){
        this.isLoading = true
        setTimeout(() => {
              this.isLoading = false
        },1000)
        this.$router.push('/data-settlement')
      },
      
     
  }
}
</script>

<style lang="scss">

.mega-form-settlement{
  overflow-y: auto;
  overflow-x: hidden;
}

.mega-table-biaya{
  min-height: 20rem;
}

.modal-body{
  padding: 1rem 0 2rem 0;
}

// @media (min-width: 0px) and (max-width: 576px){
//   .mega-form-settlement {
//     max-height: 56vh;
//   }
// }

// @media (min-width: 576px){
//   .mega-form-settlement {
//     max-height: 75vh;
//   }
// }

// @media (min-width: 768px){
//   .mega-form-settlement {
//     max-height: 82vh;
//   }
// }

// @media (min-width: 1023.98px){
//   .mega-form-settlement {
//     max-height: 77vh;
//   }
// }
// @media (min-width: 1365.98px){
//   .mega-form-settlement {
//     max-height: 71vh;
//   }
// }

// @media (min-width: 1559.98px){
//   .mega-form-settlement {
//     max-height: 79vh;
//   }
// }

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
  @media (max-width: 767.98px) {
  .mega-table-biaya tr{
    margin-top: 20px;
    -webkit-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
    -moz-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
    box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29); 
    }
}

</style>
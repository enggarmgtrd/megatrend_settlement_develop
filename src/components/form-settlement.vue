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

    <data-component :megaCardContentHeader_title="title" :megaCardContentHeader_icon="icon">
        <template v-slot:megaCardContentBody>
            <ValidationObserver ref="form">
                <form @submit.prevent="addForm" class="mega-form-settlement">
                    <b-row>
                        <b-col v-if=" isAdmin == 'true'">
                            <b-form-group  
                            :label="form_driver.label + '*'" 
                            >
                            <ValidationProvider rules="required" :name="form_driver.label" v-slot="{ classes,errors }" :bails="false">
                                <div class="control" :class="classes">
                                <b-form-select
                                    id="input-3"             
                                    :options="form_driver.options"
                                    v-model="form_driver.model"
                                >
                                <template v-slot:first>
                                    <b-form-select-option value="" disabled>--Pilih {{form_driver.label}} --</b-form-select-option>
                                </template>
                                </b-form-select>
                                <span>{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>
                            </b-form-group>
                        </b-col>
                    
                        <b-col>
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

                        <b-col>
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
                    </b-row>
                    
                    <b-row>
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
                </b-row>

                <b-row>
                    <b-col lg="8" class="p-0">
                        <b-col cols="12">
                            <b-form-group
                            id="input-group-1"
                            :label="form_fuel_cost.label + '*'"
                            label-for="input-1"
                            description=""
                            >
                                <currency-input
                                class="form-control"
                                v-model.number="form_fuel_cost.model"
                                :currency="{prefix:'Rp. ', suffix:null}"
                                locale="de"
                                :distraction-free="false"
                                placeholder="0"
                                :precision="{min: 0,max: 20}"
                                />               
                            </b-form-group>
                        </b-col>
                    
                        <b-col cols="12">
                            <b-form-group
                            class="mb-3"
                            id="input-group-1"
                            :label="form_fuel_image.label + '*'"
                            label-for="input-1"
                            description=""
                            >
                        
                            <b-form-file       
                                class="form-control"
                                type="number"
                                
                                @change="fuelImageOnChange"
                                placeholder="Tidak ada foto yang dipilih"
                            >
                            </b-form-file>
                            
                            </b-form-group>
                        </b-col>
                    </b-col>

                    <b-col lg="4">
                        <b-form-group
                            class="mb-3"
                            id="input-group-1"
                            label="Hasil Foto BBM *"
                            label-for="input-1"
                            description=""
                            >
                        
                            <div>
                                <img v-if="urlFuelImage == null && urlFuelImageEdit == null" src="../assets/imagenotavailable.png" class="img-fluid">
                                <img v-else-if="urlFuelImage != null" :src="urlFuelImage" class="img-fluid">
                                <img v-else-if="urlFuelImageEdit != null" :src="urlFuelImageEdit" class="img-fluid">
                            </div>
                        
                        </b-form-group>
                    
                    </b-col>
                </b-row>
                    
                <b-row>
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
                </b-row>
                

                    <b-row>
                        <b-col cols="8">
                            <b-button type="submit" variant="warning" class="my-3 btn-lg btn-block btn-mega">Simpan</b-button> 
                        </b-col>
                        <b-col cols="4">
                            <b-button type="submit" variant="warning" class="my-3 btn-lg btn-mega-2 btn-block" @click="back()">Kembali</b-button> 
                        </b-col>
                    </b-row>

                </form>
            </ValidationObserver>

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

         </template>
    </data-component>
  </div>
</template>

<script>
import axios from 'axios'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import DataComponent from './data-component.vue'
export default {
  components:{
    DataComponent,
    Loading
  },
    data(){
      return {
        title: 'Tambah Data Settlement',
        icon: 'pencil-square',
        isAdmin: window.localStorage.getItem('admin'),
        id: 0,
        driver:'',
        idEditForm: parseInt(this.$route.params.dataForm_id, 10),
        tableBiayaError: true,
        tableBiayaId : 0,
        updateTableBiaya: null,
        isLoading: false,
        fullPage: true,
        urlFuelImage:null,
        urlFuelImageEdit: null,

        form_driver:{
          'label': 'Driver ',
          'type' : 'select',
          'model': '',
          'options': []
        },
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
        form_fuel_cost:{
            'label': 'Uang BBM ',
            'type': 'number',
            'model': null
        },
        form_fuel_image:{
            'label': 'Foto BBM ',
            'type': 'file',
            'model': null
        },
        
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
      this.loadFormDataSettlement(),
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
      
      loadFormDataSettlement(){
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
          
          this.form_driver.options = res.data.drivers
          this.form_mobil.options = res.data.fleets
          this.form_helper.options = res.data.helpers 
          this.formJumlahBiaya[1].options = res.data.costTypes
          console.log(this.formJumlahBiaya);
          
        
          this.form_driver.options.forEach((element) => {
            element.text = element.name, 
            element.value = element.id
          })

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
          this.loadFormDataSettlementEdit()
        // console.log(res)
        }).catch ((err) => {
          console.log(err);
        })  
      },
  
      loadFormDataSettlementEdit(){
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
          
          this.form_driver.model = res.data.user_id
          this.form_mobil.model = res.data.fleet_id,
          this.form_helper.model = res.data.helper.id,
          this.form_mileage.model = res.data.mileage,
          this.form_emoney.model = res.data.emoney_balance
          this.form_pocketMoney.model = res.data.pocket_money
          this.form_fuel_cost.model = parseInt(res.data.fuel_cost)
          this.urlFuelImageEdit = res.data.fuel_image_url

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
            if(this.isAdmin == 'true'){
              this.id = parseInt(this.form_driver.model)
            }
            // let fd = new FormData();
            // fd.append('image', this.form_fuel_image.model, this.form_fuel_image.model.name)
            // console.log(fd)
            this.tableBiaya.forEach((element) => {
                element.fleet_trip_cost_type_id = element.fleet_trip_cost_type_id.id
              })        

            const formData = new FormData();
            formData.append('fleet_id', this.form_mobil.model)
            formData.append('user_id', this.id)
            formData.append('helper_id', this.form_helper.model)
            formData.append('mileage', this.form_mileage.model)
            formData.append('pocket_money', this.form_pocketMoney.model)
            formData.append('emoney_balance', this.form_emoney.model)
            if (this.form_fuel_cost.model != null){
              formData.append('fuel_cost', this.form_fuel_cost.model)
              if(this.form_fuel_image.model != null){
                formData.append('fuel_image', this.form_fuel_image.model)
              }
            }
            formData.append('costs',JSON.stringify(this.tableBiaya))
            if (isNaN(this.idEditForm)){
                let token = window.localStorage.getItem('token')
                let config = {
                  headers: {
                    'Authorization': 'Bearer ' + token,
                  }
                }
                
                axios.post('https://fleet.megatrend.xyz/api/fleet-trip',formData, config).then(res=>{
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
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }

                formData.append('_method', 'patch')
                axios.post('https://fleet.megatrend.xyz/api/fleet-trip/'+this.idEditForm, formData, config).then(res=>{
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
                    console.log(err.response);
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

      fuelImageOnChange(e){
        this.form_fuel_image.model = e.target.files[0]
        this.urlFuelImage = URL.createObjectURL(this.form_fuel_image.model);
        console.log(this.form_fuel_image.model)
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

<style>

</style>
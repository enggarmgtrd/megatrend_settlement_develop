<template>
  <div>

    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="true"
        :is-full-page="fullPage"
        :width=200
        :height=200
        color="#2bb898"
        backgroundColor="#fff"
        :opacity= 0.5></loading>
    </div>

    <b-card>
      <template v-slot:header>
        <h1 class="mb-0"><b-icon icon="pencil-square"></b-icon> {{titleForm}}</h1>
      </template>
      <ValidationObserver ref="form">
        <form @submit.prevent="addForm">
          <b-row>

            <b-col cols="12" lg="4">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                :label="form_namaDepan.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form_namaDepan.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-input        
                  class="form-control"
                  :class="classes"
                  v-model="form_namaDepan.model"
                  :placeholder="form_namaDepan.placeholder + form_namaDepan.label"
                >
                </b-form-input>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="4">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                :label="form_namaBelakang.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form_namaBelakang.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-input        
                  class="form-control"
                  :class="classes"
                  v-model="form_namaBelakang.model"
                  :placeholder="form_namaBelakang.placeholder + form_namaBelakang.label"
                >
                </b-form-input>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="4" class="form-date">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                :label="form_tglLahir.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form_tglLahir.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-datepicker 
                  id="example-datepicker" 
                  v-model="form_tglLahir.model" 
                  class="mb-2"
                  :placeholder="form_tglLahir.placeholder + form_tglLahir.label"
                >
                </b-form-datepicker>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="12" class="form-date">
              <b-form-group
                class="mb-3"
                :label="form_alamatLengkap.label + '*'"
                description="Alamat wajib sesuai KTP"
              >
              <ValidationProvider rules="required" :name="form_alamatLengkap.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-textarea
                  id="textarea-formatter"
                  v-model="form_alamatLengkap.model"
                  :placeholder="form_alamatLengkap.placeholder + form_alamatLengkap.label"
                >
                </b-form-textarea>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-col>

             <b-col cols="12" lg="6">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                :label="form_noHp.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form_noHp.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-input        
                  class="form-control"
                  type="number"
                  :class="classes"
                  v-model="form_noHp.model"
                  :placeholder="form_noHp.placeholder + form_noHp.label"
                >
                </b-form-input>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="6">
              <b-form-group
                class="mb-3"  
                :label="form_jabatan.label + '*'" 
                >
                <ValidationProvider rules="required" :name="form_jabatan.label" v-slot="{ classes,errors }" :bails="false">
                  <div class="control" :class="classes">
                    <b-form-select
                      id="input-3"             
                      :options="form_jabatan.options"
                      v-model="form_jabatan.model"
                    >
                    <template v-slot:first>
                      <b-form-select-option value="" disabled>--Pilih {{form_jabatan.label}} --</b-form-select-option>
                    </template>
                    </b-form-select>
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="6">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                :label="form_fotoProfile.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form_fotoProfile.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-file       
                  class="form-control"
                  type="number"
                  :class="classes"
                  v-model="form_fotoProfile.model"
                  :placeholder="form_fotoProfile.placeholder + form_fotoProfile.label"
                >
                </b-form-file>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="6">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                :label="form_scanKtp.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form_scanKtp.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-file       
                  class="form-control"
                  type="number"
                  :class="classes"
                  v-model="form_scanKtp.model"
                  :placeholder="form_scanKtp.placeholder + form_scanKtp.label"
                >
                </b-form-file>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="6">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                :label="form_username.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form_username.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-input        
                  class="form-control"
                  :class="classes"
                  v-model="form_username.model"
                  :placeholder="form_username.placeholder + form_username.label"
                >
                </b-form-input>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="6">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                :label="form_password.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form_password.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-input        
                  class="form-control"
                  :class="classes"
                  v-model="form_password.model"
                  :placeholder="form_password.placeholder + form_password.label"
                >
                </b-form-input>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
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
        titleForm: 'Tambah Data User',
        id: 0,
        idEditForm: parseInt(this.$route.params.dataForm_id, 10),
        isLoading: false,
        fullPage: true,
        form_namaDepan:{
          'label': 'Nama Depan ',
          'type' : 'text',
          'model': '',
          'placeholder': 'Masukkan '
        },
        form_namaBelakang:{
          'label': 'Nama Belakang ',
          'type' : 'text',
          'model': '',
          'placeholder': 'Masukkan '
        },
        form_tglLahir:{
            'label': 'Tanggal Lahir ',
            'type' : 'date',
            'model': '',
            'placeholder': 'Masukkan '
        },
        form_alamatLengkap:{
          'label': 'Alamat Lengkap ',
          'type' : 'text',
          'model': '',
          'placeholder': 'Masukkan '
        },
        form_noHp:{
          'label': 'Nomor Handphone ',
          'type' : 'text',
          'model': '',
          'placeholder': 'Masukkan '
        },
        form_jabatan:{
          'label': 'Jabatan ',
          'type' : 'select',
          'model': '',
          'options': []
        },
        form_fotoProfile:{
            'label': 'Foto Profil ',
            'model': null,
            'placeholder': 'Masukkan '
        },
        form_scanKtp:{
            'label': 'Scan KTP ',
            'model': null,
            'placeholder': 'Masukkan '
        },
        form_username:{
          'label': 'Username ',
          'type' : 'text',
          'model': '',
          'placeholder': 'Masukkan '
        },
        form_password:{
          'label': 'Password ',
          'type' : 'text',
          'model': '',
          'placeholder': 'Masukkan '
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
      // this.loadData(),
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
      
      // loadData(){
      //   this.isLoading = true
      //   let token = window.localStorage.getItem('token')
      //   let id = window.localStorage.getItem('id')
      //   let config = {
      //     headers: {
      //       'Authorization': 'Bearer ' + token
      //     }
      //   }
      //   axios.get('https://fleet.megatrend.xyz/api/fleet-trip/create?id=' + id,config).then(res => {
      //     console.log(res.data);
          
      //     this.form_mobil.options = res.data.fleets
      //     this.form_helper.options = res.data.helpers 
      //     this.formJumlahBiaya[1].options = res.data.costTypes
      //     console.log(this.formJumlahBiaya);
          
        
      //     this.form_mobil.options.forEach((element) => {
      //       element.text = element.no, 
      //       element.value = element.id
      //     })
              
      //     this.form_helper.options.forEach((element) => {
      //       element.text = element.name, 
      //       element.value = element.id
      //     })
      //     this.formJumlahBiaya[1].options.forEach((element) => {
      //       element.text = element.name,
      //       element.value = {
      //         id: element.id,
      //         name: element.name
      //       }
      //     })
      //     setTimeout(() => {
      //             this.isLoading = false
      //     },500)
      //     this.loadDataEdit()
      //   // console.log(res)
      //   }).catch ((err) => {
      //     console.log(err);
      //   })  
      // },
  
      loadDataEdit(){
        if(isNaN(this.idEditForm))return
          this.titleForm = 'Edit Form Settlement'
          let token = window.localStorage.getItem('token')
          let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
          axios.get('https://fleet.megatrend.xyz/api/fleet-trip/'+this.idEditForm+'/edit',config).then(res => {
          console.log(res.data)
           console.log(this.formJumlahBiaya[1].options)
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
         
          }).catch ((err) => {
            console.log(err);
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
                this.$router.push('/dashboard')
                }).catch ((err) => {
                  console.log(err.response);
                }) 
                
            }
            else{
                this.isLoading = true
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
                    return this.$router.push('/dashboard')
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
        if(this.updateTableBiaya == null){
          this.tableBiaya.push({
          fleet_trip_cost_type_id: this.formJumlahBiaya[1].model,
          amount: this.formJumlahBiaya[0].model,
          description: this.formJumlahBiaya[2].model
         })
         this.tableBiayaId++
         console.log(this.tableBiaya)
        }else{
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
        this.$router.push('/dashboard')
      },
      
     
  }
}
</script>

<style lang="scss">


.mega-table-biaya{
  min-height: 20rem;
}

.modal-body{
  padding: 1rem 0 2rem 0;
}

.form-date{
  button {
    font-weight: 500 !important;
    color: #535a61 !important;
    background: #e9edf1 !important;
    border-radius: 0px !important;
    border: none !important;
  
  
    &:hover{
      background: #d3d3d3!important;
      color: #fff;
      transition: .5s;
      
    }
  }

  .form-control{
    border-radius: 0px !important;
    background: #e9edf1 !important;
    border: 0px !important;
    font-size: 1.4rem !important;

    &.focus{
    outline: 1px solid #2bb898 !important;
    box-shadow: none !important;
    }
  }
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
  @media (max-width: 767.98px) {
  .mega-table-biaya tr{
    margin-top: 20px;
    -webkit-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
    -moz-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
    box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29); 
    }
}

</style>
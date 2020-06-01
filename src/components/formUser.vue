<template>
  <div>
    <navbar></navbar>
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
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col lg="8" sm="12">

          <!-- FORM SETTLEMENT -->
          <ValidationObserver ref="form">
            <form @submit.prevent="addUser">
          <div v-for="form in forms" :key= "form.index">

            <!-- FORM SELECT -->
            <b-card class="mt-3" v-if ="form.type == 'select'">              
              <b-form-group  
                :label="form.label + '*'" 
                >
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
            <b-card class="mt-3" v-if ="form.type == 'text'">
              <b-form-group
                id="input-group-1"
                :label="form.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-input        
                  class="form-control"
                  :class="classes"
                  v-model="form.model"
                  :placeholder="form.placeholder + form.label"
                >
                </b-form-input>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-card>
            <!-- END FORM INPUT -->

            <!-- FORM INPUT Password-->
            <b-card class="mt-3" v-if ="form.type == 'password'">
              <b-form-group
                id="input-group-1"
                :label="form.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-input        
                  class="form-control"
                  :class="classes"
                  :type="form.type"
                  v-model="form.model"
                  :placeholder="form.placeholder + form.label"
                >
                </b-form-input>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-card>
            <!-- END FORM INPUT -->

            <!-- FORM Date -->
            <b-card class="mt-3" v-if ="form.type == 'date'">
              <b-form-group
                id="input-group-1"
                :label="form.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-datepicker 
                id="example-datepicker" 
                v-model="form.model" 
                class="mb-2"
                :placeholder="form.placeholder + form.label"
                >
                </b-form-datepicker>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-card>
            <!-- END FORM Date -->

            <!-- FORM INPUT NUMBER -->
            <b-card class="mt-3" v-if ="form.type == 'number'">
              <b-form-group
                id="input-group-1"
                :label="form.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-input        
                  class="form-control"
                  :class="classes"
                  v-model="form.model"
                  :placeholder="form.placeholder + form.label"
                  :type="form.type"
                >
                </b-form-input>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-card>
            <!-- END FORM NUMBER -->

            <!-- FORM INPUT FILE -->
            <b-card class="mt-3" v-if ="form.type == 'file'">
              <b-form-group
                id="input-group-1"
                :label="form.label + '*'"
                label-for="input-1"
                description=""
              >
              <ValidationProvider rules="required" :name="form.label" v-slot="{ classes,errors }" :bails="false">
              <div class="control" :class="classes">
                <b-form-file
                  v-model="form.model"
                  :placeholder="form.placeholder + form.label"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                <span>{{ errors[0] }}</span>
              </div>
              </ValidationProvider>
              </b-form-group>
            </b-card>
            <!-- END FORM FILE -->
            
            <!-- FORM RADIO -->
            <b-card class="mt-3" v-if ="form.type == 'radio'">
              <b-form-group :label="form.label + '*'">
                <div v-for="rit in form.options" :key="rit.index">
                    <b-form-radio v-model="form.model" name="some-radios" :value="rit.value">{{rit.name}}</b-form-radio>
                </div>
              </b-form-group>
            </b-card>
            <!-- END FORM RADIO -->
          </div>
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
          <!-- END FORM SETTLEMENT -->     
        </b-col>
        
      </b-row>
    </b-container>
  </div>

</template>

<script>
// import axios from 'axios'
// // ES6 Modules or TypeScript
// import Swal from 'sweetalert2'
import Navbar from './navbar'
import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components:{
    Navbar,
    Loading
  },
    data(){
      return {
        id: 0,
        idEditForm: parseInt(this.$route.params.dataForm_id, 10),
        isLoading: false,
        fullPage: true,
        forms: [
          {
            'label': 'Nama Depan ',
            'type' : 'text',
            'model': '',
            'placeholder': 'Masukkan '
          },
          {
            'label': 'Nama Belakang ',
            'type' : 'text',
            'model': '',
            'placeholder': 'Masukkan '
          },
          {
            'label': 'Tanggal Lahir ',
            'type' : 'date',
            'model': '',
            'placeholder': 'Masukkan '
          },
          {
            'label': 'Nomor Handphone ',
            'type' : 'number',
            'model': '',
            'placeholder': 'Masukkan '
          },
          {
            'label': 'Jabatan ',
            'type' : 'select',
            'model': '',
            'options': []
          },
          {
            'label': 'Foto Profil ',
            'type' : 'file',
            'model': null,
            'placeholder': 'Masukkan '
          },
          {
            'label': 'Scan KTP ',
            'type' : 'file',
            'model': null,
            'placeholder': 'Masukkan '
          },
          {
            'label': 'Username ',
            'type' : 'text',
            'model': '',
            'placeholder': 'Masukkan '
          },
          {
            'label': 'Password ',
            'type' : 'password',
            'model': '',
            'placeholder': 'Masukkan '
          }
        ],
      }
    },
    created() {
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
  @media (max-width: 767.98px) {
  .mega-table-biaya tr{
    margin-top: 20px;
    -webkit-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
    -moz-box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29);
    box-shadow: -1px 6px 10px 0px rgba(43, 184, 152, 0.29); 
    }
}

</style>
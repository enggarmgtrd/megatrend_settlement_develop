<template>
  <div class="mega-login">
    <div class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"
        :width=200
        :height=200
        color="#2bb898"
        backgroundColor="#fff"
        :opacity= 0.5>
        </loading>
    </div>
    <b-card class="login-form ">
    <div>
      <b-img :src="require('../assets/logo-mega.png')" fluid alt="Responsive image" class="login-logo"></b-img>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(login)">
    <div class="login-form-input">
      <ValidationProvider rules="required" name="Username" v-slot="{ classes,errors }" :bails="false">
        <div class="control" :class="classes">
          <b-input-group
            id="input-group-1"
            label-for="input-1"
          >      
            <b-form-input
              id="input-1"
              v-model="form.nip"
              type="text"
              placeholder="Masukkan Username"
              v-on:keyup.enter="login()"
            ></b-form-input>
            <b-input-group-prepend is-text>
              <b-icon icon="person-fill" class="form-icon"></b-icon>
            </b-input-group-prepend>       
          </b-input-group>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      <ValidationProvider rules="required" name="Password" v-slot="{ classes,errors }" :bails="false">
        <div class="control" :class="classes">
          <b-input-group
            id="input-group-1"
            label-for="input-1"
          >      
            <b-form-input
              id="input-1"
              v-model="form.password"
              type="password"
              class="mt-3 "
              placeholder="Masukkan Password"
              v-on:keyup.enter="login()"
            ></b-form-input>
            <b-input-group-prepend is-text class="mt-3">
              <b-icon icon="shield-lock-fill" class="form-icon"></b-icon>
            </b-input-group-prepend>       
          </b-input-group>
          <span>{{ errors[0] }}</span>
        </div>
      </ValidationProvider>

      
      <b-button type="submit" class="login-btn btn-block btn-lg mt-3">Login</b-button>
    </div>
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
  data() {
      return {
        form: {
          nip: '',
          password: '',      
        },
        isLoading: false,
        fullPage: true,
        
      }
    },
    created(){
      
      this.checkUserLogin()
    },
    methods: {
     
      checkUserLogin(){
        if( window.localStorage.getItem('token')){
          this.$router.push('/dashboard'); 
        }
      },
      
      login(){
        this.isLoading = true
        axios.post('https://fleet.megatrend.xyz/api/login', this.form).then(res=>{
        console.log(res.data);
        if(res.data.nip == this.form.nip){
          window.localStorage.setItem('token', res.data.token);
          window.localStorage.setItem('id', res.data.id);
          window.localStorage.setItem('name', res.data.name);
          window.localStorage.setItem('admin', res.data.is_admin);
          this.islLoading = false
          Swal.fire({
          icon: 'success',
          title: 'Selamat Bekerja ' + res.data.name,
          showConfirmButton: false,
          timer: 1500
        })
          this.$router.push('/').catch(err => {console.log(err)});
        } else{
          this.isLoading = false
          Swal.fire(
          'Login Gagal !',
          'Username atau password yang kamu masukkan salah !',
          'error'
          )
        }
        })
      }
    }
  }
</script>

<style lang="scss" >
.mega-login{
  width:100vw;
  height: 100vh;
  background: #2bb898;
  background: linear-gradient(180deg, rgba(43,184,152,1) 0%, rgba(53,73,94,1) 100%, rgba(0,212,255,1) 100%);
}
.login-logo{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
}


.login-form{
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 0px !important;
  position: absolute;
  background: #fff;
  width: 35rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 

  .input-group-text{
    background: #eee !important;
    border: none !important;
  }
}

.login-form-input{
  margin-top: 8rem;
}

.login-btn{
  color: #fff;
  font-weight: 500;
  background: rgb(43,184,152);
  background: linear-gradient(-45deg, rgba(43,184,152,1) 0%, rgba(51,95,106,1) 30%, rgba(52,84,100,1) 50%, rgba(53,73,94,1) 70%, rgba(43,184,152,1) 100%)!important;
  border-radius: 0px !important;
  border: none !important;
  -moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  
  &:hover{
     background-position: 358px 0 !important;
    -moz-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
    
  }
  &:focus{
    outline: none;
    box-shadow: none !important;
  }
}

</style>

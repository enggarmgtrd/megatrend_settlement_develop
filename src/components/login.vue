<template>
  <b-card class="login-form ">
    <div>
      <b-img :src="require('../assets/logo-mega.png')" fluid alt="Responsive image" class="login-logo"></b-img>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(login)">
    <div class="login-form-input">
      <b-form-group
        id="input-group-1"
        label="Masukkan Email:"
        label-for="input-1"
      >
       <ValidationProvider rules="required" name="Email" v-slot="{ classes,errors }" :bails="false">
        <div class="control" :class="classes">
        <b-form-input
          id="input-1"
          v-model="form.nip"
          type="text"
          placeholder="Contoh : abc@gmail.com"
          v-on:keyup.enter="login()"
        ></b-form-input>
        <span>{{ errors[0] }}</span>
        </div>
       </ValidationProvider>
      </b-form-group>

      <b-form-group id="input-group-2" label="Massukkan Password" label-for="input-2">
        <ValidationProvider rules="required" name="Password" v-slot="{ classes,errors }" :bails="false">
        <div class="control" :class="classes">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          v-on:keyup.enter="login()"
        ></b-form-input>
        <span>{{ errors[0] }}</span>
        </div>
       </ValidationProvider>
      </b-form-group>
      <b-button type="submit" class="login-btn btn-block btn-lg">Login</b-button>
    </div>
      </form>
    </ValidationObserver>
  </b-card>
</template>

<script>
import axios from 'axios'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
export default {
  data() {
      return {
        form: {
          nip: '',
          password: '',      
        }
        
      }
    },
    created(){
      this.checkUserLogin()
    },
    methods: {
      // -------------------------------------------------
      checkUserLogin(){
        if( window.localStorage.getItem('token')){
          this.$router.push('form'); 
        }
      },
      // -------------------------------------------------
      login(){
        axios.post('https://fleet.megatrend.xyz/api/login', this.form).then(res=>{
        console.log(res.data);
        if(res.data.nip == this.form.nip){
          window.localStorage.setItem('token', res.data.token);
          window.localStorage.setItem('id', res.data.id);
          window.localStorage.setItem('name', res.data.name);
          window.localStorage.setItem('admin', res.data.is_admin);

          Swal.fire({
          icon: 'success',
          title: 'Selamat Bekerja ' + res.data.name,
          showConfirmButton: false,
          timer: 1500
        })
          this.$router.push('dashboard');
        }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.login-logo{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
}


.login-form{
  border-radius: 0px !important;
  position: absolute;
  background: #fff;
  min-height: 20rem;
  width: 25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 

  
}

.login-form-input{
  margin-top: 5rem;
  margin-bottom: .8rem;
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

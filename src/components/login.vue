<template>
  <b-card class="login-form">
    <div>
      <b-img :src="require('../assets/logo-mega-full.png')" fluid alt="Responsive image" class="login-logo"></b-img>
    </div>
    <p class="login-title">Form Settlement Login</p>
    <!-- <b-form @submit="onSubmit" @reset="onReset" class="login-form-input"> -->
    <b-form class="login-form-input">
      <b-form-group
        id="input-group-1"
        label="Masukkan Email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.nip"
          type="email"
          required
          placeholder="Contoh : abc@gmail.com"
          v-on:keyup.enter="login()"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Massukkan Password" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          v-on:keyup.enter="login()"
        ></b-form-input>
      </b-form-group>
      <b-button @click="login()">login</b-button>
      <!-- <router-link to='/form' class="btn login-btn btn-block">Login</router-link> -->
    </b-form>
  </b-card>
</template>

<script>
import axios from 'axios'
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
          this.$router.push('dashboard');
        }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login-logo{
  position: absolute;
  left: 47%;
  transform: translateX(-50%);
  width: 40%;
}

.login-title{
  font-weight: 700;
  position: absolute;
  top: 15.5%;
  left: 56.9%;
  color:#173b8f;
  transform: translateX(-50%);
}

.login-form{
  position: absolute;
  background: #fff;
  min-height: 20rem;
  width: 30rem;
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
  background: rgb(229,229,229);
  background: linear-gradient(45deg, rgba(229,229,229,1) 0%, rgba(0,36,120,1) 0%, rgba(23,59,143,1) 51%);
  transition: .2s;
}

.login-btn:hover{
  background: linear-gradient(45deg, rgba(229,229,229,1) 0%, rgb(1, 29, 95) 0%, rgba(23,59,143,1) 51%);
  
}

</style>

<template>
<div class="bg-white"> 
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
          v-model="form.email"
          type="email"
          required
          placeholder="Contoh : abc@gmail.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Massukkan Password" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <router-link to='/form' class="btn login-btn btn-block">Login</router-link>
    </b-form>
  </b-card>
</div>
</template>

<script>
export default {
  data() {
      return {
        form: {
          email: '',
          name: '',
          
        }
        
      }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-white{
  height: 100vh;
  width: 100vw;
background: rgb(229,229,229);
background: linear-gradient(180deg, rgba(229,229,229,1) 0%, rgba(0,36,120,1) 0%, rgba(23,59,143,1) 51%, rgba(85,136,255,1) 100%);
}
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
  position: relative;
  background: #fff;
  min-height: 20rem;
  width: 30rem;
  top: 30%;
  left: 50%;
  transform: translateX(-50%); 
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

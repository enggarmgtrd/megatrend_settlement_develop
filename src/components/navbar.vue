<template>
    <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="fixed-top border-bottom">
        <b-navbar-brand href="#">
            <router-link to="/"><b-img :src="require('../assets/logo-mega.png')" fluid alt="Responsive image" class="logo"></b-img></router-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            
            <b-navbar-nav class="ml-auto">
            <b-nav-item class="text-mega">
                <b-icon-columns-gap class="text-bold"></b-icon-columns-gap><span class="font-weight-bold"> Scan Barcode</span>
            </b-nav-item>
            <b-nav-item @click="logout()">
                <b-icon-box-arrow-right class="text-bold"></b-icon-box-arrow-right><span class="font-weight-bold"> Logout</span>
            </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data(){
        return{
            user: '',
        }
    },
    created(){
      this.checkUserNotLogin()
    },
    mounted(){
        this.userData()
    },
    methods:{
      checkUserNotLogin(){
        if( !window.localStorage.getItem('token')){
          this.$router.push('login'); 
        }
      },
      logout(){ 
        localStorage.clear();
        this.$router.push('/login');  
      },
      userData(){
        this.user = window.localStorage.getItem('name');
      },
    }
}
</script>

<style lang="scss" scoped>
.logo{
  width: 10rem;
}
.navbar{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background: #fff !important;

  .text-mega .nav-link {
    color:#2bb898 !important;
    transition: .3s;
    &:hover{
      color: #1e816a !important;
    }
  }

  .navbar-toggler{
    border: 0px !important;
    box-shadow: none !important;
    outline: none;
  }
}
</style>
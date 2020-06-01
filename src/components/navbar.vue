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
        :opacity= 0.5>
        </loading>
    </div>
    <b-navbar toggleable="lg" type="light" variant="light" class="fixed-top border-bottom">
        <b-navbar-brand href="#">
            <router-link to="/dashboard"><b-img :src="require('../assets/logo-mega.png')" fluid alt="Responsive image" class="logo"></b-img> </router-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->
            
            <b-navbar-nav class="ml-auto">
              <b-nav-item class="profile">
                <b-img src="https://picsum.photos/300/150/?image=41" class="img-box" fluid rounded alt="Fluid image"></b-img>
                <span> {{user}}</span>
              </b-nav-item>
              <b-nav-item class="profile mr-5 ">
                <span> {{noHp}} | {{status}}</span>
              </b-nav-item>
              <b-nav-item class="text-mega">
                  <router-link to="/form-user"><b-icon-plus class="text-bold"></b-icon-plus><span class="font-weight-bold"> Add User</span></router-link>
              </b-nav-item>
              <b-nav-item class="text-mega">
                  <router-link to="/form-user"><b-icon-columns-gap class="text-bold"></b-icon-columns-gap><span class="font-weight-bold"> Scan Barcode</span></router-link>
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
import Loading from 'vue-loading-overlay';
    // Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components:{
    Loading
  },
    name: 'navbar',
    data(){
        return{
            user: '',
            noHp: '0813-2554-2555',
            status: 'Supir',
            isLoading: false,
            fullPage: true,
        }
    },
    created(){
      this.checkUserNotLogin(),
      this.userData()
    },
    methods:{
      checkUserNotLogin(){
        if( !window.localStorage.getItem('token') && !window.localStorage.getItem('id')){
          this.$router.push('login'); 
        }
      },
      logout(){ 
        this.isLoading = true
        localStorage.clear();
        setTimeout(() => {
            this.isLoading = false
            this.$router.push('/login'); 
        },1000)
         
        
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

  .text-mega .nav-link a{
    color:#2bb898 !important;
    text-decoration: none;
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

  .profile{
    font-weight: bold;
    cursor:default;

    a{
      color: #555;
      cursor:default;
      
      &:hover{
        color: #555;
        
      }
    }
    .img-box{
    width: 24px;
    height: 24px;
  }
  }
  
  @media only screen and (max-width: 991px) {
  .profile .nav-link{
    padding-bottom: 0px !important;
  }
  .profile:nth-child(2) .nav-link{
      padding-top: 0px !important;
      margin-bottom: 20px;
  }
}
}
</style>
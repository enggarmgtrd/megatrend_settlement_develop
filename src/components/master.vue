<template>
<div>
    <div class="vld-parent">
        <loading 
        :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="fullPage"
        :width=200
        :height=200
        color="#2bb898"
        backgroundColor="#fff"
        :opacity= 0.5>
        </loading>
    </div>
    <div class="mega-navbar fixed-top">
        <b-nav>
            <b-navbar-brand href="#">
                    <router-link to="/"><b-img :src="require('../assets/logo-mega.png')" fluid alt="Responsive image" class="mega-logo"></b-img> </router-link>
            </b-navbar-brand>
            <b-navbar-nav class="mega-navbar__link"> 
                <b-nav-item v-if="sidebarVisible == true" @click="sidebarSet()">
                    <b-icon icon="x" class="mega-navbar__icon" scale="1.5"></b-icon>
                </b-nav-item>
                <b-nav-item v-if="sidebarVisible == false" @click="sidebarSet()">
                    <b-icon icon="list" class="mega-navbar__icon" scale="1.5"></b-icon>
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                
                <b-nav-item-dropdown
                    class="mega-logout pt-1"
                    id="my-nav-dropdown"
                    toggle-class="nav-link-custom"
                    no-caret
                >
                <template v-slot:button-content>
                    <div class="media py-0 mr-2">
                        <img src="../assets/profile.jpg" class="mr-3 rounded-circle" height="35" alt="...">
                        <div class="media-body pt-1">
                            <h5 class="my-0 mt-1 text-dark">{{user}} Megatrend</h5>
                            <h6 class="my-0 text-dark">{{user_jabatan}}</h6>
                        </div>
                    </div>
                </template>
                    <b-dropdown-item @click="logout()"><b-icon icon="box-arrow-right"></b-icon> Logout</b-dropdown-item>
                </b-nav-item-dropdown>
              
            
                
            </b-navbar-nav>
        </b-nav>
    </div>

    <div class="mega-sidebar">
    <b-sidebar 
        id="sidebar-1" 
        :visible= "sidebarVisible"
        width="24rem"
        sidebar-class="mega-sidebar"
        no-header
        no-close-on-route-change
    >
      <div class=" py-2">
        <div>
            <div class="mega-sidebar__link mega-sidebar__link-dashboard ">
                Dashboard <b-icon icon ="house-door-fill" class="mega-sidebar__link-icon-dashboard" scale="1.2"></b-icon>
            </div>
            <div v-for ="(sbm, index) in sidebarMenu" :key="index">
                <div class="mega-sidebar__link" v-b-toggle="sbm.id">
                    <b-icon :icon ="sbm.icon" class="mega-sidebar__link-icon" scale="1.2"></b-icon> {{sbm.name}}
                </div>
                <b-collapse :id="sbm.id" v-for="(sb, index) in sbm.options" :key="index">
                    <router-link :to="sb.link" v-if="sb.isAdmin == isAdmin || sb.isDriver == isDriver"> 
                        <b-card class="mega-sidebar__link-collapse" @click="sidebarSetRoute()">
                            <b-icon icon="circle-fill" scale=".3"></b-icon> {{sb.name}}
                        </b-card> 
                    </router-link>
                    <router-link :to="sb.link" v-else-if="sb.isAdmin == isAdmin || sb.isDriver == isDriver"> 
                        <b-card class="mega-sidebar__link-collapse" @click="sidebarSetRoute()">
                            <b-icon icon="circle-fill" scale=".3"></b-icon> {{sb.name}}
                        </b-card> 
                    </router-link>
                </b-collapse>
            </div>
        </div>
      </div>
    </b-sidebar>
  </div>

  <div  :class="{'mega-sidebar-backdrop': sidebarBackdrop == true}" @click ="sidebarSet()"></div>

  <div class="mega-content" :class="{active: !sidebarVisible}">     
    <router-view></router-view>
    <div class="mega-content__logo">
        <img src="../assets/logo-mega.png">
        <h3 class="text-right" style="margin-top: -1rem; margin-right: .5rem;">App ver 2.0</h3>
    </div>
  </div>

  <div class="mega-footer pb-3">
    <h4 class="">Megatrend Settlement App ver 2.0</h4>
  </div>
</div>
    
    
</template>

<script>
import Loading from 'vue-loading-overlay';
export default {
    components:{
        Loading
    },
    data(){
        return{
            user:'',
            user_jabatan:'',
            isLoading: false,
            isAdmin: window.localStorage.getItem('admin'),
            isDriver: window.localStorage.getItem('driver'),
            fullPage: true,
            sidebarRoute: false,
            sidebarVisible: true,
            sidebarBackdrop: false,
            sidebarMenu:[
                {
                    'name': 'Data',
                    'id': 'data',
                    'icon': 'table',
                    'options': [
                        {
                            'name': 'Data Settlement',
                            'link': '/data-settlement',
                            'isAdmin': 'true',
                            'isDriver': 'true'
                        },
                        {
                            'name': 'Data User',
                            'link': '/data-user',
                            'isAdmin': 'true',
                            'isDriver': 'false'
                        }
                    ]
                },
                {
                    'name': 'Tambah Data',
                    'id': 'tambah-data',
                    'icon': 'pencil-square',
                    'options': [
                        {
                            'name': 'Tambah Data Settlement',
                            'link': '/form-settlement',
                            'isAdmin': 'true',
                            'isDriver': 'true'
                        },
                        {
                            'name': 'Tambah Data User',
                            'link': '/form-user',
                            'isAdmin': 'true',
                            'isDriver': 'false'
                        }
                    ]
                },
                {
                    'name': 'Scan Barcode',
                    'id': 'scan-barcode',
                    'icon': 'columns-gap'
                }
            ]
        }
    },
    
    created() {
        this.checkUserNotLogin(),
        this.userData(),
        this.onResize()
    },

    mounted(){
        window.addEventListener('resize', this.onResize)
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },

    methods:{
        
        onResize() {
            if (window.innerWidth < 768) {
                this.sidebarVisible = false
                
            }
            else if(window.innerWidth > 768){
                this.sidebarVisible = true
                this.sidebarBackdrop = false
            }
        },

        sidebarSet(){
            this.sidebarVisible = !this.sidebarVisible
            if (window.innerWidth < 768 ) {
                if(this.sidebarVisible == true){
                    this.sidebarBackdrop = true
                }else {
                    this.sidebarBackdrop = false
                }
            }
        },

        sidebarSetRoute(){
            if(window.innerWidth < 768){
                this.sidebarVisible = false
                this.sidebarBackdrop = false
            } 
            return
        },

        checkUserNotLogin(){
            if( !window.localStorage.getItem('token') && !window.localStorage.getItem('id')){
            this.$router.push('login'); 
            }
        },

        userData(){
            this.user = window.localStorage.getItem('name');
            
            if(window.localStorage.getItem('admin') == 'false'){
                this.user_jabatan = 'Supir'
                
            } else{
                this.user_jabatan = 'Admin'
                console.log(window.localStorage.getItem('admin'))
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
    }
}
</script>

<style lang="scss">


.mega-navbar{
    margin-left: auto;
    background: #fff;
    font-size: 1.6rem;
    height: 5rem;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);

    &__link {
        margin-left: 1.9rem;
        transition: .4s;

        a{
        padding: 1.4rem .5rem 0 .5rem;
        color: #555;
        }
    }

    .mega-logo{
        height: 4rem;
        padding: .2rem 1rem 0 1rem;
        transition: .4s;
    }

    .mega-logout{
        padding: .8rem 1rem;
    }
    
}

.mega-sidebar{
    background: #2bb898;
    background: linear-gradient(180deg, rgba(43,184,152,1) 0%, rgba(53,73,94,1) 100%, rgba(0,212,255,1) 100%);
    

    &__link-dashboard{
        font-size: 1.6rem;
        font-weight: 500;
        margin: 1rem 1rem 1rem 0;
        padding-top: .7rem !important;
        padding-bottom: .7rem !important;
        background: #35495e5a;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;  
    }

    &__link{
        cursor:pointer;
        font-size: 1.4rem;
        position: relative;
        padding: .5rem 1.5rem;
        transition: .2s;
        color: #fff;


        &-icon-dashboard{
            position: absolute;
            top: 26%;
            right: 10%;
            color: #ffffff;
        
        }
        &-icon{
            margin-right: 1rem;
        }

        &-collapse{
            font-size: 1.4rem;
            padding-left: 2.2rem;
            padding-right: 1rem;
            border: none;
            color: #fff;
            background: transparent;
            

            .card-body{
                border-left: 1px solid #fff;
                padding: .5rem 1.6rem;
                border-top-right-radius: .5rem;
                border-bottom-right-radius: .5rem;  
                transition: .2s;
                &:hover{
                    background: rgba(255, 255, 255, 0.1);
                }
                
            }
        }
        
    }    
    
}

.mega-content{
    width: calc(100% - 24rem);
    min-height: calc(100vh - 5rem) !important;
    margin-left: auto;
    top: 5rem;
    position: relative;
    transition: .4s;
    padding: 1.5rem 1.5rem;
    font-size: 1.4rem;

    &.active{
        width: 100%;
        transition: .5s;
    }

    &__logo{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }

    .card{
        z-index: 9;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    }
}

.mega-footer{
    position: fixed;
    bottom: 0;
    background: #e9edf1;
    width: 100%;
    padding: .5rem 0;
    text-align: center;
}

.mega-sidebar-backdrop{
    background: #000;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    min-height: 100vh;
    opacity: .5;
    z-index: 999;
}

// STYLE
.btn-mega{
  color: #fff;
  font-weight: 500 !important;
  background: #2bb898 !important;
  border-radius: 0px !important;
  border: none !important;
  
  
  &:hover{
     background: #1e816a !important;
     color: #fff;
     transition: .5s;
    
  }
  &:focus{
    outline: none;
    box-shadow: none !important;
  }
}

.btn-mega-2{
  color: #fff;
  font-weight: 500 !important;
  background: #ff5e00 !important;
  border-radius: 0px !important;
  border: none !important;
  
  
  &:hover{
     background: #ca4b02 !important;
     color: #fff;
     transition: .5s;
    
  }
  &:focus{
    outline: none;
    box-shadow: none !important;
  }
}

.btn-mega-3{
  color: #fff;
  background: #35495e !important;
  border-radius: 0px !important;
  border: none !important;
  
  
  &:hover{
     background: #2a394b!important;
     color: #fff;
     transition: .5s;
    
  }
  &:focus{
    outline: none;
    box-shadow: none !important;
  }
}

.btn-mega-4{
  color: #535a61 !important;
  background: #e9edf1 !important;
  border-radius: 0px !important;
  border: none !important;
  
  
  &:hover{
     background: #d3d3d3!important;
     color: #fff;
     transition: .5s;
    
  }
  &:focus{
    outline: none;
    box-shadow: none !important;
  }
}
// END STYLE

// Overides
input, select, textarea, .bg-transparent{
    border-radius: 0px !important;
    background: #e9edf1 !important;
    border: 0px !important;
    font-size: 1.4rem !important;

    &:focus{
    outline: 1px solid rgb(43, 184, 152) !important;
    box-shadow: none !important;
    }
}

button, label, ::placeholder{
    font-size: 1.4rem !important;
}

.btn{
    border-radius: 3px !important;
}

.b-sidebar{
    top: 5rem !important;       
}

.card-header{
    background: #fff;
    h1 {
        color: #535a61 !important;
    }
}

.collapse{
    a {
        text-decoration: none;
    }
}

.table{
    color: #535a61 !important;
  }

.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #e9edf11a;
}


.swal2-popup{
    font-size: 1.2rem !important;
}
// END OVERRIDES


@media (max-width: 767.98px) {
  .mega-content{
        min-height: 100vh !important;
    }
  .mega-logo{
        height: 4rem;
        padding: .2rem 1rem 0 1rem !important;
        margin-left: 3.5rem;
  }
  .mega-navbar__link{
      margin-left: -19.2rem !important;
  }
  .mega-content {
      width: 100%;
  }

  .mega-footer{
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }

  .mega-table-biaya{
    min-height: 10rem;
   }
}

</style>
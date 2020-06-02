<template>
<div>
    <div class="mega-navbar fixed-top">
        <b-nav>
            <b-navbar-brand href="#">
                    <router-link to="/dashboard"><b-img :src="require('../assets/logo-mega.png')" fluid alt="Responsive image" class="mega-logo"></b-img> </router-link>
            </b-navbar-brand>
            <b-navbar-nav class="mega-navbar__link"> 
                <b-nav-item v-if="sidebarVisible == true" @click="sidebarVisible = false">
                    <b-icon icon="x" class="mega-navbar__icon" scale="1.5"></b-icon>
                </b-nav-item>
                <b-nav-item v-else @click="sidebarVisible = true">
                    <b-icon icon="list" class="mega-navbar__icon" scale="1.5"></b-icon>
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown
                class="mega-logout"
                id="my-nav-dropdown"
                text="Vidya"
                toggle-class="nav-link-custom"
                >
                    <b-dropdown-item>Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-nav>
    </div>

    <div class="mega-sidebar">
    <b-sidebar 
        id="sidebar-1" 
        shadow="false"
        :visible= "sidebarVisible"
        width="22rem"
        sidebar-class="mega-sidebar"
        no-header
        no-close-on-route-change
    >
      <div class=" py-2">
        <div>
            <div class="mega-sidebar__link mega-sidebar__link-dashboard ">
                Dashboard <b-icon icon ="display-fill" class="mega-sidebar__link-icon-dashboard" scale="1.2"></b-icon>
            </div>
            <div v-for ="(sbm, index) in sidebarMenu" :key="index">
                <div class="mega-sidebar__link" v-b-toggle="sbm.id">
                    <b-icon :icon ="sbm.icon" class="mega-sidebar__link-icon" scale="1.2"></b-icon> {{sbm.name}}
                </div>
                <b-collapse :id="sbm.id" v-for="(sb, index) in sbm.options" :key="index">
                    <router-link :to="sb.link"> <b-card class="mega-sidebar__link-collapse" @click="cardTitle = sb.name"><b-icon icon="circle-fill" scale=".3"></b-icon> {{sb.name}}</b-card> </router-link>
                </b-collapse>
            </div>
        </div>
      </div>
    </b-sidebar>
  </div>
  
  <div class="mega-content" :class="{active: !sidebarVisible}">     
          <router-view></router-view>
  </div>
</div>
    
    
</template>

<script>
export default {
    data(){
        return{
            contentTitle:'',
            cardTitle: '',
            sidebarVisible: true,
            sidebarMenu:[
                {
                    'name': 'Data',
                    'id': 'data',
                    'icon': 'table',
                    'options': [
                        {
                            'name': 'Data Settlement',
                            'link': '/dashboard'
                        },
                        {
                            'name': 'Data User',
                            'link': '/data-user'
                        }
                    ]
                },
                {
                    'name': 'Tambah Data',
                    'id': 'tambah-data',
                    'icon': 'plus-square-fill',
                    'options': [
                        {
                            'name': 'Tambah Data Settlement',
                            'link': '/data-settlement'
                        },
                        {
                            'name': 'Tambah Data User',
                            'link': '/data-user'
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style lang="scss">

.mega-navbar{
    margin-left: auto;
    background: #fff;
    font-size: 1.6rem;
    height: 5rem;

    &__link {
        margin-left: 2.8rem;

        a{
        padding: 1.4rem .5rem;
        color: #555;
        }
    }

    .mega-logo{
        height: 4rem;
        padding: .2rem 1rem 0 1rem;
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
        margin: 1rem 0 1rem 0;
        padding-top: .7rem;
        padding-bottom: .7rem;
        border-top: solid 1px #eee;
        border-bottom: solid 1px #eee;
        background: rgba(53, 73, 94, 0.6);
    }

    &__link{
        cursor:pointer;
        font-size: 1.4rem;
        position: relative;
        padding: .5rem 1rem;
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
            padding-left: 3.5rem;
            padding-right: 1rem;
            border: none;
            color: #fff;
            background: transparent;
            

            .card-body{
                padding: .5rem 0;
                border-radius: .5rem;   
                transition: .2s;
                &:hover{
                    background: rgba(255, 255, 255, 0.1);
                }
                
            }
        }
        
    }    
    
}

.mega-content{
    width: calc(100% - 22rem);
    max-height: calc(100vh - 5rem) !important;
    margin-left: auto;
    top: 5rem;
    position: relative;
    transition: .4s;
    padding: 1.5rem 1.5rem;
    font-size: 1.4rem;

    &.active{
        width: 100%;
        transition: .45s;
    }
}



// Overides
input, select{
    border-radius: 0px !important;
    background: #e9edf1 !important;
    border: 0px !important;
    font-size: 1.4rem !important;

    &:focus{
    outline: none !important;
    box-shadow: none !important;
    }
}

button{
    font-size: 1.4rem !important;
}

.btn{
    border-radius: 3px !important;
}

.b-sidebar{
    top: 5rem !important;       
}

.collapse{
    a {
        text-decoration: none;
    }
}

.table{
    color: #535a61 !important;
  }

</style>
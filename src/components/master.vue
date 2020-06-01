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
        width="25rem"
        sidebar-class="border"
        no-header
    >
      <div class=" py-2">
        <div>
            <div class="mega-sidebar__link">
                Dashboard <b-icon icon="display-fill" class="mega-sidebar__link-icon-dashboard" scale="1.2"></b-icon>
            </div>
            <div class="mega-sidebar__link" v-b-toggle.collapse-3>
                Toggle Collapse
            </div>
            <b-collapse id="collapse-3">
                <b-card>I should start open!</b-card>
            </b-collapse>
        </div>
      </div>
    </b-sidebar>
  </div>
</div>
    
    
</template>

<script>
export default {
    data(){
        return{
            sidebarVisible: true
        }
    }
}
</script>

<style lang="scss">

.mega-navbar{
    margin-left: auto;
    background: #f8f9fa;
    font-size: 1.6rem;
    height: 5rem;

    &__link {
        margin-left: 8rem;

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

    &__link{
        cursor:pointer;
        font-size: 1.6rem;
        margin-top: 1rem;
        position: relative;
        padding: 1rem;
        transition: .2s;

        &:hover{
            background: #2bb898;
            color: #f8f9fa !important;
        }

        &-icon-dashboard{
            position: absolute;
            top: 30%;
            right: 10%;
        }

        &-icon{
            position: absolute;
            top: 30%;
            right: 10%;
            color: #2bb898;
        }
    }
    .b-sidebar{
        top: 5rem !important;       
    }
}

</style>
<template>
  <div id="app" class="bg-mega">
    <router-view />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App'
}
</script>

<style lang="scss">

html{
  font-size: 62.5%;  
}

.bg-mega{
  background: #e9edf1;
  min-height: 100vh;
}
  .card{
    border-radius: 0px !important;
  }


  .text-mega{
  color: #2bb898 !important;
  font-weight: 500 !important;

    &:hover{
     color: #1e816a !important;
    }
  }
  
  

.modal-content{
  border-radius: 0px !important;
}
.close{
  background: none !important;
  color: rgb(53, 73, 94) !important;
  &:hover{
    background: none !important;
  }
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

  .dropdown-menu{
    border: 0px !important;
    box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    border-radius: 0px !important;
    width: 99%;
    top: .2rem!important;
    left: 1.5rem !important;

    .nav-link{
        padding: 0px!important;
      }
    .dropdown-item{
      font-size: 1.4rem;  
      transition: .3s;
      color: #555;
      padding-left: 10px !important;
      
      &:hover{
        background: #2bb898 !important;
        color: #fff !important;
      }

      

      a{
        text-decoration: none;
        color: #555;
        transition: .3s;
        &:hover{
          color: #fff !important;
        }
      }
    }
  }

  .table-bordered{
    border: 0px solid #dee2e6 !important;
  }
  
</style>

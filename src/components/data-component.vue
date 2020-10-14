<template>
  <div>

      <b-card class="mega-card-content">

        <!-- Content Header -->
          <template v-slot:header>
              <div class="d-flex justify-content-between">
                <h1 class="mb-0"><b-icon :icon="megaCardContentHeader_icon"></b-icon> {{megaCardContentHeader_title}}</h1>
                <slot name="megaCardContentHeader_button"></slot>
              </div>
          </template>
        <!-- End Content Header -->

        <!-- Content Body -->
        <slot name="megaCardContentBody"></slot>
        <!-- End Content Body -->

      </b-card>

  </div>
</template>

<script>

export default {
  data(){
    return{
      
    }
  },
  props:{
      megaCardContentHeader_title:{
        type: String,
        default: 'Halaman'
      },
      megaCardContentHeader_icon:{
        type:String,
        default: 'table'
      }
  },
  methods:{

  }
}
</script>

<style lang="scss">
.mega-card-content-line{
    width: 100%;
    border-bottom: 1px solid #d5d5d5;
}
.mega-card-content {
  
  .btn-mega{
    color: #fff;
    font-weight: 500 !important;
    background: #2bb898 !important;
    border-radius: 0px !important;
    border: none !important;
    cursor: default;
    
    
    &:hover{
      background: #2bb898 !important;
      color: #fff;
      transition: .5s;
      
    }
    &:focus{
      outline: none;
      box-shadow: none !important;
    }
  }
}

@media (min-width: 1600px) and (max-width: 2000px) {
  .mega-table-dashboard table{
    min-width: 1280px !important;
  }
}
</style>
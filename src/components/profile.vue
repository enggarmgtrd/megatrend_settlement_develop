<template>
  <div>
    <navbar></navbar>

    <b-container>
      <b-row class="justify-content-md-center mt-3">
        <b-col cols="12" > 
           <b-card>
            <b-card class="mt-3">
                    
            </b-card>
            <!-- END Table Dashboard -->            
           </b-card>
        </b-col>        
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import axios from 'axios'
import Navbar from './navbar'
export default {
  components: {
    Navbar
  },
    
}
</script>

<style scoped>

.navbar{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background: #fff !important;
}

.form-logo{
  width: 10rem;
}

.delete-row{
  color:red;
  font-weight: 800;
  cursor: pointer;
}

</style>

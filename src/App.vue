<template>
  <div id="app" class="bg-white">
    <router-view />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
.bg-white{
  padding: 70px 0 20px 0;
  width: 100%;
  min-height: 100vh;
  background: rgb(229,229,229);
  background: linear-gradient(180deg, rgba(229,229,229,1) 0%, rgba(0,36,120,1) 0%, rgba(23,59,143,1) 51%, rgba(85,136,255,1) 100%);
  }
</style>

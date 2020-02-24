<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 0 auto;
}

@media (max-width: 980px) {
  #app {
    width: 100%;
    margin: 0;
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Home from '@/views/Home.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Home,
    Navbar,
  },
}
</script>

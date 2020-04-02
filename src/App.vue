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
  created: function () {
    // 在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem('umeetCloudVuex') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('umeetCloudVuex'))));
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('umeetCloudVuex', JSON.stringify(this.$store.state))
    })
  }
}
</script>

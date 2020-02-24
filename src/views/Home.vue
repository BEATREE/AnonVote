<template>
  <el-container>
    <Header></Header>
    <el-main style="padding-bottom: 12px;">
      <Carousel></Carousel>
      <h1 style="text-align: center;">投票案例</h1>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <div class="footer">
        © 201677I0944 肖尊严 |
        <a href="https://beatree.cn/" target="_blank">做棵大树</a>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>
.footer {
  text-align: center;
  padding-top: 12px;
  border-top: 1px dashed #0b83f3;
}
.footer a {
  text-decoration: none;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'
import Carousel from '@/components/Carousel.vue'
export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    HelloWorld,
    Navbar,
    Header,
    Carousel,
  },
}
</script>

<template>
  <el-container>
    <Header></Header>
    <el-main style="padding-bottom: 12px;">
      <transition name="homeTransition el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </el-main>
    <el-footer>
      <div class="footer">
        <div class="webinfo">
          <div class="footerLogo">
            <img :src="require('@/assets/img/anonico.png')" alt="AnonVote" />
          </div>
          <div class="footerDesc">
            <div>@ <a href="https://beatree.cn/" style="color: #0c92f3;" target="_blank">Zunyan Xiao 201677I0944</a></div>
            <div>Designed by Zunyan Xiao, developed by Zunyan Xiao</div>
          </div>
        </div>
        
      </div>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.footer {
  padding-top: 12px;
  background-color: #312f38;
  height: 110px;
  color: rgb(228, 227, 227);
  display: flex;
  flex-direction: row;
}
.footer .webinfo {
  float: left;
  height: 110px;
  display: flex;
  flex-direction:row;
  
}
.footerDesc{
  flex-direction: column;
  margin-left: 12px;
  margin-top: 23px;
  div{
    margin-bottom: 8px;
  }
}
.footerLogo {
  margin-left: 20%;
  margin-top: 23px;
  img {
    width: 64px;
  }
}
.footer a {
  text-decoration: none;
  color: rgb(228, 227, 227);
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    HelloWorld,
    Navbar,
    Header,
  },
}
</script>

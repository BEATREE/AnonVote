<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
    >
      <el-menu-item class="hidden-sm-and-down">
        <el-image class="navlogo" :src="navlogo" fit="fill"></el-image>
      </el-menu-item>
      <el-menu-item class="hidden-md-and-up" @click="drawer = true">
        <el-image
          :src="require('@/assets/img/anonico.png')"
          style="height: 43px;width: 43px;"
        ></el-image>
      </el-menu-item>
      <el-menu-item index="index" class="hidden-xs-only">
        首页
      </el-menu-item>
      <el-menu-item index="jump" class="hidden-xs-only">
        认证码直达
      </el-menu-item>
      <el-menu-item index="example" class="hidden-xs-only">
        投票模板
      </el-menu-item>
      <el-menu-item index="about" class="hidden-xs-only">
        关于系统
      </el-menu-item>
      <el-menu-item index="feedback" class="hidden-xs-only">
        建议反馈
      </el-menu-item>

      <el-menu-item class="nav-algolia-right" v-if="logged == ''">
        <!-- <el-autocomplete
          class="inline-input"
          v-model="keyword"
          :fetch-suggestions="querySearch"
          placeholder="搜索投票主题"
          :trigger-on-focus="false"
          prefix-icon="el-icon-search"
        ></el-autocomplete> -->
        <el-button type="primary" round @click="goTo('login')">登录</el-button>
        <el-button round @click="goTo('register')">注册</el-button>
      </el-menu-item>
      <el-menu-item  v-else-if="logged == 'user'" index="user">
        <span style="color: #0a93f3">个人中心</span>
      </el-menu-item>
      <el-menu-item  v-else index="admin">
        <span style="color: #0a93f3">个人中心</span>
      </el-menu-item>

      <!-- <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu> -->
    </el-menu>

    <el-backtop target=".el-menu" :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        UP
      </div>
    </el-backtop>

    <el-drawer
      class="hidden-md-and-up"
      title="AnonVote匿名投票"
      :visible.sync="drawer"
      direction="ltr"
      :show-close="false"
      :router="true"
      size="60%"
    >
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        @select="handleSelect"
        :router="true"
      >
        <el-menu-item index="index" @click="drawer = false">
          首页
        </el-menu-item>

        <el-menu-item index="jump" @click="drawer = false">
          认证码直达
        </el-menu-item>
        <el-menu-item index="example" @click="drawer = false">
          投票模板
        </el-menu-item>
        <el-menu-item index="about" @click="drawer = false">
          关于系统
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      navlogo: require('@/assets/img/anonvotelogo.svg'),
      activeIndex: '/',
      logged: false, // 判断用户是否登录
      drawer: false,
    }
  },

  methods: {
    goTo(word){
      if(word == 'login'){
        this.$router.push('/login');
      }else{
        this.$router.push({
          name: 'Login',
          params:{
            activename: 'second'
          }
        })
      }
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    handleSelect() {},
    dialogLoginVisible() {
      // 显示登录框
    },
    checkLogin(){
      var userToken = this.$store.getters.getUserInfo.token;
      var adminToken = this.$store.getters.getAdminInfo.token;
      if(userToken != null){
        this.logged = 'user'
      }else if(adminToken != null){
        this.logged = 'admin'
      }
    }
  },
  mounted() {
    this.checkLogin();
    this.activeIndex = this.$route.path.substring(1);// 初始化导航栏激活页面
  },
}
</script>

<style scoped>
.navlogo {
  height: 36px;
}
/* 搜索框样式 */
li.el-menu-item.nav-algolia-right {
  border-bottom: 0;
  float: right;
  margin-right: 6%;
}
@media (max-width: 980px) {
  .el-header {
    width: 100%;
  }
  li.el-menu-item.nav-algolia-right {
    border-bottom: 0;
    float: right;
    margin: 0 auto;
  }
}
</style>

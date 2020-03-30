<template>
  <div class="container" id="">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户总量</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="users">前往查看</router-link>
        </el-button>
      </div>
      <h1>{{initInfo.userCount}}</h1>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通知数量</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="messages">前往查看</router-link>
        </el-button>
      </div>
      <h1>{{initInfo.noticeCount}}</h1>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总投票数量</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="topics">前往查看</router-link>
        </el-button>
      </div>
      <h1>{{initInfo.topicCount}}</h1>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进行中的投票</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="topics">前往查看</router-link>
        </el-button>
      </div>
      <h1>{{initInfo.goingTopicCount}}</h1>
    </el-card>
    
  </div>
</template>

<script>
export default {
  name: "AdminIndex", 
  data(){
    return {
      initInfo:{}
    }
  },
  methods:{
    adminInit(){
      var token = this.$store.getters.getAdminInfo.token;
      this.axios.get("user/admininit", {
        headers:{
          token: token
        }
      }).then(response => {
        var res = response.data;
        console.log(res);
        if(res.status == 1){
          this.initInfo = res.data;
        }
      })
    }
  },
  mounted(){
    this.adminInit();
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 23%;
  h1,
  h2,
  h3 {
    margin: 30px;
  }
  h1 {
    font-size: 36px;
  }
}
</style>

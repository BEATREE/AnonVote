<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>消息通知</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <p v-if="initInfo.notices != undefined && initInfo.notices.length > 0">{{initInfo.notices[0].content}}</p>
      <p v-else>暂时没有通知</p>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总投票数量</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <h1>{{initInfo.allTopicCount}}</h1>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进行中的投票</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <h1>{{initInfo.allTopicCount - initInfo.closedTopicCount}}</h1>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>已结束投票</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <h1>{{initInfo.closedTopicCount}}</h1>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserIndex",
  data(){
    return {
      initInfo:{}
    }
  },
  methods:{
    userInit(){
      var token = this.$store.getters.getUserInfo.token;
      this.axios.get("user/userinit", {
        headers:{
          token: token,
        }
      }).then(response => {
          var res = response.data;
          console.log(res);
          if(res.status = 1){
            this.initInfo = res.data;
          }
      })
    }
  },
  created(){
    this.userInit();
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

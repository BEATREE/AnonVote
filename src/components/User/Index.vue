<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>消息通知</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <p>很多愿望，我想要的，上苍都给了我，很快或者很慢地，我都一一地接到了。而我对青春的美的渴望，虽然好象一直没有得到，可是走着走象一直没有得到，可是走着走</p>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总投票数量</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <h1>12</h1>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进行中的投票</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <h1>12</h1>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>已结束投票</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <h1>12</h1>
    </el-card>
  </div>
</template>

<script>
export default {}
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

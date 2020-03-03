<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户总量</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <h1>122</h1>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通知数量</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">前往查看</router-link>
        </el-button>
      </div>
      <h1>2</h1>
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

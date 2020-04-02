<template>
 <div class="bread">
   <div class="example-container">
     <!-- 当前位置： -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item
        v-for="(item,index) in breadList"
        :key="index"
        :to="{ path: item.path }"
      >{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
 </div>
</template>
<script>
export default {
  data () {
    return {
      breadList: [] // 路由集合
    }
  },
  watch:{
    $route(){
      this.getBreadcrumb();
    }
  },
  methods: {
    isHome(route) {
      return route.name === "首页";
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/", meta: { title: "首页" } }].concat(matched);
      }
      this.breadList = matched;
    }
  },
   created() {
    this.getBreadcrumb();
  }
}
</script>
<style scoped>
.bread{
    display: block;
    width: 100%;
    clear: both;
    margin: 6px 0 6px 0;
}
.bread  /deep/ .el-breadcrumb{
  display: inline-block;
  height: 32px;
  vertical-align: top;
}
.bread /deep/ .is-link{
  font-weight: normal;
}
.bread{
  float:left;
}
</style>

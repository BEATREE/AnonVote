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
      <el-menu-item class="hidden-md-and-up">
        <el-image
          :src="require('@/assets/img/anonico.png')"
          style="height: 43px; border-radius: 6px;"
        ></el-image>
      </el-menu-item>
      <el-menu-item index="topics" class="hidden-xs-only">
        全部投票
      </el-menu-item>
      <el-menu-item index="about" class="hidden-xs-only">
        关于系统
      </el-menu-item>
      <el-menu-item class="nav-algolia-search">
        <el-autocomplete
          class="inline-input"
          v-model="keyword"
          :fetch-suggestions="querySearch"
          placeholder="搜索投票主题"
          :trigger-on-focus="false"
          prefix-icon="el-icon-search"
        ></el-autocomplete>
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

    <el-backtop
      target=".el-menu"
      :bottom="100"
    >
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
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      navlogo: require('@/assets/img/anonvotelogo.svg'),
      keyword: '',
      restaurants: [],
      activeIndex: 'topics',
    }
  },

  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号',
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101',
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号',
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号',
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        {
          value: 'Monica摩托主题咖啡店',
          address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F',
        },
      ]
    },
    handleSelect() {},
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
}
</script>

<style scoped>
.navlogo {
  height: 36px;
}
/* 搜索框样式 */
li.el-menu-item:last-child {
  border-bottom: 0;
  float: right;
  margin-right: 6%;
}

@media (max-width: 980px) {
  .el-header {
    width: 100%;
  }
  li.el-menu-item:last-child {
    border-bottom: 0;
    float: right;
    margin: 0 auto;
  }
}
</style>

<template>
  <div id="topicContainer">
    <!-- 首页轮播图 -->
    <Carousel></Carousel>
    <div style="clear: both; display: flex; flex-direction: column;">
      <h1 style="text-align: center;">我们的优势</h1>
      <h2 style="text-align: center;">Our Characteristic</h2>
      <div class="cardContainer">
        <el-card
          class="box-card"
          v-for="item in characteristics"
          :key="item.index"
          style="text-align: center; max-height: 185px;"
        >
          <i :class="'iconfont ' + item.icon" style="margin-top: 12.5px;"></i>
          <h3>{{ item.name }}</h3>
          <span style="line-height:2;">{{ item.desc }}</span>
        </el-card>
      </div>
    </div>
    <div style="clear: both; display: flex; flex-direction: column;">
      <h1 style="text-align: center;">多平台适配</h1>
      <h2 style="text-align: center;">Use in different platforms</h2>
      <div class="cardContainer">
        <!-- <ul class="infinite-list" v-infinite-scroll="moreTopics" infinite-scroll-disabled="disabled" style="padding-bottom: 16px;overflow:auto" >
      <li v-for="topic in topics" :key="topic.index"> -->
        <el-card
          class="box-card"
          v-for="item in platforms"
          :key="item.index"
          style="text-align: center; max-height: 185px;"
          @click.native="redirectTo(item.href)"
        >
          <i :class="'iconfont ' + item.icon" style="margin-top: 12.5px;" ></i>
          <h3>{{ item.name }}</h3>
        </el-card>
        <!-- </li>
    </ul> -->
        <!-- <div style="clear: both; text-align:center;margin: 16px 0 12px 0;">
          <span v-if="loading">加载中...</span>
          <span v-if="noMore">没有更多了</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
export default {
  name: 'Topic',
  data() {
    return {
      platforms: [
        {
          icon: 'icon-windows',
          name: 'Windows',
          href: 'https://anonvote.beatree.cn/AnonVote-win.zip',
        },
        {
          icon: 'icon-linux',
          name: 'Linux',
          href: 'https://anonvote.beatree.cn/AnonVote-linux.zip',
        },
        {
          icon: 'icon-wangzhanguanli',
          name: 'Website',
          href: 'https://anonvote.beatree.cn',
        },
      ],
      characteristics: [
        {
          icon: 'icon-bianji',
          name: '免费使用',
          desc: '无繁琐流程，登录即可使用',
        },
        {
          icon: 'icon-anquan',
          name: '数据加密',
          desc: '存储与运算步骤采用同态加密，保护数据安全',
        },
        {
          icon: 'icon-tuandui',
          name: '主题保密',
          desc: '通过发放唯一认证码，保护投票主题',
        },
      ],
      loading: false,
    }
  },
  computed: {
    // 曾用于实现无限加载
    // noMore() {
    //   return this.topics.length >= 15
    // },
    // disabled() {
    //   return this.loading || this.noMore
    // },
  },
  methods: {
    // 无限加载的方法
    // moreTopics() {
    //   this.loading = true
    //   let temp = {
    //     tid: 0,
    //     tname: '最美程序猿',
    //     tdesc:
    //       '选取附件打开啦的肌肤拉卡决定是否发发打发大沙发的说法打法大沙发的说法考虑',
    //     tdeadline: '2020-05-01',
    //   }
    //   setTimeout(() => {
    //     this.topics.push(temp)
    //     this.topics.push(temp)
    //     this.loading = false
    //   }, 2000)
    // },
    // 跳转到其他网站
    redirectTo(href){
      window.open(href);
    }
  },
  mounted() {
    // window.onscroll = () => {
    //   //变量scrollTop是滚动条滚动时，距离顶部的距离
    //   var scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop
    //   //变量windowHeight是可视区的高度
    //   var windowHeight =
    //     document.documentElement.clientHeight || document.body.clientHeight
    //   //变量scrollHeight是滚动条的总高度
    //   var scrollHeight =
    //     document.documentElement.scrollHeight || document.body.scrollHeight
    //   //滚动条到底部的条件
    //   if (scrollTop + windowHeight == scrollHeight) {
    //     //写后台加载数据的函数
    //     // console.log(
    //     //   '距顶部' + scrollTop + '可视区高度' + windowHeight + '滚动条总高度' + scrollHeight,
    //     // )
    //     if (this.data.disabled) { // disabled == true, 代表仍可以加载
    //       this.moreTopics()
    //     }
    //   }
    // }
  },
  components: {
    Carousel,
  },
}
</script>

<style lang="scss" scoped>
#topicContainer .cardContainer {
  width: 80%;
  margin: 16px auto;
  margin-bottom: 12px;
  // border: 1px solid red;
}
h1,
h2,
h3 {
  margin-bottom: 0px;
}
// 指定图标样式
.iconfont {
  display: inline-block;
  color: #0c8df2;
  font-size: 64px;
  margin: 0 auto;
  // margin: 53px 8px 0 16px;
}
</style>

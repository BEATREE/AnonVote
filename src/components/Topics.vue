<template>
  <div id="topicContainer">
    <!-- <ul class="infinite-list" v-infinite-scroll="moreTopics" infinite-scroll-disabled="disabled" style="padding-bottom: 16px;overflow:auto" >
      <li v-for="topic in topics" :key="topic.index"> -->
    <el-card class="box-card" v-for="topic in topics" :key="topic.index">
      <div slot="header" class="clearfix">
        <span>{{ topic.tname }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">
          <router-link to="about" target="_blank">操作按钮</router-link>
        </el-button>
      </div>
      <p>
        {{ topic.tdesc }}
      </p>
    </el-card>
    <!-- </li>
    </ul> -->
    <div style="clear: both; text-align:center;margin: 16px 0 12px 0;">
      <span v-if="loading">加载中...</span>
      <span v-if="noMore">没有更多了</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topic',
  data() {
    return {
      topics: [
        {
          tid: 0,
          tname: '最美程序猿',
          tdesc:
            '选取附件打开啦的肌肤拉卡决定是否发发打发大沙发的说法打法大沙发的说法考虑',
          tdeadline: '2020-05-01',
        },
        {
          tid: 0,
          tname: '最美程序猿',
          tdesc:
            '选取附件打开啦的肌肤拉卡决定是否发发打发大沙发的说法打法大沙发的说法考虑',
          tdeadline: '2020-05-01',
        },
        {
          tid: 0,
          tname: '最美程序猿',
          tdesc:
            '选取附件打开啦的肌肤拉卡决定是否发发打发大沙发的说法打法大沙发的说法考虑',
          tdeadline: '2020-05-01',
        },
        {
          tid: 0,
          tname: '最美程序猿',
          tdesc:
            '选取附件打开啦的肌肤拉卡决定是否发发打发大沙发的说法打法大沙发的说法考虑',
          tdeadline: '2020-05-01',
        },
        {
          tid: 0,
          tname: '最美程序猿',
          tdesc:
            '选取附件打开啦的肌肤拉卡决定是否发发打发大沙发的说法打法大沙发的说法考虑',
          tdeadline: '2020-05-01',
        },
        {
          tid: 0,
          tname: '最美程序猿',
          tdesc:
            '选取附件打开啦的肌肤拉卡决定是否发发打发大沙发的说法打法大沙发的说法考虑',
          tdeadline: '2020-05-01',
        },
      ],
      loading: false,
    }
  },
  computed: {
    noMore() {
      return this.topics.length >= 15
    },
    disabled() {
      return this.loading || this.noMore
    },
  },
  methods: {
    moreTopics() {
      this.loading = true
      let temp = {
        tid: 0,
        tname: '最美程序猿',
        tdesc:
          '选取附件打开啦的肌肤拉卡决定是否发发打发大沙发的说法打法大沙发的说法考虑',
        tdeadline: '2020-05-01',
      }
      setTimeout(() => {
        this.topics.push(temp)
        this.topics.push(temp)
        this.loading = false
      }, 2000)
    },
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
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 760px) {
  .box-card {
    width: 100%;
  }
}

#topicContainer {
  width: 92%;
  margin: 16px auto;
  margin-bottom: 12px;
  // border: 1px solid red;
}
.box-card {
  width: 31%;
  height: 170px;
  float: left;
  margin-right: 2%;
  margin-top: 16px;
  color: #515a6e;
  border: 1px solid #dcdee2;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}
.box-card .el-card__body {
  padding: 0%;
}

.box-card:hover {
  box-shadow: 0 1px 16px rgba(0, 0, 0, 0.4);
}
// 卡片说明
.box-card p {
  text-indent: 2em;
  margin: 0;
  overflow: hidden;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
  // 添加省略号
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.box-card a {
  color: #5595ff !important;
  text-decoration: none;
}
.box-card a:hover {
  color: #66b1ff;
  text-decoration: none;
}
</style>

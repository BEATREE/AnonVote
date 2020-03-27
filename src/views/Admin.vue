<template>
  <div>
    <el-container>
      <el-aside style="width: inherit">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical hidden-sm-and-down"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :active-text-color="primaryColor"
          router
        >
          <div>
            <img ref="logo" class="logo" :src="logosrc" width="100%" />
          </div>

          <el-menu-item index="/admin/index">
            <i class="el-icon-s-home"></i>
            <span slot="title">管理员首页</span>
          </el-menu-item>
          <el-menu-item index="/admin/addmessage">
            <i class="el-icon-s-home"></i>
            <span slot="title">发布通知</span>
          </el-menu-item>
          <el-menu-item index="/admin/users">
            <i class="el-icon-s-management"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/topics">
            <i class="el-icon-circle-plus"></i>
            <span slot="title">投票管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/messages">
            <i class="el-icon-message-solid"></i>
            <span slot="title">通知管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/profile">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
        </el-menu>

        <el-drawer
          class="hidden-md-and-up"
          title="AnonVote管理员后台"
          :visible.sync="drawer"
          direction="ltr"
          :router="true"
          :show-close="false"
          size="60%"
        >
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            :active-text-color="primaryColor"
            router
            style="width: auto;"
          >
            <el-menu-item index="index" @click="drawer = false">
              <i class="el-icon-s-home"></i>
              <span slot="title">后台首页</span>
            </el-menu-item>
            <el-menu-item index="addmessage" @click="drawer = false">
              <i class="el-icon-circle-plus"></i>
              <span slot="title">发布通知</span>
            </el-menu-item>
            <el-menu-item index="users" @click="drawer = false">
              <i class="el-icon-s-management"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>

            <el-menu-item index="topics" @click="drawer = false">
              <i class="el-icon-circle-plus"></i>
              <span slot="title">投票管理</span>
            </el-menu-item>
            <el-menu-item index="messages" @click="drawer = false">
              <i class="el-icon-message-solid"></i>
              <span slot="title">通知管理</span>
            </el-menu-item>
            <el-menu-item index="profile" @click="drawer = false">
              <i class="el-icon-user-solid"></i>
              <span slot="title">个人资料</span>
            </el-menu-item>
          </el-menu>
        </el-drawer>
      </el-aside>
      <el-container>
        <el-header class="header" :style="{ 'background-color': primaryColor }">
          <i
            :class="switchIcon + ' hidden-sm-and-down'"
            @click="reverseColl"
            style="font-size: 32px;margin:14px 0 0 8px;"
          ></i>
          <i
            class="el-icon-menu hidden-md-and-up"
            style="font-size: 32px;margin:14px 0 0 8px;"
            @click="drawer = true"
          ></i>
          <ul class="header-operations">
            <li class="hidden-sm-and-down">
              <el-select
                v-model="primaryColor"
                placeholder="更换主题"
                style="width:160px;"
              >
                <el-option
                  v-for="item in colors"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
              <!-- <el-color-picker v-model="primaryColor"></el-color-picker> -->
            </li>
            <li>
              <el-tooltip
                class="item"
                effect="dark"
                content="个人资料"
                placement="bottom"
                transition="el-zoom-in-top"
                slot="reference"
              >
                <!-- 选项头像 -->
                <el-avatar
                  :size="40"
                  v-if="userInfo.uhead != '' && userInfo.uhead != null"
                  :src="userInfo.uhead"
                ></el-avatar>
                <el-avatar :size="40" v-else>
                  {{ userInfo.uname.substring(0, 1) }}
                </el-avatar>
              </el-tooltip>
            </li>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <li>
              <!-- 退出账号 -->
              <el-popover
                placement="bottom"
                width="160"
                trigger="click"
                v-model="popovervisible"
              >
                <p>确定退出当前账号吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="popovervisible = false"
                  >
                    取消
                  </el-button>
                  <el-button type="primary" size="mini" @click="logout">
                    确定
                  </el-button>
                </div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="安全退出"
                  placement="bottom"
                  transition="el-zoom-in-top"
                  slot="reference"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-switch-button"
                    circle
                  ></el-button>
                </el-tooltip>
              </el-popover>
            </li>
          </ul>
        </el-header>
        <el-main>
          <transition name="el-zoom-in-center">
            <router-view></router-view>
          </transition>
        </el-main>
        <el-footer style="padding-left: 12px;">
          Developed by Zunyan Xiao. All rights reserved.
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      logosrc: require('@/assets/img/cover.png'),
      isCollapse: false,
      drawer: false,
      primaryColor: '#bbe6d6', // 主题颜色
      currentTheme: '', // 主题颜色
      colors: [],
      popovervisible: false, // 设置确认框
      isActive: '',
      switchIcon: 'el-icon-s-fold', // 控制图标的样式
      userInfo: {},
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // 子列表展开
      // console.log(key, keyPath);
      this.getLists()
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
      this.getLists()
    },
    // 更改左侧导航栏合并
    reverseColl() {
      // 更改开合状态
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        // 左侧导航已合上
        this.switchIcon = 'el-icon-s-unfold'
        this.logosrc = require('@/assets/img/anonico.png')
      } else {
        this.switchIcon = 'el-icon-s-fold'
        this.logosrc = require('@/assets/img/cover.png')
      }
    },

    // 设置主题颜色
    setPrimaryColor() {
      this.primaryColor = this.$store.getters.getPrimaryColor
    },

    // 初始化所有主题颜色
    setThemeColors() {
      this.colors = this.$store.getters.getThemeColors
    },

    // 登录拦截器
    checkLogin() {
      var loginStatus = localStorage.getItem('currentAdmin') || false
      if (!loginStatus) {
        this.$router.push('/login')
      } else {
        this.showNotify()
      }
    },
    // 显示通知消息
    showNotify() {
      this.$notify({
        iconClass: 'el-icon-s-opportunity',
        title: '网站通知',
        message: '退出系统请点击右上角按钮"安全退出"',
        position: 'bottom-right',
      })
    },
    getAdminInfo(){
      this.userInfo = this.$store.getters.getAdminInfo;
    },
    // 退出系统
    logout() {
      localStorage.removeItem('currentAdmin')
      localStorage.removeItem('adminInfo')
      // 清除仓储中的信息
      this.$store.commit("clearAdminInfo");
      this.$router.push('/login')
    },
  },
  watch: {
    currentTheme(newVal, oldVal) {
      this.primaryColor = newVal
    },
    primaryColor(newVal, oldVal) {
      this.$store.commit('changePrimaryColor', newVal)
    },
  },
  created() {
    this.checkLogin() // 判断是否登录
    this.setThemeColors()
    this.isActive = this.$route.path.split('/')[
      this.$route.path.split('/').length - 1
    ]
    this.setPrimaryColor()
    this.getAdminInfo();       // 获取用户信息
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  padding: 15px;
}
.header {
  vertical-align: middle;
  ul {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    float: right;
    li {
      &:last-child {
        //   border-left: 2px dashed rgb(63, 60, 60);
        margin-right: 22px;
      }
      margin-left: 22px;
    }
  }
}

.el-menu-vertical {
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  min-height: 100vh;
}
</style>

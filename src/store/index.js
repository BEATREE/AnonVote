import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 读取本地用户设置
var initColor = JSON.parse(localStorage.getItem('primaryColor')) || "#409eff";
var initUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
var initAdminInfo = JSON.parse(localStorage.getItem('adminInfo')) || {};
// 访问认证模块
const verification = {
  state: {
    verified: false, // 是否拥有认证码
    effective: false, // 验证码是否有效
  },
  mutations: {
    setVerifiedStatus(state, verifiedStatus) {
      state.verified = verifiedStatus;
    },
    setEffectiveStatus(state, effectiveStatus) {
      state.effective = effectiveStatus;
    }
  },
  getters: {
    getVerified(state) {
      return state.verified;
    },
    getEffective(state) {
      return state.effective;
    }
  }
}

const targetTopic = {
  state: {
    topicId: '',        //投票主题id
    topicName: '',      // 投票主题名称
    topicDesc: '',      //投票主题描述
    sponsor: '',        // 投票主题发起人
    options: [],        //投票相关选项
    participantName: '',//投票人名称
  },
  mutations: {
    setTopicId(state, id) {
      state.topicId = id;
    },
    setTopicName(state, name) {
      state.topicName = name;
    },
    setTopicDesc(state, desc) {
      state.topicDesc = desc
    },
    setSponsor(state, name) {
      state.sponsor = name;
    },
    setOptions(state, options) {
      for (var i = 0; i < options.length; i++) {
        state.options[i] = options[i];
      }
    },
    setParticipantName(state, name) {
      state.participantName = name;
    }
  },
  getters: {
    //获取state仓储中的数据
    getTopicId(state) {
      return state.topicId;
    },
    getTopicName(state) {
      return state.topicName;
    },
    getTopicDesc(state) {
      return state.topicDesc;
    },
    getSponsor(state) {
      return state.sponsor;
    },
    getOptions(state) {
      return state.options;
    },
    getParticipantName(state) {
      return state.participantName;
    }
  }
}

export default new Vuex.Store({
  state: {
    logged: false,
    userInfo: initUserInfo,
    adminInfo: initAdminInfo,
    primaryColor: initColor,  // 当前主题颜色
    themeColors: [{
      value: '#409eff',
      label: '主题蓝'
    }, {
      value: '#40FFDF',
      label: '荧光绿'
    }, {
      value: '#BC40FF',
      label: '高贵紫'
    }, {
      value: '#E6A23C',
      label: '活力橙'
    }],
  },
  mutations: {
    changePrimaryColor(state, newColor) {
      state.primaryColor = newColor;
      // console.log(JSON.stringify(state.primaryColor))
      localStorage.setItem('primaryColor', JSON.stringify(state.primaryColor));
    },
    // 设置用户信息
    setUserInfo(state, userInfo){
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    // 设置管理员信息
    setAdminInfo(state, adminInfo){
      state.adminInfo = adminInfo;
      localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
    },
    // 清除用户信息
    clearUserInfo(state){
      state.userInfo = {}
    },
    // 清除管理员信息
    clearAdminInfo(state){
      state.adminInfo = {}
    }
  },
  actions: {
  },
  modules: {
    verification: verification,
    targetTopic: targetTopic,
  },
  getters: {
    getLoginStatus(state) {    // 返回当前登录状态
      return state.logged;
    },
    getPrimaryColor(state) {   // 返回选用的主题颜色
      return state.primaryColor;
    },
    getThemeColors(state) {    // 返回所有主题颜色
      return state.themeColors;
    },
    getUserInfo(state){       // 返回用户信息
      return state.userInfo;
    },
    getAdminInfo(state){      // 返回管理员信息
      return state.adminInfo;
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var initUserInfo = JSON.parse(localStorage.getItem('userinfo')) || {
  uid: "", // user id
  uname: "", // 用户名称
  uhead: "", // 用户头像
  uemail: "",//用户邮箱

};
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
    setTopicId(state, id){
      state.topicId = id;
    },
    setTopicName(state, name){
      state.topicName = name;
    },
    setTopicDesc(state, desc){
      state.topicDesc = desc
    },
    setSponsor(state, name){
      state.sponsor = name;
    },
    setOptions(state, options){
      for(var i=0; i < options.length; i++){
        state.options[i] = options[i];
      }
    },
    setParticipantName(state, name){
      state.participantName = name;
    }
  },
  getters: {
    //获取state仓储中的数据
    getTopicId(state){
      return state.topicId;
    },
    getTopicName(state){
      return state.topicName;
    },
    getTopicDesc(state){
      return state.topicDesc;
    },
    getSponsor(state){
      return state.sponsor;
    },
    getOptions(state){
      return state.options;
    },
    getParticipantName(state){
      return state.participantName;
    }
  }
}

export default new Vuex.Store({
  state: {
    logged: false,
    userInfo: initUserInfo,

  },
  mutations: {

  },
  actions: {
  },
  modules: {
    verification: verification,
    targetTopic: targetTopic,
  },
  getters: {
    getLoginStatus(state) {
      return state.logged;
    },
  }
})

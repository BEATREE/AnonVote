import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var initUserInfo = JSON.parse(localStorage.getItem('userinfo')) || {
  uid: "", // user id
  uname: "", // 用户名称
  uhead: "", // 用户头像
  uemail: "",//用户邮箱

};

export default new Vuex.Store({
  state: {
    logged: false,
    userInfo: {},

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getLoginStatus(state){
      return state.logged;
    }
  }
})

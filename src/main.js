import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import '@/assets/styles/addition.scss';
import moment from 'moment';


Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8088/api/'     // 开发环境下的api
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;  //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// var userToken = store.getters.getUserInfo.token;
// var adminToken = store.getters.getAdminInfo.token;
// var token = userToken;
// // 若存在管理员token，则使用管理员token
// if (adminToken != null){
//   token = adminToken;
// }
// axios.defaults.headers = {
//   "token": token
// }
Vue.prototype.axios = axios;

// 无限滚动组件
var infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll)
Vue.use(Element);

Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
  // if(dataStr != null){
  //   return moment(dataStr).format(parent);
  // }else{
  //   return "今天";
  // }
  return moment(dataStr).format(pattern);
})
// router.beforeEach((to, from, next) => {

//   // 判断路由是否需要验证权限
//   if (to.meta.requireAuth) {
//     if (store.getters.getVerified){
//       next();
//     }else if(store.getters.getEffective){
//       next();
//     }else{
//       next({
//         path: '/',
//         query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }else{
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import '@/assets/styles/addition.scss';


Vue.config.productionTip = false

// axios.defaults.baseURL = 'api/'     // 生产环境下的api
Vue.prototype.axios = axios;
// axios.defaults.headers = {
//   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
// }

Vue.use(Element);


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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../components/Index.vue'
import Example from '../components/Example.vue'
import About from '../components/About.vue'
import Vote from '../components/Vote.vue'
import Jump from '../components/Jump.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    children: [
      { name: 'Index', path: 'index', component: Index },
      { name: 'Example', path: 'example', component: Example },
      { name: 'About', path: 'about', component: About },
      { name: 'Jump', path: 'jump', component: Jump },
      { name: 'Vote', path: 'vote', meta: { requireAuth: true }, component: Vote, },
      { name: 'Feedback', path: 'feedback', meta: { requireAuth: true }, component: () => import("../components/Feedback.vue"), },
      { name: 'Result', path: 'result', component: () => import("../components/Result.vue"), },

    ]
  },
  // 登录路由
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  // 重置密码路由
  {
    path: '/forgotpassword',
    name: 'Forgotpassword',
    component: () => import('../views/Forgotpassword.vue')
  },
  // 用户后台路由
  {
    path: '/user',
    name: 'User',
    redirect: '/user/index',
    component: () => import("../views/User.vue"),
    meta: { title: "用户首页" },
    children: [
      { name: 'UserIndex', path: 'index', component: () => import('../components/User/Index.vue'), meta: { title: "信息概览" }},
      { name: 'Add', path: 'add', component: () => import('../components/User/Add.vue'), meta: { title: "创建投票" } },
      { name: 'Manage', path: 'manage', component: () => import('../components/User/Manage.vue'), meta: { title: "管理投票" }},
      { name: 'Message', path: 'message', component: () => import('../components/User/Message.vue'), meta: { title: "消息通知" }},
      { name: 'Profile', path: 'profile', component: () => import('../components/User/Profile.vue'), meta: { title: "个人资料" } },
      { name: 'Reedit', path: 'reedit', component: () => import('../components/User/Reedit.vue'), meta: { title: "重新编辑" }},
    ]
  },
  // 管理员后台路由
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/index',
    component: () => import('../views/Admin.vue'), 
    meta: { title: "管理员首页" },
    children: [
      { name: 'AdminIndex', path: 'index', component: () => import("../components/Admin/Index.vue"), meta: { title: "信息概览" }},
      { name: 'MyMessage', path: 'mymessage', component: () => import("../components/Admin/Message.vue"), meta: { title: "我的通知" }},
      { name: 'AddMessage', path: 'addmessage', component: () => import("../components/Admin/AddMessage.vue"), meta: { title: "发布通知" }},
      { name: 'Users', path: 'users', component: () => import("../components/Admin/Users.vue"), meta: { title: "用户管理" } },
      { name: 'Topics', path: 'topics', component: () => import("../components/Admin/Topics.vue"), meta: { title: "投票管理" }}, 
      { name: 'Messages', path: 'messages', component: () => import("../components/Admin/Messages.vue"), meta: { title: "通知管理" }}, 
      { name: "Profile", path: 'profile', component: () => import("../components/Admin/Profile.vue"), meta: { title: "个人资料" }}
    ]
  },
  // 测试页面路由
  {
    path: '/test',
    component: () => import('../components/utils/Test.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router

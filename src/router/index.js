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

    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/forgotpassword',
    name: 'Forgotpassword',
    component: () => import('../views/Forgotpassword.vue')
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

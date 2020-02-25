import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Topics from '../components/Topics.vue'
import Example from '../components/Example.vue'
import About from '../components/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/topics',
    component: Home,
    children: [
      { path: 'topics', component: Topics },
      { path: 'example', component: Example },
      { path: 'about', component: About },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '*',
    redirect: '/about'
  }
]

const router = new VueRouter({
  routes
})

export default router

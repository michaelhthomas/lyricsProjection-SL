import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import AddLyric from '../views/add/AddLyric.vue'
import List from '../views/list/List.vue'
import Playlists from '../views/playlists/Playlists.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: AddLyric
  },
  {
    path: '/list',
    name: 'List',
    component: List
  },
  {
    path: '/add-psalm',
    name: 'AddPsalm',
    component: () => import('../views/addPsalm/AddPsalm.vue')
  },
  {
    path: '/list-psalms',
    name: 'ListPsalms',
    component: () => import('../views/listPsalms/ListPsalms.vue')
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

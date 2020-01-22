import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AfegirPartida from '../views/AfegirPartida.vue'
import CargarPartida from '../views/CargarPartida.vue'
import Resum from '../views/Resum.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/afegirpartida',
    name: 'afegirpartida',
    component: AfegirPartida
  },
  {
    path: '/cargarpartida',
    name: 'cargarpartida',
    component: CargarPartida
  },
  {
    path: '/resum',
    name: 'resum',
    component: Resum
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

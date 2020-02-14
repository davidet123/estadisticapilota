import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AfegirPartida from '../views/AfegirPartida.vue'
import EditarPartida from '../views/EditarPartida.vue'
import CargarPartida from '../views/CargarPartida.vue'
import Estadistica from '../views/Estadistica.vue'
import Resum from '../views/Resum.vue'
import LogIn from '../views/users/LogIn.vue'
import SignIn from '../views/users/SignIn.vue'
import Test from '../views/test/Test.vue'

import firebase from 'firebase/app'
import 'firebase/auth'

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
    component: AfegirPartida,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/estadistica',
    name: 'estadistica',
    component: Estadistica,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cargarpartida',
    name: 'cargarpartida',
    component: CargarPartida,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/resum/:id',
    name: 'resum',
    props:true,
    component: Resum
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editarpartida/:id',
    name: 'editarpartida',
    props:true,
    component: EditarPartida,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if(user) {
      next()
    } else {
      next({name: 'login'})
    }
  } else {
    next()
  }
})

export default router

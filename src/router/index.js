import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import AfegirPartida from "../views/AfegirPartida.vue"
import EditarPartida from "../views/EditarPartida.vue"
import CargarPartida from "../views/CargarPartida.vue"
import Estadistica from "../views/Estadistica.vue"
import Jugadores from "../views/Jugadores.vue"
import Resum from "../views/Resum.vue"
import LogIn from "../views/users/LogIn.vue"
import SignIn from "../views/users/SignIn.vue"
import Graella from "../views/Graella.vue"
import Test from "../views/test/Test.vue"

import firebase from "firebase/app"
import "firebase/auth"
//import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/afegirpartida",
    name: "afegirpartida",
    component: AfegirPartida,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
  },
  {
    path: "/estadistica",
    name: "estadistica",
    component: Estadistica,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
  },
  {
    path: "/jugadores",
    name: "jugadores",
    component: Jugadores,
    meta: {
      requiresAuth: true,
      roles: ["admin", "federacion"],
    },
  },
  {
    path: "/cargarpartida",
    name: "cargarpartida",
    component: CargarPartida,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
  },
  {
    path: "/graella",
    name: "graella",
    component: Graella,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
  },
  {
    path: "/resum/:id",
    name: "resum",
    props: true,
    component: Resum,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
  },
  {
    path: "/editarpartida/:id",
    name: "editarpartida",
    props: true,
    component: EditarPartida,
    meta: {
      requiresAuth: true,
      roles: ["admin"],
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: "login" })
    }
  } else {
    next()
  }
})

/* const hasRequiredRoles = to => {
  const roles = to.meta.roles
  let userRoles = store.getters.rolUser
  console.log(roles, userRoles)
  if (roles.length > 0) {
    for (let role of roles) {
      if (userRoles == role) {
        return true
      }
    }
  } else return true
}

router.beforeEach((to, from, next) => {
  const userIsAuthenticated = firebase.auth().currentUser
  //console.log(userIsAuthenticated)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  //console.log(hasRequiredRoles(to))
  if (
    (requiresAuth && userIsAuthenticated && hasRequiredRoles(to)) ||
    !requiresAuth
  ) {
    next()
  } else next({ name: "login" })
}) */

export default router

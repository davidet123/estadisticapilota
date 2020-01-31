<template>
  <div class="nav">
    <v-toolbar color="#1d428a" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to='/' tag='span' style='cursor: pointer'>
          <span>PILOTA</span>
          <span class="font-weight-light"> VALENCIANA</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="d-none d-sm-flex">
        <v-btn text
        v-for="item in links"
        :key="item.titulo"
        @click="goTo(item.link)"
        class="white--text"
        >
          <v-icon left>{{ item.icon }}</v-icon>{{ item.titulo }}
        </v-btn>
      </v-toolbar-items> -->
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      color="#1d428a"
      dark
    >
      <p class="font-weight-black white--text mx-auto px-2 pt-2">Pilota Valenciana</p>
      <v-divider color="white"></v-divider>
      <!-- <h4 class="pa-4 white--text">{{ userCargado.user }}</h4> -->
      <v-list>
        <v-list-item
        v-for="item in links"
        :key="item.titulo"
        @click="goTo(item.link)"
        >
        <v-list-item-icon>
          <v-icon>
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.titulo }}
          </v-list-item-title>
        </v-list-item-content>

        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {

data() {
    return {
      drawer: false,
      user: null
    }
  },
  computed: {
    cargando() {
      return this.$store.getters.carregant
    },
    userCargado() {
      return this.$store.getters.userStatus
    },
    rolUser() {
      return this.$store.getters.rolUser
    },
    links() {
      let menuItems = [{icon: 'mdi-lock-open-variant', titulo: 'LOG IN', link: '/login'},
      /* {icon: 'mdi-cloud-download', titulo: 'CARREGAR PARTIDA', link: '/cargarpartida'} */]
      if(this.user) {
        menuItems = [
        {icon: 'mdi-tennis-ball', titulo: 'Afegir partida', link: '/afegirpartida'},
        {icon: 'mdi-cloud-download', titulo: 'Carregar partida', link: '/cargarpartida'},
        /* {icon: 'mdi-account-group', titulo: 'Resum', link: '/resum'}, */
        {icon: 'mdi-logout', titulo: 'Log out', link: 'logout'}]
        if(this.rolUser === 'admin') {
          menuItems.push({icon: 'mdi-account-plus', titulo: 'Crear Usuario', link: '/signin'})
        }
      } 
      return menuItems
    }
  },
  methods: {
    goTo(link) {
      if(link !== 'logout'){
        this.$router.push(link)
      } else if (link === 'logout') {
        this.$store.dispatch('logOut')
        this.$router.go()
      }
      this.drawer = false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = firebase.auth().currentUser
      } else {
        this.user = null
      }
    })
  }

}
</script>
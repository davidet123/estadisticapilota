<template>
  <div class="nav">
    <v-toolbar color="deep-purple accent-4" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-none"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to='/' tag='span' style='cursor: pointer'>
          <span>ESTADÍSTICA</span>
          <span class="font-weight-light"> PILOTA</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn text
        v-for="item in links"
        :key="item.titulo"
        @click="goTo(item.link)"
        class="white--text"
        >
          <p>{{ item.titulo }}</p>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      color="deep-purple accent-4"
      dark
    >
      <p class="font-weight-black white--text mx-auto px-2 pt-2">Estadistica voley</p>
      <v-divider color="white"></v-divider>
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
export default {

data() {
    return {
      drawer: false,
      user: 'davidet'
    }
  },
  computed: {
    cargando() {
      return this.$store.getters.loading
    },
    links() {
      let menuItems = [{icon: 'lock_open', titulo: 'log In', link: '/login'}]
      if(this.user) {
        menuItems = [
        {icon: 'control_point', titulo: 'Afegir Partida', link: '/afegirpartida'},
        {icon: 'control_point', titulo: 'Carregar partida', link: '/cargarpartida'},
        {icon: 'control_point', titulo: 'Resum', link: '/resum'},
        /* {icon: 'exit_to_app', titulo: 'log Out', link: 'logout'} */]
        if(this.rolUser === 'admin') {
          menuItems.push({icon: 'how_to_reg', titulo: 'Crear Usuario', link: '/signin'})
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
  /* created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = firebase.auth().currentUser
      } else {
        this.user = null
      }
    })
  } */

}
</script>
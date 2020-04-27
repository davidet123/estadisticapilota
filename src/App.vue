<template>
  <v-app class="clearBg bgCol">
    <Navbar />
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "./components/navbar/Navbar.vue"
import Footer from "./components/footer/Footer.vue"

import firebase from "firebase/app"
import "firebase/auth"

export default {
  name: "App",

  components: {
    Navbar,
    Footer
  },

  data: () => ({
    //
  }),
  created() {
    //this.$store.dispatch('cargarMarcador')
    this.$store.dispatch("updateDbMimo")
    this.$store.dispatch("actualizarMarcador")
    this.$store.dispatch("actualizarFeedback")
    this.$store.dispatch("actualizarEntrevista")
    this.$store.dispatch("actualizarJugadores")
    //this.$store.dispatch('cargarListado')
    this.$store.dispatch("actualizarListado")
    this.$store.dispatch("partidaCargada")

    //this.$store.dispatch('actualizarPartidaCargada')
    //this.$store.dispatch('actualizarMarcadorCargado')

    let user = firebase.auth().currentUser
    if (user) {
      this.$store.dispatch("setUser", user.uid)
    }
  }
}
</script>
<style>
.clearBg {
  background: none;
}
.bgCol {
  background-color: #072840 !important;
}
</style>

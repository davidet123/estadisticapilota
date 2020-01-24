<template>
  <v-app class="clearBg">
    <Navbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/navbar/Navbar.vue';

import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('cargarListado')
    this.$store.dispatch('partidaCargada')
    this.$store.dispatch('actualizarListado')

    let user = firebase.auth().currentUser
    /* console.log(user) */
    if(user) {
      this.$store.dispatch('setUser', user.uid)
    }
  }
};
</script>
<style>
  .clearBg {
    background: none;
  }

</style>

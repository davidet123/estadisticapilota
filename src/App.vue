<template>
  <v-app>
    <Navbar/>
    

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/navbar/Navbar.vue';

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
  created() {
    /* this.$store.dispatch('cargarListado') */
    this.$store.dispatch('actualizarListado')
  }
};
</script>

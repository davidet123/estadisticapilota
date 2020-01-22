<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-center">Cargar Partida</h2>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-list subheader width="100%">
        <v-subheader>Llistat de partides</v-subheader>
        <v-list-item  v-for="partida in partides" :key="partida.id"> 
          <v-list-item-content>
            <v-list-item-title v-text="partida.id"></v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>
    </v-row> -->
    <div v-if="cargando" class="text-center mt-5">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-if="!cargando">
      <div v-for="partida in partides" :key="partida.id">
        <v-row>
          <v-col cols="8">
            <h4>{{ partida.data }}</h4>
            <h3>{{ partida.equip_roig.nom_equip }} vs {{ partida.equip_blau.nom_equip }}</h3>
            <p>{{ partida.tipo }}</p>
          </v-col>
          <v-col cols="4">
            <v-btn color="success" @click="cargarPartida(partida.id)">Carregar Partida</v-btn>
          </v-col>
          
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      partidas: []
    }
  },
  computed: {
    
    partides() {
      return this.$store.getters.partides
    },
    cargando() {
      return this.$store.getters.cargando
    }
  },
  methods: {
    cargarPartida(id) {
      this.$store.commit('cargarPartida', id)
      this.$router.push('/')
    }
  }

}
</script>

<style>

</style>
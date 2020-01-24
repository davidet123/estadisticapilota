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
        <v-sheet elevation="4" class="my-2 pa-2">
          <v-row class="pl-2">
            <v-col cols="6" sm="8">
              <h4>{{ partida.data }}</h4>
              <h3>{{ partida.equip_roig.nom_equip }} vs {{ partida.equip_blau.nom_equip }}</h3>
              <p>{{ partida.tipo }}</p>
            </v-col>
            <v-col cols="6" sm="4" align-self="center">
              <v-btn small class="mb-2" color="success" @click="cargarPartida(partida.id)">CARREGAR</v-btn>
              <br>
              <v-btn small class="mb-2" color="error" @click="abrirDialog(partida.id)">ELIMINAR</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
        
      </div>
      <v-dialog
        v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">ELIMINAR PARTIDA</v-card-title>
            <v-card-text>
              Estàs a punt d'eliminar una partida. Estàs segur?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="eliminarPartida"
              >
                Eliminar
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      partidas: [],
      dialog: false,
      id: null
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
      this.$store.dispatch('cargarPartida', id)
      this.$router.push('/Estadistica')
    },
    eliminarPartida() {
      this.$store.dispatch('eliminarPartida', this.id)
      this.dialog = false
    },
    abrirDialog(id) {
      this.id = id
      this.dialog = true
    }
  }

}
</script>

<style>

</style>
<template>
  <v-container>
    <div v-if="cargando" class="text-center mt-5">
      <h3 class="white--text">Carregant partides...</h3>
      <v-progress-circular indeterminate color="white"></v-progress-circular>
    </div>
    <div v-if="!cargando">
      <v-row>
        <v-col>
          <h2 class="text-center white--text">Cargar Partida</h2>
        </v-col>
      </v-row>
      <div v-for="partida in partides" :key="partida.id">
        <v-sheet
          elevation="4"
          class="my-2 pa-0"
          :color="partida.graella ? 'yellow' : 'white'"
        >
          <v-row class="pl-2">
            <v-col cols="6" sm="8">
              <h4>{{ partida.data }}</h4>
              <h3>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h3>
              <h5>{{ partida.tipo }}</h5>
            </v-col>
            <v-col cols="6" sm="4" align-self="center">
              <v-btn
                x-small
                class="mb-2 mx-2"
                color="#317f5c"
                dark
                @click="cargarPartida(partida.id)"
                :disabled="partida.graella"
                >CARREGAR</v-btn
              >
              <v-btn
                x-small
                class="mb-2 white--text"
                color="blue"
                @click="editarPartida(partida.id)"
                >EDITAR</v-btn
              >

              <v-btn
                x-small
                class="mb-2 mx-2"
                color="error"
                @click="abrirDialog(partida.id)"
                >ELIMINAR</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </div>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">ELIMINAR PARTIDA</v-card-title>
          <v-card-text>
            Estàs a punt d'eliminar una partida. Estàs segur?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="green darken-1" text @click="eliminarPartida">
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
      let lista = this.$store.getters.partides
      return lista.sort((a, b) => (a.data < b.data ? 1 : -1))
    },
    cargando() {
      return this.$store.getters.cargando
    }
  },
  methods: {
    cargarPartida(id) {
      this.$store.dispatch("cargarPartida", id)
      this.$router.push("/Estadistica")
    },
    editarPartida(id) {
      this.$router.push("/editarpartida/" + id)
    },
    eliminarPartida() {
      this.$store.dispatch("eliminarPartida", this.id)
      this.dialog = false
    },
    abrirDialog(id) {
      this.id = id
      this.dialog = true
    }
  }
}
</script>

<style></style>

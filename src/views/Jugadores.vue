<template>
  <v-container fluid>
    <v-row>
      <v-col cols="11">
        <h2 class="text-center white--text">Jugadors</h2>
      </v-col>
    </v-row>
    <v-sheet elevation="4" widht="100%" class="px-4">
      <v-row>
        <v-col>
          <ListaJugadores />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="center">
          <v-btn
            @click="dialog = !dialog"
            color="#317f5c"
            dark
            class="mr-2 mb-2"
            >Afegir jugador</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
    <v-dialog v-model="dialog" max-width="900">
      <Jugador v-on:close-dialog="closeDialog" :jugador="jugador" />
    </v-dialog>
  </v-container>
</template>

<script>
import ListaJugadores from "@/components/jugadors/ListaJugadores"
import Jugador from "@/components/jugadors/Jugador"

export default {
  name: "jugadores",
  components: {
    ListaJugadores,
    Jugador
  },
  data() {
    return {
      dialog: false,
      jugador: null
    }
  },
  methods: {
    closeDialog() {
      this.dialog = !this.dialog
    }
  }
}
</script>

<style></style>

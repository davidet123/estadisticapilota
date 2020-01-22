<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3 class="text-center">RESUM PARTIDA</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="caja" cols="12" sm="6">
        <v-card >
          <v-card-title class="red">
            <p class="text-center white--text">EQUIP ROIG</p>
          </v-card-title>
          <v-row>
            <v-col cols="8" class="ml-4">
              <p>COLPS GUANYADORS</p>
              <v-divider></v-divider>
              <p class="mt-4">ERRADES</p>
              <v-divider></v-divider>
              <p class="mt-4">TRETES DIRECTES</p>
              <v-divider></v-divider>
              <p class="mt-4">FALTES DE TRETA</p>
              <v-divider></v-divider>
              <p class="mt-4">CANVIS DE PILOTA</p>
            </v-col>
            <v-col cols="3" class="ml-4" align="center">
              <p>{{ colps_rojos }}</p>
              <v-divider></v-divider>
              <p class="mt-4">{{ errades_rojos }}</p>
              <v-divider></v-divider>
              <p class="mt-4">{{ tretes_rojos }}</p>
              <v-divider></v-divider>
              <p class="mt-4">{{ faltesTreta_rojos }}</p>
              <v-divider></v-divider>
              <p class="mt-4">{{ canvis_rojos }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="caja" cols="12" sm="6">
        <v-card >
          <v-card-title class="blue">
            <p class="text-center white--text">EQUIP BLAU</p>
          </v-card-title>
          <v-row>
            <v-col cols="8" class="ml-4">
              <p>COLPS GUANYADORS</p>
              <v-divider></v-divider>
              <p class="mt-4">ERRADES</p>
              <v-divider></v-divider>
              <p class="mt-4">TRETES DIRECTES</p>
              <v-divider></v-divider>
              <p class="mt-4">FALTES DE TRETA</p>
              <v-divider></v-divider>
              <p class="mt-4">CANVIS DE PILOTA</p>
            </v-col>
            <v-col cols="3" class="ml-4" align="center">
              <p>{{ colps_blaus }}</p>
              <v-divider></v-divider>
              <p class="mt-4">{{ errades_blaus }}</p>
              <v-divider></v-divider>
              <p class="mt-4">{{ tretes_blaus }}</p>
              <v-divider></v-divider>
              <p class="mt-4">{{ faltesTreta_blaus }}</p>
              <v-divider></v-divider>
              <p class="mt-4">{{ canvis_blaus }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    partida() {
      return this.$store.getters.partida
    },
    equip_roig() {
      return this.partida.equip_roig
    },
    colps_rojos() {
      let total = 0
      this.equip_roig.jugadors.forEach(item => {
        total += item.est_ind.colps
      })
      return total
    },
    errades_rojos() {
      let total = 0
      this.equip_roig.jugadors.forEach(item => {
        total += item.est_ind.errades
      })
      return total
    },
    tretes_rojos() {
      return this.equip_roig.treta.tretes.directes
    },
    faltesTreta_rojos() {
      return this.equip_roig.treta.tretes.faltes
    },
    canvis_rojos() {
      return this.equip_roig.canvi_pilota
    },
    equip_blau() {
      return this.partida.equip_blau
    },
    colps_blaus() {
      let total = 0
      this.equip_blau.jugadors.forEach(item => {
        total += item.est_ind.colps
      })
      return total
    },
    errades_blaus() {
      let total = 0
      this.equip_blau.jugadors.forEach(item => {
        total += item.est_ind.errades
      })
      return total
    },
    tretes_blaus() {
      return this.equip_blau.treta.tretes.directes
    },
    faltesTreta_blaus() {
      return this.equip_blau.treta.tretes.faltes
    },
    canvis_blaus() {
      return this.equip_blau.canvi_pilota
    }
    
  }
}

</script>

<style>


</style>
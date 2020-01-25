<template>
  <v-container fluid>
    <div v-if="cargando" class="text-center mt-5">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-if="!cargando">

    
      <v-row>
        <v-col cols="12">
          <h3 class="text-center">RESUM PARTIDA</h3>
        </v-col>
      </v-row>
      <v-row v-if="partidaCargada">
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
      
      <v-row>
        <v-col cols="12" sm="6" class="mx-0 px-0">
          <v-simple-table>
                <div align="center">
                  <h3>EQUIP ROIG</h3>
                  <v-divider></v-divider>
                  <thead >
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Colps</th>
                      <th width="80px" class="text-center">Errades</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(jugador) in partida.equip_roig.jugadors" :key="jugador.nom">
                      <td>{{ jugador.nom }} </td>
                      <td>{{ jugador.est_ind.colps }}</td>
                      <td>{{ jugador.est_ind.errades }}</td>
                    </tr>
                  </tbody>
                  <v-divider></v-divider>
                  <h5 align="center">TRETES</h5>
                  <v-divider></v-divider>
                  <thead>
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Directes</th>
                      <th width="80px" class="text-center">Faltes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ partida.equip_roig.treta.nom }} </td>
                      <td>{{ partida.equip_roig.treta.tretes.directes }}</td>
                      <td>{{ partida.equip_roig.treta.tretes.faltes }}</td>
                    </tr>
                  </tbody>
                  <v-divider></v-divider>
                  <h5 align="center">CAIGUDES D'ESCALA</h5>
                  <v-divider></v-divider>
                  <thead>
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="160px" class="text-center">Estadistica</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ partida.equip_roig.treta.nom }} </td>
                      <td>{{ partida.equip_roig.jugadors[0].caigudes.quinzes }} / {{ partida.equip_roig.jugadors[0].caigudes.total }}</td>
                    </tr>
                  </tbody>
                </div>
                <!-- <v-sheet color="deep-orange darken-1">
                  <v-sparkline
                  class="my-4"
                  color="white"
                  :value="partida.durades"
                  line-width="1"
                  padding="16"
                  radius="0"
                  :labels="numJocs"></v-sparkline>
                </v-sheet> -->
              </v-simple-table>
        </v-col>
        <v-col cols="12" sm="6" class="mx-0 px-0">
          <v-simple-table>
                <div align="center">
                  <h3>EQUIP BLAU</h3>
                  <v-divider></v-divider>
                  <thead >
                    <tr>
                      <th width="180px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Colps</th>
                      <th width="80px" class="text-center">Errades</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(jugador) in partida.equip_blau.jugadors" :key="jugador.nom">
                      <td>{{ jugador.nom }} </td>
                      <td>{{ jugador.est_ind.colps }}</td>
                      <td>{{ jugador.est_ind.errades }}</td>
                    </tr>
                  </tbody>
                  <v-divider></v-divider>
                  <h5 align="center">TRETES</h5>
                  <v-divider></v-divider>
                  <thead>
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Directes</th>
                      <th width="80px" class="text-center">Faltes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ partida.equip_blau.treta.nom }} </td>
                      <td>{{ partida.equip_blau.treta.tretes.directes }}</td>
                      <td>{{ partida.equip_blau.treta.tretes.faltes }}</td>
                    </tr>
                  </tbody>
                  <v-divider></v-divider>
                  <h5 align="center">CAIGUDES D'ESCALA</h5>
                  <v-divider></v-divider>
                  <thead>
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="160px" class="text-center">Estadistica</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ partida.equip_blau.treta.nom }} </td>
                      <td>{{ partida.equip_blau.jugadors[0].caigudes.quinzes }} / {{ partida.equip_blau.jugadors[0].caigudes.total }}</td>
                    </tr>
                  </tbody>
                </div>
                <!-- <v-sheet color="deep-orange darken-1">
                  <v-sparkline
                  class="my-4"
                  color="white"
                  :value="partida.durades"
                  line-width="1"
                  padding="16"
                  radius="0"
                  :labels="numJocs"></v-sparkline>
                </v-sheet> -->
              </v-simple-table>
        </v-col>
      </v-row>





      <v-row>
        <v-col align="center">
          <v-btn v-if="this.user == 'admin'" @click="netejar()">Netejar cache partida</v-btn>
          <v-btn @click="goto('/estadistica')">Tornar a la partida</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    cargando() {
      return this.$store.getters.cargando
    },
    partidaCargada() {
      return this.$store.getters.partidaCargada
    },
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
    },
    user() {
      console.log(this.$store.getters.rolUser)
      return this.$store.getters.rolUser
    }
    
  },
  methods: {
    netejar() {
      this.$store.dispatch('cargarPartida', null)
      this.$router.push('/')
    },
    goto(link) {
      this.$router.push(link)
    }
  }
}

</script>

<style>


</style>
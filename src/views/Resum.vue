<template>
  <v-container fluid>
    <div v-if="cargando" class="text-center mt-5">
      <h3 class="white--text">Carregant partides...</h3>
      <v-progress-circular
        indeterminate
        color="white"
      ></v-progress-circular>
    </div>
    <div v-if="!cargando">
      <v-row>
        <v-col cols="12">
          <h3 class="text-center white--text">RESUM PARTIDA {{ partida.equip_roig.nom_equip }} vs {{ partida.equip_blau.nom_equip }}</h3>
        </v-col>
      </v-row>
      <v-row v-if="partidaCargada">
          <v-col cols="12">
            <v-sheet elevation="4" width="300px" class="mx-auto">
              <v-col cols="12" align="center">
                <v-row>
                  <v-col cols="3" class="pa-0">
                    <h3 class="red--text py-1"> {{  marcador.jocs_rojos * 5 }}</h3>
                  </v-col>
                  <v-col cols="3" class="pa-0">
                    <h3 class="red white--text py-1"> {{ punto_str[marcador.punts_rojos] }}</h3>
                  </v-col>
                  <v-col cols="3" class="pa-0">
                    <h3 class="blue white--text py-1"> {{ punto_str[marcador.punts_blaus] }}</h3>
                  </v-col>
                  <v-col cols="3" class="pa-0">
                    <h3 class="blue--text py-1"> {{  marcador.jocs_blaus * 5 }}</h3>
                  </v-col>
                </v-row>
              </v-col>
            </v-sheet>
          </v-col>
        </v-row>
<!-- 
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
      </v-row> -->
      <v-col cols="12" class="ma-0 pa-0">
          <EstadisticaPerJoc :id="partidaCargada.id" :key="componentKey" v-if="user" />
        </v-col>
      <v-sheet width="100%">
        <v-row>
          <v-col cols="12">
            <h2 class="pl-4">Estadistica de la partida</h2>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Categoria</th>
                    <th class="text-center">Equip roig</th>
                    <th class="text-center">Equip blau</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td>COLPS GUANYADORS</td>
                    <td class="text-center">{{ colps_rojos }}</td>
                    <td class="text-center">{{ colps_blaus }}</td>
                  </tr>
                  <tr >
                    <td>ERRADES</td>
                    <td class="text-center">{{ errades_rojos }}</td>
                    <td class="text-center">{{ errades_blaus }}</td>
                  </tr>
                  <tr >
                    <td>TRETES DIRECTES</td>
                    <td class="text-center">{{ tretes_rojos }}</td>
                    <td class="text-center">{{ tretes_blaus }}</td>
                  </tr>
                  <tr >
                    <td>FALTES DE TRETA</td>
                    <td class="text-center">{{ faltesTreta_rojos }}</td>
                    <td class="text-center">{{ faltesTreta_blaus }}</td>
                  </tr>
                  <tr >
                    <td>CANVIS DE PILOTA</td>
                    <td class="text-center">{{ canvis_rojos }}</td>
                    <td class="text-center">{{ canvis_blaus }}</td>
                  </tr>
                  
                </tbody>
              </template>
            </v-simple-table>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" sm="6">
          <h5 class="text-center">EQUIP ROIG</h5>
          <v-divider></v-divider>
            <v-simple-table>
              <template v-slot:default>
                <thead >
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Colps</th>
                      <th width="80px" class="text-center">Errades</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(jugador) in partida.equip_roig.jugadors" :key="jugador.nom">
                      <td v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.nom }} </td>
                      <td class="text-center" v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.est_ind.colps }}</td>
                      <td class="text-center" v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.est_ind.errades }}</td>
                    </tr>
                  </tbody>
                </template>              
            </v-simple-table>
            <h5 class="text-center py-1 mt-2">TRETES</h5>
            <v-divider></v-divider>
            <v-simple-table>
              <template v-slot:default>
                  <thead>
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Directes</th>
                      <th width="80px" class="text-center">Faltes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">{{ partida.equip_roig.treta.nom }} </td>
                      <td class="text-center">{{ partida.equip_roig.treta.tretes.directes }}</td>
                      <td class="text-center">{{ partida.equip_roig.treta.tretes.faltes }}</td>
                    </tr>
                  </tbody>
                </template>              
              </v-simple-table>
              <div v-if="partida.tipo == 'Escala i corda'">
                <h5 class="text-center py-1 mt-2">CAIGUDES D'ESCALA</h5>
                <v-divider></v-divider>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th width="280px" class="text-center">Jugador</th>
                        <th width="160px" class="text-center">Quinze</th>
                        <th width="160px" class="text-center">Caigudes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">{{ partida.equip_roig.treta.nom }} </td>
                        <td class="text-center">{{ partida.equip_roig.jugadors[0].caigudes.quinzes }}</td>
                        <td class="text-center">{{ partida.equip_roig.jugadors[0].caigudes.total }}</td>
                      </tr>
                    </tbody>
                </template>              
              </v-simple-table>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
          <h5 class="text-center">EQUIP BLAU</h5>
          <v-divider></v-divider>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Colps</th>
                      <th width="80px" class="text-center">Errades</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(jugador) in partida.equip_blau.jugadors" :key="jugador.nom">
                      <td v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.nom }} </td>
                      <td class="text-center" v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.est_ind.colps }}</td>
                      <td class="text-center" v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.est_ind.errades }}</td>
                    </tr>
                  </tbody>
                </template>              
            </v-simple-table>
            <h5 class="text-center py-1 mt-2">TRETES</h5>
            <v-divider></v-divider>
            <v-simple-table>
              <template v-slot:default>
                  <thead>
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Directes</th>
                      <th width="80px" class="text-center">Faltes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">{{ partida.equip_blau.treta.nom }} </td>
                      <td class="text-center">{{ partida.equip_blau.treta.tretes.directes }}</td>
                      <td class="text-center">{{ partida.equip_blau.treta.tretes.faltes }}</td>
                    </tr>
                  </tbody>
                </template>              
              </v-simple-table>
              <div v-if="partida.tipo == 'Escala i corda'">
                <h5 class="text-center py-1 mt-2">CAIGUDES D'ESCALA</h5>
                <v-divider></v-divider>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th width="280px" class="text-center">Jugador</th>
                        <th width="160px" class="text-center">Quinze</th>
                        <th width="160px" class="text-center">Caigudes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ partida.equip_blau.treta.nom }} </td>
                        <td>{{ partida.equip_blau.jugadors[0].caigudes.quinzes }}</td>
                        <td>{{ partida.equip_blau.jugadors[0].caigudes.total }}</td>
                      </tr>
                    </tbody>
                </template>              
              </v-simple-table>
            </div>
          </v-col>
          
        </v-row>
      </v-sheet>


      
      <!-- <v-row>
        <v-col cols="12" sm="6" class="mx-0 px-0">
          <v-simple-table>
                <div align="center">
                  <h3>EQUIP ROIG</h3>
                  <v-divider></v-divider>
                  <thead>
                    <tr >
                      <th  class="text-center">Estadística equip</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TRETES DIRECTES</td>
                      <td>5</td>
                    </tr>

                  </tbody>
                  <thead>
                    <tr>
                      <th width="280px" class="text-center">Jugador</th>
                      <th width="80px" class="text-center">Colps</th>
                      <th width="80px" class="text-center">Errades</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(jugador) in partida.equip_roig.jugadors" :key="jugador.nom">
                      <td v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.nom }} </td>
                      <td v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.est_ind.colps }}</td>
                      <td v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.est_ind.errades }}</td>
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
                      <td v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.nom }} </td>
                      <td v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.est_ind.colps }}</td>
                      <td v-if="jugador.nom != null || jugador.nom == ''">{{ jugador.est_ind.errades }}</td>
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
              </v-simple-table>
        </v-col>
      </v-row>-->
      <v-row>
        <v-col align="center">
          <v-btn v-if="this.user == 'admin'" @click="netejar()">Netejar cache partida</v-btn>
          <v-btn color="#317f5c" dark v-if="user" @click="goto('/estadistica')">Tornar a la partida</v-btn>
          <v-btn color="#317f5c" dark v-if="!user" @click="goto('/')">Tornar al inici</v-btn>
        </v-col>
      </v-row> 
    </div>
  </v-container>
</template>

<script>
import EstadisticaPerJoc from '@/components/estadistica/EstadisticaPerJoc'


export default {
  props: [
    'id'
  ],
  components: {
    EstadisticaPerJoc
  },
  data() {
    return {
      punto_str: ['NET', '15', '30', 'VAL'],
      componentKey:0
    }
  },
  computed: {
    cargando() {
      return this.$store.getters.cargando
    },
    aciertos() {
      //console.log(this.partida.punts_per_joc)
      return this.partida.punts_per_joc
    },
    partidaCargada() {
      return this.$store.getters.buscarPartida(this.$route.params.id)
    },
    partida() {
      return this.$store.getters.buscarPartida(this.$route.params.id)
      /* return this.$store.getters.partida */
    },
    marcador() {
      return this.$store.getters.getMarcador(this.$route.params.id).marcador
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
  },
  created() {
    /* setInterval(() => {
        this.componentKey += 1
        //console.log(this.componentKey)
      }, 1000) */
  }
}

</script>

<style>


</style>
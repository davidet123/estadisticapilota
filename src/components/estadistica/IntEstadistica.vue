<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="1" class="mx-auto pa-0 my-0">
        <v-switch
        v-model="mostrar"
        v-if="user == 'admin'"
      ></v-switch>
      </v-col>
      
    </v-row>
    <v-row> 
      <v-col cols="4" align="center">
        <h5 class="white--text">TEMPS TOTAL</h5>
        <h4 class="white--text">{{ durada_total_str }}</h4>
        <v-btn x-small v-if="user == 'admin' || user == 'editor'" :disabled="temporizador_partida" @click="iniciPartida(true)">INICI PARTIDA</v-btn>
        <v-btn x-small v-if="user == 'admin' || user == 'editor'" @click="iniciPartida(false)">FINAL PARTIDA</v-btn>
        <v-btn x-small v-if="user == 'admin' || user == 'editor'" :disabled="temporizador_partida" @click="resetPartidaTemps()">RESET</v-btn>
        
      </v-col>
      <v-col v-if="mostrar" cols="4" class="mx-auto" align="center">
        <h5 class="white--text">{{ duradaMin }} min : {{ duradaSec }} seg</h5>
        <v-btn x-small @click="tiempo">{{ temporizador ? 'Stop' : 'Start'}} crono</v-btn>
        <v-btn x-small @click="reset" :disabled="temporizador">Reset crono</v-btn> 
      </v-col>
      <v-col cols="4" align="center" class="mx-auto">
        <h5 class="white--text">DURADA ÚLTIM JOC: {{ temps }}</h5>
        <v-btn x-small class="mt-2" @click="dialog = true">DURADES</v-btn>
        <!-- <v-btn x-small class="mt-2" @click="actualizar_durada()">DURADA TOTAL</v-btn> -->
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog" max-width="490">
        <v-card>
          <v-card-title class="headline">DURADES DELS JOCS</v-card-title>
          <v-card-subtitle class="mt-1">
            Llistat de todes les durades de la partida
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table>
              <div align="center">
                <thead  >
                  <tr>
                    <th width="80px" class="text-center">Joc</th>
                    <th width="280px" class="text-center">Durada</th>
                    <th width="80px" class="text-center" v-if="mostrar">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(index, durada) in partida.durades" :key="durada">
                    <td>{{ durada + 1 }} </td>
                    <td>{{ formatDurada(index) }}</td>
                    <td v-if="mostrar"> 
                      <v-btn color="error" fab x-small @click="deleteDurada(durada)">
                        <v-icon>mdi-delete</v-icon>  
                      </v-btn> </td>
                  </tr>
                </tbody>
              </div>
              <v-sheet color="deep-orange darken-1">
                <v-sparkline
                class="my-4"
                color="white"
                :value="partida.durades"
                line-width="1"
                padding="16"
                radius="0"
                :labels="numJocs"></v-sparkline>
              </v-sheet>
              
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Tancar
            </v-btn>
            <v-btn
            v-if="user == 'admin'"
              color="green darken-1"
              text
              @click="netejarDurades"
            >
              Netejar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
<!-- EQUIP ROIG -->
    <v-row>
      <v-col class="pa-0" cols="6" :sm="cajas"
      v-for="jugador in jugadors_rojos" :key="jugador.nom">
    
        <v-card class="caja">
          <div class="pa-1 overline red white--text">Estadistica Individual</div>
          <v-card-title class="red">
            <p class="text-center white--text">{{ jugador.nom }}</p>
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <v-row >
              <v-col cols="6" align="center">
                <p>COLPS</p>
                <p class="text-center">{{ jugador.est_ind.colps }}</p>
                <v-btn v-if="mostrar" small @click="colps(1, jugador.est_ind)">+</v-btn>
                <v-btn v-if="mostrar" small @click="colps(-1, jugador.est_ind)">-</v-btn>
              </v-col>
              <v-col cols="6" align="center">
                <p>ERRADES</p>
                <p class="text-center">{{ jugador.est_ind.errades }}</p>
                <v-btn v-if="mostrar" small @click="errades(1, jugador.est_ind)">+</v-btn>
                <v-btn v-if="mostrar" small @click="errades(-1, jugador.est_ind)">-</v-btn>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col class="pa-0" cols="6" :sm="cajas">
        <v-card class="caja">
          <div class="pa-1 overline red white--text">Tretes</div>
          <v-card-title class="red">
            <p class="text-center white--text">{{ treta_roig.nom}}</p>
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <v-row >
              <v-col cols="6" align="center">
                <p>DIRECTA</p>
                <p class="text-center">{{ treta_roig.tretes.directes }}</p>
                <v-btn v-if="mostrar" small @click="tretes(1, treta_roig.tretes)">+</v-btn>
                <v-btn v-if="mostrar" small @click="tretes(-1, treta_roig.tretes)">-</v-btn>
              </v-col>
              <v-col cols="6" align="center">
                <p>ERRADES</p>
                <p class="text-center">{{ treta_roig.tretes.faltes }}</p>
                <v-btn v-if="mostrar" small @click="erradaTreta(1, treta_roig.tretes)">+</v-btn>
                <v-btn v-if="mostrar" small @click="erradaTreta(-1, treta_roig.tretes)">-</v-btn>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
<!--     </v-row> -->

<!-- EQUIP BLAU -->

<!--     <v-row> -->
      <v-col class="pa-0" cols="6" :sm="cajas"
      v-for="jugador in jugadors_blaus" :key="jugador.num">
        <v-card class="caja">
          <div class="pa-1 overline blue white--text">Estadistica Individual</div>
          <v-card-title class="blue">
            <p class="text-center white--text">{{ jugador.nom }}</p>
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <v-row >
              <v-col cols="6" align="center">
                <p>COLPS</p>
                <p class="text-center">{{ jugador.est_ind.colps }}</p>
                <v-btn v-if="mostrar" small @click="colps(1, jugador.est_ind)">+</v-btn>
                <v-btn v-if="mostrar" small @click="colps(-1, jugador.est_ind)">-</v-btn>
              </v-col>
              <v-col cols="6" align="center">
                <p>ERRADES</p>
                <p class="text-center">{{ jugador.est_ind.errades }}</p>
                <v-btn v-if="mostrar" small @click="errades(1, jugador.est_ind)">+</v-btn>
                <v-btn v-if="mostrar" small @click="errades(-1, jugador.est_ind)">-</v-btn>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col class="pa-0" cols="6" :sm="cajas">
        <v-card class="caja">
          <div class="pa-1 overline blue white--text">Tretes</div>
          <v-card-title class="blue">
            <p class="text-center white--text">{{ treta_blau.nom}}</p>
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <v-row >
              <v-col cols="6" align="center">
                <p>DIRECTA</p>
                <p class="text-center">{{ treta_blau.tretes.directes }}</p>
                <v-btn small v-if="mostrar" @click="tretes(1, treta_blau.tretes)">+</v-btn>
                <v-btn small v-if="mostrar" @click="tretes(-1, treta_blau.tretes)">-</v-btn>
              </v-col>
              <v-col cols="6" align="center">
                <p>ERRADES</p>
                <p class="text-center">{{ treta_blau.tretes.faltes }}</p>
                <v-btn small v-if="mostrar" @click="erradaTreta(1, treta_blau.tretes)">+</v-btn>
                <v-btn small v-if="mostrar" @click="erradaTreta(-1, treta_blau.tretes)">-</v-btn>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="partida.tipo == 'Escala i corda'">
      <v-col class="pa-0" cols="6">
        <v-card class="caja">
          <div class="pa-1 overline red white--text">Caigudes d'escala</div>
          <v-card-title class="red">
            <p class="text-center white--text">{{ jugadors_rojos[0].nom }}</p>
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <v-row >
              <v-col cols="12" align="center">
                <h3 class="text-center mb-3">{{ jugadors_rojos[0].caigudes.quinzes }}/{{ jugadors_rojos[0].caigudes.total }}</h3>
                <v-btn v-if="mostrar" small @click="caigudes(0, jugadors_rojos[0].caigudes)">CAIGUDA</v-btn>
                <v-btn v-if="mostrar" small @click="caigudes(1, jugadors_rojos[0].caigudes)">QUINZE</v-btn>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col class="pa-0" cols="6">
        <v-card class="caja">
          <div class="pa-1 overline blue white--text">Caigudes d'escala</div>
          <v-card-title class="blue">
            <p class="text-center white--text">{{ jugadors_blaus[0].nom }}</p>
          </v-card-title>
          <v-card-subtitle class="mt-1">
            <v-row >
              <v-col cols="12" align="center">
                <h3 class="text-center mb-3">{{ jugadors_blaus[0].caigudes.quinzes }}/{{ jugadors_blaus[0].caigudes.total }}</h3>
                <v-btn v-if="mostrar" small @click="caigudes(0, jugadors_blaus[0].caigudes)">CAIGUDA</v-btn>
                <v-btn v-if="mostrar" small @click="caigudes(1, jugadors_blaus[0].caigudes)">QUINZE</v-btn>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" class="mx-0 pa-0">
        <v-sheet elevation="4" class="my-0" height="185px">
          <v-row class="caja">
            <v-col cols="12" class="mx-auto" align="center">
              <h3>CANVIS DE PILOTA</h3>
              <v-row>
                <v-col cols="6" align="center">
                  <h3 class="red--text">EQUIP ROIG  {{ this.equip_roig.canvi_pilota }}</h3>
                  <v-btn v-if="mostrar" small dark color="red" @click="canviPilota('roig')">CANVI PIL ROIG</v-btn>
                </v-col>
                <v-col cols="6" align="center">
                  <h3 class="blue--text">EQUIP BLAU {{ this.equip_blau.canvi_pilota }}</h3>
                  <v-btn v-if="mostrar" small dark color="blue" @click="canviPilota('blau')">CANVI PIL BLAU</v-btn> 
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="6"  class="mx-0 pa-0">
        <v-sheet elevation="4" height="185px">
          <v-row class="caja">
            <v-col cols="12" class="mx-auto" align="center">
              <h3>TRAVESSES</h3>
              <v-row>
                <v-col  cols="12" class="mb-0 pb-0">
                  <P>{{ this.travessaStr }} 
                    <span v-if="partida.travesses != null">
                    <v-icon v-if="user == 'admin' || user == 'editor'" @click="borrarTravessa()">mdi-close-circle-outline</v-icon>
                    </span></P> 
                </v-col>
                <v-col class="mb-0 pb-0" v-if="mostrar">
                  <v-btn small dark color="red" @click="travesa('als rojos')">ROJOS</v-btn>
                  <v-btn small dark color="red" @click="travesa('de 5 als rojos')">5</v-btn>
                  <v-btn small dark color="red" @click="travesa('de 10 als rojos')">10</v-btn>
                  <v-btn small dark color="red" @click="travesa('de 15 als rojos')">15</v-btn>
                  <v-btn small dark color="red" @click="travesa('de 20 als rojos')">20</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mt-0 pt-0" v-if="mostrar">
                  <v-btn small dark color="blue" @click="travesa('als blaus')">BLAUS</v-btn>
                  <v-btn small dark color="blue" @click="travesa('de 5 als blaus')">5</v-btn>
                  <v-btn small dark color="blue" @click="travesa('de 10 als blaus')">10</v-btn>
                  <v-btn small dark color="blue" @click="travesa('de 15 als blaus')">15</v-btn>
                  <v-btn small dark color="blue" @click="travesa('de 20 als blaus')">20</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>

      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      top="top"
      :timeout="timeout"
      color="lime accent-2"
    >
      <h4 class="black--text">{{ feedback }}</h4>
      <v-btn
        color="black"
        text
        @click="snackbar = false"
      >
        X
      </v-btn>
    </v-snackbar>
    
<!--     <p>{{ partida }}</p> -->
{{ timer }}
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      durada: 0,
      temporizador: false,
      interval: null,
      duradaMin: 0,
      duradaSec: 0,
      mostrar: true,
      dialog: false,
      user: null,
      temporizador_partida: false,
      temps_total: null,
      durada_total_str: null,
      hora_final_partida: null,
      hora_actual_partida: null,
      snackbar:false,
      timeout: 0,
      top: true,
      timer: null
    }
  },
  computed: {
    partida() {
      let user = this.$store.getters.rolUser
      this.setUser(user)
      return this.$store.getters.partida
    },
    jugadors_rojos() {
      const jugadors = this.equip_roig.jugadors.filter(item => {
        return item.nom != null
      })
      return jugadors
    },
    equip_roig() {
      return this.partida.equip_roig
    },
    treta_roig() {
      return this.equip_roig.treta
    },
    jugadors_blaus() {
      const jugadors = this.equip_blau.jugadors.filter(item => {
        return item.nom != null
      })
      return jugadors
    },
    equip_blau() {
      return this.partida.equip_blau
    },
    treta_blau() {
      return this.equip_blau.treta
    },
    cajas() {
      return Math.round(12 / (this.jugadors_rojos.length +1))
    },
    temps() {
      return this.partida.durades.length > 0 ? this.formatDurada(this.partida.durades[this.partida.durades.length-1]) : 0
    },
    hora_inici() {
      return this.partida.hora_inici
    },
    numJocs() {
      let i = 1
      let jocs = []
      this.partida.durades.forEach( () => {
        jocs.push(i)
        i++
      })
      return jocs
    },
    temporizador_partida_flag() {
      return this.partida.temporizador
    },
    travessaStr() {
      return this.partida.travesses == null ? '--' : this.partida.travesses
    },
    feedback() {
      return this.$store.getters.getFeedback
    },
    canviPilotaRoig() {
      return this.partida.equip_roig.canvi_pilota
    }

  },
  methods: {
    cargarPartida() {
      this.partida = this.$store.getters.partida
    },
    deleteDurada(item) {
      this.partida.durades.splice(item, 1)
      this.update()
    },
    colps(i, est) {
      est.colps += i
      this.update()
    },
    errades(i, est) {
      est.errades += i
      this.update()
    },
    tretes(i, est) {
      est.directes += i
      this.update()
    },
    erradaTreta(i, est) {
      est.faltes += i
      this.update()
    },
    caigudes(i, est) {
      est.total += 1
      est.quinzes += i
      this.update()
    },
    canviPilota(equip) {
      let str = ''
      if(equip == 'roig') {
        this.equip_roig.canvi_pilota += 1
        str = 'CANVI PILOTA ROJOS: ' + this.equip_roig.canvi_pilota + ' CANVIS'
      } else if (equip == 'blau') {
        this.equip_blau.canvi_pilota += 1
        str = 'CANVI PILOTA BLAUS: ' + this.equip_blau.canvi_pilota + ' CANVIS'
      }
      this.partida.feedback = str
      this.update()      

    },
    travesa(str) {
      this.partida.travesses = 'DONEN ' + str.toUpperCase()
      this.partida.feedback = this.partida.travesses
      this.update()
    },
    borrarTravessa() {
      this.partida.travesses = null
      this.partida.feedback = 'NO HI HA TRAVESSA'
      this.update()
    },
    tiempo() {
      this.temporizador = !this.temporizador
      if(this.temporizador) {
        if(this.partida.durades.length > 0 && this.durada != 0) {
          this.partida.durades.pop()
          this.update()
        }
          this.interval = setInterval(() => {
          this.durada += 1
          this.duradaMin = Math.floor(this.durada / 60)
          this.duradaSec = this.durada - this.duradaMin * 60
        }, 1000)
      } else {
        this.partida.durades.push(this.durada)
        this.partida.feedback = 'Durada del joc ' + this.formatDurada(this.durada)
        this.update()
        clearInterval(this.interval)
        }
    },
    netejarDurades() {
      this.partida.durades = []
      this.update
    },
    reset() {
      this.durada = 0
      this.duradaMin = 0
      this.duradaSec = 0
    },
    resetPartidaTemps() {
      this.partida.hora_inici = null
      this.partida.hora_final = null
      this.durada_total_str = '--'
      this.update()
    },
    formatDurada(item) {
      let joc = item
      let hr = Math.floor(joc / 3600)
      let resto = (joc % 3600)
      let min = Math.floor(resto / 60)
      let sec = Math.floor(joc % 60)
      let str = ''
      if (hr > 0) {
        str = hr.toString() + ' hores'
      }
      return str + ' ' + min.toString() + ' min ' + sec.toString() + ' seg'
    },
    iniciPartida(activo) {

      if(this.partida.hora_inici == null) {
        this.partida.hora_inici = Date.now()
      }
      this.temporizador_partida = activo
      this.partida.temporizador = activo
      if(activo) {
        this.partida.hora_final = null
        this.temps_total = setInterval(() => {
          this.durada_total_str =  this.calcular_tiempo(Date.now(), this.partida.hora_inici)
        }, 1000)
      } else if (!activo) {
          this.partida.hora_final = Date.now()
          this.partida.travesses = ''
          this.partida.feedback = 'Durada de la partida ' + this.durada_total_str
          clearInterval(this.temps_total)
      }
      this.update()
      
    },
    actualizar_durada() {
      let actual = this.partida.hora_final == null ? Date.now() : this.partida.hora_final
      
      if (this.partida.hora_inici) {
        this.durada_total_str = this.calcular_tiempo(actual, this.partida.hora_inici)
      } else {
        this.furada_total_str = '--'
      }
    },
    calcular_tiempo(actual, inicio) {
      let tiempo_actual = actual / 1000
      let tiempo_inicio = inicio / 1000
      /* let tiempo = Math.round(tiempo_actual - tiempo_inicio) 
      let tiempo_min = Math.floor(tiempo / 60)
      let tiempo_sec = tiempo - (tiempo_min * 60)
      return tiempo_min.toString() + ' min : ' + tiempo_sec.toString() + ' seg' */
      return this.formatDurada(tiempo_actual - tiempo_inicio)
    },
    update() {
      this.$store.dispatch('updatePartida', this.partida)
    },
    setUser(user) {
      this.user = user
      if(this.user == null) {
        if(user == 'admin') {
          this.mostrar = true
        }
      }      
      if(user == 'editor') {
        this.mostrar = true
      }
      if (user == null || user == 'miembro') {
        this.mostrar = false
      }
    },
    
  },
  mounted() {
    /* if(this.hora_inici != null) {
      this.partida.temporizador = false
      this.temps_total = setInterval(() => {
          //this.hora_final_partida = null
          this.durada_total_str =  this.calcular_tiempo(Date.now(), this.partida.hora_inici)
        }, 1000)
    } */
  },
  watch: {
    temporizador_partida_flag(val) {
      if (val) {
        if (!this.temporizador_partida) {
          this.temporizador_partida = val
          this.temps_total = setInterval(() => {
            this.partida.hora_final = null
            this.durada_total_str =  this.calcular_tiempo(Date.now(), this.partida.hora_inici)
          }, 1000)
        }
      } else {
        if(this.temporizador_partida) {
          this.temporizador_partida = val
          clearInterval(this.temps_total)
          console.log('stop')
        }
      }
    },
    feedback: function() {
      //console.log('feedback')
      if (this.partida.feedback != null) {
        this.snackbar = false
        clearTimeout(this.timer)
        this.snackbar = true
        this.timer = setTimeout( () => {
          this.partida.feedback = null
          this.update()
        }, 10000)
      } else {
        this.snackbar = false
      } 

      
    }
  },
    /* travessaStr: function() {
      this.partida.feedback = this.travessaStr
      this.snackbar = true
    },
    canviPilotaRoig: function(val) {
      this.partida.feedback = 'Canvi pilota roig: ' + val + ' canvis'
      console.log(this.partida.feedback)
      this.snackbar = true
    }, */
    
  
  
  
  
  created() {
    if (this.partida.temporizador) {
      this.temporizador_partida = true
      this.temps_total = setInterval(() => {
        this.durada_total_str =  this.calcular_tiempo(Date.now(), this.partida.hora_inici)
      }, 1000)
    } else {
      this.actualizar_durada()
    }
    
  },


}
</script>

<style>
.caja {
  padding: 0 !important;
  margin: 0 !important;
}


</style>
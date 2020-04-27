<template>
  <v-container fluid>
    <div v-if="cargando" class="text-center mt-5">
      <h3 class="white--text">Carregant partides...</h3>
      <v-progress-circular indeterminate color="white"></v-progress-circular>
    </div>
    <div v-if="!cargando">
      <v-form ref="form">
        <v-sheet elevation="4" widht="100%" class="px-4">
          <v-row>
            <v-col>
              <h2 class="text-center">Editar Partida</h2>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center" cols="5">
              <v-select
                :items="lista"
                dense
                solo
                outlined
                v-model="tipo"
                label="Tipus de partida"
              ></v-select>
            </v-col>
            <v-col class="text-center" cols="7">
              <v-text-field
                dense
                label="Nom de la competició"
                placeholder="Nom de la competició"
                v-model="competicion"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <!-- <v-text-field
          label="Data"
          placeholder="Data de la partida"
          v-model="data"
            outlined></v-text-field>-->
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    dense
                    v-model="date"
                    label="Picker in menu"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-text-field
                dense
                label="Lloc"
                placeholder="Lloc de la partida i trinquet"
                v-model="lloc"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="Partida a"
                placeholder="Partida a..."
                dense
                v-model="partidaa"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="Tanteig inicial"
                placeholder="tanteig inicial"
                dense
                v-model="tanteig_inicial"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <!-- EQUIP ROIG ------------------------------------------------------------------- -->

          <v-row>
            <v-col cols="6">
              <v-col cols="12">
                <h3 class="text-center">Equip Roig</h3>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nom equip"
                  placeholder="Nom equip roig"
                  dense
                  v-model="nom_rojos"
                  outlined
                ></v-text-field>
                <h4>Components</h4>
              </v-col>
              <v-col
                cols="12"
                v-for="(jug, index) in equip_roig"
                :key="index"
                class="my-0 py-0"
              >
                <v-text-field
                  :label="posicion[index]"
                  :placeholder="posicion[index]"
                  dense
                  v-model="jug.nom"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" align="left" class="mt-0 mb-2 py-0">
                <v-btn fab dark color="red" x-small @click="addJugador('roig')">
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="12"><h4>Feridor</h4></v-col>

              <v-col
                cols="12"
                v-for="(jug, index) in lista_treta_roig"
                :key="index + 100"
                class="my-0 py-0"
              >
                <v-text-field
                  :label="lista_treta[index]"
                  :placeholder="lista_treta[index]"
                  dense
                  v-model="jug.nom"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" align="left" class="my-0 py-0">
                <v-btn fab dark color="red" x-small @click="addFeridor('roig')">
                  <v-icon>mdi-account-plus-outline</v-icon>
                </v-btn>
              </v-col>
            </v-col>

            <!-- EQUIP BLAU ------------------------------------------------------------------------ -->

            <v-col cols="6">
              <v-col cols="12">
                <h3 class="text-center">Equip Blau</h3>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nom equip"
                  placeholder="Nom equip blau"
                  dense
                  v-model="nom_blaus"
                  outlined
                ></v-text-field>

                <h4>Components</h4>
              </v-col>
              <v-col
                cols="12"
                v-for="(jug, index) in equip_blau"
                :key="index"
                class="my-0 py-0"
              >
                <v-text-field
                  :label="posicion[index]"
                  :placeholder="posicion[index]"
                  dense
                  v-model="jug.nom"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" align="right" class="mt-0 mb-2 py-0">
                <v-btn
                  dark
                  color="blue"
                  fab
                  x-small
                  @click="addJugador('blau')"
                >
                  <v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12"><h4>Feridor</h4></v-col>
              <v-col
                cols="12"
                v-for="(jug, index) in lista_treta_blau"
                :key="index + 200"
                class="my-0 py-0"
              >
                <v-text-field
                  :label="lista_treta[index]"
                  :placeholder="lista_treta[index]"
                  dense
                  v-model="jug.nom"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" align="right" class="mt-0 py-0">
                <v-btn
                  fab
                  dark
                  color="blue"
                  x-small
                  @click="addFeridor('blau')"
                >
                  <v-icon>mdi-account-plus-outline</v-icon>
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row></v-row>
          <v-row>
            <v-col cols="6" class="mx-auto" align="center">
              <v-btn
                @click="crearPartida"
                color="#317f5c"
                dark
                class="mr-2 mb-2"
                >crear partida</v-btn
              >
              <v-btn
                @click="crearGraella"
                color="#1d428a"
                dark
                class="mr-2 mb-2"
                >validar Graella</v-btn
              >
            </v-col>
          </v-row>
        </v-sheet>
      </v-form>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      graella: null,
      posicion: [
        "Jugador 1",
        "Jugador 2",
        "Jugador 3",
        "Jugador 4",
        "Jugador 5",
        "Jugador 6",
        "Jugador 7",
        "Jugador 8"
      ],
      competicion: null,
      lista_treta: ["Feridor 1", "Feridor 2"],
      lista: ["Raspall", "Escala i corda", "Galotxa", "Palma", "Llargues"],
      num_roig: 2,
      num_blau: 12,
      tipo: null,
      data: null,
      lloc: null,
      partidaa: 0,
      nom_rojos: null,
      nom_blaus: null,
      equip_roig: [],
      lista_treta_roig: [],
      equip_blau: [],
      lista_treta_blau: [],
      tanteig_inicial: 0,
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      jugador: {
        num: null,
        nom: null,
        est_ind: {
          colps: 0,
          errades: 0
        },
        caigudes: {
          total: 0,
          quinzes: 0
        },
        titular: true
      },
      treta_roig_nom: null,
      treta_blau_nom: null
    }
  },
  computed: {
    partida() {
      return this.$store.getters.buscarPartida(this.$route.params.id)
    },
    cargando() {
      let cargando = this.$store.getters.cargando
      return cargando
    },

    equipRoigLen() {
      return this.equip_roig.length
    },
    equipBlauLen() {
      return this.equip_blau.length
    },
    treta_roig() {
      let item = {
        num: this.equipRoigLen + 1,
        nom: this.treta_roig_nom,
        tretes: {
          directes: 0,
          faltes: 0
        }
      }
      return item
    },
    treta_blau() {
      let item = {
        num: 10 + this.equipBlauLen,
        nom: this.treta_blau_nom,
        tretes: {
          directes: 0,
          faltes: 0
        }
      }
      return item
    },
    jugadores() {
      return this.$store.getters.listaJugadores
    },
    listaJugadores() {
      return this.jugadores.filter(jug => {
        return jug.disciplina.includes(this.tipo) && jug.posicion != "Treta"
      })
    },
    listaTretes() {
      return this.jugadores.filter(jug => {
        return jug.disciplina.includes(this.tipo) && jug.posicion == "Treta"
      })
    }
  },
  methods: {
    cargaPartida() {
      let part = this.partida
      this.competicion = part.competicion
      this.id = part.id
      this.graella = part.graella
      this.tipo = part.tipo
      this.data = part.data
      this.lloc = part.lloc
      this.tanteig_inicial = part.equip_roig.punts
      this.partidaa = part.partidaa
      this.nom_rojos = part.equip_roig.nom_equip
      this.nom_blaus = part.equip_blau.nom_equip
      part.equip_roig.jugadors.forEach(jug => {
        this.equip_roig.push(jug)
      })
      part.equip_blau.jugadors.forEach(jug => {
        this.equip_blau.push(jug)
      })
      part.equip_roig.treta.forEach(jug => {
        this.lista_treta_roig.push(jug)
      })
      part.equip_blau.treta.forEach(jug => {
        this.lista_treta_blau.push(jug)
      })
    },
    addJugador(equip) {
      if (this.equipRoigLen <= 7 && equip == "roig") {
        this.equip_roig.push(this.addJugadorInfo(equip))
      } else if (this.equipBlauLen <= 7 && equip == "blau") {
        this.equip_blau.push(this.addJugadorInfo(equip))
      }
    },
    addFeridor(equip) {
      if (this.lista_treta_roig.length <= 1 && equip == "roig") {
        this.lista_treta_roig.push(this.addFeridorInfo(equip))
      }
      if (this.lista_treta_blau.length <= 1 && equip == "blau") {
        this.lista_treta_blau.push(this.addFeridorInfo(equip))
      }
    },
    // llargues  y palma juegan 5 vs 5. El resto 3 vs 3
    addJugadorInfo(equip) {
      let num = null
      let tit = true
      let max = this.tipo == "Palma" || this.tipo == "Llargues" ? 5 : 3
      if (equip == "roig") {
        num = this.num_roig
        num > max ? (tit = false) : (tit = true)
        this.num_roig++
      } else if (equip == "blau") {
        num = this.num_blau
        num > max + 10 ? (tit = false) : (tit = true)
        this.num_blau++
      }
      let item = {
        num: num,
        nom: null,
        est_ind: {
          colps: 0,
          errades: 0,
          colps_totals: 0
        },
        caigudes: {
          total: 0,
          quinzes: 0
        },
        titular: tit
      }
      return item
    },
    addFeridorInfo(equip) {
      let num = null
      if (equip == "roig") {
        num = this.lista_treta_roig[this.lista_treta_roig.length - 1].num + 1
      } else if (equip == "blau") {
        num = this.lista_treta_blau[this.lista_treta_blau.length - 1].num + 1
      }
      let item = {
        num: num,
        nom: null,
        tretes: {
          directes: 0,
          faltes: 0
        },
        titular: false
      }
      return item
    },
    nuevaPartida() {
      let partida = {
        id: this.$route.params.id,
        graella: this.graella,
        partidaa: this.partidaa,
        tipo: this.tipo,
        competicion: this.competicion,
        data: this.date,
        lloc: this.lloc,
        equip_roig: {
          nom_equip: this.nom_rojos || this.equip_roig[0].nom,
          jugadors: this.equip_roig,
          treta: this.lista_treta_roig,
          punts: parseInt(this.tanteig_inicial),
          canvi_pilota: 0,
          substitucions: 0
        },
        equip_blau: {
          nom_equip: this.nom_blaus || this.equip_blau[0].nom,
          jugadors: this.equip_blau,
          treta: this.lista_treta_blau,
          punts: parseInt(this.tanteig_inicial),
          canvi_pilota: 0,
          substitucions: 0
        }
      }
      return partida
    },
    validar() {
      let partida = this.nuevaPartida()
      this.$store.dispatch("actualizaPartida", partida)
      console.log(partida)
    },
    crearPartida() {
      this.graella = false
      this.validar()
    },
    crearGraella() {
      this.graella = true
      this.validar()
    }
  },
  mounted() {
    this.cargaPartida()
  }
}
</script>

<style></style>

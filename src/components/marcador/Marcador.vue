<template>
  <v-container fluid class="pb-0">
    <v-row>
      <v-col cols="12">
        <v-sheet elevation="4" width="300px" class="mx-auto">
          <v-col cols="12" align="center">
            <v-row>
              <v-col cols="3" class="pa-0">
                <h3 class="red--text py-1">{{ marcadorRojos }}</h3>
              </v-col>
              <v-col cols="3" class="pa-0">
                <h3 class="red white--text py-1">
                  {{ punto_str[marcador.punts_rojos] }}
                </h3>
              </v-col>
              <v-col cols="3" class="pa-0">
                <h3 class="blue white--text py-1">
                  {{ punto_str[marcador.punts_blaus] }}
                </h3>
              </v-col>
              <v-col cols="3" class="pa-0">
                <h3 class="blue--text py-1">{{ marcadorBlaus }}</h3>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="user == 'admin'" cols="12" class="mx-auto px-0">
            <v-row align="center">
              <v-col cols="6" align="center" class="pa-0">
                <v-btn dark class="red" small @click="punto('roig', 1)"
                  >+</v-btn
                >
                <v-btn dark class="red" small @click="punto('roig', -1)"
                  >-</v-btn
                >
              </v-col>
              <v-col cols="6" align="center" class="pa-0">
                <v-btn dark class="blue" small @click="punto('blau', 1)"
                  >+</v-btn
                >
                <v-btn dark class="blue" small @click="punto('blau', -1)"
                  >-</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-sheet>
      </v-col>
      <v-col cols="3" align="center" class="mx-auto pb-0 px-0">
        <h3 class="white--text">PARCIALS JOCS</h3>
        <v-divider dark></v-divider>
        <h5 class="white--text mt-2">
          {{ parcial_jocs.length }} a 0 per als {{ parcial_jocs[0] }}
        </h5>
      </v-col>
      <v-divider dark vertical></v-divider>

      <v-col cols="8" align="center" class="mx-auto pb-0 px-0">
        <h3 class="white--text">PARCIAL PUNTS</h3>
        <v-divider dark></v-divider>
        <v-row>
          <v-col cols="4" align="center" class="mx-auto pb-0">
            <h4 class="white--text">Parcial actual</h4>
            <h5 class="mb-1 white--text">{{ parcial_punts_actual }}</h5>
          </v-col>
          <v-col cols="8" class="mx-auto pb-0">
            <h4 class="white--text">Parcial per jocs</h4>
            <h5 class="mb-1 white--text">{{ parcial_punts_total_jocs }}</h5>
            <span v-for="i in joc_actual" :key="i">
              <v-btn x-small rounded @click="parcialPerJocs(i)">{{ i }}</v-btn>
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider dark class="mt-4"></v-divider>
  </v-container>
</template>

<script>
//import Vue from 'vue'

export default {
  data() {
    return {
      punto_str: ["NET", "15", "30", "VAL"],
      parcial_jocs_temp: [],
      parcial_punts_total: " -- ",
      parcial_punts_total_jocs: " -- "
    }
  },
  computed: {
    partida() {
      return this.$store.getters.partida
    },
    marcador_total() {
      return this.$store.getters.getMarcadorActivo
    },
    marcador() {
      /* return this.partida.marcador */
      /* return this.$store.getters.getMarcador[0].marcador */
      return this.marcador_total.marcador
    },
    marcadorRojos() {
      return this.marcador.jocs_rojos * this.incremento
    },
    marcadorBlaus() {
      return this.marcador.jocs_blaus * this.incremento
    },
    parcial_jocs() {
      return this.parcials.jocs
    },
    parcial_actual() {
      return this.parcials.parcial_actual
    },
    parcial_punts() {
      return this.parcials.punts
    },
    parcials() {
      return this.marcador_total.parcials
    },
    joc_actual() {
      return this.parcials.joc_actual
    },
    parcial_punts_actual() {
      return this.parcial_punts_total
    },
    user() {
      return this.$store.getters.rolUser
    },
    id() {
      return this.marcador_total.id_partida
    },
    incremento() {
      let inc = 5
      if (this.partida.tipo == "Palma" || this.partida.tipo == "Llargues") {
        inc = 1
      }
      return inc
    }
  },
  methods: {
    punto(equipo, valor) {
      let marc = this.marcador
      let numJoc = "joc" + this.joc_actual
      if (equipo == "roig") {
        if (valor > 0) {
          if (
            this.marcador.jocs_rojos <
            this.partida.partidaa / this.incremento
          ) {
            marc.punts_rojos += valor
            if (
              this.parcial_actual[this.parcial_actual.length - 1] == "blaus"
            ) {
              this.parcials.parcial_actual = []
            }
            this.parcial_actual.push("rojos")
            this.parcials.punts[numJoc].push("rojos")
          }
        } else {
          marc.punts_rojos += valor
          this.parcial_actual.pop()
          this.parcials.punts[numJoc].pop()
        }
        if (marc.punts_rojos == 3 && marc.punts_blaus == 3) {
          marc.punts_rojos = 2
          marc.punts_blaus = 2
        }
        if (marc.punts_rojos > 3) {
          marc.punts_rojos = 0
          this.juego(equipo, valor)
        } else if (marc.jocs_rojos == 0 && marc.punts_rojos < 0) {
          marc.punts_rojos = 0
        } else if (marc.punts_rojos < 0) {
          marc.punts_rojos = 3
          this.juego(equipo, valor)
        }
      } else if (equipo == "blau") {
        if (valor > 0) {
          if (
            this.marcador.jocs_blaus <
            this.partida.partidaa / this.incremento
          ) {
            marc.punts_blaus += valor
            if (
              this.parcial_actual[this.parcial_actual.length - 1] == "rojos"
            ) {
              this.parcials.parcial_actual = []
            }
            this.parcial_actual.push("blaus")
            this.parcials.punts[numJoc].push("blaus")
          }
        } else {
          marc.punts_blaus += valor
          this.parcial_actual.pop()
          this.parcials.punts[numJoc].pop()
        }
        if (marc.punts_rojos == 3 && marc.punts_blaus == 3) {
          marc.punts_rojos = 2
          marc.punts_blaus = 2
        }
        if (marc.punts_blaus > 3) {
          marc.punts_blaus = 0
          this.juego(equipo, valor)
        } else if (marc.jocs_blaus == 0 && marc.punts_blaus < 0) {
          marc.punts_blaus = 0
        } else if (marc.punts_blaus < 0) {
          marc.punts_blaus = 3
          this.juego(equipo, valor)
        }
      }

      this.updateMarcador()
    },
    juego(equipo, valor) {
      let marc = this.marcador

      if (equipo == "roig") {
        marc.jocs_rojos += valor
        marc.punts_blaus = 0
        if (valor > 0) {
          if (
            this.parcial_jocs_temp[this.parcial_jocs_temp.length - 1] == "blaus"
          ) {
            this.parcial_jocs_temp = []
          }
          this.parcial_jocs_temp.push("rojos")
          this.parcial_punts_temp = []
          this.parcials.joc_actual++
          let numJoc = "joc" + this.joc_actual
          this.parcials.punts = { ...this.parcials.punts, [numJoc]: [] }
        } else {
          this.parcial_jocs_temp.pop()
          var str = "joc" + this.joc_actual
          delete this.parcials.punts[str]
          this.parcials.joc_actual--
          if (this.parcials.joc_actual == 0) {
            this.parcials.joc_actual = 1
          }
        }
        if (marc.jocs_rojos < 0) {
          marc.jocs_rojos = 0
        }
      } else if (equipo == "blau") {
        marc.jocs_blaus += valor
        marc.punts_rojos = 0
        if (valor > 0) {
          if (
            this.parcial_jocs_temp[this.parcial_jocs_temp.length - 1] == "rojos"
          ) {
            this.parcial_jocs_temp = []
          }
          this.parcial_jocs_temp.push("blaus")

          this.parcial_punts_temp = []
          this.parcials.joc_actual++
          let numJoc = "joc" + this.joc_actual
          this.parcials.punts = { ...this.parcials.punts, [numJoc]: [] }
        } else {
          this.parcial_jocs_temp.pop()
          str = "joc" + this.joc_actual
          delete this.parcials.punts[str]
          this.parcials.joc_actual--
          if (this.parcials.joc_actual == 0) {
            this.parcials.joc_actual = 1
          }
        }
        if (marc.jocs_blaus < 0) {
          marc.jocs_blaus = 0
        }
      }
      this.parcials.jocs = this.parcial_jocs_temp
      this.updateMarcador()
    },
    update_parcial_punts() {
      let roig = 0
      let blau = 0
      this.parcial_actual.forEach(punt => {
        if (punt == "rojos") {
          roig++
        } else if (punt == "blaus") {
          blau++
        }
      })
      let equip =
        roig == blau ? " " : roig > blau ? "per als rojos" : "per als blaus"
      this.parcial_punts_total = roig + " a " + blau + " " + equip
      this.parcial_punts_total_jocs = "--"
    },
    parcialPerJocs(joc) {
      let roig = 0
      let blau = 0
      /* let temp = [...this.parcials.punts].splice(this.parcials.punts.length-joc, joc) */
      let temp = Object.values(this.parcials.punts)

      temp.splice(0, this.joc_actual - joc)
      if (joc > temp.length) {
        this.parcial_punts_total = " -- "
      } else {
        temp.forEach(joc => {
          joc.forEach(punt => {
            if (punt == "rojos") {
              roig++
            } else if (punt == "blaus") {
              blau++
            }
          })
        })
        let equip =
          roig == blau ? " " : roig > blau ? "per als rojos" : "per als blaus"
        let joc_str =
          joc == 1 ? " en el últim joc" : " en els últims " + joc + " jocs"
        this.parcial_punts_total_jocs =
          "Parcial de " + roig + " a " + blau + " " + equip + joc_str
      }
    },
    /* update() {
      this.$store.dispatch('updatePartida', this.partida)
    }, */
    updateMarcador() {
      this.$store.dispatch("updateMarcador", this.marcador_total)
    }
  },
  mounted() {
    //this.parcial_jocs_temp = this.parcial_jocs
  },
  watch: {
    parcial_actual: function() {
      this.update_parcial_punts()
    }
  }
}
</script>

<style></style>

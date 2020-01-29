<template>
<v-container fluid>
  <v-row>
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
        <v-col  v-if="user == 'admin'" cols="12"  class="mx-auto px-0">
          <v-row align="center">
            <v-col cols="6" align="center" class="pa-0">
              <v-btn dark class="red" small @click="punto('roig', 1)">+</v-btn>
              <v-btn dark class="red" small @click="punto('roig', -1)">-</v-btn>
            </v-col>
            <v-col cols="6" align="center" class="pa-0">
              <v-btn dark class="blue" small @click="punto('blau', 1)">+</v-btn>
              <v-btn dark class="blue" small @click="punto('blau', -1)">-</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-sheet>
    </v-col>
    <v-col cols="6" align="center" class="mx-auto">
      <h3>PARCIALS JOCS</h3>
      <h5>{{ parcial_jocs.length }} a 0 per als {{ parcial_jocs[0]}}</h5>
    </v-col>  
    <v-col cols="6" align="center" class="mx-auto">
      <h3>PARCIAL PUNTS</h3>
      <h5 class="mb-1">{{ parcial_punts_actual }}</h5>
      <v-divider class="my-1"></v-divider>
      <span v-for="i in joc_actual   " :key="i">
        <v-btn x-small rounded @click="parcialPerJocs(i)">{{ i  }}</v-btn>
      </span>
      <h5 class="mb-1">{{ parcial_punts_total_jocs }}</h5>
    </v-col>  
  </v-row>
  
</v-container>

  
</template>

<script>
//import Vue from 'vue'

export default {
  data() {
    return {
      punto_str: ['NET', '15', '30', 'VAL'],
      parcial_jocs_temp: [],
      parcial_punts_total: ' -- ',
      parcial_punts_total_jocs: ' -- ',
    }
  },
  computed: {
    partida() {
      return this.$store.getters.partida
    },
    marcador() {
      return this.partida.marcador
    },
    parcial_jocs() {
      return this.partida.parcials.jocs
    },
    parcial_actual() {
      return this.partida.parcials.parcial_actual
    },
    parcial_punts() {
      return this.partida.parcials.punts
    },
    parcials() {
      return this.partida.parcials
    },
    joc_actual() {
      return this.parcials.joc_actual
    },
    parcial_punts_actual() {
      return this.parcial_punts_total
    },
    user() {
      return this.$store.getters.rolUser
    }

  },
  methods: {
    punto(equipo, valor) {
      let marc = this.marcador
      let numJoc = 'joc' + this.joc_actual
      if(equipo == 'roig') {
        marc.punts_rojos += valor
        if (valor > 0) { 
          if(this.parcial_actual[this.parcial_actual.length -1] == 'blaus') {
            this.partida.parcials.parcial_actual = []
          }
          this.parcial_actual.push('rojos')
          this.parcials.punts[numJoc].push('rojos')
        } else {
          this.parcial_actual.pop()
          this.parcials.punts[numJoc].pop()
          
        }
        if(marc.punts_rojos == 3 && marc.punts_blaus == 3) {
          marc.punts_rojos = 2
          marc.punts_blaus = 2
        }
        if(marc.punts_rojos > 3) {
          marc.punts_rojos = 0
          this.juego(equipo, valor)
        } else if(marc.jocs_rojos == 0 && marc.punts_rojos < 0) {
          marc.punts_rojos = 0
        } else if ( marc.punts_rojos < 0) {
            marc.punts_rojos = 3
            this.juego(equipo, valor)
        }
      } else if (equipo == 'blau') {
        marc.punts_blaus += valor
        if (valor > 0) {
          if(this.parcial_actual[this.parcial_actual.length -1] == 'rojos') {
            this.partida.parcials.parcial_actual = []
          }
          this.parcial_actual.push('blaus')
          this.parcials.punts[numJoc].push('blaus')
        } else {
          this.parcial_actual.pop()
          this.parcials.punts[numJoc].pop()
        }
        if(marc.punts_rojos == 3 && marc.punts_blaus == 3) {
          marc.punts_rojos = 2
          marc.punts_blaus = 2
        }
        if (marc.punts_blaus > 3) {
          marc.punts_blaus = 0
          this.juego(equipo, valor)
        } else if(marc.jocs_blaus == 0 && marc.punts_blaus < 0) {
          marc.punts_blaus = 0
        } else if ( marc.punts_blaus < 0) {
          marc.punts_blaus = 3
          this.juego(equipo, valor)
        }
      }

      this.update()
    },
    juego(equipo, valor) {
      let marc = this.marcador
      
      
      if(equipo == 'roig') {
        marc.jocs_rojos += valor
        marc.punts_blaus = 0
        if (valor > 0) {
          if(this.parcial_jocs_temp[this.parcial_jocs_temp.length-1] == 'blaus') {
            this.parcial_jocs_temp = []
          } 
          this.parcial_jocs_temp.push('rojos')
          this.parcial_punts_temp = []
          this.parcials.joc_actual ++
          let numJoc = 'joc' + this.joc_actual
          this.parcials.punts = { ...this.parcials.punts,
            [numJoc]: []
          }
        } else {
          this.parcial_jocs_temp.pop()
          var str = 'joc'+this.joc_actual
          delete this.parcials.punts[str]
          this.parcials.joc_actual --
        }
        if(marc.jocs_rojos < 0) {
          marc.jocs_rojos = 0
        }
      } else if(equipo == 'blau') {
        marc.jocs_blaus += valor
        marc.punts_rojos = 0
        if (valor > 0) {
          if(this.parcial_jocs_temp[this.parcial_jocs_temp.length-1] == 'rojos') {
            this.parcial_jocs_temp = []
          } 
          this.parcial_jocs_temp.push('blaus')
          
          this.parcial_punts_temp = []
          this.parcials.joc_actual ++
          let numJoc = 'joc' + this.joc_actual
          this.parcials.punts = { ...this.parcials.punts,
            [numJoc]: []
          }
        } else {
          this.parcial_jocs_temp.pop()
          str = 'joc'+this.joc_actual 
          delete this.parcials.punts[str]
          this.parcials.joc_actual --
        }
        if(marc.jocs_blaus < 0) {
          marc.jocs_blaus = 0
        }
      }
      this.parcials.jocs = this.parcial_jocs_temp
      this.update()
      
    },
    update_parcial_punts() {
      let roig = 0
      let blau = 0
      this.parcial_actual.forEach(punt => {
          if(punt == 'rojos') {
              roig ++
          } else if(punt == 'blaus') {
              blau ++
          }
      })
      let equip = roig == blau ? ' ' : roig > blau ? 'per als rojos' : 'per als blaus'
      this.parcial_punts_total = 'Parcial de ' + roig + ' a ' + blau + ' ' + equip
      this.parcial_punts_total_jocs = '--'
    },
    parcialPerJocs(joc) {
      let roig = 0
      let blau = 0
      /* let temp = [...this.parcials.punts].splice(this.parcials.punts.length-joc, joc) */
      let temp = Object.values(this.parcials.punts)
      
      temp.splice(0, this.joc_actual - joc )
      if(joc > temp.length) {
        this.parcial_punts_total = ' -- '
      } else {
        temp.forEach(joc => {
          joc.forEach(punt => {
            if(punt == 'rojos') {
                    roig ++
                } else if(punt == 'blaus') {
                    blau ++
                }
            })
          })
        let equip = roig == blau ? ' ' : roig > blau ? 'per als rojos' : 'per als blaus'
        let joc_str = joc == 1 ? ' en el últim joc' : ' en els últims ' + joc + ' jocs'
        this.parcial_punts_total_jocs = 'Parcial de ' + roig + ' a ' + blau + ' ' + equip + joc_str
      }
    },
    update() {
      this.$store.dispatch('updatePartida', this.partida)
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

<style>

</style>
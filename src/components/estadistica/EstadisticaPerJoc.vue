<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="ma-0 pa-0">
        <v-sheet elevation="4" width="100%" class="mx-auto pb-4 pl-4 pt-2">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header><h2>Estadistica per joc</h2></v-expansion-panel-header>
              <v-expansion-panel-content>
                <h4 class="mt-2">Encerts</h4>
                <v-data-table
                  dense
                  hide-default-footer
                  :headers="headers"
                  :items="itemsEncerts"
                  item-key="nom">
                </v-data-table>
                <v-divider class="my-2"></v-divider>
                <h4 class="my-1">Errades</h4>
                <v-data-table
                  dense
                  hide-default-footer
                  :headers="headers"
                  :items="itemsErrades"
                  item-key="nom">
                </v-data-table>
                <h4 class="my-1">Tretes</h4>
                <v-data-table
                  dense
                  hide-default-footer
                  :headers="headers"
                  :items="itemsTretes"
                  item-key="nom">
                </v-data-table>
                <h4 class="my-1">Errades de treta</h4>
                <v-data-table
                  dense
                  hide-default-footer
                  :headers="headers"
                  :items="itemsErradesTreta"
                  item-key="nom">
                </v-data-table>



              </v-expansion-panel-content>
            </v-expansion-panel>

          </v-expansion-panels>
          
          <!-- <h4>{{ aciertos }}</h4>-->
          
            
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import Vue from 'vue'

export default {
  data() {
    return {

    }
  },

  computed: {
    partida() {
      return this.$store.getters.buscarPartida(this.$route.params.id)
      //return this.$store.getters.partida
    },
    punts() {
      return this.partida.equip_roig.treta.tretes.directes
    },
    aciertos() {
      //console.log(this.partida.punts_per_joc)
      return this.partida.punts_per_joc
    },
    errades() {
      return this.partida.errades_per_joc
    },
    rojos() { 
      return this.partida.equip_roig.jugadors.filter(item => {
        return item.nom != null 
      })
    },
    blaus() { 
      return this.partida.equip_blau.jugadors.filter(item => {
        return item.nom != null 
      })
    },
    jugadors() {
      let obj = this.rojos.concat(this.blaus)
      //console.log(obj.length)
      return obj
    },
    jugadorsTreta() {
      let obj = []
      obj.push(this.partida.equip_roig.treta)
      obj.push(this.partida.equip_blau.treta)
      return obj
    },
    tretes() {
      return this.partida.tretes_per_joc
    },
    erradesTreta() {
      return this.partida.errades_treta_per_joc
    },

    headers() {
      
      let keys = Object.keys(this.aciertos)
      //let values = Object.values(this.aciertos)
      //console.log(keys, values)
      var j = 1
      let obj = [{
        text: '',
        value: 'nom'
      }]
      keys.forEach(val => {
        let str = ''
        j < 10 ?  str = 'Joc 0' + j : str = 'Joc ' + j
        let temp = {
        text: str,
        value: val}
        obj.push(temp)
        j++
      })
      return obj
    },
    itemsEncerts() {
      let keys = Object.keys(this.aciertos)
      //let values = Object.values(this.aciertos)
      let obj = []
      let temp = {}
      this.jugadors.forEach(jug => {
        temp = {
          nom: jug.nom
        }
        keys.forEach(joc => {
          let num = this.buscaEncerts(jug.nom, this.aciertos[joc])
          temp[joc] = num
        })
        obj.push(temp)
      })
      return obj
    },
    itemsErrades() {
      let keys = Object.keys(this.aciertos)
      //let values = Object.values(this.aciertos)
      let obj = []
      let temp = {}
      this.jugadors.forEach(jug => {
        temp = {
          nom: jug.nom
        }
        keys.forEach(joc => {
          let num = this.buscaEncerts(jug.nom, this.errades[joc])
          temp[joc] = num
        })
        obj.push(temp)
      })
      return obj
    },
    itemsTretes() {
      let keys = Object.keys(this.aciertos)
      //let values = Object.values(this.aciertos)
      //console.log(keys, values)
      let obj = []
      let temp = {}
      this.jugadorsTreta.forEach(jug => {
        temp = {
          nom: jug.nom
        }
        keys.forEach(joc => {
          let num = this.buscaEncerts(jug.nom, this.tretes[joc])
          temp[joc] = num
        })
        obj.push(temp)
      })
      return obj
    },
    itemsErradesTreta() {
      let keys = Object.keys(this.aciertos)
      //let values = Object.values(this.aciertos)
      let obj = []
      let temp = {}
      this.jugadorsTreta.forEach(jug => {
        temp = {
          nom: jug.nom
        }
        keys.forEach(joc => {
          let num = this.buscaEncerts(jug.nom, this.erradesTreta[joc])
          temp[joc] = num
        })
        obj.push(temp)
      })
      return obj
    },
    test() {
      return this.buscaEncerts(this.rojos[1].nom, this.tretes['joc1'])
    }
      


  },
  methods: {
    buscaEncerts(jugador, arr) {
      let i = 0
      arr.forEach(element => {
        //console.log(element, jugador)
        if (element == jugador) i++ 
      });
      return i == 0 ? '-' : i
    },
    jugadorEncerts(jugador) {
      let jug = {
        nom: jugador,
        joc1: 4,
        joc2: 4,
        joc3: 4,
        joc4: 4,
        joc5: 4,
      }
      return jug
    }

  },
  /* watch: {
    punts: function(val) {
      console.log(val)
    }
  } */

}
</script>

<style>

</style>
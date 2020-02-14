<template>
  <v-container fluid>
    <v-row>
      <v-col align="center">
        <v-btn x-small @click="conectar">CONECTAR</v-btn>
        <v-icon v-if="status == 200" :color="color" class="mx-auto">mdi-check-network-outline</v-icon>
        <v-icon v-if="status != 200" :color="color" class="mx-auto">mdi-close-network-outline</v-icon>
        {{ status}}
      </v-col>
    </v-row>
    
  </v-container>

  
</template>

<script>
const axios = require('axios').default

export default {
props: [
  'datos'
],
data() {
  return {

  }
},
computed: {
  status() {
    return this.$store.getters.getStatus
  },  
  color() {
    let color = ''
    if (this.status == 200) {
      color ='green'
    } else {
      color = 'red'
    }
    return color
  },
  partida() {
    return this.$store.getters.partida
  },
  urlColps() {
    return this.$store.getters.getUrlColps
  },
  urlTretes() {
    return this.$store.getters.getUrlTretes
  },
  variantsColps() {
    return this.$store.getters.getVariantsColps
  },
  variantsTretes() {
    return this.$store.getters.getVariantsTretes
  },
  est_rojos() {
    return this.partida.equip_roig.jugadors
  },
  jugadores() {
      let arr = []
      let jug = this.partida.equip_roig.jugadors.concat(this.partida.equip_blau.jugadors)
      jug.forEach(item => {
        arr.push(item.nom)
      })
      //console.log(arr)

      return arr
    },
},
methods: {
  conectar() {
    this.$store.dispatch('updateVariants')
  },
  buscaJugador(nom) {
      return this.jugadores.indexOf(nom)
    },
    liveUpdateColp() {
      let url = ''
      let data = ''
      if(this.datos.nom != '' && this.status == 200) {
        if(this.datos.tipo == 'colps') {
          let id = this.variantsColps[this.jugadores.indexOf(this.datos.nom)]
          url = this.urlColps + id + '/'
          let str = "Colps guanyadors, " + this.datos.est.colps + "\nErrades no forçades, " + this.datos.est.errades
          data = {"input-values": {"tvGroup_Content__Scores_TypeMultiline": str}}
        } else if (this.datos.tipo == 'tretes') {
          let id = this.variantsTretes[this.jugadores.indexOf(this.datos.nom)]
          url = this.urlTretes + id + '/'
          let str = "Tretes directes," + this.datos.est.colps + "\nFaltes de treta, "  + this.datos.est.errades
          data = {"input-values": {"tvGroup_Content__Scores_TypeMultiline": str}}
        }


        
        //let data = {"name": str, "input-values": {"tvGroup_Content__Titles": str + ',,'}}
        /* console.log(str)
        console.log(data, url) */
        this.liveUpdate(data, url)
      }
      
    },
    liveUpdate(data, url) {
      axios({
        method:'PUT',
        url: url,
        headers: {'Content-Type': 'application/json'},
        data: data
      })
      /* .then(res => console.log('res' + res))
      .catch(err=> console.error(err)) */
    }
},
watch: {
  datos: function() {
    this.liveUpdateColp()
  }
}

}
</script>

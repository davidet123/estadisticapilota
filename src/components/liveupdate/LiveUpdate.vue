<template>
  <v-container fluid class="my-0">
    <v-row class="my-0">
      <v-col align="center" class=" py-0 my-0">
        <v-icon v-if="getLive == true" :color="color" class="mx-auto">mdi-check-network-outline</v-icon>
        <v-icon v-if="getLive == false" :color="color" class="mx-auto">mdi-close-network-outline</v-icon>
      </v-col>
    </v-row>
    
  </v-container>

  
</template>

<script>
const axios = require('axios').default

export default {
props: [
  'datos',
  'canvis',
  'durada',
  'travessa'
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
    if (this.getLive) {
      color ='green'
    } else {
      color = 'red'
    }
    return color
  },
  entrevista() {
    return this.$store.getters.getEntrevista
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
  urlCanvis() {
    return this.$store.getters.getUrlCanvis
  },
  urlDurada() {
    return this.$store.getters.getUrlDurada
  },
  urlTravessa() {
    return this.$store.getters.getUrlTravessa
  },
  urlEntrevista() {
    return this.$store.getters.getUrlEntrevista
  },
  variantsColps() {
    return this.$store.getters.getVariantsColps
  },
  variantsTretes() {
    return this.$store.getters.getVariantsTretes
  },
  variantsCanvis() {
    return this.$store.getters.getVariantsCanvis
  },
  variantsDurada() {
    return this.$store.getters.getVariantsDurada
  },
  variantsTravessa() {
    return this.$store.getters.getVariantsTravessa
  },
  variantsEntrevista() {
    return this.$store.getters.getVariantsEntrevista
  },
  est_rojos() {
    return this.partida.equip_roig.jugadors
  },
  getLive() {
    return this.$store.getters.getLive
  }
  /* jugadores() {
      let arr = []
      let jug = this.partida.equip_roig.jugadors.concat(this.partida.equip_blau.jugadors)
      jug.forEach(item => {
        arr.push(item.nom)
      })

      return arr
    }, */
},
methods: {
 /*  conectar() {
    this.$store.dispatch('updateVariants')
  },
  buscaJugador(nom) {
      return this.jugadores.indexOf(nom)
    }, */
  liveUpdateColp(tipo) {
    if(this.getLive) {

      let url = ''
      let data = ''
      if(tipo == 'est') {
        if(this.datos.nom != '' && this.status == 200) {
          if(this.datos.tipo == 'colps') {
            let id = this.variantsColps.find(item => {
              return item.attributes.name == this.datos.nom
            })
            url = this.urlColps + id.id + '/'
            let str = "Colps guanyadors, " + this.datos.est.colps + "\nErrades no forçades, " + this.datos.est.errades
            data = {"input-values": {"tvGroup_Content__Scores_TypeMultiline": str}}
            //console.log(url)
          } else if (this.datos.tipo == 'tretes') {
            let id = this.variantsTretes.find(item => {
              return item.attributes.name == this.datos.nom
            })
            url = this.urlTretes + id.id + '/'
            let str = "Tretes directes," + this.datos.est.colps + "\nFaltes de treta, "  + this.datos.est.errades
            data = {"input-values": {"tvGroup_Content__Scores_TypeMultiline": str}}
          } 
        }
      } else if (tipo == 'canvi') {
        if(this.canvis != '' && this.status == 200) {
          let id = this.variantsCanvis.find(item => {
            return item.attributes.name == 'CAMVIS PIL ROJOS / BLAUS'
          })
          url = this.urlCanvis + id.id + '/'
          data = {"input-values": {"tvGroup_Content__Scores_TypeMultiline": this.canvis}}
          //console.log(url)
        }
        //let data = {"name": str, "input-values": {"tvGroup_Content__Titles": str + ',,'}}
        /* console.log(str)
        console.log(data, url) */
      } else if (tipo == 'durada') {
        if(this.durada != '' && this.status == 200) {
          let id = this.variantsDurada.find(item => {
            return item.attributes.name == 'duracio joc'
          })
          url = this.urlDurada + id.id + '/'
          data = {"input-values": {"tvGroup_Content__Scores_TypeMultiline": this.durada}}
          //console.log(url)
        }
      } else if (tipo == 'travessa') {
        if(this.travessa != '' && this.status == 200) {
          let id = this.variantsTravessa.find(item => {
            return item.attributes.name == 'TRAVESSES'
          })
          //console.log(id)
          url = this.urlTravessa + id.id + '/'
          data = {"input-values": {"tvGroup_Content__Scores_TypeMultiline": this.travessa}}
        }
      } else if (tipo == 'entrevista') {
        //let id = 'ABCE3537-31ED-4E3F-9C71-C8EECCE58363'
        let id = this.variantsEntrevista.find(item => {
            return item.attributes.name == 'ENTREVISTA'
          })
        url = this.urlEntrevista + id.id + '/'
        data = {"input-values": {"tvGroup_Content__Title": this.entrevista.titulo, "tvGroup_Content__Subtitle": this.entrevista.subtitulo}}
        //console.log(url)
      }

      
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
/* watch: {
  datos: function() {
    this.liveUpdateColp('est')
  },
  canvis: function() {
    this.liveUpdateColp('canvi')
  },
  durada: function() {
    this.liveUpdateColp('durada')
  },
  travessa: function() {
    this.liveUpdateColp('travessa')
  },
  entrevista: function() {
    this.liveUpdateColp('entrevista')
  }

} */

}
</script>

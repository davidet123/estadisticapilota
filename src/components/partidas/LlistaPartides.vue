<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="ml-3">PARTIDES SEGUENTS</h3>
        <v-sheet elevation="4" v-for="partida in partides_seguents" :key="partida.id" class="mb-1">
          <v-row class="mx-0 listado" @click="goto(partida.id)">
            <v-col cols="8">
              <h3>{{ partida.equip_roig.nom_equip }} vs {{ partida.equip_blau.nom_equip }}</h3>
              <h5>{{ partida.tipo }} | {{ partida.data }}</h5>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col cols="12" align="center" class="my-0 py-0">
                  <h5>Partida a {{ partida.partidaa }}</h5>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="red--text">{{ partida.marcador.jocs_rojos * 5}}</h4>
                </v-col>
                <v-col cols="3" class="red my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[partida.marcador.punts_rojos] }}</h4>
                </v-col>
                <v-col cols="3" class="blue my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[partida.marcador.punts_blaus] }}</h4>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="blue--text">{{ partida.marcador.jocs_blaus * 5}}</h4>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-row>
      <v-col>
        <H3 class="ml-3">PARTIDES ACABADES</H3>
        <v-sheet elevation="4" v-for="partida in partides_acabades" :key="partida.id" class="mb-1">
          <v-row class="mx-0 listado" @click="goto(partida.id)">
            <v-col cols="8">
              <h3>{{ partida.equip_roig.nom_equip }} vs {{ partida.equip_blau.nom_equip }}</h3>
              <h5>{{ partida.tipo }} | {{ partida.data }}</h5>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col cols="12" align="center" class="my-0 py-0">
                  <h5>Partida a {{ partida.partidaa }}</h5>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="red--text">{{ partida.marcador.jocs_rojos * 5}}</h4>
                </v-col>
                <v-col cols="3" class="red my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[partida.marcador.punts_rojos] }}</h4>
                </v-col>
                <v-col cols="3" class="blue my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[partida.marcador.punts_blaus] }}</h4>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="blue--text">{{ partida.marcador.jocs_blaus * 5}}</h4>
                </v-col>
                <v-col cols="12" align="center" class="my-0 py-0">
                  <h5>{{ partida.travesses }}</h5>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      punto_str: ['NET', '15', '30', 'VAL'],  
    }
  },


  computed: {
    partides() {
      let lista =  this.$store.getters.partides
      return lista.sort((a, b) => (a.data < b.data) ? 1 : -1)
    },
    user() {
      return this.$store.getters.user
    },
    partides_acabades() {
      let lista = this.$store.getters.partides
      return lista.filter(partida => {
        return partida.data < this.fecha
      })
    },
    partides_seguents() {
      let lista = this.$store.getters.partides
      return lista.filter(partida => {
        return partida.data > this.fecha
      })
    },
    fecha() {
      return new Date().toISOString()

    }
  },
  methods: {
    goto(id) {
      this.$router.push('/resum/'+id)
    }
  }

}
</script>

<style>
.listado {
  border-left: 5px solid red;
  cursor: pointer
}

</style>
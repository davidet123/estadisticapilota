<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h3 class="ml-3 white--text">LLISTAT DE GRAELLES</h3>
        <v-sheet elevation="4" v-for="partida in graelles" :key="partida.id">
          <v-row class="mx-0 listado_actiu gris" @click="goto(partida.id)">
            <v-col
              cols="12"
              align="center"
              class="pb-0 d-sm-none"
              color="#f3f4f5"
            >
              <h4>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h4>
              <h5>{{ partida.tipo }} | {{ partida.data }}</h5>
            </v-col>
            <v-col cols="7" class="pl-4 d-none d-sm-block" color="#f3f4f5">
              <h4>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h4>
              <h5>{{ partida.tipo }} | {{ partida.data }}</h5>
            </v-col>
            <v-col cols="12" sm="5" class="pt-0">
              <v-row color="#f3f4f5">
                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-divider class="d-flex d-sm-none"></v-divider>
                  <h5>Partida a {{ partida.partidaa }}</h5>
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
  computed: {
    graelles() {
      let lista = this.$store.getters.partides
      return lista.filter(partida => {
        return partida.graella == true
      })
    }
  },
  methods: {
    goto(id) {
      this.$router.push("/editarpartida/" + id)
    }
  }
}
</script>

<style></style>

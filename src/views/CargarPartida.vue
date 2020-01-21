<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-center">Cargar Partida</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="text-center">{{ partides }}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      partidas: []
    }
  },
  computed: {
    
    partides() {
      let total = []
      let part = this.$store.getters.partides
      console.log(part.length)
      for( let i = 0; i< part.length; i++) {

        total.push(this.$store.getters.partida)
      }
      console.log(total)
      
      return total
    }
  }

}
</script>

<style>

</style>
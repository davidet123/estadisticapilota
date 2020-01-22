<template>

  <v-container>
    <div v-if="cargando" class="text-center mt-5">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-if="!cargando">
      <v-row>
        <v-col>
          <h2 class="text-center">Estadística Pilota</h2>
        </v-col>
      </v-row>
        <div class="botones_inicio" v-if="partidaCargada == null">
        <v-row>
          <v-col class="text-center">
            <v-btn class="mb-5"
            @click="goto('/afegirPartida')">Afegir Partida</v-btn>
            <br>
            <v-btn
            @click="goto('/cargarPartida')">Cargar Partida</v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-if="partidaCargada">
        
        <IntEstadistica />
        <!-- <p>
          {{ partida }}
        </p> -->      
           
      </div>
    </div>
    
  </v-container>
  
</template>

<script>
// @ is an alias to /src
import IntEstadistica from '@/components/estadistica/IntEstadistica'


export default {
  name: 'home',
  components: {
    IntEstadistica
  },
  data() {
    return{
      durada: 0,
      temporizador: false,
      interval: null,
      duradaMin: 0,
      duradaSec: 0
    }
  },
  computed: {
    cargando() {
      return this.$store.getters.cargando
    },
    partidaCargada() {
      return this.$store.getters.partida
    },
    /* partida() {
      return this.$store.getters.partida
    },
    jugadors_blau() {
      return this.partida.equip_blau.jugadors
    }, */
  },
  methods: {
    goto(link) {
      this.$router.push(link)
    },
    tiempo() {
      this.temporizador = !this.temporizador
      if(this.temporizador) {
          this.interval = setInterval(() => {
          this.durada += 1
          this.duradaMin = Math.floor(this.durada / 60)
          this.duradaSec = this.durada - this.duradaMin * 60
        }, 1000)
      } else {
        clearInterval(this.interval)
      }     
    },
    reset() {
      this.durada = 0
      this.duradaMin = 0
      this.duradaSec = 0
    }
  }
}
</script>

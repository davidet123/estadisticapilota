<template>

  <v-container fluid>
<!--     <v-parallax src="@/assets/imagenes/pilota_valenciana.jpg"> -->
    <div v-if="cargando" class="text-center mt-5">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div v-if="!cargando">
        <v-row>
          <v-col>
            <h2 class="text-center">ESTADÍSTICA PILOTA</h2>
          </v-col>
        </v-row>
      <div v-if="partidaCargada">
        <Marcador />
        <IntEstadistica />
        <Rotulos />
        <!-- <p>
          {{ partida }}
        </p> -->      
        <v-row>
          <v-col cols="12" align="center">
            <v-btn @click="goto('/resum/' + partidaCargada.id)">ESTADÍSTICA FINAL</v-btn>
          </v-col>
        </v-row>
           
      </div>
      <div v-if="!partidaCargada">  
        <v-row>
          <v-col align="center">
            <h3>Has de carregar una partida</h3>
            <v-btn @click="goto('/cargarpartida')">Carregar Partida</v-btn>
          </v-col>
        </v-row>

      </div>
    </div>
    
<!--     </v-parallax> -->
    
  </v-container>
  
</template>

<script>
// @ is an alias to /src
import IntEstadistica from '@/components/estadistica/IntEstadistica'
import Marcador from '@/components/marcador/Marcador'
import Rotulos from '@/components/rotulos/Rotulos'


export default {
  name: 'home',
  components: {
    IntEstadistica,
    Marcador,
    Rotulos
  },
  data() {
    return{
      durada: 0,
      temporizador: false,
      interval: null,
      duradaMin: 0,
      duradaSec: 0,
      snackbar: false,
      top: true
    }
  },
  computed: {
    cargando() {
      return this.$store.getters.cargando
    },
    partidaCargada() {
      return this.$store.getters.partida
    },
    user() {
      return this.$store.getters.userStatus
    },
    feedback() {
      return this.$store.getters.getFeedback
    }
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
  },
  watch: {
    /* feedback: function(val) {
      console.log(val)
      this.snackbar = true
    } */
  }
}
</script>
<style>
  .bg {
    background-image: url(https://verlanga.com/wp-content/uploads/pilota.jpg);
    background-size: cover;
    width: 100%
  }

</style>

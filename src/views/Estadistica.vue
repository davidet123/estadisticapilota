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
        
        <IntEstadistica />
        <!-- <p>
          {{ partida }}
        </p> -->      
           
      </div>
      <div v-if="!partidaCargada">  
        <v-row>
          <v-col>
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
    user() {
      return this.$store.getters.userStatus
    }
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
<style>
  .bg {
    background-image: url(https://verlanga.com/wp-content/uploads/pilota.jpg);
    background-size: cover;
    width: 100%
  }

</style>

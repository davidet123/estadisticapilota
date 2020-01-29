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
      <div class="botones_inicio" v-if="user">
        <v-sheet elevation="4" width="500px" class="mx-auto">
          <v-row>
            <v-col cols="12" class="text-center">
              <h3 v-if="partidaCargada">PARTIDA CARREGADA</h3>
              <h3 v-if="!partidaCargada">CAP PARTIDA CARREGADA</h3>
            </v-col>
            <v-divider></v-divider>
            <v-col v-if="partidaCargada" cols="4" offset="2" align="center">
              <h4>{{ partidaCargada.equip_roig.nom_equip }} vs {{ partidaCargada.equip_blau.nom_equip }}</h4>
            </v-col>
            <v-col v-if="partidaCargada" cols="4" align="center">
              <v-btn small color="success" @click="goto('/estadistica')">ESTADISTICA</v-btn>
            </v-col>
            <v-col v-if="!partidaCargada" cols="12" align="center">
              <v-btn small color="success" @click="goto('/cargarpartida')">CARREGAR PARTIDA</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </div>
      <div>
        <LlistaPartides />    
        <v-row>
          <v-col align="center">
            <v-btn v-if="!user" @click="goto('/login')">Log in</v-btn>
            <v-btn v-if="user" @click="goto('/cargarpartida')">Carregar Partida</v-btn>
          </v-col>
        </v-row>
           
      </div>
      
    </div>
<!--     </v-parallax> -->
    
    
  </v-container>
  
</template>

<script>
import LlistaPartides from '@/components/partidas/LlistaPartides'
// @ is an alias to /src



export default {
  name: 'home',
  components: {
    LlistaPartides
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
  },
  methods: {
    goto(link) {
      if(this.user) {
        this.$router.push(link)
      } else {
        this.$router.push('/login')
      }
      
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

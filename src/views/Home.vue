<template>

  <v-container>
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
      <p>
        {{ partida }}
      </p>

    </div>
    
  </v-container>
  <!-- <div class="home">








    <h1>Home</h1>
    <ul>
      <li>
        <p>Equip Roig</p>
        <p v-for="jugador in partida.equip_roig.jugadors" :key="jugador.num">
          {{ jugador.nom }}
        </p>
        <p> {{ partida.equip_roig.treta.nom }}</p>
      </li>
      <li>
        <p>Equip Blau</p>
        <p v-for="jugador in partida.equip_blau.jugadors" :key="jugador.num">
          {{ jugador.nom }}
        </p>
        <p> {{ partida.equip_blau.treta.nom }}</p>
      </li>
    </ul>
    <p>{{ partida }}</p>
    <p>{{ duradaMin }}min : {{ duradaSec }}seg</p>
    <v-btn @click="tiempo">{{ temporizador ? 'Stop' : 'Start'}} crono</v-btn>
    <v-btn @click="reset" :disabled="temporizador">Reset crono</v-btn>
  </div> -->
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
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
    partidaCargada() {
      return this.$store.getters.partidaCargada
    },
    partida() {
      return this.$store.getters.partida
    },
    jugadors_blau() {
      return this.partida.equip_blau.jugadors
    },
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

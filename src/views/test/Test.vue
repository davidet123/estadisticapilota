<template>
  <div>
    <div v-if="!cargando">
      <h1>Test</h1>
      <v-btn @click="goLive">Live</v-btn>
      {{ getInfo }}
      {{ test }}
      {{ info }}
      <v-form>
        <v-text-field v-model="data"></v-text-field>
      </v-form>
      <v-btn @click="cambiaNombre">Go</v-btn>
      <v-btn @click="getInfo">Get</v-btn>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
export default {
  data() {
    return {
      info: null,
      data: "",
      tiempo: null,
      tiempo_inicio: null,
      tiempo_final: null,
      test: [],
      colps: 34,
      connection: false
    };
  },
  computed: {
    cargando() {
      return this.$store.getters.cargando;
    },
    partida() {
      return this.$store.getters.partida;
    },
    jugadores() {
      return this.partida.equip_roig.jugadors.concat(
        this.partida.equip_blau.jugadors
      );
    },
    url() {
      //return 'http://192.168.1.92:8989/api/v1/documents/214331907/layers/BF993665-6A93-417F-92AF-52B3F2A3FCA5/'
      //return 'http://192.168.1.92:8989/api/v1/documents/859907009/layers/98687DF5-AB91-4405-9927-0D4AC2EC8C4A/'
      return "http://192.168.1.93:8989/api/v1/documents/150934436/layers/88FF6A34-0690-472C-86C4-838E855955C5/variants/";
      /* return "http://192.168.1.93:8989/api/v1/documents/"; */
    },
    temps_total() {
      let tiempo_actual = Date.now() / 1000;
      let tiempo_inicio = this.tiempo_inicio / 1000;

      let tiempo = Math.round(tiempo_actual - tiempo_inicio);
      let tiempo_min = Math.floor(tiempo / 60);
      let tiempo_sec = tiempo - tiempo_min * 60;

      return tiempo_min.toString() + " min : " + tiempo_sec.toString() + " seg";
    }
  },
  methods: {
    getInfo() {
      axios.get(this.url).then(res => {
        if (res.status == 200) {
          this.test = res.data.data.id;
          this.connection = true;
          this.info = res.data.data;
        }

        /* res.data.data.forEach(item => {
          this.test.push(item.id)
        }) */
        //console.log(res.data.data)
      });
    },
    goLive() {
      axios.post(this.url + "toggleLive");
      /* .then(res => console.log(res)) */
    },
    cambiaNombre() {
      let index = 0;
      this.info.forEach(el => {
        if (index < this.jugadores.length) {
          let url = this.url + el.id + "/";
          let str = this.jugadores[index].nom;
          let data = {
            name: str,
            "input-values": { tvGroup_Content__Titles: str + ",," }
          };
          this.$store.dispatch("go", { url, data });
          index++;
        }
      });

      /* let str = this.data
      let data = {"name": str, "input-values": {"tvGroup_Content__Titles": str}} */

      /* this.colps += 1
      let str = "Colps guanyadors, " + this.colps + "\nErrades no forçades, 3"
      const data = {"input-values":{"tvGroup_Content__Scores_TypeMultiline": str }} */
      /* this.go(data) */
    },
    go(url, cambio) {
      /* this.colps += 1
      let str = "Colps guanyadors, " + this.colps + "\nErrades no forçades, 3"
      const data = {"input-values":{"tvGroup_Content__Scores_TypeMultiline": str }} */
      if (this.connection) {
        axios({
          method: "PUT",
          url: url,
          headers: { "Content-Type": "application/json" },
          data: cambio
        });
        /* .then(res => console.log(res))
        .catch(err=> console.error(err)) */
      }
    }
  },
  mounted() {
    /* axios
      .get('http://192.168.1.92:8989/api/v1/documents/859907009/layers/98687DF5-AB91-4405-9927-0D4AC2EC8C4A/')
      .then(response => {
        (this.info = JSON.stringify(response))
        //console.log(JSON.stringify(response))
      })
      .catch(err => {
        console.error(err)
      }) */
    //this.tiempo_inicio = Date.now()
  }
};
</script>

<style>
</style>
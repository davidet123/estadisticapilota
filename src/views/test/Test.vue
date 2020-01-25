<template>
<div>
  <h1>Test</h1>
  <v-btn @click="goLive">Live</v-btn>
 
  <v-form>
    <v-text-field v-model="data"></v-text-field>
    
  </v-form>
  <v-btn @click="go">Go</v-btn>
  <v-btn @click="getInfo">Get</v-btn>
 
   <!-- <p>{{ info }}</p> -->


  <P> Inicio: {{ tiempo_inicio }}</P>
  <P> Final: {{ tiempo_final }}</P>
  <P> Total: {{ tiempo }}</P>
  <P> Total: {{ temps_total }}</P>
  <v-btn @click="temps()">Temps</v-btn>
</div>
  

</template>

<script>
const axios = require('axios').default
export default {
  data() {
    return {
      info: null,
      data: null,
      tiempo: null,
      tiempo_inicio: null,
      tiempo_final: null,
    }
  },
  computed: {
    url() {
      //return 'http://192.168.1.92:8989/api/v1/documents/214331907/layers/BF993665-6A93-417F-92AF-52B3F2A3FCA5/'
      return 'http://192.168.1.92:8989/api/v1/documents/859907009/layers/98687DF5-AB91-4405-9927-0D4AC2EC8C4A/'
    },
    temps_total() {
      let tiempo_actual = Date.now() / 1000
      let tiempo_inicio = this.tiempo_inicio / 1000

      let tiempo = Math.round(tiempo_actual - tiempo_inicio) 
      let tiempo_min = Math.floor(tiempo / 60)
      let tiempo_sec = tiempo - (tiempo_min * 60)
    
      
      return tiempo_min.toString() + ' min : ' + tiempo_sec.toString() + ' seg'
    }

  },
  methods: {
    temps() {
      let tiempo_actual = Date.now() / 1000
      this.tiempo_final = tiempo_actual
      let tiempo_inicio = this.tiempo_inicio / 1000

      let tiempo = Math.round(tiempo_actual - tiempo_inicio) 
      let tiempo_min = Math.floor(tiempo / 60)
      let tiempo_sec = tiempo - (tiempo_min * 60)

      this.tiempo = tiempo_min.toString() + ' min : ' + tiempo_sec.toString() + ' seg'
    },
    getInfo() {
      axios.get(this.url )
      /* .then(res => {
        console.log(res.data.data)
      }) */
    },
    goLive() {
      axios.post(this.url + 'toggleLive')
      /* .then(res => console.log(res)) */
    },
    go() {
      //const data =JSON.stringify({"input-values":{"tvGroup_Content__Scores_TypeMultiline":"Pepe,0,0,0"}})
      //const data = {"data":{"data":{"attributes":{"input-values":{"tvGroup_Content__Scores_TypeMultiline":"Pepe,0,0,0"}}}}}
      const data = {"input-values":{"tvGroup_Content__Scores_TypeMultiline": this.data }}
      
      //axios.post(this.url + 'toggleLive')
      /* axios.put(this.url, data)
      .then(res => {
        console.log(res)
      }) */
      /* console.log(data) */
      axios({
        method:'PUT',
        url: this.url,
        headers: {'Content-Type': 'application/json'},
        data: data
      })
      /* .then(res => console.log(res)) */
      /* .catch(err => {
        console.error("Error response:");
        console.error(err.response.data);    
        console.error(err.response.status);  
        console.error(err.response.headers); 
       })  */
    }
      
    
    
  },
  mounted () {
    /* axios
      .get('http://192.168.1.92:8989/api/v1/documents/859907009/layers/98687DF5-AB91-4405-9927-0D4AC2EC8C4A/')
      .then(response => {
        (this.info = JSON.stringify(response))
        //console.log(JSON.stringify(response))
      })
      .catch(err => {
        console.error(err)
      }) */
      this.tiempo_inicio = Date.now()
  }
  

}
</script>

<style>

</style>
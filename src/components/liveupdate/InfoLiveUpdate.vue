<template>
  <v-container fluid>
    
    <v-row>
      <v-col cols="12" align="center">

        
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <template v-slot:activator="{ on }">
            <v-btn x-small color="#317f5c" dark v-on="on" >SETTINGS</v-btn>
          </template>
          <v-toolbar
            color="#1d428a">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">CONFIGURACIÓ LIVE UPDATE</v-toolbar-title>
            </v-toolbar>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" align="center">
                  <v-btn small @click="conectar" class="mx-auto">CONECTAR</v-btn>
                  <v-btn small @click="conectar" class="mx-auto">DESCONECTAR</v-btn>
                  <v-switch
                    v-model="live"
                    :label=" getLive == true ? 'DESACTIVAR' : 'ACTIVAR' "
                  ></v-switch>
                  {{ live }}
                </v-col>
                <v-col cols="12" align="center">
                  <h4>Status: <span :class="color">{{ status == 200 ? 'CONECTADO' : 'NO CONECTADO' }}</span></h4>
                </v-col>
              </v-row>
                <h4>Direcció url actual: {{ getUrl }}</h4>
                <h4>Document: {{ getDocument }}</h4>
                <h4>Capa colps: {{ getUrlColps }}</h4>
                <h4>Capa tretes/caigudes: {{ getUrlTretes }}</h4>
                <h4>Capa canvis: {{ getUrlCanvis }}</h4>
                <h4>Capa durades: {{ getUrlDurada }}</h4>
                <h4>Capa Travesses: {{ getUrlTravessa }}</h4>
                <h4>Capa Entrevista: {{ getUrlEntrevista }}</h4>
                <!-- <h4>Capa Parcials: {{ getUrlCanvis }}</h4> -->
                <v-text-field label="Direcció local" v-model="url" :placeholder="getUrl"></v-text-field>
                <v-text-field label="Document" v-model="document" :placeholder="getDocument"></v-text-field>
                <h4>Capa colps: {{ colps }}</h4>
                <v-select
                dense
                :items="getInfoLive"
                item-text="attributes.name"
                item-value="id"
                v-model="colps"
                :placeholder="getUrlColps">
                </v-select>
                <h4>Capa tretes: {{ tretes }}</h4>
                <v-select
                dense
                :items="getInfoLive"
                item-text="attributes.name"
                item-value="id"
                v-model="tretes"
                :placeholder="getUrlTretes">
                </v-select>
                <h4>Canvis de pilota: {{ canvis }}</h4>
                <v-select
                dense
                :items="getInfoLive"
                item-text="attributes.name"
                item-value="id"
                v-model="canvis"
                :placeholder="getUrlCanvis">
                </v-select>
                <h4>Durada del joc: {{ durada }}</h4>
                <v-select
                dense
                :items="getInfoLive"
                item-text="attributes.name"
                item-value="id"
                v-model="durada"
                :placeholder="getUrlDurada">
                </v-select>
                <h4>Travesses: {{ travessa }}</h4>
                <v-select
                dense
                :items="getInfoLive"
                item-text="attributes.name"
                item-value="id"
                v-model="travessa"
                :placeholder="getUrlTravessa">
                </v-select>
                <h4>Entrevista: {{ entrevista }}</h4>
                <v-select
                dense
                :items="getInfoLive"
                item-text="attributes.name"
                item-value="id"
                v-model="entrevista"
                :placeholder="getUrlEntrevista">
                </v-select>
                <v-divider class="my-4"></v-divider>
                <!-- <h4>Estadistica individual</h4>
                <v-simple-table dense>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in getVariantsColps" :key="item.id">
                      <td>{{ item.attributes.name }}</td>
                      <td>{{ item.id }}</td>
                    </tr>
                  </tbody>  
                </v-simple-table>
                <h4>Tretes</h4>
                <v-simple-table dense>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in getVariantsTretes" :key="item.id">
                      <td>{{ item.attributes.name }}</td>
                      <td>{{ item.id }}</td>
                    </tr>
                  </tbody>  
                </v-simple-table>
                <h4>Canvis de pilota</h4>
                <v-simple-table dense>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in getVariantsCanvis" :key="item.id">
                      <td>{{ item.attributes.name }}</td>
                      <td>{{ item.id }}</td>
                    </tr>
                  </tbody>  
                </v-simple-table>
                <h4>Durada del joc</h4>
                <v-simple-table dense>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in getVariantsDurada" :key="item.id">
                      <td>{{ item.attributes.name }}</td>
                      <td>{{ item.id }}</td>
                    </tr>
                  </tbody>  
                </v-simple-table>
                <h4>Travesses</h4>
                <v-simple-table dense>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in getVariantsEntrevista" :key="item.id">
                      <td>{{ item.attributes.name }}</td>
                      <td>{{ item.id }}</td>
                    </tr>
                  </tbody>  
                </v-simple-table> -->
                
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" text @click="dialog = false">Tancar</v-btn>
              <v-btn color="green darken-1" text @click="validar">Validar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script>
export default {
  data () {
      return {
        dialog: false,
        url: '',
        tipos: ['colps', 'tretes'],
        colps: '',
        tretes: '',
        document: '',
        canvis: '',
        durada: '',
        travessa: '',
        live: false,
        entrevista: ''
      }
    },
    computed: {
      status() {
        return this.$store.getters.getStatus
      },
      getUrl() {
        this.setLive()
        return this.$store.getters.getUrl
      },
      getDocument() {
        return this.$store.getters.getDocument
      },
      getUrlColps() {
        return this.$store.getters.getLayerColps
      },
      getUrlTretes() {
        return this.$store.getters.getLayerTretes
      },
      getUrlCanvis() {
        return this.$store.getters.getLayerCanvis
      },
      getUrlDurada() {
        return this.$store.getters.getLayerDurada
      },
      getUrlTravessa() {
        return this.$store.getters.getLayerTravessa
      },
      getUrlEntrevista() {
        return this.$store.getters.getLayerEntrevista
      },
      getInfoLive() {
        return this.$store.getters.getInfoLive
      },
      getLayers() {
        return this.$store.getters.getLayers
      },
      getVariantsColps() {
        return this.$store.getters.getVariantsColps
      },
      getVariantsTretes() {
        return this.$store.getters.getVariantsTretes
      },
      getVariantsCanvis() {
        return this.$store.getters.getVariantsCanvis
      },
      getVariantsDurada() {
        return this.$store.getters.getVariantsDurada
      },
      getVariantsTravessa() {
        return this.$store.getters.getVariantsTravessa
      },
      getVariantsEntrevista() {
        return this.$store.getters.getVariantsEntrevista
      },
      getLive() {
        return this.$store.getters.getLive
      },
      color() {
        let color = ''
        if (this.status == 200) {
          color ='green--text'
        } else {
          color = 'red--text'
        }
        return color
      },

    },
    methods: {
      conectar() {
        this.$store.commit('clear')
        this.$store.dispatch('conectar')
        this.live = this.getLive
        /* this.url = this.getUrl
        this.colps = this.getUrlColps
        this.tretes = this.getUrlTretes
        this.canvis = this.getUrlCanvis
        this.durada = this.getUrlDurada
        this.travessa = this.getUrlTravessa */
      },
      desconectar() {
        this.$store.dispatch('desconectar', {live: false})
      },
      validar() {
        this.$store.commit('clear')
        this.$store.dispatch('cambioLayerUrl', this.url)
        this.conectar()
      },
      setLive() {
        this.live = this.$store.getters.getLive
      }
    },
    watch: {
      /* url: function(val) {
        this.$store.commit('clear')
        this.$store.dispatch('cambioLayerUrl', val)
      }, */
      colps: function(val) {
        this.$store.dispatch('cambioLayerColps', val)
      },
      tretes: function(val) {
        this.$store.dispatch('cambioLayerTretes', val)
      },
      canvis: function(val) {
        this.$store.dispatch('cambioLayerCanvis', val)
      },
      durada: function(val) {
        this.$store.dispatch('cambioLayerDurada', val)
      },
      travessa: function(val) {
        this.$store.dispatch('cambioLayerTravessa', val)
      },
      entrevista: function(val) {
        this.$store.dispatch('cambioLayerEntrevista', val)
      },
      live: function(val) {
        this.$store.dispatch('actualizaDBmimo', {live: val})
      }
    }

}
</script>

<style>

</style>
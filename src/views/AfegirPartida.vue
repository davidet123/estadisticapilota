<template>
  <v-container fluid>
    <v-form
    ref="form">
    <v-sheet elevation="4" widht="100%" class="px-4">
      <v-row>
        <v-col>
          <h2 class="text-center">Afegir Partida</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center" cols="6" offset="3">
          <v-select
          :items="lista"
          dense
          solo
          outlined
          v-model="tipo"
          label="Tipus de partida"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <!-- <v-text-field
          label="Data"
          placeholder="Data de la partida"
          v-model="data"
          outlined></v-text-field> -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                dense
                v-model="date"
                label="Picker in menu"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3">
          <v-text-field
          dense
          label="Lloc"
          placeholder="Lloc de la partida"
          v-model="lloc"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Partida a"
          placeholder="Partida a..."
          dense
          v-model="partidaa"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Tanteig inicial"
          placeholder="tanteig inicial"
          dense
          v-model="tanteig_inicial"
          outlined></v-text-field>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="6">
          <h3 class="text-center">Equip Roig</h3>
        </v-col>
        <v-col cols="6">
          <v-text-field
          label="Nom equip"
          placeholder="Nom equip roig"
          dense
          v-model="nom_rojos"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Rest"
          placeholder="Rest roig"
          dense
          v-model="equip_roig[0]"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Mitger"
          placeholder="Mitger roig"
          dense
          v-model="equip_roig[1]"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Punter"
          placeholder="Punter roig"
          dense
          v-model="equip_roig[2]"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Treta"
          placeholder="Treta roig"
          dense
          v-model="equip_roig[3]"
          outlined></v-text-field>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="6">
          <h3 class="text-center">Equip Blau</h3>
        </v-col>
        <v-col cols="6">
          <v-text-field
          label="Nom equip"
          placeholder="Nom equip blau"
          dense
          v-model="nom_blaus"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Rest"
          placeholder="Rest blau"
          dense
          v-model="equip_blau[0]"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Mitger"
          placeholder="Mitger blau"
          dense
          v-model="equip_blau[1]"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Punter"
          placeholder="Punter blau"
          dense
          v-model="equip_blau[2]"
          outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
          label="Treta"
          placeholder="Treta blau"
          dense
          v-model="equip_blau[3]"
          outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="6" class="mx-auto" align="center">
          <v-btn @click="validar" color="#317f5c" dark class="mr-2 mb-2">Acceptar</v-btn>
          <v-btn @click="reset" color="error" class="ml-2 mb-2">Netejar</v-btn>
        </v-col>
      </v-row>
      </v-sheet>
    </v-form>    
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      lista: ['Raspall', 'Escala i corda'],
      tipo: null,
      data: null,
      lloc: null,
      partidaa: 0,
      nom_rojos: null,
      nom_blaus: null,
      equip_roig: [null, null, null, null],
      equip_blau: [null, null, null, null],
      tanteig_inicial: 0,
      menu: false,
      date: new Date().toISOString().substr(0, 10)

    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    validar() {
      let partida = {
        rotulo: {
          titulo: null,
          subtitulo: null
        },
        feedback: '',
        partidaa: this.partidaa,
        marcador: {punts_rojos: 0, jocs_rojos: this.tanteig_inicial / 5, punts_blaus: 0, jocs_blaus: this.tanteig_inicial / 5},
        parcials: {
          jocs: [],
          punts: {joc1:[]},
          joc_actual: 1,
          parcial_actual:[]
        },
        tipo: this.tipo,
        data: this.date,
        lloc: this.lloc,
        hora_inici: null,
        hora_final: null,
        travesses: null,
        temporizador: false,
        durades: [],
        equip_roig: {
          nom_equip: this.nom_rojos || this.equip_roig[0],
          jugadors: [
            {
              num: 1,
              nom: this.equip_roig[0],
              est_ind: {
                colps: 0,
                errades: 0
              },
              caigudes: {
                total: 0,
                quinzes: 0
              }
            },
            {
              num: 2,
              nom: this.equip_roig[1],
              est_ind: {
                colps: 0,
                errades: 0
              },
              caigudes: {
                total: 0,
                quinzes: 0
              }
            },
            {
              num: 3,
              nom: this.equip_roig[2],
              est_ind: {
                colps: 0,
                errades: 0
              },
              caigudes: {
                total: 0,
                quinzes: 0
              }
            },
          ],
          treta: {
              num: 4,
              nom: this.equip_roig[3] || this.equip_roig[0],
              tretes: {
                directes: 0,
                faltes: 0
              }
          },
          punts: parseInt(this.tanteig_inicial),
          canvi_pilota: 0
        },
        equip_blau: {
          nom_equip: this.nom_blaus || this.equip_blau[0],
          jugadors: [{
              num: 1,
              nom: this.equip_blau[0],
              est_ind: {
                colps: 0,
                errades: 0
              },
              caigudes: {
                total: 0,
                quinzes: 0
              }
            },
            {
              num: 2,
              nom: this.equip_blau[1],
              est_ind: {
                colps: 0,
                errades: 0
              },
              caigudes: {
                total: 0,
                quinzes: 0
              }
            },
            {
              num: 3,
              nom: this.equip_blau[2],
              est_ind: {
                colps: 0,
                errades: 0
              },
              caigudes: {
                total: 0,
                quinzes: 0
              }
            }
          ],
          treta: {
              num: 4,
              nom: this.equip_blau[3] || this.equip_blau[0],
              tretes: {
                directes: 0,
                faltes: 0
              }
          },
          punts: parseInt(this.tanteig_inicial),
          canvi_pilota: 0
        },
      }
      if(partida.equip_roig.jugadors[0].nom != null && partida.equip_blau.jugadors[0].nom != null && partida.equip_roig.jugadors[0].nom != '' && partida.equip_blau.jugadors[0].nom != '' ) {
        this.$store.commit('carregant', true)
        this.$store.dispatch('addPartida', partida)
        this.$router.push('/')  
      }
            
    }

    
  }

}
</script>


<style>

</style>
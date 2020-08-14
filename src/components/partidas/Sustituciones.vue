<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row class="pa-0 ma-0" align="center">
      <v-col cols="12" align="center" class="pa-0 ma-0">
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn x-small :color="equipo == 'roig' ? 'red' : 'blue'" v-on="on">
              <!-- <v-icon :color="equipo == 'roig' ? 'red' : 'blue'">mdi-account-convert</v-icon> -->
              <p class="pa-0 ma-0 white--text">SUBSTITUCIÓ</p>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">Jugadors suplents</v-card-title>
            <v-card-text>
              <v-list dense>
                <v-subheader>Selecciona el jugador que entra en la partida</v-subheader>
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item v-for="jugador in lista" :key="jugador.num">
                    <v-list-item-content align="center">
                      <v-list-item-title v-text="jugador.nom" @click="sustitucion(jugador)"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Tancar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["equipo", "nom", "posicion"],
  data() {
    return {
      dialog: false,
      item: null,
    };
  },
  computed: {
    lista() {
      let equipo = null;
      if (this.equipo == "roig" && this.posicion == "jugador") {
        equipo = this.rojos;
      } else if (this.equipo == "blau" && this.posicion == "jugador") {
        equipo = this.blaus;
      } else if (this.equipo == "roig" && this.posicion == "feridor") {
        equipo = this.feridor_roig;
      } else if (this.equipo == "blau" && this.posicion == "feridor") {
        equipo = this.feridor_blau;
      }
      return equipo;
    },
    partida() {
      return this.$store.getters.partida;
    },
    rojos() {
      let equipo = this.partida.equip_roig.jugadors.filter((jug) => {
        return jug.titular != true;
      });
      return equipo.sort((a, b) => (a.num > b.num ? 1 : -1));
    },
    blaus() {
      let equipo = this.partida.equip_blau.jugadors.filter((jug) => {
        return jug.titular != true;
      });
      return equipo.sort((a, b) => (a.num > b.num ? 1 : -1));
    },
    feridor_roig() {
      return this.partida.equip_roig.treta.filter((jug) => {
        return jug.titular != true;
      });
    },
    feridor_blau() {
      return this.partida.equip_blau.treta.filter((jug) => {
        return jug.titular != true;
      });
      //return this.partida.equip_blau
    },
    jugadores() {
      return this.rojos.concat(this.blaus);
    },
  },
  methods: {
    sustitucion(jugadorIn) {
      this.dialog = false;
      let equipoOut = null;
      if (this.equipo == "roig") {
        if (this.posicion == "jugador") {
          equipoOut = this.$store.getters.partida.equip_roig.jugadors.filter(
            (jug) => {
              return jug.titular == true;
            }
          );
        } else if (this.posicion == "feridor") {
          equipoOut = this.$store.getters.partida.equip_roig.treta.filter(
            (jug) => {
              return jug.titular == true;
            }
          );
        }
        if (this.partida.hora_inici) {
          this.partida.equip_roig.substitucions++;
        }
      } else if (this.equipo == "blau") {
        if (this.posicion == "jugador") {
          equipoOut = this.$store.getters.partida.equip_blau.jugadors.filter(
            (jug) => {
              return jug.titular == true;
            }
          );
        } else if (this.posicion == "feridor") {
          equipoOut = this.$store.getters.partida.equip_blau.treta.filter(
            (jug) => {
              return jug.titular == true;
            }
          );
        }
        if (this.partida.hora_inici) {
          this.partida.equip_blau.substitucions++;
        }
      }
      let jugadorOut = equipoOut.find((jug) => {
        return jug.nom == this.nom;
      });
      let temp = jugadorOut.num;
      jugadorOut.num = jugadorIn.num;
      jugadorIn.num = temp;
      jugadorOut.titular = false;
      jugadorIn.titular = true;
      this.update();
    },
    update() {
      this.$store.dispatch("updatePartida", this.partida);
    },
  },
};
</script>

<style></style>

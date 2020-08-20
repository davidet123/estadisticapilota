<template>
  <v-container fluid>
    <v-form ref="form">
      <v-sheet elevation="4" widht="100%" class="px-4">
        <v-row>
          <v-col>
            <h2 class="text-center">Afegir Partida</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center" cols="5">
            <v-select :items="lista" dense solo outlined v-model="tipo" label="Tipus de partida"></v-select>
          </v-col>
          <v-col class="text-center" cols="7">
            <v-text-field
              dense
              label="Nom de la competició"
              placeholder="Nom de la competició"
              v-model="competicion"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            <!-- <v-text-field
          label="Data"
          placeholder="Data de la partida"
          v-model="data"
            outlined></v-text-field>-->
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
                <v-text-field dense v-model="date" label="Picker in menu" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-text-field
              dense
              label="Lloc"
              placeholder="Lloc de la partida i trinquet"
              v-model="lloc"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="Partida a"
              placeholder="Partida a..."
              dense
              v-model="partidaa"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="Tanteig inicial"
              placeholder="tanteig inicial"
              dense
              v-model="tanteig_inicial"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="6">
            <v-col cols="12">
              <h3 class="text-center">Equip Roig {{ titularesRoig }}</h3>
            </v-col>
            <v-col cols="12" align="center" class="my-0 py-0">
              <!-- <v-btn x-small v-for="(index, numero) in maxJugadors" :key="index">{{ numero + 1 }}</v-btn> -->
              <v-radio-group v-model="titularesRoig" row class="my-0 py-0">
                <h4>Titulars:</h4>
                <span v-for="(index, numero) in maxJugadors" :key="index">
                  <v-radio :label="(numero + 1).toString()" color="red" :value="numero + 1"></v-radio>
                </span>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Nom equip"
                placeholder="Nom equip roig"
                dense
                v-model="nom_rojos"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" v-for="(jug, index) in equip_roig" :key="index" class="my-0 py-0">
              <v-text-field
                :label="posicion[index]"
                :placeholder="jug.nom"
                dense
                v-model="equip_roig[index].nom"
                outlined
                class="my-0 py-0"
              ></v-text-field>
              <!-- <v-select
                :items="listaJugadores"
                :label="posicion[index]"
                item-text="nom_esportiu"
                dense
                solo
                outlined
                v-model="equip_roig[index].nom"
              ></v-select>-->
            </v-col>
            <v-col cols="12" align="left" class="mt-0 mb-2 py-0">
              <v-btn fab dark color="red" x-small @click="addJugador('roig')">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              v-for="(jug, index) in lista_treta_roig"
              :key="index + 100"
              class="my-0 py-0"
            >
              <v-text-field
                :label="lista_treta[index]"
                :placeholder="jug.nom"
                dense
                v-model="lista_treta_roig[index].nom"
                outlined
              ></v-text-field>
              <!-- <v-select
                :items="listaTretes"
                :label="lista_treta[index]"
                item-text="nom_esportiu"
                dense
                solo
                outlined
                v-model="lista_treta_roig[index].nom"
              ></v-select>-->
            </v-col>
            <v-col cols="12" align="left" class="my-0 py-0">
              <v-btn fab dark color="red" x-small @click="addFeridor('roig')">
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-btn>
            </v-col>
          </v-col>
          <v-col cols="6">
            <v-col cols="12">
              <h3 class="text-center">Equip Blau {{titularesBlau}}</h3>
            </v-col>
            <v-col cols="12" align="center" class="my-0 py-0">
              <!-- <v-btn x-small v-for="(index, numero) in maxJugadors" :key="index">{{ numero + 1 }}</v-btn> -->
              <v-radio-group v-model="titularesBlau" row class="my-0 py-0">
                <h4>Titulars:</h4>
                <span v-for="(index, numero) in maxJugadors" :key="index">
                  <v-radio :label="(numero + 1).toString()" color="blue" :value="numero + 1"></v-radio>
                </span>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Nom equip"
                placeholder="Nom equip blau"
                dense
                v-model="nom_blaus"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" v-for="(jug, index) in equip_blau" :key="index" class="my-0 py-0">
              <v-text-field
                :label="posicion[index]"
                :placeholder="jug.nom"
                dense
                v-model="equip_blau[index].nom"
                outlined
                class="my-0 py-0"
              ></v-text-field>
              <!-- <v-select
                :items="listaJugadores"
                :label="posicion[index]"
                item-text="nom_esportiu"
                dense
                solo
                outlined
                v-model="equip_blau[index].nom"
              ></v-select>-->
            </v-col>
            <v-col cols="12" align="right" class="mt-0 mb-2 py-0">
              <v-btn dark color="blue" fab x-small @click="addJugador('blau')">
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              v-for="(jug, index) in lista_treta_blau"
              :key="index + 200"
              class="my-0 py-0"
            >
              <v-text-field
                :label="lista_treta[index]"
                :placeholder="jug.nom"
                dense
                v-model="lista_treta_blau[index].nom"
                outlined
              ></v-text-field>
              <!-- <v-select
                :items="listaTretes"
                :label="lista_treta[index]"
                item-text="nom_esportiu"
                dense
                solo
                outlined
                v-model="lista_treta_blau[index].nom"
              ></v-select>-->
            </v-col>
            <v-col cols="12" align="right" class="mt-0 py-0">
              <v-btn fab dark color="blue" x-small @click="addFeridor('blau')">
                <v-icon>mdi-account-plus-outline</v-icon>
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row></v-row>
        <v-row>
          <v-col cols="6" class="mx-auto" align="center">
            <v-btn @click="crearPartida" color="#317f5c" dark class="mr-2 mb-2">Acceptar</v-btn>
            <v-btn @click="crearGraella" color="#317f5c" dark class="mr-2 mb-2">Crear Graella</v-btn>
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
      graella: true,
      posicion: [
        "Jugador 1",
        "Jugador 2",
        "Jugador 3",
        "Jugador 4",
        "Jugador 5",
        "Jugador 6",
        "Jugador 7",
        "Jugador 8",
      ],
      competicion: null,
      lista_treta: ["Feridor 1", "Feridor 2"],
      lista: ["Raspall", "Escala i corda", "Galotxa", "Palma", "Llargues"],
      num_roig: 2,
      num_blau: 12,
      tipo: null,
      data: null,
      lloc: null,
      partidaa: 0,
      nom_rojos: null,
      nom_blaus: null,
      equip_roig: [
        {
          num: 1,
          nom: null,
          est_ind: {
            colps: 0,
            errades: 0,
            colps_totals: 0,
          },
          caigudes: {
            total: 0,
            quinzes: 0,
          },
          titular: true,
        },
      ],
      lista_treta_roig: [
        {
          num: 9,
          nom: null,
          tretes: {
            directes: 0,
            faltes: 0,
          },
          titular: true,
        },
      ],
      equip_blau: [
        {
          num: 11,
          nom: null,
          est_ind: {
            colps: 0,
            errades: 0,
            colps_totals: 0,
          },
          caigudes: {
            total: 0,
            quinzes: 0,
          },
          titular: true,
        },
      ],
      lista_treta_blau: [
        {
          num: 18,
          nom: null,
          tretes: {
            directes: 0,
            faltes: 0,
          },
          titular: true,
        },
      ],
      tanteig_inicial: 0,
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      jugador: {
        num: null,
        nom: null,
        est_ind: {
          colps: 0,
          errades: 0,
        },
        caigudes: {
          total: 0,
          quinzes: 0,
        },
        titular: true,
      },
      titularesRoig: null,
      titularesBlau: null,
    };
  },
  computed: {
    equipRoigLen() {
      return this.equip_roig.length;
    },
    equipBlauLen() {
      return this.equip_blau.length;
    },
    treta_roig() {
      let item = {
        num: this.equipRoigLen + 1,
        nom: null,
        tretes: {
          directes: 0,
          faltes: 0,
        },
      };
      return item;
    },
    treta_blau() {
      let item = {
        num: 10 + this.equipBlauLen,
        nom: null,
        tretes: {
          directes: 0,
          faltes: 0,
        },
      };
      return item;
    },
    jugadores() {
      return this.$store.getters.listaJugadores;
    },
    listaJugadores() {
      return this.jugadores.filter((jug) => {
        return jug.disciplina.includes(this.tipo) && jug.posicion != "Treta";
      });
    },
    listaTretes() {
      //console.log(this.jugadores);
      let feridors = this.jugadores.filter((jug) => {
        return jug.disciplina.includes(this.tipo) && jug.posicion == "Treta";
      });
      /* for (let jug in this.jugadores) {
        console.log(jug);
      }
      feridors = [...feridors, ...this.equip_roig]; */
      //console.log(feridors);
      return feridors;
    },
    maxJugadors() {
      return this.tipo == "Palma" || this.tipo == "Llargues" ? 5 : 3;
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    addJugador(equip) {
      if (this.equipRoigLen <= 7 && equip == "roig") {
        this.equip_roig.push(this.addJugadorInfo(equip));
      } else if (this.equipBlauLen <= 7 && equip == "blau") {
        this.equip_blau.push(this.addJugadorInfo(equip));
      }
    },
    addFeridor(equip) {
      if (this.lista_treta_roig.length <= 1 && equip == "roig") {
        this.lista_treta_roig.push(this.addFeridorInfo(equip));
      }
      if (this.lista_treta_blau.length <= 1 && equip == "blau") {
        this.lista_treta_blau.push(this.addFeridorInfo(equip));
      }
    },
    // llargues  y palma juegan 5 vs 5. El resto 3 vs 3
    addJugadorInfo(equip) {
      let num = null;
      let tit = true;
      let maxRoig =
        this.tipo == "Palma" || this.tipo == "Llargues"
          ? 5
          : this.titularesRoig;
      let maxBlau =
        this.tipo == "Palma" || this.tipo == "Llargues"
          ? 5
          : this.titularesBlau;
      if (equip == "roig") {
        num = this.num_roig;
        num > maxRoig ? (tit = false) : (tit = true);
        /* console.log(num + " " + maxRoig); */
        this.num_roig++;
      } else if (equip == "blau") {
        num = this.num_blau;
        num > maxBlau + 10 ? (tit = false) : (tit = true);
        /* console.log(num + " " + maxBlau); */
        this.num_blau++;
      }
      let item = {
        num: num,
        nom: null,
        est_ind: {
          colps: 0,
          errades: 0,
          colps_totals: 0,
        },
        caigudes: {
          total: 0,
          quinzes: 0,
        },
        titular: tit,
      };
      return item;
    },
    addFeridorInfo(equip) {
      let num = null;
      if (equip == "roig") {
        num = this.lista_treta_roig[this.lista_treta_roig.length - 1].num + 1;
      } else if (equip == "blau") {
        num = this.lista_treta_blau[this.lista_treta_blau.length - 1].num + 1;
      }
      let item = {
        num: num,
        nom: null,
        tretes: {
          directes: 0,
          faltes: 0,
        },
        titular: false,
      };
      return item;
    },
    nuevaPartida() {
      if (!this.lista_treta_roig[0].nom) {
        this.lista_treta_roig[0].nom = this.equip_roig[0].nom;
      }
      if (!this.lista_treta_blau[0].nom) {
        this.lista_treta_blau[0].nom = this.equip_blau[0].nom;
      }
      let partida = {
        graella: this.graella,
        partidaa: this.partidaa,
        tipo: this.tipo,
        competicion: this.competicion,
        data: this.date,
        lloc: this.lloc,
        hora_inici: null,
        hora_final: null,
        durada_inici: null,
        durada_final: null,
        travesses: null,
        temporizador: false,
        temporizador_durada: false,
        punts_per_joc: { joc1: [] },
        errades_per_joc: { joc1: [] },
        tretes_per_joc: { joc1: [] },
        errades_treta_per_joc: { joc1: [] },
        durades: [],
        colps_ultim_quinze: 0,
        durada_quinze: null,
        durada_quinze_str: "-",
        equip_roig: {
          nom_equip: this.nom_rojos || this.equip_roig[0].nom,
          jugadors: this.equip_roig,
          treta: this.lista_treta_roig,
          punts: parseInt(this.tanteig_inicial),
          canvi_pilota: 0,
          substitucions: 0,
        },
        equip_blau: {
          nom_equip: this.nom_blaus || this.equip_blau[0].nom,
          jugadors: this.equip_blau,
          treta: this.lista_treta_blau,
          punts: parseInt(this.tanteig_inicial),
          canvi_pilota: 0,
          substitucions: 0,
        },
      };
      return partida;
    },
    nuevoMarcador() {
      let inc = 5;
      if (this.tipo == "Palma" || this.tipo == "Llargues") {
        inc = 1;
      }
      let marcador = {
        marcador: {
          punts_rojos: 0,
          jocs_rojos: this.tanteig_inicial / inc,
          punts_blaus: 0,
          jocs_blaus: this.tanteig_inicial / inc,
        },
        parcials: {
          jocs: [],
          punts: { joc1: [] },
          joc_actual: 1,
          parcial_actual: [],
        },
      };

      return marcador;
    },
    validar() {
      let partida = this.nuevaPartida();
      let marcador = this.nuevoMarcador();
      if (
        partida.equip_roig.jugadors[0].nom != null &&
        partida.equip_blau.jugadors[0].nom != null &&
        partida.equip_roig.jugadors[0].nom != "" &&
        partida.equip_blau.jugadors[0].nom != "" &&
        this.titularesRoig != null &&
        this.titularesBlau != null
      ) {
        //this.$store.commit('carregant', true)
        this.$store.dispatch("addPartida", { partida, marcador });
        this.$store.dispatch("updateEntrevista", {
          titulo: null,
          subtitulo: null,
        });
      }
    },
    crearPartida() {
      this.graella = false;
      this.validar();
    },
    crearGraella() {
      this.graella = true;
      this.validar();
    },
  },
  watch: {
    /* equip_roig: function (val) {
      console.log(val);
    }, */
  },
};
</script>

<style></style>

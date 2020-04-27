<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-sheet elevation="4" widht="100%" class="px-4">
            <v-row>
              <v-col cols="11">
                <h3 class="py-2">{{ titulo }}</h3>
              </v-col>

              <v-col cols="1">
                <v-icon @click="closeDialog()">mdi-close-box-outline</v-icon>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      dense
                      label="Nom esportiu"
                      placeholder="Nom esportiu"
                      v-model="nom_esportiu"
                      outlined
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      dense
                      label="Nom i cognoms"
                      placeholder="Nom i cognoms"
                      v-model="nom_jugador"
                      outlined
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      :items="lista_posiciones"
                      dense
                      solo
                      outlined
                      v-model="posicion"
                      label="Posició"
                      required
                      :rules="nameRules"
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      dense
                      label="Data de naixement"
                      placeholder="Data de naixement"
                      v-model="fecha_nacimiento"
                      outlined
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      dense
                      label="Localitat"
                      placeholder="Localitat"
                      v-model="localidad"
                      outlined
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      dense
                      label="Alçada"
                      placeholder="Alçada"
                      v-model="altura"
                      outlined
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      dense
                      label="Pes"
                      placeholder="Pes"
                      v-model="peso"
                      outlined
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-divider class="mb-2"></v-divider>
                    <h5>Braç dominant</h5>
                    <v-radio-group
                      v-model="brazo_dominante"
                      row
                      :mandatory="false"
                    >
                      <v-radio label="Dret" value="Dret"></v-radio>
                      <v-radio label="Esquerre" value="Esquerre"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <v-divider class="mb-2"></v-divider>
                    <h5>Categoria</h5>
                    <v-radio-group
                      v-model="categoria"
                      row
                      :mandatory="false"
                      required
                      :rules="nameRules"
                    >
                      <v-radio
                        label="Professional"
                        value="Professional"
                      ></v-radio>
                      <v-radio label="Amateur" value="Amateur"></v-radio>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12">
                        <v-divider class="mb-2"></v-divider>
                        <h5>Disciplina</h5>
                      </v-col>
                      <v-col cols="4" v-for="(el, index) in lista" :key="index">
                        <v-checkbox
                          v-model="disciplina"
                          :label="el"
                          :value="el"
                          required
                          :rules="checkRules"
                        >
                        </v-checkbox>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <p class="px-2">
                      Les dades ací aportades seran usats únicament per a la
                      realització de les fitxes de la partida. L'encarregat del
                      tractament i tot el seu personal s'obliga a utilitzar les
                      dades personals objecte de tractament, o els que reculla
                      per a la seua inclusió només per a la finalitat objecte
                      d'aquest encàrrec. En cap cas s'usaran les dades per a
                      finalitats pròpies.
                    </p>
                    <v-checkbox
                      v-model="lopd"
                      label="Estic d'acord"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="4" offset="4">
                    <v-btn
                      @click="validar"
                      color="#317f5c"
                      dark
                      class="mr-2 mb-2"
                      :disabled="!lopd"
                      >Acceptar</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-sheet>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["jugador"],
  data() {
    return {
      nom_esportiu: "",
      nom_jugador: "",
      posicion: "",
      fecha_nacimiento: "",
      localidad: "",
      altura: "",
      peso: "",
      brazo_dominante: "Dret",
      categoria: null,
      disciplina: [],
      lista_posiciones: ["Rest", "Mitger", "Punter", "Treta"],
      lopd: false,
      valid: false,
      checkRules: [
        /* v => !!v || "Esta casella és obligatoria", */
        () => this.disciplina.length > 0 || "*"
      ],
      nameRules: [v => !!v || "Esta casella és obligatoria"],
      lista: ["Raspall", "Escala i corda", "Galotxa", "Palma", "Llargues"],
      modo: null,
      id: null
    }
  },
  computed: {
    nuevo_jugador() {
      let jugador = {
        nom_esportiu: this.nom_esportiu,
        nom_jugador: this.nom_jugador,
        posicion: this.posicion,
        fecha_nacimiento: this.fecha_nacimiento,
        localidad: this.localidad,
        altura: this.altura,
        peso: this.peso,
        brazo_dominante: this.brazo_dominante,
        categoria: this.categoria,
        disciplina: this.disciplina,
        id: this.id
      }
      return jugador
    },
    titulo() {
      return this.jugador ? "Editar jugador" : "Afegir jugador"
    }
  },
  methods: {
    cargarJugador() {
      this.nom_esportiu = this.jugador.nom_esportiu
      this.nom_jugador = this.jugador.nom_jugador
      this.posicion = this.jugador.posicion
      this.fecha_nacimiento = this.jugador.fecha_nacimiento
      this.localidad = this.jugador.localidad
      this.altura = this.jugador.altura
      this.peso = this.jugador.peso
      this.brazo_dominante = this.jugador.brazo_dominante
      this.categoria = this.jugador.categoria
      this.disciplina = this.jugador.disciplina
      this.id = this.jugador.id
    },
    validar() {
      let jug = this.nuevo_jugador
      if (this.$refs.form.validate()) {
        if (this.modo == "add") {
          this.$store.dispatch("addJugador", jug)
        } else if (this.modo == "edit") {
          this.$store.dispatch("actualizarJugador", jug)
        }
        this.$refs.form.reset()
        this.$emit("close-dialog")
      }
    },
    closeDialog() {
      this.$emit("close-dialog")
    }
  },
  created() {
    if (this.jugador) {
      this.modo = "edit"
      this.cargarJugador()
      this.lopd = true
    } else {
      this.modo = "add"
      this.lopd = false
    }
  }
}
</script>

<style></style>

<template>
  <v-container fluid>
    <!-- <v-row v-for="jugador in jugadores" :key="jugador.id">
      <v-col>
        <v-card>
          <v-card-title>{{ jugador.nom_esportiu }}</v-card-title>
        </v-card>
        {{ jugadores }}
      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" width="12%">Nom</th>
                <th class="text-left" width="26%">Nom i cognoms</th>
                <th class="text-left" width="10%">Posició</th>
                <th class="text-left" width="12%">Data naix.</th>
                <th class="text-left" width="18%">Localitat</th>
                <th class="text-left" width="5%">Altura</th>
                <th class="text-left" width="5%">Pes</th>
                <th class="text-left" width="12%">Braç dominant</th>
              </tr>
            </thead>
          </template>
        </v-simple-table>
      </v-col>
      <v-col
        v-for="jugador in jugadores"
        :key="jugador.id"
        cols="12"
        class="my-0 py-0 listado"
      >
        <PlantillaJugador class="my-0 pa-0" :jugador="jugador" />
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Jugadors professionals
            <v-spacer></v-spacer>
            <v-text-field
              v-model="buscarPro"
              append-icon="mdi-magnify"
              label="Recerca"
              single-line
              hide-details
            >
            </v-text-field>
          </v-card-title>
          <span class="font-weight-black ml-4">Escala i corda</span>
          <v-data-table
            :headers="headers"
            :items="profesionalesEic"
            :search="buscarPro"
            hide-default-footer
            @click="click()"
          >
          </v-data-table>
          <v-divider class="mb-2"></v-divider>
          <span class="font-weight-black pl-4">Raspall</span>
          <v-data-table
            :headers="headers"
            :items="profesionalesRaspall"
            :search="buscarPro"
            hide-default-footer
            @click="click()"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Jugadors amateurs
            <v-spacer></v-spacer>
            <v-text-field
              v-model="buscarAma"
              append-icon="mdi-magnify"
              label="Recerca"
              single-line
              hide-details
            >
            </v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="amateurs"
            :search="buscarAma"
            hide-default-footer
            @click="click()"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- <v-data-table
      :headers="headers"
      :items="jugadores"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="dialog()"
            >New Item</v-btn
          >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Jugadores</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                   <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row> 
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary">Reset</v-btn>
      </template>
    </v-data-table>-->
  </v-container>
</template>

<script>
import PlantillaJugador from "@/components/jugadors/PlantillaJugador"
export default {
  components: {
    PlantillaJugador
  },
  data() {
    return {
      headers: [
        { text: "Nom esportiu", value: "nom_esportiu" },
        { text: "Nom i cognoms", value: "nom_jugador" },
        { text: "Posició", value: "posicion" },
        { text: "Data naixement", value: "fecha_nacimiento" },
        { text: "Localitat", value: "localidad" },
        { text: "Alçada", value: "altura" },
        { text: "Pes", value: "peso" },
        { text: "Braç dominant", value: "brazo_dominante" }
      ],
      buscarPro: "",
      buscarAma: ""
    }
  },
  computed: {
    jugadores() {
      return this.$store.getters.listaJugadores
    },
    profesionales() {
      return this.jugadores.filter(jug => {
        return jug.categoria == "Professional"
      })
    },
    profesionalesEic() {
      return this.profesionales.filter(jug => {
        return jug.disciplina.includes("Escala i corda")
      })
    },
    profesionalesRaspall() {
      return this.profesionales.filter(jug => {
        return jug.disciplina.includes("Raspall")
      })
    },
    amateurs() {
      return this.jugadores.filter(jug => {
        return jug.categoria == "Amateur"
      })
    }
  },
  methods: {
    click() {
      console.log("click")
    },
    dialog() {
      this.$emit("close-dialog")
    },

    editItem(item) {
      /* this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true */
      console.log(item)
    },

    deleteItem(item) {
      /* const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1) */
      console.log(item)
    }
  }
}
</script>

<style scoped></style>

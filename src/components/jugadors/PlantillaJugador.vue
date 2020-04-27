<template>
  <v-container fluid>
    <v-simple-table dense>
      <template v-slot:default>
        <tbody class="text-left">
          <td class="text-left" width="12%">{{ jugador.nom_esportiu }}</td>
          <td class="text-left" width="23%">{{ jugador.nom_jugador }}</td>
          <td class="text-left" width="12%">{{ jugador.posicion }}</td>
          <td class="text-left" width="12%">{{ jugador.fecha_nacimiento }}</td>
          <td class="text-left" width="17%">{{ jugador.localidad }}</td>
          <td class="text-left" width="3%">{{ jugador.altura }}</td>
          <td class="text-left" width="2%">{{ jugador.peso }}</td>
          <td class="text-left" width="12%">{{ jugador.brazo_dominante }}</td>
          <td class="text-left pl-0 pr-2" width="1%">
            <v-icon small @click="dialog = !dialog">
              mdi-pencil
            </v-icon>
          </td>
          <td class="text-left px-0 mx-0" width="1%">
            <v-icon small @click="editItem(jugador.id)">
              mdi-delete
            </v-icon>
          </td>
          <!-- <td>{{ item.calories }}</td> -->
        </tbody>
      </template>
    </v-simple-table>
    <v-divider></v-divider>
    <v-dialog v-model="dialog" max-width="900">
      <Jugador v-on:close-dialog="closeDialog" :jugador="jugador" />
    </v-dialog>
  </v-container>
</template>

<script>
import Jugador from "@/components/jugadors/Jugador"
export default {
  props: ["jugador"],
  components: {
    Jugador
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    click() {
      console.log("click")
    },
    closeDialog() {
      this.dialog = !this.dialog
    },
    /* dialog() {
      this.$emit("close-dialog")
    }, */

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

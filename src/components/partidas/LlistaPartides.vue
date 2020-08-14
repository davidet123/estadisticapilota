<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" v-if="partides_actiu.length != 0">
        <h3 class="ml-3 white--text">PARTIDES EN ACTIU</h3>
        <v-sheet elevation="4" v-for="partida in partides_actiu" :key="partida.id">
          <v-row class="mx-0 listado_actiu gris" @click="goto(partida.id)">
            <v-col cols="12" align="center" class="pb-0 d-sm-none" color="#f3f4f5">
              <h4>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h4>
              <h5>{{ partida.tipo }} | {{ partida.data }} | {{partida.lloc}}</h5>
            </v-col>
            <v-col cols="7" class="pl-4 d-none d-sm-block" color="#f3f4f5">
              <h4>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h4>
              <h5>{{ partida.tipo }} | {{ partida.data }}</h5>
            </v-col>
            <v-col cols="12" sm="5" class="pt-0">
              <v-row color="#f3f4f5">
                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-divider class="d-flex d-sm-none"></v-divider>
                  <h5>Partida a {{ partida.partidaa }}</h5>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="red--text">{{ marcador(partida.id).marcador.jocs_rojos * 5 }}</h4>
                </v-col>
                <v-col cols="3" class="red my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[marcador(partida.id).marcador.punts_rojos] }}</h4>
                </v-col>
                <v-col cols="3" class="blue my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[marcador(partida.id).marcador.punts_blaus] }}</h4>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="blue--text">{{ marcador(partida.id).marcador.jocs_blaus * 5 }}</h4>
                </v-col>
                <v-col cols="12" align="center" class="my-0 pb-0 pt-1">
                  <h5>{{ partida.travesses }}</h5>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" v-if="partides_seguents.length != 0">
        <h3 class="ml-3 white--text">PARTIDES SEGUENTS</h3>
        <v-sheet elevation="4" v-for="partida in partides_seguents" :key="partida.id">
          <v-row class="mx-0 listado_seguents gris" @click="goto(partida.id)">
            <v-col cols="12" align="center" class="pb-0 d-sm-none" color="#f3f4f5">
              <h4>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h4>
              <h5>{{ partida.tipo }} | {{ partida.data }}</h5>
            </v-col>
            <v-col cols="7" class="pl-4 d-none d-sm-block" color="#f3f4f5">
              <h4>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h4>
              <h5>{{ partida.tipo }} | {{ partida.data }} | {{partida.lloc}}</h5>
            </v-col>
            <v-col cols="12" sm="5" class="pt-0">
              <v-row color="#f3f4f5">
                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-divider class="d-flex d-sm-none"></v-divider>
                  <h5>Partida a {{ partida.partidaa }}</h5>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="red--text">{{ marcador(partida.id).marcador.jocs_rojos * 5 }}</h4>
                </v-col>
                <v-col cols="3" class="red my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[marcador(partida.id).marcador.punts_rojos] }}</h4>
                </v-col>
                <v-col cols="3" class="blue my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[marcador(partida.id).marcador.punts_blaus] }}</h4>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="blue--text">{{ marcador(partida.id).marcador.jocs_blaus * 5 }}</h4>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <!-- </v-row>
    <v-divider></v-divider>

      <v-row>-->
      <v-col cols="12" md="6" v-if="partides_acabades.length != 0">
        <h3 class="ml-3 white--text">PARTIDES ACABADES</h3>
        <v-sheet elevation="4" v-for="partida in partides_acabades" :key="partida.id">
          <v-row class="mx-0 listado_acabades gris" @click="goto(partida.id)">
            <v-col cols="12" align="center" class="pb-0 d-sm-none">
              <h4>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h4>
              <h5>{{ partida.tipo }} | {{ partida.data }}</h5>
            </v-col>
            <v-col cols="7" class="pl-4 d-none d-sm-block">
              <h4>
                {{ partida.equip_roig.nom_equip }} vs
                {{ partida.equip_blau.nom_equip }}
              </h4>
              <h5>{{ partida.tipo }} | {{ partida.data }} | {{partida.lloc}}</h5>
            </v-col>
            <v-col cols="12" sm="5" class="pt-0">
              <v-row>
                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-divider class="d-flex d-sm-none"></v-divider>
                  <h5>Partida a {{ partida.partidaa }}</h5>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="red--text">{{ marcador(partida.id).marcador.jocs_rojos * 5 }}</h4>
                </v-col>
                <v-col cols="3" class="red my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[marcador(partida.id).marcador.punts_rojos] }}</h4>
                </v-col>
                <v-col cols="3" class="blue my-0 py-0" align="center">
                  <h4 class="white--text">{{ punto_str[marcador(partida.id).marcador.punts_blaus] }}</h4>
                </v-col>
                <v-col cols="3" align="center" class="my-0 py-0">
                  <h4 class="blue--text">{{ marcador(partida.id).marcador.jocs_blaus * 5 }}</h4>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- <h1 class="white--text"> {{ partides }}</h1> -->
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      punto_str: ["NET", "15", "30", "VAL"],
    };
  },

  computed: {
    listaPartides() {
      let lista = this.$store.getters.partides;
      return lista.filter((partida) => {
        return partida.graella == false;
      });
    },
    partides() {
      let lista = this.listaPartides;
      return lista.sort((a, b) => (a.data < b.data ? 1 : -1));
    },
    user() {
      return this.$store.getters.userStatus;
    },
    partides_acabades() {
      let lista = this.partides;
      return lista.filter((partida) => {
        return partida.hora_inici != null && partida.hora_final != null;
      });
    },
    partides_seguents() {
      let lista = this.partides;
      return lista.filter((partida) => {
        return partida.hora_inici == null && partida.Hora_final == null;
      });
    },
    partides_actiu() {
      let lista = this.partides;
      return lista.filter((partida) => {
        return partida.hora_inici != null && partida.hora_final == null;
      });
    },
    fecha() {
      return new Date().toISOString();
    },
  },
  methods: {
    goto(id) {
      this.$router.push("/resum/" + id);
    },
    marcador(id) {
      //console.log(id)
      return this.$store.getters.getMarcador(id);
    },
  },
};
</script>

<style>
.listado_seguents {
  border-left: 5px solid blue;
  cursor: pointer;
}
.listado_acabades {
  border-left: 5px solid green;
  cursor: pointer;
}
.listado_actiu {
  border-left: 5px solid red;
  cursor: pointer;
}
.gris {
  background-color: #f3f4f5;
}
</style>

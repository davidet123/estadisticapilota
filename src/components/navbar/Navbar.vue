<template>
  <div class="nav">
    <v-toolbar color="#1d428a" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span>PILOTA</span>
          <span class="font-weight-light">VALENCIANA</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-tooltip>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              v-for="item in links"
              :key="item.titulo"
              @click="goTo(item.link)"
              class="white--text"
              v-on="on"
            >
              <v-icon small left>{{ item.icon }}</v-icon>
              <span>{{ item.titulo }}</span>
            </v-btn>
          </template>
        </v-tooltip>

        <!--<h5></h5>  -->
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary color="#1d428a" dark>
      <p class="font-weight-black white--text mx-auto px-2 pt-2">Pilota Valenciana</p>
      <v-divider color="white"></v-divider>
      <h3 v-if="!cargando" class="mt-2 px-4 white--text">{{ userCargado }}</h3>
      <v-list>
        <v-list-item v-for="item in links" :key="item.titulo" @click="goTo(item.link)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      drawer: false,
      user: null
    };
  },
  computed: {
    cargando() {
      return this.$store.getters.carregant_usuari;
    },
    userCargado() {
      let userTxt = "Invitat";
      if (this.user) {
        userTxt = this.$store.getters.userStatus.user;
      }
      return userTxt;
    },
    rolUser() {
      return this.$store.getters.rolUser;
    },
    links() {
      let menuItems = [
        { icon: "mdi-lock-open-variant", titulo: "LOG IN", link: "/login" }
        /* {icon: 'mdi-cloud-download', titulo: 'CARREGAR PARTIDA', link: '/cargarpartida'} */
      ];
      if (this.user) {
        menuItems = [
          { icon: "mdi-logout", titulo: "Log out", link: "logout" },
          { icon: "mdi-account-group", titulo: "Jugadors", link: "/jugadores" }
        ];
      }
      if (this.user && this.rolUser !== "externo") {
        let items = [
          {
            icon: "mdi-tennis-ball",
            titulo: "Afegir partida",
            link: "/afegirpartida"
          },
          {
            icon: "mdi-cloud-download",
            titulo: "Carregar partida",
            link: "/cargarpartida"
          },
          {
            icon: "mdi-cloud-download",
            titulo: "Graelles",
            link: "/graella"
          }
        ];
        for (let item of items) {
          menuItems.push(item);
        }
      }
      if (this.rolUser === "admin") {
        menuItems.push({
          icon: "mdi-account-plus",
          titulo: "Crear Usuario",
          link: "/signin"
        });
      }

      return menuItems;
    }
  },
  methods: {
    goTo(link) {
      if (link !== "logout") {
        this.$router.push(link);
      } else if (link === "logout") {
        this.$store.dispatch("logOut");
        this.$router.go();
      }
      this.drawer = false;
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = firebase.auth().currentUser;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

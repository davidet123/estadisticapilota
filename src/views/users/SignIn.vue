<template>
  <v-container>
    <v-sheet
      max-width="500px"
      class="mx-auto pa-5 "
      align="center"
      elevation="5"
    >
      <h3>Crear Conter</h3>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passRules"
          type="password"
          label="Password"
          required
        ></v-text-field>
        <v-radio-group v-model="rolUser" row>
          <v-radio label="Administrador" value="admin"></v-radio>
          <v-radio label="Editor" value="editor"></v-radio>
          <v-radio label="Miembro" value="miembro"></v-radio>
          <v-radio label="Federación" value="federacion"></v-radio>
        </v-radio-group>
        <v-btn
          :disabled="!valid"
          color="#317f5c"
          dark
          class="mr-4"
          @click="validate"
          v-if="rol == 'admin'"
        >
          Acceptar
        </v-btn>
        <p class="red--text mt-2">{{ feedback_user }}</p>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import slugify from "slugify"

export default {
  data: () => ({
    valid: true,
    name: null,
    nameRules: [
      v => !!v || "El nom és obligatori"
      //v => (v && v.length <= 10) || "El nom ha de ser d'almenys 10 caracters",
    ],
    email: null,
    emailRules: [
      v => !!v || "La direcció de correu és obligatòria",
      v => /.+@.+\..+/.test(v) || "La direcció de correu ha de ser vàlida"
    ],
    passRules: [
      v => !!v || "La contrasenya és obligatòria",
      v =>
        (v && v.length >= 8) || "La contrasenya ha de ser d'almenys 8 caracters"
    ],
    password: null,
    rolUser: "miembro",
    slug: null
  }),
  computed: {
    feedback_user() {
      return this.$store.getters.feedback_user
    },
    rol() {
      return this.$store.getters.rolUser
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        })
        //this.$store.dispatch('logIn', {email:this.email, password: this.password})
        this.$store.dispatch("signIn", {
          user: this.slug,
          email: this.email,
          password: this.password,
          nombre: this.name,
          rol: this.rolUser
        })
      }
    }
  }
}
</script>

<style></style>

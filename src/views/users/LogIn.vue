<template>
  <v-container>
    <v-sheet max-width="500px" class="mx-auto pa-5 " align="center" elevation="5" >
      <h3>Log In</h3>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
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
        <v-btn
          :disabled="!valid"
          color="#317f5c" 
          dark
          class="mr-4"
          @click="validate"
        >
          Acceptar
        </v-btn>
      <p class="red--text mt-2">{{ feedback_user }}</p>

      </v-form>
    </v-sheet>
    
  </v-container>
</template>

<script>
export default {
  data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: null,
      passRules: [
        v => !!v || 'Es requereix una contrasenya',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      
      
    }),
    computed: {
      feedback_user() {
        return this.$store.getters.feedback_user
      }
    },
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
          this.$store.dispatch('logIn', {email:this.email, password: this.password})
        }
      }
    },

}
</script>

<style>

</style>
<template>
  <v-container fluid class="px-0 py-1">
    <v-sheet elevation="4" class="px-3 ma-0">
      <v-row>
        <v-col cols="12">
          <h4>Rótul per entrevista</h4>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-row>
                <v-col cols="5">
                  <v-text-field
                    v-model="titulo"
                    :rules="tituloRules"
                    label="Títol"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="subtitulo"
                    label="Subtítol"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Acceptar
              </v-btn>
            </v-form>
        </v-col>
        <v-col cols="3"  offset="3" align="center">
          <h4>Títol</h4>
          <h4>{{ titulo }}</h4>
        </v-col>
        <v-col cols="3" align="center">
          <h4>Subtítol</h4>
          <h4>{{ subtitulo }}</h4>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data: () => ({
      valid: true,
      titulo: '',
      tituloRules: [
        v => !!v || 'Es requereix una títol'
       /*  v => (v && v.length <= 10) || 'Name must be less than 10 characters', */
      ],
      subtitulo: ''
      
      
    }),
  computed: {
    partida() {
      return this.$store.getters.partida
    }
  },  

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        const str = 'ENTREVISTA'
        this.partida.feedback = str
        this.update()
      }
    },
    update() {
      this.$store.dispatch('updatePartida', this.partida)
    },
  }

}
</script>

<style>

</style>
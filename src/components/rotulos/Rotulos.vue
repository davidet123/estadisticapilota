<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-sheet elevation="4" width="100%" class="px-3 ma-0">
        <v-col cols="12" align="center">
          <h3 class="mb-2">Rótul per entrevista</h3>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="titulo"
                    :rules="tituloRules"
                    label="Títol"
                    required
                  ></v-text-field>
                
                  <v-text-field
                    v-model="subtitulo"
                    label="Subtítol"
                    required
                  ></v-text-field>
                    <v-btn
                      :disabled="!valid"
                      color="#317f5c"
                      dark
                      class="mr-4"
                      @click="validate"
                      align="center"
                    >Enviar
                    </v-btn>
                    
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" align="center">
                    <h5>Títol</h5>
                    <v-divider></v-divider>
                    <h4 class="py-2">{{ feedback.rotulo.titulo }}</h4>
                    
                  
                    <h5 class="mt-4">Subtítol</h5>
                    <v-divider></v-divider>
                    <h4 class="py-2">{{ feedback.rotulo.subtitulo }}</h4>
                  </v-col>
                
              </v-row>
              
            </v-form>
        </v-col>
        <v-row>
          
        </v-row>
        
      </v-sheet>
    </v-row>
    
  </v-container>
</template>

<script>
export default {
  data: () => ({
      valid: true,
      titulo: '',
      tituloRules: [
        v => !!v || 'Es requereix un títol'
       /*  v => (v && v.length <= 10) || 'Name must be less than 10 characters', */
      ],
      subtitulo: ''
      
      
    }),
  computed: {
    feedback() {
      return this.$store.getters.getFeedback
    }
  },  

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        const str = 'ENTREVISTA: ' + this.titulo
        this.feedback.rotulo.titulo = this.titulo
        this.feedback.rotulo.subtitulo = this.subtitulo

        this.feedback.feedbackStr = str
        this.updateFb()
      }
    },
    updateFb() {
      this.$store.dispatch('updateFeedback', this.feedback)
    },
  }

}
</script>

<style>

</style>
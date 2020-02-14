import db from '@/firebase/init.js'
//import firebase from 'firebase/app'
import 'firebase/auth'
//import router from '@/router'


export default {
  state: {
    entrevista: null
   
  },
  getters: {
    getEntrevista: state => {
      return state.entrevista
    }
    
  },
  mutations: {
    updateEntrevista: (context, payload) => {
      
      context.entrevista = payload
    }
    
  },
  actions: {
    actualizarEntrevista: ({commit}) => {
      // Detecta cambios en la base de datos y actualiza la app

      db.collection('entrevista').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let ent = change.doc.data()
          if (change.type === 'modified') {
            commit('updateEntrevista', ent)
          } else if(change.type === 'added' ) {
            commit('updateEntrevista', ent)
          }
        })
      })
    },
    updateEntrevista: ({commit}, payload) => {
      // Actualiza la base de datos directamente
      //commit('carregant', true)
      const ent = db.collection('entrevista').doc('8BbwOnknfJAzO6EBXA22')
      //console.log('update')
      ent.update(payload)
      commit('updateEntrevista', payload)
    },
  } 
}

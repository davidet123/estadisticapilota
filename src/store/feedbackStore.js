import db from '@/firebase/init.js'
//import firebase from 'firebase/app'
import 'firebase/auth'
//import router from '@/router'


export default {
  state: {
    feedback: '',
    rotulo: ''
   
  },
  getters: {
    getFeedback: state => {
      return state.feedback
    }
    
  },
  mutations: {
    updateFeedback: (context, payload) => {
      //console.log(payload)
      context.feedback = payload

    }
    
  },
  actions: {
    actualizarFeedback: ({commit}) => {
      // Detecta cambios en la base de datos y actualiza la app

      db.collection('feedback').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let fb = change.doc.data()
          if (change.type === 'modified') {
            commit('updateFeedback', fb)
          } else if(change.type === 'added' ) {
            commit('updateFeedback', fb)
          }
        })
      })
    },
    updateFeedback: ({commit}, payload) => {
      // Actualiza la base de datos directamente
      //commit('carregant', true)
      const fb = db.collection('feedback').doc('RfNH8myduItkH5hy6o2Y')
      //console.log('update')
      fb.update(payload)
      commit('updateFeedback', payload)
    },
  } 
}

import Vue from 'vue'
import Vuex from 'vuex'
import users from './users.js'
import db from '@/firebase/init.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users
  },
  state: {
    carregant: false,
    partidaMemoria: null,
    listado_id: [],
    partides: [],
    partida: null
  },
  getters: {
    cargando: state=> {
      return state.carregant
    },
    partida: state=> {
      return state.partida
    },
    partidaCargada: state=> {
      return state.partidaMemoria
    },
    partides: state=> {
      return state.partides
    },
    buscarPartida: state => {
      return id => {
        return state.partides.find(partida => {
          return partida.id === id
        })
      }
    },
    marcador: state => {
      return state.partida.marcador
    },
    getFeedback: state => {
      return state.partida.feedback
    }

  },
  mutations: {
    /* feedback: (context, payload) => {
      console.log(payload)
      context.feedback = payload
    },  */ 
    carregant: (context, payload) => {
      context.carregant = payload
    },
    addLista: (context, payload) => {
      context.listado_id.push(payload)
    },
    addPartidas: (context, payload) => {
      context.partides.push(payload)
    },
    cargarPartida: (context, payload) => {
      //console.log(payload)
      if(payload == null) {
        context.partida = null
      } else {
        const item = context.partides.find(partida => {
          return partida.id === payload
        })
        context.partida = item
      }
    },
    actualizarPartida: (context, payload) => {
      context.partida = payload
      let lista = context.partides.find(partida => {
        return partida.id == payload.id
      })
      /* console.log(lista.hora_final) */
      lista.marcador = payload.marcador
      lista.parcials = payload.parcials
      lista.travesses = payload.travesses
      lista.durades = payload.durades
      lista.equip_roig = payload.equip_roig
      lista.equip_blau = payload.equip_blau
      lista.hora_inici = payload.hora_inici
      lista.hora_final = payload.hora_final
      lista.rotulo = payload.rotulo
    },
    eliminarPartida: (context, payload) => {
      context.partides = context.partides.filter(partida => {
        return partida.id !== payload
      })
    },
    partidaCargada: (context, payload) => {
      //console.log(payload)
      context.partida = payload
    }
  },
  actions: {
    addPartida: ({commit}, payload) => {
      db.collection('partides_ok').add(payload)
      .then((data) => {
        let id = data._key.path.segments[1]
        payload.id = id
        //console.log(data._key.path.segments[1])
        /* commit('addPartidas', payload) */
        commit('carregant', false) 
      })
    },
    cargarListado: ({commit}) => {
      //console.log('cargando...')
      commit('carregant', true)
      db.collection('partides_ok').get()
      .then (data => {
        data.forEach(doc=> {
          let partida = doc.data()
          partida.id = doc.id
          commit('addLista', partida.id)
          commit('addPartidas', partida)
          //console.log(partida)

        })
        commit('carregant', false)
      })
    },
    updatePartida: ({commit}, payload) => {
      commit('carregant', true)
      const part = db.collection('partides_ok').doc(payload.id)
      //console.log('update')
      part.update(payload)
      commit('carregant', false)
    },
    actualizarListado: ({commit, state}) => {
      db.collection('partides_ok').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let partida = change.doc.data()
          partida.id = change.doc.id
          if (change.type === 'modified') {
            commit('actualizarPartida', partida)
          } else if(change.type === 'added' && state.carregant) {
            //console.log('addPartida')
            commit('addPartidas', partida)
          }
        })
      })
    },
    actualizarPartidaCargada: ({commit}) => {
      db.collection('partida_cargada').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let partida = change.doc.data()
          if (change.type === 'modified') {
            commit('cargarPartida', partida.id)
          }
        })
      })
    },
    eliminarPartida: ({commit}, payload) => {
      db.collection('partides_ok').doc(payload).delete()
      .then(() => {
        commit('eliminarPartida', payload)
      })
    },
    cargarPartida: ({commit}, payload) => {
      commit('carregant', true)
      db.collection('partida_cargada').doc('UzBxIXYsndS4Ze3DizHd').update({id:payload})
      .then(() => {
          commit('partidaCargada', payload)
          commit('cargarPartida', payload)
          commit('carregant', false)
      })
        
    },
    partidaCargada: ({commit}) => {
      commit('carregant', true)
      db.collection('partida_cargada').doc('UzBxIXYsndS4Ze3DizHd').get()
      .then(doc => {
        commit('partidaCargada', doc.data().id)
        commit('cargarPartida', doc.data().id)
        commit('carregant', false)
        //console.log(doc.data().id)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import users from './users.js'
import marcador from './marcador.js'
import feedback from './feedback.js'
import db from '@/firebase/init.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    marcador,
    feedback
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
      if(payload === context.partida.id) {
        context.partida = null
      }
    },
    partidaCargada: (context, payload) => {
      //console.log(payload)
      context.partida = payload
    }
  },
  actions: {
    addPartida: ({dispatch}, payload) => {
      // Añade nueva partida a la base de datos
      
      db.collection('partides_ok1').add(payload.partida)
      .then((data) => {
        let id = data._key.path.segments[1]
        console.log(id)
        
        // Crea un nuevo marcador con la id de la partida creada
        payload.marcador.id_partida = id
        dispatch('addMarcador', payload.marcador)
        //console.log(data._key.path.segments[1])
        /* commit('addPartidas', payload) */
        //commit('carregant', false) 
      })
    },
    cargarListado: ({commit}) => {
      // Carga lista de partidas al iniciar la app
      commit('carregant', true)
      db.collection('partides_ok1').get()
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
      // Actualiza la base de datos directamente
      commit('carregant', true)
      const part = db.collection('partides_ok1').doc(payload.id)
      //console.log('update')
      part.update(payload)
      commit('carregant', false)
    },
    actualizarListado: ({commit}) => {
      // Detecta los cambios en la base de datos
      db.collection('partides_ok1').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let partida = change.doc.data()
          partida.id = change.doc.id
          if (change.type === 'modified') {
            commit('actualizarPartida', partida)
            /* commit('carregant', false) */
          } else if(change.type === 'added') {
            let partida = change.doc.data()
            partida.id = change.doc.id
            commit('addLista', partida.id)
            commit('addPartidas', partida)
            //console.log('addPartida')
          } else if(change.type === 'removed') {
            commit('eliminarPartida', partida.id)
          }
        })
      })
    },
    actualizarPartidaCargada: ({commit}) => {
      //Actualiza la partida que se ha cargado y el marcador 

      db.collection('partida_cargada').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let partida = change.doc.data()
          if (change.type === 'modified') {
            commit('cargarPartida', partida.id)
            commit('cargarMarcador', partida.id)
          }
        })
      })
    },
    eliminarPartida: ({dispatch}, payload) => {
      // elimina una partida
      db.collection('partides_ok1').doc(payload).delete() 
      .then(() => {
        dispatch('eliminarMarcador', payload)
      })
    },
    cargarPartida: ({commit}, payload) => {
      // Actualiza la base de datos para la partida en activo
      commit('carregant', true)
      db.collection('partida_cargada').doc('UzBxIXYsndS4Ze3DizHd').update({id:payload})
      .then(() => {
          //commit('partidaCargada', payload)
          commit('cargarPartida', payload)
          commit('cargarMarcador', payload)
          commit('carregant', false)
      })
        
    },
    partidaCargada: ({commit}) => {
      // Carga la id de la partida activa desde la base de datos
      commit('carregant', true)
      db.collection('partida_cargada').doc('UzBxIXYsndS4Ze3DizHd').get()
      .then(doc => {
        //commit('partidaCargada', doc.data().id)
        commit('cargarPartida', doc.data().id)
        commit('cargarMarcador', doc.data().id)
        commit('carregant', false)
        
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})

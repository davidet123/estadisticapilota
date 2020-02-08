import db from '@/firebase/init.js'
//import firebase from 'firebase/app'
import 'firebase/auth'
//import router from '@/router'


export default {
  state: {
    marcadores: [],
    marcador_activo: null,
   
  },
  getters: {
    getMarcador: state=> {
      return id => {
        return state.marcadores.find(marcador => {
          return marcador.id_partida == id
        })
      }
      
    },
    getMarcadorActivo: state => {
      return state.marcador_activo
    }
    
  },
  mutations: {
    addMarcador: (context, payload) => {
      /* console.log(payload) */
      context.marcadores.push(payload)
    },
    cargarMarcador: ( context, payload) => {
      //console.log('marcador ' + payload)
      if(payload == null) {
        context.marcador_activo = null
      } else {
        const item = context.marcadores.find(marcador => {  
          //console.log(marcador)     
          return marcador.id_partida == payload
        })
        //console.log(item)
        context.marcador_activo = item
      }
    },
    eliminarMarcador: (context, payload) => {
      context.marcadores = context.marcadores.filter(marcador => {
        return marcador.id_partida !== payload
      })
    },
    

    updateMarcador: (context, payload) => {
      context.marcador_activo = payload 
      let marc = context.marcadores.find(marcador => {
        //console.log(marcador)
        return marcador.id == payload.id
      })
      /* console.log(lista.hora_final) */
      //console.log(marc)
      marc.marcador = payload.marcador
      marc.parcials = payload.parcials
    },
    
  },
  actions: {
    cargarMarcador: ({commit}) => {
      // Carga la lista de marcadores al iniciar la app

      commit('carregant', true)
      db.collection('marcadores').get()
      .then (data => {
        data.forEach(doc=> {
          let marc = doc.data()
          marc.id = doc.id
          //console.log(doc.data())
          commit('addMarcador', marc)
          //commit('addPartidas', partida)
          //console.log(partida)

        })
        commit('carregant', false)
      })
    },
    addMarcador: ({commit}, payload) => {
      // Añade un nuevo marcador a la base de datos

      commit('carregant', true)
      db.collection('marcadores').add(payload)
      .then(() => {
        /* let id = data._key.path.segments[1]  
        commit('addMarcador', payload) */
        commit('carregant', false)
      })
    },
    actualizarMarcador: ({commit}) => {
      // Detecta cambios en la base de datos y actualiza la app

      db.collection('marcadores').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let marc = change.doc.data()
          if (change.type === 'modified') {
            //console.log(marc)
            commit('updateMarcador', marc)
          } else if(change.type === 'added' ) {
            marc.id = change.doc._key.path.segments[change.doc._key.path.segments.length - 1]
            //console.log(marc.id)
            commit('addMarcador', marc)
          }
        })
      })
    },
    /* cargarListado: ({commit}) => {
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
    }, */
    updateMarcador: ({commit}, payload) => {
      // Actualiza la base de datos directamente
      commit('carregant', true)
      //console.log(payload)
      const marc = db.collection('marcadores').doc(payload.id)
      //console.log('update')
      marc.update(payload)
      commit('carregant', false)
    },
    actualizarListadoMarcador: ({commit}) => {
      db.collection('marcadores').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let marc = change.doc.data()
          marc.id = change.doc.id
          if (change.type === 'modified') {
            commit('cargarMarcador', marc)
          }/*  else if(change.type === 'added' && state.carregant) {
            //console.log('addPartida')
            commit('addPartidas', partida)
          } */
        })
      })
    },
    /* actualizarMarcadorCargado: ({commit}) => {
      db.collection('marcadores').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let marc = change.doc.data()
          if (change.type === 'modified') {
            commit('cargarPartida', marc.id)
          }
        })
      })
    }, */
    eliminarMarcador: ({commit, state}, payload) => {
      const marc_id = state.marcadores.find(marc => {
        return marc.id_partida == payload
      })
      //console.log(marc_id)
      db.collection('marcadores').doc(marc_id.id).delete()
      .then(() => {
        commit('eliminarMarcador', payload)
      })
    },
    /* cargarPartida: ({commit}, payload) => {
      commit('carregant', true)
      db.collection('partida_cargada').doc('UzBxIXYsndS4Ze3DizHd').update({id:payload})
      .then(() => {
          commit('partidaCargada', payload)
          commit('cargarPartida', payload)
          commit('carregant', false)
      })
        
    }, */
    /* partidaCargada: ({commit}) => {
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
    }*/
  } 
}

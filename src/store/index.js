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
    /* partida: {
      id_partida: '001',
      
      equip_roig: {
        nom_equip: 'barxeta',
        jugadors: {
          jug1: {
            num: 1,
            nom: 'molto',
            est_ind: {
              colps: 5,
              errades: 0
            },
            caigudes: {
              total: 0,
              quinzes: 0
            }
          },
          jug2: {
            num: 2,
            nom: 'sanchis',
            est_ind: {
              colps: 5,
              errades: 0
            },
            caigudes: {
              total: 0,
              quinzes: 0
            }
          },
          jug3: {
            num: 3,
            nom: 'vercher',
            est_ind: {
              colps: 5,
              errades: 0
            },
            caigudes: {
              total: 0,
              quinzes: 0
            }
          },
        },
        treta: {
            num: 4,
            nom: 'molto',
            tretes: {
              directes: 2,
              faltes: 0
            }
        },
        punts: 0,
        canvi_pilota: 0
      },
      equip_blau: {
        nom_equip: 'xeraco',
        jugadors: {
          jug1: {
            num: 1,
            nom: 'ian',
            est_ind: {
              colps: 5,
              errades: 0
            },
            caigudes: {
              total: 0,
              quinzes: 0
            }
          },
          jug2: {
            num: 2,
            nom: 'marrahi',
            est_ind: {
              colps: 5,
              errades: 0
            },
            caigudes: {
              total: 0,
              quinzes: 0
            }
          },
          jug3: {
            num: 3,
            nom: 'pablo',
            est_ind: {
              colps: 5,
              errades: 0
            },
            caigudes: {
              total: 0,
              quinzes: 0
            }
          },
        },
        treta: {
            num: 4,
            nom: 'ian',
            tretes: {
              directes: 2,
              faltes: 0
            }
        },
        punts: 0,
        canvi_pilota: 0
      }, 
    }*/
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
        return state.partida.find(partida => {
          return partida.id_partida === id
        })
      }
    }

  },
  mutations: {
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
      console.log(payload)
      if(payload == null) {
        context.partida = null
      } else {
        const item = context.partides.find(partida => {
          return partida.id === payload
        })
        //console.log(payload)
        context.partida = item
      }
    },
    actualizarPartida: (context, payload) => {
      context.partida = payload
    },
    eliminarPartida: (context, payload) => {
      context.partides = context.partides.filter(partida => {
        return partida.id !== payload
      })
    },
    partidaCargada: (context, payload) => {
      //console.log(payload)
      context.partidaMemoria = payload
    }
  },
  actions: {
    addPartida: ({commit}, payload) => {
      db.collection('partides').add(payload)
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
      db.collection('partides').get()
      .then (data => {
        data.forEach(doc=> {
          let partida = doc.data()
          partida.id = doc.id
          commit('addLista', partida.id)
          commit('addPartidas', partida)

        })
        commit('carregant', false)
      })
    },
    updatePartida: ({commit}, payload) => {
      commit('carregant', true)
      const part = db.collection('partides').doc(payload.id)
      //console.log('update')
      part.update(payload)
      commit('carregant', false)
    },
    actualizarListado: ({commit, state}) => {
      db.collection('partides').onSnapshot(snapshot=> {
        snapshot.docChanges().forEach(change => {
          let partida = change.doc.data()
          partida.id = change.doc.id
          if (change.type === 'modified') {
            commit('actualizarPartida', partida)
          } else if(change.type === 'added' && state.carregant) {
            console.log('addPartida')
            commit('addPartidas', partida)
          }
        })
      })
    },
    eliminarPartida: ({commit}, payload) => {
      db.collection('partides').doc(payload).delete()
      .then(() => {
        commit('eliminarPartida', payload)
      })
    },
    cargarPartida: ({commit}, payload) => {
      db.collection('partida_cargada').doc('UzBxIXYsndS4Ze3DizHd').update({id:payload})
      .then(() => {
          commit('partidaCargada', payload)
          commit('cargarPartida', payload)
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

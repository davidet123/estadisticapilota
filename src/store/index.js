import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    partidaCargada: null,
    partides: ['001', '001'],
    partida: {
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
    }
  },
  getters: {
    partida: state=> {
      return state.partida
    },
    partidaCargada: state=> {
      return state.partidaCargada
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
  },
  actions: {
  },
  modules: {
  }
})

import db from "@/firebase/init.js"
//import firebase from 'firebase/app'
import "firebase/auth"
import router from "@/router"

export default {
  state: {
    marcadores: [],
    marcador_activo: null
  },
  getters: {
    getMarcador: state => {
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
    cargarMarcador: (context, payload) => {
      //console.log('marcador ' + payload)
      if (payload == null) {
        context.marcador_activo = null
      } else {
        const item = context.marcadores.find(marcador => {
          //console.log(marcador)
          return marcador.id_partida == payload
        })
        /* console.log(item) */
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
    }
  },
  actions: {
    cargarMarcador: ({ commit }) => {
      // Carga la lista de marcadores al iniciar la app

      commit("carregant", true)
      db.collection("marcadores_final")
        .get()
        .then(data => {
          data.forEach(doc => {
            let marc = doc.data()
            marc.id = doc.id
            commit("addMarcador", marc)
          })
          commit("carregant", false)
        })
    },
    addMarcador: ({ commit }, payload) => {
      // Añade un nuevo marcador a la base de datos

      db.collection("marcadores_final")
        .add(payload)
        .then(() => {
          commit("carregant", false)
          router.push("/")
        })
    },
    actualizarMarcador: ({ commit }) => {
      // Detecta cambios en la base de datos y actualiza la app

      db.collection("marcadores_final").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let marc = change.doc.data()
          if (change.type === "modified") {
            commit("updateMarcador", marc)
          } else if (change.type === "added") {
            marc.id =
              change.doc._key.path.segments[
                change.doc._key.path.segments.length - 1
              ]
            commit("addMarcador", marc)
          }
        })
      })
    },
    updateMarcador: ({ commit }, payload) => {
      // Actualiza la base de datos directamente
      /* console.log(payload) */
      commit("carregant", true)
      const marc = db.collection("marcadores_final").doc(payload.id)
      marc.update(payload)
      commit("carregant", false)
    },
    actualizarListadoMarcador: ({ commit }) => {
      db.collection("marcadores_final").onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          let marc = change.doc.data()
          marc.id = change.doc.id
          if (change.type === "modified") {
            commit("cargarMarcador", marc)
          }
        })
      })
    },
    eliminarMarcador: ({ commit, state }, payload) => {
      const marc_id = state.marcadores.find(marc => {
        return marc.id_partida == payload
      })
      //console.log(marc_id)
      db.collection("marcadores_final")
        .doc(marc_id.id)
        .delete()
        .then(() => {
          commit("eliminarMarcador", payload)
        })
    }
  }
}

import db from "@/firebase/init.js"
//import firebase from 'firebase/app'
//import 'firebase/auth'
//import router from '@/router'

export default {
  state: {
    jugadores: []
  },
  getters: {
    listaJugadores: state => {
      return state.jugadores
    }
  },
  mutations: {
    addJugador: (context, payload) => {
      context.jugadores.push(payload)
    },
    actualizarJugador: (context, payload) => {
      let jugador = context.jugadores.find(jug => {
        return jug.id == payload.id
      })
      jugador.nom_esportiu = payload.nom_esportiu
      jugador.nom_jugador = payload.nom_jugador
      jugador.posicion = payload.posicion
      jugador.fecha_nacimiento = payload.fecha_nacimiento
      jugador.localidad = payload.localidad
      jugador.altura = payload.altura
      jugador.peso = payload.peso
      jugador.brazo_dominante = payload.brazo_dominante
      jugador.categoria = payload.categoria
      jugador.disciplina = payload.disciplina
    }
  },
  actions: {
    // Añadir nuevo jugador
    addJugador: ({ commit }, payload) => {
      commit("carregant", true)
      db.collection("jugadores")
        .add(payload)
        .then(() => {
          /* const id = data.id
          payload.id = id
          commit("addJugador", payload) */
          commit("carregant", false)
        })
    },
    actualizarJugador: ({ commit }, payload) => {
      commit("carregant", true)
      const jug = db.collection("jugadores").doc(payload.id)
      jug.update(payload)
      commit("carregant", false)
    },
    actualizarJugadores: ({ commit }) => {
      db.collection("jugadores").onSnapshot(doc => {
        doc.docChanges().forEach(doc => {
          let jugador = doc.doc.data()
          jugador.id = doc.doc.id
          if (doc.type == "added") {
            commit("addJugador", jugador)
          } else if (doc.type === "modified") {
            commit("actualizarJugador", jugador)
          }
        })
      })
    }
  }
}

import db from "@/firebase/init.js"
import firebase from "firebase/app"
import "firebase/auth"
import router from "@/router"

export default {
  state: {
    user: null,
    feedback_user: null,
    roles: ["admin", "editor", "miembro", "externo"],
    loading_user: false,
  },
  getters: {
    feedback_user: (state) => {
      return state.feedback_user
    },
    roles: (state) => {
      return state.roles
    },
    getUser() {
      return firebase.auth().currentUser
    },
    rolUser: (state) => {
      if (state.user) {
        return state.user.rol
      } else {
        return null
      }
    },
    userStatus: (state) => {
      /* console.log(state.user) */
      return state.user
    },
    carregant_usuari: (state) => {
      return state.loading_user
    },
  },
  mutations: {
    feedback_user: (context, payload) => {
      let err = payload
      let error
      if (err == "auth/invalid-email") {
        error = "Direcció de email invalida"
      } else if (err == "auth/user-not-found") {
        error = "El usuari no existeix"
      } else if (err == "auth/wrong-password") {
        error = "Password incorrecte"
      } else {
        error = payload
      }
      context.feedback_user = error
    },
    logOut(context) {
      context.user = null
    },
    setUser: (context, payload) => {
      /*   */
      context.user = payload
    },
    carregant_usuari: (context, payload) => {
      context.loading_user = payload
    },
  },
  actions: {
    signIn: ({ commit }, payload) => {
      commit("carregant_usuari", true)
      let ref = db.collection("users").doc(payload.user)
      ref.get().then((doc) => {
        if (doc.exists) {
          commit("feedback_user", "El usuari ja existeix")
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((cred) => {
              ref
                .set({
                  user: payload.nombre,
                  rol: payload.rol,
                  user_id: cred.user.uid,
                })
                .then(() => {
                  commit("carregant_usuari", false)
                  //console.log(doc)
                  //router.push({name: 'home'})
                })
            })
            .catch((err) => {
              commit("feedback_user", err.code)
            })
          //console.log(doc)
          //commit('feedback_user', 'Nom de usuari valid')
        }
      })
    },
    logIn: ({ commit }, payload) => {
      commit("carregant_usuari", true)
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((cred) => {
          db.collection("users")
            .where("user_id", "==", cred.user.uid)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                db.collection("users")
                  .doc(doc.id)
                  .get()
                  .then((user) => {
                    commit("setUser", user.data())
                    commit("carregant_usuari", false)
                    router.push({ name: "home" })
                  })
              })
            })
        })
        .catch((err) => {
          commit("feedback_user", err.code)
        })
    },
    logOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("logOut")
        })
    },
    setUser: ({ commit }, payload) => {
      commit("carregant_usuari", true)
      db.collection("users")
        .where("user_id", "==", payload)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection("users")
              .doc(doc.id)
              .get()
              .then((user) => {
                commit("setUser", user.data())
                commit("carregant_usuari", false)
              })
          })
        })
    },
  },
}

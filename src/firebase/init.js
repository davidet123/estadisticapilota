import firebase from "firebase/app"
import "firebase/firestore"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
  projectId: "estadisticapilota",
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()

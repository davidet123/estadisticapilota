import firebase from 'firebase/app';
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBh8fgbsZIl5Ag514GyX1-8zPfi5L2LW6o",
  authDomain: "estadisticapilota.firebaseapp.com",
  databaseURL: "https://estadisticapilota.firebaseio.com",
  projectId: "estadisticapilota",
  storageBucket: "estadisticapilota.appspot.com",
  messagingSenderId: "691783153705",
  appId: "1:691783153705:web:7b7f5a4b10a167f7370438"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()
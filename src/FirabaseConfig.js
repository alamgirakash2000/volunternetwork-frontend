import firebase from "firebase";

const Config = firebase.initializeApp({
  apiKey: "AIzaSyA5trI428OfKcAGqT-8mZHNliNO9KN8WRo",
  authDomain: "travel-guru-4399a.firebaseapp.com",
  databaseURL: "https://travel-guru-4399a.firebaseio.com",
  projectId: "travel-guru-4399a",
  storageBucket: "travel-guru-4399a.appspot.com",
  messagingSenderId: "153215978414",
  appId: "1:153215978414:web:579d4ed0f3a4a71ee7d63f",
  measurementId: "G-2HGCKNVNCC",
});

export const auth = firebase.auth();
export const storage = firebase.storage();

export default Config;

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCqFa5jn43KRrRucTdCKz0BAgtgXssAp3U",
    authDomain: "gokkauth.firebaseapp.com",
    projectId: "gokkauth",
    storageBucket: "gokkauth.appspot.com",
    messagingSenderId: "901665692982",
    appId: "1:901665692982:web:bf9d637fa72b2fc21c2797",
    measurementId: "G-7H4K2BS93N"
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export { firebase };
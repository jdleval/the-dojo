import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA3uZlfqRE-yjZL3MKmY9vpn3dvLeSl8Yk',
  authDomain: 'thedojo-8776d.firebaseapp.com',
  projectId: 'thedojo-8776d',
  storageBucket: 'thedojo-8776d.appspot.com',
  messagingSenderId: '528111461538',
  appId: '1:528111461538:web:13cf9085712114de32a3fb',
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };

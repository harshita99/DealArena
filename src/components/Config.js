import * as firebase from 'firebase';
import 'firebase/firestore';

// const settings= {timestampsInSnapshots: true}

var firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_apiKey,
        authDomain: process.env.REACT_APP_FIREBASE_authDomain,
        databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
        projectId: process.env.REACT_APP_FIREBASE_projectId,
        storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
        messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
        appId: process.env.REACT_APP_FIREBASE_appId,
  };

firebase.initializeApp(firebaseConfig);
// let firestore = firebase.firestore();

//firebase.firestore().setting(settings);

export default firebase;

 
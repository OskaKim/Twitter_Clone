import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: proccess.env.REACT_APP_API_KEY,
    authDomain: proccess.env.REACT_APP_AUTH_DOMAIN,
    projectId: proccess.env.REACT_APP_PROJECT_ID,
    storageBucket: proccess.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: proccess.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: proccess.env.REACT_APP_APP_ID
  };

export default firebase.initializeApp(firebaseConfig);
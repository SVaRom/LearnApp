// Import the functions you need from the SDKs you need
import * as firebaseall from "firebase";
import firebase from "firebase";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlYWJZS_2DeYM2W4TZn9givpWdWvhPBlE",
  authDomain: "varom-4ec7d.firebaseapp.com",
  projectId: "varom-4ec7d",
  storageBucket: "varom-4ec7d.appspot.com",
  messagingSenderId: "739685340443",
  appId: "1:739685340443:web:654e94d35dbded2885afbe",
};

// Initialize Firebase
let app;
if (firebaseall.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebaseall.auth();
const db = firebase.firestore();

export { auth };
export default { firebase, db };

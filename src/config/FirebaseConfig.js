import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { config } from "./fbConfig";

// Initialize Firebase
// Config looks like this and can be found in your firebase console
// const config = {
//   apiKey: "my-apiKey",
//   authDomain: "my-authDomain",
//   databaseURL: "my-databaseURL",
//   projectId: "my-projectId",
//   storageBucket: "my-storageBucket",
//   messagingSenderId: "my-messagingSenderId",
// };

firebase.initializeApp(config);

export default firebase;

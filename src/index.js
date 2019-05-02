import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { combineReducers } from "redux";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";
import { fbConfig } from "./config/fbConfig";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// fbConfig looks like this and can be found in your firebase console
// exported from folder config/fbConfig.js
// var config = {
//   apiKey: "<my-apiKey>",
//   authDomain: "<my-authDomain>",
//   databaseURL: "<my-databaseURL>",
//   projectId: "<my-projectId>",
//   storageBucket: "<my-storageBucket>",
//   messagingSenderId: "<my-messagingSenderId>",
// };

// Initialize Firebase
firebase.initializeApp(fbConfig);
firebase.firestore();

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const FirebaseApp = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
);

ReactDOM.render(<FirebaseApp />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

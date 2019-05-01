import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { fbConfig } from "./config/fbConfig";
import { createStore } from "redux";
import rootReducer from "./store/reducers/rootReducer";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  attachAuthIsReady: true
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

const FireApp = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
);

ReactDOM.render(<FireApp />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

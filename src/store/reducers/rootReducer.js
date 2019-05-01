import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
// import authReducer from "./authReducer";
// import playerReducer from './playerReducer';
// import teamReducer from './teamReducer';
// import scheduleReducer from './scheduleReducer';
// import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  // auth: authReducer,
  // player: playerReducer,
  // team: teamReducer,
  // schedule: scheduleReducer,
  // game: gameReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;

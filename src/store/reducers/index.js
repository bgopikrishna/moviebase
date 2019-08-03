import { combineReducers } from "redux";
import { fetchReducer } from "./fetchReducer";
import { indicatorReducer } from "./indicatorReducers";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  fetchedData: fetchReducer,

  indicators: indicatorReducer,

  firebase: firebaseReducer,
  firestore: firestoreReducer,
  authState: authReducer
});

export default rootReducer;

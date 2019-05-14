import { combineReducers } from "redux";
import { fetchReducer } from "./fetchReducer";
import { favouriteReducer } from "./favouriteReducer";
import { indicatorReducer } from "./indicatorReducers";
import { watchListReducer } from "./watchListReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  fetchedData: fetchReducer,
  favItems: favouriteReducer,
  indicators: indicatorReducer,
  watchListItems: watchListReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  authState: authReducer
});

export default rootReducer;

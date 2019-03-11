import { combineReducers } from "redux";
import { fetchReducer } from "./fetchReducer";
import { favouriteReducer } from "./favouriteReducer";

const rootReducer = combineReducers({
  fetchedData: fetchReducer,
  favItems: favouriteReducer
});

export default rootReducer;

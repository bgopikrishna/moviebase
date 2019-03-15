import { combineReducers } from "redux";
import { fetchReducer } from "./fetchReducer";
import { favouriteReducer } from "./favouriteReducer";
import { indicatorReducer } from "./indicatorReducers";

const rootReducer = combineReducers({
  fetchedData: fetchReducer,
  favItems: favouriteReducer,
  indicators: indicatorReducer
});

export default rootReducer;

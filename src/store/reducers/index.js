import { combineReducers } from "redux";
import { fetchReducer } from "./fetchReducer";
import { favouriteReducer } from "./favouriteReducer";
import { indicatorReducer } from "./indicatorReducers";
import { watchListReducer } from "./watchListReducer";

const rootReducer = combineReducers({
  fetchedData: fetchReducer,
  favItems: favouriteReducer,
  indicators: indicatorReducer,
  watchListItems: watchListReducer
});

export default rootReducer;

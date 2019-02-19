import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import currentLocationReducer from "./currentLocationReducer";
export default combineReducers({
  loginData: loginReducer,
  currentLocation: currentLocationReducer
});

import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import currentLocationReducer from "./currentLocationReducer";
import defibrillatorsReducer from "./defibrillatorsReducer";
export default combineReducers({
  loginData: loginReducer,
  currentLocation: currentLocationReducer,
  defibrillators: defibrillatorsReducer
});

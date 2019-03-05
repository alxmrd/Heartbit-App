import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import currentLocationReducer from "./currentLocationReducer";
import defibrillatorsReducer from "./defibrillatorsReducer";
import loggedInUserReducer from "./loggedInUserReducer";
import messageReducer from "./messageReducer";
export default combineReducers({
  loginData: loginReducer,
  currentLocation: currentLocationReducer,
  defibrillators: defibrillatorsReducer,
  loggedInVolunteerData: loggedInUserReducer,
  message: messageReducer
});

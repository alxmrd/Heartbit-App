import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import currentLocationReducer from "./currentLocationReducer";
import defibrillatorsReducer from "./defibrillatorsReducer";
import loggedInUserReducer from "./loggedInUserReducer";
import messageReducer from "./messageReducer";
import eventReducer from "./eventReducer";
import nearestDefibrillatorReducer from "./nearestDefibrillatorReducer";
import eventAnswerReducer from "./eventAnswerReducer";
export default combineReducers({
  loginData: loginReducer,
  currentLocation: currentLocationReducer,
  defibrillators: defibrillatorsReducer,
  loggedInVolunteerData: loggedInUserReducer,
  message: messageReducer,
  event: eventReducer,
  nearestDefibrillator: nearestDefibrillatorReducer,
  eventAnswer: eventAnswerReducer
});

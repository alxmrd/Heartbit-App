import { LOGIN } from "../actions/types";
import { CURRENT_LOCATION } from "../actions/types";
import { FETCH_DEFIBRILLATORS } from "../actions/types";
import { LOGGED_IN_USER } from "../actions/types";
import { CLEAR_LOGINDATA } from "../actions/types";
import { MESSAGE_RECEIVE } from "../actions/types";
import { MESSAGE_CLEAN } from "../actions/types";
import { LOGGED_OUT_USER } from "../actions/types";
//import history from "../../history";
import { AsyncStorage } from "react-native";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer "
};

export const login = (dispatch, volunteerData) => {
  fetch(`https://alxmrd.com/api/mobilelogin`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(volunteerData)
  })
    .then(result => result.json())
    .then(volunteers =>
      dispatch({
        type: LOGIN,
        payload: volunteers
      })
    )
    .catch(error => {
      alert(error);
      //history.push("/");
    });
};
export const logout = (dispatch, userData) => {
  dispatch({
    type: LOGGED_OUT_USER,
    payload: userData
  });
};
export const successLogin = (username, token) => dispatch => {
  fetch(`https://alxmrd.com/api/volunteerlogin/success?input=${username}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      ...headers,
      Authorization: "Bearer " + token
    },

    referrer: "no-referrer"
  })
    .then(result => result.json())
    .then(res => {
      dispatch({
        type: LOGGED_IN_USER,
        payload: res
      });
    })

    .catch(error => {
      alert(error, "SERVER error 500 ");
    });
};
export const fetchDefifrillators = token => dispatch => {
  fetch(`https://alxmrd.com/api/defibrillators`, {
    headers: {
      ...headers,
      Authorization: "Bearer " + token
    }
  })
    .then(result => result.json())

    .then(defibrillators =>
      dispatch({
        type: FETCH_DEFIBRILLATORS,
        payload: defibrillators.data
      })
    )
    .catch(error => {
      alert("Απαιτείται σύνδεση");
      // history.push("/");
    });
};
export const currentLocation = (dispatch, currentLocation) => {
  dispatch({
    type: CURRENT_LOCATION,
    payload: currentLocation
  });
};

export const messageReceive = (dispatch, data) => {
  dispatch({
    type: MESSAGE_RECEIVE,
    payload: data
  });
};

export const messageClean = (dispatch, data) => {
  dispatch({
    type: MESSAGE_CLEAN,
    payload: data
  });
};
export const clearLoginData = (dispatch, LoginData) => {
  dispatch({
    type: CLEAR_LOGINDATA,
    payload: LoginData
  });
};

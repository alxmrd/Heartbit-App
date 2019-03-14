import { LOGIN } from "../actions/types";
import { CURRENT_LOCATION } from "../actions/types";
import { FETCH_DEFIBRILLATORS } from "../actions/types";
import { LOGGED_IN_USER } from "../actions/types";
import { CLEAR_LOGINDATA } from "../actions/types";
import { MESSAGE_RECEIVE } from "../actions/types";
import { MESSAGE_CLEAN } from "../actions/types";
import { LOGGED_OUT_USER } from "../actions/types";
import { EVENT_RECEIVE } from "../actions/types";
import { EVENT_CLEAN } from "../actions/types";
import { NEAREST_DEFIBRILLATOR } from "../actions/types";
//import history from "../../history";
import { AsyncStorage } from "react-native";
import { Location, Permissions } from "expo";

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
export const fetchDefifrillators = () => {
  return async (dispatch, getState) => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/defibrillators`, {
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
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert = "H Τοποθεσία ειναι απενεργοποιημένη, μεταβείτε στις ρυθμίσεις!";
    }

    let location = await Location.getCurrentPositionAsync({});
    let currentLocation = location.coords;
    dispatch({
      type: CURRENT_LOCATION,
      payload: currentLocation
    });
    const state = getState();
    // console.log(state);
    var distances = state.defibrillators.map(item =>
      geolib.getPathLength([
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude
        }, // pou eisai
        { latitude: item.latitude, longitude: item.longitude }, // 8 apinidwtes
        { latitude: 40.634781, longitude: 22.94309 } // peristatiko
      ])
    );
    let nearestDefIndex = distances.indexOf(Math.min(...distances));

    let nearestDefibrillator = state.defibrillators[nearestDefIndex];

    dispatch({
      type: NEAREST_DEFIBRILLATOR,
      payload: nearestDefibrillator
    });
  };
};

export const messageReceive = (dispatch, data) => {
  dispatch({
    type: MESSAGE_RECEIVE,
    payload: data
  });
};

export const eventReceive = (dispatch, data) => {
  dispatch({
    type: EVENT_RECEIVE,
    payload: data
  });
};
export const eventClean = (dispatch, data) => {
  dispatch({
    type: EVENT_CLEAN,
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

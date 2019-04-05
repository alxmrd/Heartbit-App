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
import { EVENT_QUESTION } from "../actions/types";
import { EVENT_QUESTION_ANSWERED } from "../actions/types";
import { UPDATE_VOLUNTEER } from "../actions/types";
import { ISINVALID } from "../actions/types";
import { EVENT_REJECT } from "../actions/types";
import { CLEAR_ISINVALID } from "../actions/types";
import store from "../store.js";
import { AsyncStorage } from "react-native";
import { Location, Permissions } from "expo";
import geolib from "geolib";

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
  return async dispatch => {
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
  };
};
export const changePassword = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changepassword`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};
export const changeAddress = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changeaddress`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};
export const changeEmail = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changeemail`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};
export const changeLocation = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changelocation`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};

export const changeName = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changename`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};
export const changeSurname = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changesurname`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};
export const changeTel = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changetel`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};

export const changeTel2 = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changetel2`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};
export const changeUsername = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changeusername`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};
export const changeUserActivity = userData => {
  return async dispatch => {
    var token = await AsyncStorage.getItem("token");
    await fetch(`https://alxmrd.com/api/mobile/changeuseractivity`, {
      method: "POST",
      headers: {
        ...headers,
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(userData)
    })
      .then(result => result.json())
      .then(res => {
        res.httpstatus === "error"
          ? dispatch({
              type: ISINVALID,
              payload: res
            })
          : dispatch({
              type: UPDATE_VOLUNTEER,
              payload: res
            });
      })
      .catch(error => {
        alert(error, "SERVER error 500 ");
      });
  };
};

export const clearMessage = (dispatch, message) => {
  dispatch({
    type: CLEAR_ISINVALID,
    payload: message
  });
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

  let state = store.getState(store);

  var distances = state.defibrillators.map(item =>
    geolib.getPathLength([
      {
        latitude: state.currentLocation.latitude,
        longitude: state.currentLocation.longitude
      }, // pou eisai
      { latitude: item.latitude, longitude: item.longitude }, // 8 apinidwtes
      { latitude: state.event.latitude, longitude: state.event.longitude } // peristatiko
    ])
  );
  let nearestDefIndex = distances.indexOf(Math.min(...distances));

  let nearestDefibrillator = state.defibrillators[nearestDefIndex];

  dispatch({
    type: NEAREST_DEFIBRILLATOR,
    payload: nearestDefibrillator
  });

  let answer = "false";
  dispatch({
    type: EVENT_QUESTION,
    payload: answer
  });
};
export const eventClean = (dispatch, data) => {
  dispatch({
    type: EVENT_CLEAN,
    payload: data
  });
};
export const eventAnswer = (dispatch, data) => {
  dispatch({
    type: EVENT_ANSWER,
    payload: data
  });
};
export const eventQuestionAnswered = (
  dispatch,
  data,
  nearestDefibrillator,
  token
) => {
  dispatch({
    type: EVENT_QUESTION_ANSWERED,
    payload: data
  });
  fetch(`https://alxmrd.com/mobile/unlockDefibrillator`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(nearestDefibrillator)
  });
};
export const messageClean = (dispatch, data) => {
  dispatch({
    type: MESSAGE_CLEAN,
    payload: data
  });
};

export const eventReject = dispatch => {
  let data = "false";
  dispatch({
    type: EVENT_REJECT,
    payload: data
  });
};
export const clearLoginData = (dispatch, LoginData) => {
  dispatch({
    type: CLEAR_LOGINDATA,
    payload: LoginData
  });
};

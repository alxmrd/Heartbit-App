import { LOGIN } from "../actions/types";
import { CURRENT_LOCATION } from "../actions/types";
//import history from "../../history";

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

export const currentLocation = (dispatch, currentLocation) => {
  dispatch({
    type: CURRENT_LOCATION,
    payload: currentLocation
  });
  console.log("redux");
};

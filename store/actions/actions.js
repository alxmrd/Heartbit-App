import { LOGIN } from "../actions/types";
import { AsyncStorage } from "react-native";
//import history from "../../history";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer "
};

export const login = (dispatch, volunteerData) => {
  fetch(`http://localhost:8080/api/mobilelogin`, {
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
        payload: volunteers.data
      })
    )
    .catch(error => {
      alert(error);
      //history.push("/");
    });
};

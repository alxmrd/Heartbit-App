export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const LOGGED_OUT_USER = "LOGGED_OUT_USER";

const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.payload;

    case LOGGED_OUT_USER:
      return {};

    default:
      return state;
  }
};

export default loggedInUserReducer;

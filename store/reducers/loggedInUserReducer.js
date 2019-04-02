export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const LOGGED_OUT_USER = "LOGGED_OUT_USER";
export const UPDATE_VOLUNTEER = "UPDATE_VOLUNTEER";
const loggedInUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VOLUNTEER:
    case LOGGED_IN_USER:
      return {
        ...state,
        ...action.payload
      };
    case LOGGED_OUT_USER:
      return {};
    default:
      return state;
  }
};

export default loggedInUserReducer;

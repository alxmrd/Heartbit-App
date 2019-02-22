export const LOGIN = "LOGIN";
export const CLEAR_LOGINDATA = "CLEAR_LOGINDATA";

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case CLEAR_LOGINDATA:
      return [];

    default:
      return state;
  }
};

export default loginReducer;

export const ISINVALID = "ISINVALID";
export const CLEAR_ISINVALID = "CLEAR_ISINVALID";

const errorMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case ISINVALID:
      return action.payload;

    case CLEAR_ISINVALID:
      return {};

    default:
      return state;
  }
};

export default errorMessageReducer;

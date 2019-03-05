export const MESSAGE_RECEIVE = "MESSAGE_RECEIVE";
export const MESSAGE_CLEAN = "MESSAGE_CLEAN";

const messageReducer = (state = "", action) => {
  switch (action.type) {
    case MESSAGE_RECEIVE:
      return action.payload;

    case MESSAGE_CLEAN:
      return "";

    default:
      return state;
  }
};

export default messageReducer;

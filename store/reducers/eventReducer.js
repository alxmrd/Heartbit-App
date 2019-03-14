export const EVENT_RECEIVE = "EVENT_RECEIVE";
export const EVENT_CLEAN = "EVENT_CLEAN";

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_RECEIVE:
      return action.payload;

    case EVENT_CLEAN:
      return {};

    default:
      return state;
  }
};

export default eventReducer;

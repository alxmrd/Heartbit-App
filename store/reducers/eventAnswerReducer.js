export const EVENT_QUESTION = "EVENT_QUESTION";
export const EVENT_REJECT = "EVENT_REJECT";

const eventAnswerReducer = (state = false, action) => {
  switch (action.type) {
    case EVENT_QUESTION:
      return true;

    case EVENT_REJECT:
      return false;

    default:
      return state;
  }
};

export default eventAnswerReducer;

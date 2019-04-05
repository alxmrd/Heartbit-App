export const EVENT_QUESTION = "EVENT_QUESTION";
export const EVENT_REJECT = "EVENT_REJECT";
export const EVENT_ANSWER = "EVENT_ANSWER";
export const EVENT_QUESTION_ANSWERED = "EVENT_QUESTION_ANSWERED";
const eventAnswerReducer = (state = false, action) => {
  switch (action.type) {
    case EVENT_QUESTION:
      return true;
    case EVENT_ANSWER:
      return true;
    case EVENT_REJECT:
      return false;
    case EVENT_QUESTION_ANSWERED:
      return false;

    default:
      return state;
  }
};

export default eventAnswerReducer;

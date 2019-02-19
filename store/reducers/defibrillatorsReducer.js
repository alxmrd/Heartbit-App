export const FETCH_DEFIBRILLATORS = "FETCH_DEFIBRILLATORS";

const defibrillatorsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_DEFIBRILLATORS:
      return action.payload;

    default:
      return state;
  }
};

export default defibrillatorsReducer;

export const NEAREST_DEFIBRILLATOR = "NEAREST_DEFIBRILLATOR";

const nearestDefibrillatorReducer = (state = [], action) => {
  switch (action.type) {
    case NEAREST_DEFIBRILLATOR:
      return action.payload;

    default:
      return state;
  }
};

export default nearestDefibrillatorReducer;

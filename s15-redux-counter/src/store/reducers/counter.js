import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

//?using Using Utility Functions to clean up reducers - a cleaner case for immutability

const initialState = {
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return updateObject(state, { counter: state.counter + 1 });
    case actionTypes.DECREMENT:
      return updateObject(state, { counter: state.counter - 1 });
    case actionTypes.ADD:
      return updateObject(state, { counter: state.counter + action.val });
    case actionTypes.SUBTRACT:
      return updateObject(state, { counter: state.counter - action.val });
    default:
      return state;
  }
};

export default reducer;

// case actionTypes.DECREMENT: //case "DECREMENT":
//   return {
//     counter: state.counter - 1,
//   };
//! Updating State Immutably
// return {
//   ...state,
//   counter: state.counter - 1,
// };

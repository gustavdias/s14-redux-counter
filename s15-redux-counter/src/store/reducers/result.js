import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

//? Using Utility Functions to clean up reducers - a cleaner case for immutability

const initialState = {
  results: [],
};

const deleteResult = (state, action) => {
  const updatedArray = state.results.filter(
    (result) => result.id !== action.resultElId
  );
  return updateObject(state, { results: updatedArray });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return updateObject(state, {
        results: state.results.concat({
          id: new Date(),
          value: action.result * 2,
        }),
      });

    //*transfer into the deleteResult function
    /* case actionTypes.DELETE_RESULT:
      //*I won't write a utility function for that since updating an array depends highly on what we do with an array,
      const updatedArray = state.results.filter(
        (result) => result.id !== action.resultElId
      );

      return updateObject(state, { results: updatedArray }); */

    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);

    default:
      return state;
  }
};

export default reducer;

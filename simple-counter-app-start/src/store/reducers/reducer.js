
import * as actionTypes from "../actions/actionTypes"

//! {Reducer
//? The reducer tells Redux what the initial state of the store is
const initialState = {
    count: 0,
  };
  //? Reducer - receives 2 arguments: state and action
  //* every time something happens, redux calls this reducer
  //   const reducer = (state = initialState, action) => {
  function reducer(state = initialState, action) {
    console.log(action);
    //I am getting two actions: {type: "@@redux/INIT5.e.6.z.q.i"}
    // 1st for when redux calls the reducer (when state is undefined and the action is @@redux/INIT5.e.6.z.q.i)
    // 2nd time is the dispatch {type: "INCREMENT"}
  
    switch (action.type) {
      case actionTypes.INCREMENT:
        return {
          count: state.count + 1,
        };
      case actionTypes.DECREMENT:
        return {
          count: state.count - 1,
        };
      default:
        return state;//it ignores actions that it does not understand by returning the state unchanged
    }
  }

  export default reducer
//? it is a good practice to outsource your action types into constants you can use in your application so that you always just import a constant and eliminate the danger of mistyping,

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD = "ADD";
export const SUBTRACT = "SUBTRACT";
export const STORE_RESULT = "STORE_RESULT";
export const DELETE_RESULT = "DELETE_RESULT";

//! Actions Creator are for Async code, but can be use for sync too, as a clear approach
//a new way of creating actions, so-called action creators,
//action creator is just a function which returns an action or which creates an action

// action creator for sync code
//it receives any payloads you want to pass with that action
export const increment = () => {
  return {
    type: INCREMENT,
  };
};
// returns a actions or javascript object.

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const add = (value) => {
  return {
    type: ADD,
    val: value,
  };
};

export const subtract = (value) => {
  return {
    type: SUBTRACT,
    val: value,
  };
};

//*create asynchronous action creators, which in the end dispatch actions created by synchronous ones.
//Sync actionCreator
export const saveResult = (res) => {
  return {
    type: STORE_RESULT,
    result: res,
  };
};
export const storeResult = (res) => {
  //*redux-thunk, the middleware comes in, steps in, has access to the action there, basically blocks the old action we could say and dispatches it again in the future.
  return (dispatch) => {
    setTimeout(() => {
      //*need to execute saveResult which is this action creator as a function of course and pass res on so the redo pass the payload to the store.
      dispatch(saveResult(res)); //dispatch whichever action we want to dispatch. Pass a sync actionCreator into an Async
      //dispatch(storeResult)// infinite loop if we again dispatch storeResult here
      //
    }, 2000);
    return {};
  };
};

export const deleteResult = (resElId) => {
  return {
    type: DELETE_RESULT,
    resultElId: resElId,
  };
};

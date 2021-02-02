import * as actionTypes from "./actionTypes";

//the only place where we can execute asynchronous code is in our action creator,
// It's obviously easy for asynchronous code, the only place where we can execute asynchronous code is in our action creator, it's what redux-thunk is made for and it's the common and best practice pattern if you need to reach out to a server to fetch data from it and thereafter store it in your store, definitely do that with the action creator.
export const saveResult = (res) => {
  // const updatedResult = res * 2;//we can theoretically alter anything you want here and you might have transformations which make more sense,
  return {
    type: actionTypes.STORE_RESULT,
    result: res,
    //    result: updated,
    //You could execute that same logic if you need to transform the data before storing it in the state
  };
};
//you can put more logic into your action creators, like saveResult:
export const storeResult = (res) => {
  //*redux-thunk can pass as an additional argument, getState, that is a method we can execute to get the current state.
  return (dispatch, getState) => {
    setTimeout(() => {
      const oldCounter = getState().ctr.counter;
      console.log("!!!---oldCounter got with getState: ", oldCounter);
      //getState - if you need it, it's a nice utility function, don't overuse it though.
      //I try to write my action creators and reducers in a way that I don't have to use getState,
      //instead you can pass all the data you need in your async action creator like the user id into it by accepting it as an argument.
      //means that you need to have access to the data you need in your action creator in the container where you actually dispatch the action leading to the action creator.
      dispatch(saveResult(res));
    }, 2000);
  };
};

export const deleteResult = (resElId) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultElId: resElId,
  };
};

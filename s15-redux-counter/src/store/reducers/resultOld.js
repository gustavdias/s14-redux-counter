//!the reducer was splitted (into counter.js & result.js) and is no longer in use.
//using multiple reducers - split it up by feature and them redux will combine all in one reducer
//one for counter and one for results.

//? it is a good practice to outsource your action types into constants you can use in your application so that you always just import a constant and eliminate the danger of mistyping,
import * as actionTypes from "../actions/actionTypes"; // actionTypes is an object which has all the const as properties from actions

const initialState = {
  // counter: 0,
  results: [], //updating state immutably
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      //the reducer function has to run synchronously, you can't add setTimeout() here.
      //This function only gets executed after two seconds, the switch statement will be done by then,
      //you have to execute asynchronous code with the help of action creators,
      //*Change data
      return {
        ...state,
        //return a javascript object where we distribute the old state thus keeping the counter but then we set results here:
        //* results: state.results.concat({ id: new Date(), value: state.counter }), //concat is like push, but creates a new array
        //if we are in a reducer where we need to get a value from the global state, we should simply get it as an action payload
        results: state.results.concat({ id: new Date(), value: action.result }),//*want to change something before you store it in the state,
        //? state.counter it is not know
        //because this local initial state in this reducer doesn't have a counter property. inside this reducer function, it basically has no access to the global state
      };
    case actionTypes.DELETE_RESULT:
      //   const id = 2;
      //   state.results.splice(id, 1); //! This mutates the original array

      //! Volta -  1st way to update Arrays Immutably - Coping the array
      //   const id = 2;
      //   const updatedArray = [...state.results];
      //--------
      //! Volta - if the elements in state.results were objects as they actually are, the objects themselves are still pointing to the same objects they did before.
      //? if you change a property in one of the elements themselves, just creating a new array like this isn't enough, if you just plan on removing an object though, that is okay
      //   updatedArray.splice(id, 1);

      //--------
      //! Volta - 2nd way to update Arrays Immutably - filter method - originalArray.filter() - filter returns a new array
      //. Filter takes a function as an input, the function is executed on each element in the array, it determines whether this element fulfils a certain condition to make it into the new array

      const updatedArray = state.results.filter(
        (result) => result.id !== action.resultElId
      );

      return {
        ...state,
        results: updatedArray,
      };
    //* So we get the individual element as an input here, the element or in our case, the result
    // state.result.filter(result => true); //? if you return true, you return this for every element and therefore, you just created a copy of the old array,
    //* return true for every element which doesn't have a certain ID
    default:
      console.log("default case");
      return state;
  }

  //   if (action.type === "INCREMENT") {
  //     return {
  //       counter: state.counter + 1,
  //     };
  //   }
  //   //DECREMENT
  //   if (action.type === "DECREMENT") {
  //     return {
  //       counter: state.counter - 1,
  //     };
  //   }

  //   //ADD
  //   if (action.type === "ADD") {
  //     return {
  //       counter: state.counter  + action.payload,
  //     };
  //   }
  //   //SUBTRACT
  //   if (action.type === "SUBTRACT") {
  //     return {
  //       counter: state.counter - action.payload,
  //     };
  //   }

  //   return state;
};

export default reducer;

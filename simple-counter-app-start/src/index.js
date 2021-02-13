import React from "react";
import { render } from "react-dom";
import Counter from "./Counter";
import "./index.css";

//!{Redux
import { createStore } from "redux"; //? Creates the store from the reducer
import { Provider } from "react-redux"; //? Provides the store to the app
import reducer from "./store/reducers/reducer";
//!Redux }

//! {Reducer
//? The reducer tells Redux what the initial state of the store is
// const initialState = {
//   count: 0,
// };
// //? Reducer - receives 2 arguments: state and action
// //* every time something happens, redux calls this reducer
// //   const reducer = (state = initialState, action) => {
// function reducer(state = initialState, action) {
//   console.log(action);
//   //I am getting two actions: {type: "@@redux/INIT5.e.6.z.q.i"}
//   // 1st for when redux calls the reducer (when state is undefined and the action is @@redux/INIT5.e.6.z.q.i)
//   // 2nd time is the dispatch {type: "INCREMENT"}

//   switch (action.type) {
//     case "INCREMENT":
//       return {
//         count: state.count + 1,
//       };
//     case "DECREMENT":
//       return {
//         count: state.count - 1,
//       };
//     default:
//       return state;//it ignores actions that it does not understand by returning the state unchanged
//   }
// }

//! Reducer}

const store = createStore(reducer);

//! {Dispatch
//* store has a function in it called dispatch
//* dispatch(action) - the only way to trigger a state change
// store.dispatch({ type: "INCREMENT" });//not in use anymore, they were transferred into Counter.js
//* passes an action object - an action object should have at least a type property - it a normal JS object that needs a type property
// store.dispatch({ type: "DECREMENT" });//not in use anymore, they were transferred into Counter.js
//! Dispatch}

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

render(<App />, document.getElementById("root"));

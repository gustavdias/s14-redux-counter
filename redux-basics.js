//execute it with nodeJS
//? Node import syntax
const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  counter: 0,
};

//Steps:
// 1. Create a Store with a Reducer
// 2. Initialize a state

//--------------------------------------------------------------------------------------------------------------

//! 2. Reducer: receive Action and update State (pure, sync functions, no side-effects). Can be multiple combined reducers.
//? Reducer is what changes the Store.
//? you only have one reducer, even if we combine multiple ones, they will be merged into one: Root Reducer.
//? The Root Reducer is directly connected to your store.
//* The Reducer is the only thing that can update the state - you need to react the Reducer first, before even the Store
//? Reducer is just a pure function which receives the Action and the old State as input and gives an updated State.
//? The Reducer has to execute synchronous code only, no asynchronous code, no side effects, no HTTP requests.

//*the Reduce function reduces two arguments: 1st: current state. 2nd: action
//to initialize the state with a default value (ES6) - state = initialState
//whenever this function is now called with this argument being undefined, it will take the default value instead
//which will be the case when it's creating that store where it will execute the reducer for the first time.
const rootReducer = (state = initialState, action) => {
  if (action.type === "INC_COUNTER") {
    return {
      //!Don't!!! state.counter++' since the state is not immutable, if you change like this, you will mutate the original state
      ...state, //return a new javascript object where you may first copy the old state with the spread operator(...state), and then overwrite the one property you want to adjust:
      counter: state.counter + 1, //if counter would be a JS object I would have to do the same as above.
    };
  }
  if (action.type === "ADD_COUNTER") {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }
  return state;//only return state if none of those two if conditions above applies,
};
//the function has to return one thing and that is the updated state.

//--------------------------------------------------------------------------------------------------------------

//! 3. Store
//? Central Store: stores the entire application state.
//? a store needs to be initialized with a reducer

//* The store is created with the rootReducer return statement - the updated state
const store = createStore(rootReducer);

//*pull out the state from the store
console.log("!!!---Store---current state in the store: ", store.getState());


//--------------------------------------------------------------------------------------------------------------
//! 4. Subscription - it's getting triggered whenever the state is updated.
//? Subscription Model
//? The Central Store Triggers all (Automatic) Subscriptions whenever the State changes.
//? The Component can subscribe to the Central Store updates and it then receives that update automatically.

//How to set subscription - inform me whenever I need to get a new state because something changed
//access store and in there there is a subscribe method I can execute
//*subscribe takes an argument, a function which will be executed when ever the state is updated - whenever an action reached the reducer.
//The function we passed to subscribe doesn't get any arguments (ES6 =>)
store.subscribe(() => {
    //in the function body, we can execute any code we want when state updates.
  console.log("!!!---[Subscription]", store.getState());//this will only execute when the state changed.
});
//--------------------------------------------------------------------------------------------------------------

//! 1. Dispatching Action
//? A Action Reaches a Reducer
//? The Action reaches the Reducer and since the Action contains a type,
//? the Reducer can check the type of the Action, and then it defines the code for that type of Action in the Reducer.

//* an Action is dispatched by accessing the Store and calling dispatch - store.dispatch() -
//* dispatch is a function that takes a an Action as argument
//* an Action should be a javascript object which needs to have a type property.
//* An action carries witch type of actions was dispatched and what should be done in the reducer
//* type is an unique identifier. Convention: ALL UPPER CASE string, descriptive and short.
store.dispatch({ type: "INC_COUNTER" }); //+1
store.dispatch({ type: "ADD_COUNTER", value: 10 }); //+ x
console.log(
  "!!!---Action---state inside dispatched action: ",
  store.getState()
);
//--------------------------------------------------------------------------------------------------------------
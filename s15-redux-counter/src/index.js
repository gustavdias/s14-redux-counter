import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import reducer from "./store/reducer";
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";
//? redux-thunk
import thunk from "redux-thunk";

//!a special package because redux alone is standalone, it is not connected to react.
//*allows us to hook up our redux store to our react application.
import { Provider } from "react-redux"; //allows us to kind of inject our store into the react components

//! Connecting Store to Reducer

//!Redux - This store should be created right before our application or when our application starts
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//! combineReducers: helper function to combine reducers
//a function which takes a javascript object mapping our reducers to different slices of our state as input and merges everything into one state and one reducer
//! How to combine reducers:
const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer,
});

//! Middleware - middleware are functions or the code general you hook into a process which then gets executed as part of that process without stopping it.
//right between your action being dispatched and it reaching the reducer

const logger = (store) => {
  return (next) => {
    //next makes sense because this will be a function which you can execute to let the action continue its journey onto the reducer,
    //*redux-thunk, the middleware comes in, steps in, has access to the action there, basically blocks the old action we could say and dispatches it again in the future.
    //*Now the new action will reach the reducer but in-between, redux-thunk is able to wait because it can dispatch an action whenever it wants.
    return (action) => {
      //code you want to run in between the action and the reducer.
      console.log("[Middleware] Dispatching", action);
      const result = next(action); //this will now let the action continue to the reducer, though for that to succeed, we need to pass the action as an argument
      console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

//Advanced store setup
//a variable which is injected by the Chrome extension into our javascript at runtime, so it will be available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//?compose is a little bit similar to combineReducers - combineReducer for Reducers and compose for enhancers
//applyMiddleware is only for middlewares if we have other enhancers like the store dev tools, we need to use compose to compose a set of enhancers with both the dev tools features and our middleware.
// /native redux solution which of course doesn't give us dev tools support then.
//!--------------

//Then before mounting the app, I'll create the store and store it in a constant named store
// const store = createStore(rootReducer);
//!middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk)) //actually, you can pass a list of middleware here (logger, secondMiddleware, ...)
);
//the second argument here can be a so-called enhancer. Now this enhancer is nothing else than a middleware for example,

const app = (
  //For hooking up the provider component with our store - set up special property
  <Provider store={store}>
    {/* //wrap our app component with provider */}
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

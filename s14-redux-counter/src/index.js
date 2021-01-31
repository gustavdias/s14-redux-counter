import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import reducer from "./store/reducer";
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";

//!a special package because redux alone is standalone, it is not connected to react.
//*allows us to hook up our redux store to our react application.
import { Provider } from "react-redux"; //allows us to kind of inject our store into the react components

//! Connecting Store to Reducer

//!Redux - This store should be created right before our application or when our application starts
import { createStore, combineReducers } from "redux";
//! combineReducers: helper function to combine reducers
//a function which takes a javascript object mapping our reducers to different slices of our state as input and merges everything into one state and one reducer
//! How to combine reducers:
const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer,
});

//Then before mounting the app, I'll create the store and store it in a constant named store
const store = createStore(rootReducer);
const app = (
  //For hooking up the provider component with our store - set up special property
  <Provider store={store}>
    {/* //wrap our app component with provider */}
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

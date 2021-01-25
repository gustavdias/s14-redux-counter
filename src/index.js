import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import reducer from "./store/reducer";
//!a special package because redux alone is standalone, it is not connected to react.
//*allows us to hook up our redux store to our react application.
import { Provider } from "react-redux" //allows us to kind of inject our store into the react components

//! Connecting Store to Reducer

//!Redux - This store should be created right before our application or when our application starts
import { createStore } from "redux";

//Then before mounting the app, I'll create the store and store it in a constant named store
const store = createStore(reducer);

//wrap our app component with provider
ReactDOM.render(
  //For hooking up the provider component with our store - set up special property
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

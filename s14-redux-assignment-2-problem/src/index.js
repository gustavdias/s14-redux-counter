import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
//? case with more than one reducer
// import { createStore, combineReducers } from "redux";
import { createStore } from "redux";

import reducer from "./store/reducers/reducer";

//? case with more than one reducer
// const rootReducer = combineReducers({
//   red: reducer,
// });
// const store = createStore(rootReducer); //or if you have just one reducer, you can pass it directly here: const store = createStore(reducer);

//? case with one reducer
const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

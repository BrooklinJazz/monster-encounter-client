import "./reactotron-config";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Reactotron from "reactotron-react-js";

import App from "./components/app";
import rootReducer from "./reducers";

// const createStoreWithMiddleware = applyMiddleware()(createStore);
const middleware = applyMiddleware();

const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, middleware)
    : console.tron.createStore(rootReducer, middleware);

// Reactotron.createStore(reducers, applyMiddleware());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".container"),
);

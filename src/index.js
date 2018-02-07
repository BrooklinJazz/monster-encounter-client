import "./reactotron-config";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Reactotron from "reactotron-react-js";
import {persistStore, autoRehydrate} from 'redux-persist'

import App from "./components/App";
import rootReducer from "./reducers";

// const createStoreWithMiddleware = applyMiddleware()(createStore);
const middleware = applyMiddleware();

const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, undefined, compose(
      middleware,
      autoRehydrate()
    ))
    : console.tron.createStore(rootReducer, undefined, compose(
      middleware,
      autoRehydrate()
    ))

persistStore(store)
// Reactotron.createStore(reducers, applyMiddleware());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".container"),
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";

function saveTOLocalStorage(state) {
  try {
    const serializeData = JSON.stringify(state);
    localStorage.setItem("state", serializeData);
  } catch (error) {
    console.log(error);
  }
}
function loadFromLocalStorage() {
  try {
    const serializeData = localStorage.getItem("state");
    if (serializeData === null) return undefined;
    return JSON.parse(serializeData);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
const persistedData = loadFromLocalStorage();

const store = createStore(reducer,persistedData, middleware);
store.subscribe(() => saveTOLocalStorage(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

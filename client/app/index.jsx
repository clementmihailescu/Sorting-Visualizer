import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Main from "./components/Main/MainContainer.js";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("app")
);

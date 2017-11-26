import React, {Component} from 'react';
import {render} from 'react-dom';
import App from "./ui/App.jsx";
import store from "./redux/store.js";
import {Provider} from "react-redux";
import {AppContainer} from 'react-hot-loader';
import "./style/main.scss";

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

let provider = <AppContainer>
  <Provider store={store}>
    <App />
  </Provider>
</AppContainer>;

render(provider, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IndexRoute, Router, Route, Link, browserHistory} from 'react-router';
import DefaultLayout from "./layout/DefaultLayout.jsx";
import ChartPage from './page/ChartPage.jsx';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

const routes = <Router history={browserHistory}>
  <Route path='/' component={DefaultLayout}>
    <IndexRoute component={ChartPage} />
  </Route>
</Router>

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return routes;
  }
}

let mapStateToProps = (state) => {
  return {
  };
};

let mapActionsToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(App);

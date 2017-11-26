import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {StackNavigator} from 'react-navigation';
import ChartScreen from './screens/ChartScreen.js';
import commonStyles from './styles/common.js';
import store from './redux/store.js';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

const AppNavigator = StackNavigator({
  Chart: {screen: ChartScreen}
}, {
  cardStyle: {
    backgroundColor: commonStyles.bgColor,
  },
  initialRouteName: 'Chart'
});

export default class App extends Component {

  render() {
    return <Provider store={store}>
      <AppNavigator />
    </Provider>
  }
}

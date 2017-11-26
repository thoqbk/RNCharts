import React, {Component} from 'react';
import {View, Text, TextInput, Image, StatusBar} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from '../styles/components/chartHeader.js';
import commonStyles from '../styles/common.js';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

export default class ChartHeader extends Component {
  render() {
    return <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Text style={styles.title} numberOfLines={1}>RNCharts</Text>
    </View>
  }

  handleBackPress() {
    const back = NavigationActions.back({});
    this.props.dispatch(back);
  }
}

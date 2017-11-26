import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';
import styles from '../styles/screens/chartScreen.js';
import ChartHeader from '../components/ChartHeader.js';
import config from '../config/app.js';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

class ChartScreen extends Component {

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      header: <ChartHeader dispatch={navigation.dispatch}
        title={params.title}
      />
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      loaded: false
    }
  }

  render() {
    let contentInset = {
      right: -1 * config.chartScrollbarWidth,
      top: 0,
      bottom: 0,
      left: 0
    }
    let browserStyle = {
      ...styles.browser,
    }
    if(!this.state.loaded) {
      browserStyle.opacity = 0;
    }
    let browser = <WebViewBridge
      contentInset={contentInset}
      source={{uri: this.buildUrl()}}
      style={browserStyle}
      scrollEnabled={!this.state.locked}
      onLoadEnd={this.handleLoadEnd.bind(this)}
      onBridgeMessage={this.handleBridgeMessage.bind(this)}
      startInLoadingState={false}
    />;
    return <View style={styles.container}>
      {browser}
    </View>
  }

  handleBridgeMessage(m) {
    try {
      let json = JSON.parse(m);
      switch(json.type) {
        case 'webViewBridge.lock': {
          this.setState({
            locked: true
          });
          break;
        }
        case 'webViewBridge.unlock': {
          this.setState({
            locked: false
          });
          break;
        }
        default: {
          console.log('Unknown message: ', json);
        }
      }
    } catch(e) {
      console.log('Invalid json message');
    }
  }

  handleLoadEnd() {
    this.setState({
      loaded: true
    });
  }

  buildUrl() {
    return config.chartPage;
  }
}

let mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

let mapActionsToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(ChartScreen);

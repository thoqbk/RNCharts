import {Dimensions} from 'react-native';

const DEBUG = false;

let config = {
  chartPage: 'http://localhost:9000',
  // chartPage: 'http://10.0.2.2:9000',  // for Android
  chartScrollbarWidth: 8,
  headerHeight: 60,
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
}

if(DEBUG) {
  config.debug = true;
}

export default config;

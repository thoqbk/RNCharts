import config from '../config/app.js';
import {Platform, Dimensions} from 'react-native';

// Copy from react-navigation/src/views/Header/Header.js
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;

const HEADER_COLOR = 'rgba(18, 18, 18, 0.9)';
const BG_COLOR = '#171717';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BORDER_COLOR = '#2C2C2C';

export default {
  headerContainerStyle: {
    width: SCREEN_WIDTH,
    height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    backgroundColor: HEADER_COLOR,
    paddingTop: STATUSBAR_HEIGHT - 8,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR
  },
  headerTitleStyle: {
    color: 'white',
    marginTop: -2
  },
  headerBgColor: HEADER_COLOR,
  grayTextColor: '#929292',
  orangeTextColor: '#f90',
  borderColor: BORDER_COLOR,
  bgColor: BG_COLOR,
  fontSize: 15,

  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  headerHeight: APPBAR_HEIGHT + STATUSBAR_HEIGHT
}

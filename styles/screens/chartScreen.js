import config from '../../config/app.js';
import common from '../common.js';

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: common.bgColor
  },
  browser: {
    width: config.screenWidth,
    height: config.screenHeight - config.headerHeight,
    backgroundColor: common.bgColor
  },
  headerStyle: common.headerStyle,
  headerTitleStyle: common.headerTitleStyle,
  logout: {
    paddingRight: 5
  },
  logoutText: {
    color: 'white',
    marginTop: -2
  }
}

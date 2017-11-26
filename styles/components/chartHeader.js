import config from '../../config/app.js';
import commonStyles from '../common.js';

const styles = {
  container: {
    ...commonStyles.headerContainerStyle,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    // borderWidth: 1, borderColor: 'red',
    width: commonStyles.screenWidth,
    textAlign: 'center',
    fontSize: commonStyles.fontSize
  }
}

export default styles;

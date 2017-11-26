import React, {Component} from 'react';
import config from '../../../config/app.js';
import Strings from '../../../lib/strings.js';
import Formatters from './formatters.jsx';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

export default class CustomizedTooltipContent extends Component {
  render() {
    const {payload, chartConfig} = this.props;
    if(payload == null || payload.length == 0) {
      return null;
    }
    let contents = [];
    for(let itemConfig of chartConfig.items) {
      for(let point of payload) {
        if(point.dataKey != itemConfig.dataKey) {
          continue;
        }
        let value = point.value;
        let prettyValue = Strings.toPretty(value);
        let style = {
          color: itemConfig.color
        }
        contents.push(
          <span className='gt-item' style={style} key={'tooltip-content-' + itemConfig.dataKey}>
            {prettyValue == 'NA' ? '' : prettyValue}
          </span>
        );
      }
    }
    if(contents.length == 0) {
      return null;
    }
    return <div className='gt-items'>
      {contents}
    </div>
  }
}

import Strings from '../../../lib/strings.js';
import config from '../../../config/app.js';
import React from 'react';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

let xTickFormatter = (value, cursor) => {
  let h = Math.floor(value / 60);
  if(cursor !== true) {
    return h;
  }
  let m = value % 60;
  return (h < 10 ? '0' : '') + h + ':' +(m < 10 ? '0' : '') + m;
}

let yTickFormatter = (value) => {
  let b = value == null || Strings.isInt(value) || Strings.isFloat(value);
  if(!b) {
    return value;
  }
  // ELSE:
  const oneM = Math.pow(10, 6);
  const oneB = Math.pow(10, 9);
  if(Math.abs(value) > oneB && value % oneB == 0) { //B
    return Strings.toPretty(Math.round(value / oneB)) + ' B';
  }
  if(Math.abs(value) > oneM && value % oneM == 0) { //M
    return Strings.toPretty(Math.round(value / oneM)) + ' M';
  }
  return Strings.toPretty(value);
}

let renderLegendContent = (chartConfig, props) => {
  const {payload} = props;
  return <ul className='legend-content'>
      {
        payload.map((entry, idx) => {
          let itemConfig = _.find(chartConfig.items, (item) => item.dataKey == entry.dataKey);
          let label = 'invalid-datakey-' + entry.dataKey;
          if(itemConfig != null) {
            label = itemConfig.label;
          } else if(chartConfig.type == 'pie') {
            label = entry.value;
          }
          let style = {
            color: entry.color
          }
          return <li key={'item-' + idx }>
            <span style={style} className='dot'>&bull;</span>
            {label}
          </li>
        })
      }
    </ul>
}

export default {
  xTickFormatter,
  yTickFormatter,
  renderLegendContent
}

import React, {Component} from 'react';
import Strings from '../../../lib/strings.js';
import config from '../../../config/app.js';
import Formatters from './formatters.jsx';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

export default class Label extends Component {
  render () {
    const {stroke, value, points, index, onlyLastPoint, dataKey} = this.props;
    let notNullIndex = _.findLastIndex(points, point => point[dataKey] != null);
    let b = (index == notNullIndex && onlyLastPoint === true)
      || onlyLastPoint !== true;
    if(b) {
      let prettyValue = Strings.toPretty(value);
      if(prettyValue == 'NA') {
        return null;
      }
      // ELSE:
      let fontSize = config.chart.commonFontSize;
      let fontFamily = config.chart.commonFontFamily;
      let padding = 2;
      let textWidth = Strings.d3TextWidth(
        prettyValue,
        fontFamily,
        fontSize
      );
      let x = this.props.x - padding;
      let y = this.props.y - padding;
      // x = 0;
      return <g>
        <rect x={x} y={y} width={textWidth + 2 * padding + 1} height={fontSize + 2 * padding}
          fill='#171717'>
        </rect>
        <text x={x + padding} y={y + padding + 2} fill={stroke}
          fontSize={fontSize} fontFamily={fontFamily}
          textAnchor="start" alignmentBaseline="hanging">
          {prettyValue}
        </text>
      </g>
    }
    return null;
  }
}

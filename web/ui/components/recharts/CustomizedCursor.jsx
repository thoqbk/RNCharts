import React, {Component} from 'react';
import config from '../../../config/app.js';
import Strings from '../../../lib/strings.js';
import Formatters from './formatters.jsx';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

export default class CustomizedCursor extends Component {
  render() {
    const {points, payload, width, height, left, right, stroke} = this.props;
    const b1 = points == null || points.length != 2;
    const b2 = payload == null || payload.length == 0;
    if(b1 || b2) {
      return null;
    }
    const x = points[0].x;
    const y1 = points[0].y;
    const y2 = points[1].y;
    let cursorLabel = Formatters.xTickFormatter(payload[0].payload.id, true);
    let textWidth = Strings.textWidth(
      cursorLabel,
      config.chart.commonFontFamily + ' ' + config.chart.commonFontSize + 'px'
    );

    let minTextX = left;
    let maxTextX = left + width - textWidth;

    let textX = x - textWidth / 2;
    if(textX > maxTextX) {
      textX = maxTextX;
    } else if(textX < minTextX) {
      textX = minTextX;
    }
    return <g>
        <text x={textX} y={y1} dx={0} dy={-3} textAnchor="start" fill={stroke}
          fontSize={config.chart.commonFontSize} fontFamily={config.chart.commonFontFamily}>
          {cursorLabel}
        </text>
        <line x1={x} y1={y1} x2={x} y2={y2} stroke={stroke} />
      </g>
  }
}

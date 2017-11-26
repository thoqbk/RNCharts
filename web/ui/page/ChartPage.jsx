import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import config from "../../config/app.js";
import Strings from '../../lib/strings.js'
import {
    LineChart, BarChart, Line, Bar, AreaChart, Area,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Legend, ReferenceLine, Tooltip
} from 'recharts';
import Formatters from '../components/recharts/formatters.jsx';
import CustomizedCursor from '../components/recharts/CustomizedCursor.jsx';
import CustomizedTooltipContent from '../components/recharts/CustomizedTooltipContent.jsx';
import Label from '../components/recharts/Label.jsx';
import statsActions from '../../redux/action/stats.js';

/**
 * http://thoqbk.github.io/
 * Tho Q Luong <thoqbk@gmail.com>
 * Nov 26, 2016
 */

const Y_AXIS_WIDTH = 70;
const MARGIN_RIGHT = 30;

const TICKS = [0, 4, 8, 12, 16, 20, 24].map(id => id * 60);

class ChartPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartWidth: 0,
      chartHeight: 240,
      activeChartConfig: null,
      activeTooltipContents: {}, // map of line dataKey -> value
      activeX: -1
    }
  }

  componentWillMount() {
    this.props.getPoints();
    $(window).resize(() => {
      this.setState({
        chartWidth: $(window).width()
      });
    });
    // fire resize:
    $(window).trigger('resize');
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  render() {
    let charts = config.charts.map((chartConfig, idx) => {
      return this.renderChart(chartConfig);
    });
    return <div className='gt-charts'>
      {charts}
    </div>
  }

  renderChart(chartConfig) {
    let label = chartConfig.label;
    let Chart = LineChart;
    if(chartConfig.type == 'bar') {
      Chart = BarChart;
    } else if(chartConfig.type == 'area') {
      Chart = AreaChart;
    } else if(chartConfig.type == 'pie') {
      Chart = PieChart;
    }
    let props = {
      width:this.state.chartWidth,
      height: this.state.chartHeight,
      lock: this.handleLock.bind(this),
      unlock: this.handleUnlock.bind(this),
      margin: {top: 5, right: MARGIN_RIGHT, left: 0, bottom: 5}
    }
    if(chartConfig.type != 'pie') {
      props.data = this.props.stats.points[chartConfig.dataKey];
    }
    return <div key={'chart-' + chartConfig.dataKey} className='gt-chart'>
      <div className='gt-tooltip-contents'>
        <span className='header'>{label}</span>
      </div>

      <Chart {...props}>
        {this.renderChartBody(chartConfig)}
      </Chart>
    </div>
  }

  renderChartBody(chartConfig) {
    let legendStyle = {
      visibility: this.isShowingTooltipContents(chartConfig) ? 'hidden' : 'visible'
    }
    let retVal = [];
    if(chartConfig.type != 'pie') {
      retVal.push(
        <XAxis dataKey="id" axisLine={false} tickLine={false}
          key='x-axis'
          ticks={TICKS} type={'number'} domain={this.getDomain()}
          tickFormatter={(value) => Formatters.xTickFormatter(value)} />
      );
      retVal.push(
        <YAxis axisLine={false}
          key='y-axis'
          tickLine={false} width={Y_AXIS_WIDTH}
          tickFormatter={Formatters.yTickFormatter} />
      );
      retVal.push(
        <CartesianGrid key='grid' stroke='rgba(50, 50, 50, 0.6)' strokeWidth={1}  vertical={false} />
      );
      retVal.push(
        <Tooltip cursor={<CustomizedCursor />}
          key='tooltip'
          content={<CustomizedTooltipContent chartConfig={chartConfig} />}
        />
      );
      retVal.push(this.renderCursor(chartConfig));
    }
    retVal.push(
      <Legend verticalAlign='top' wrapperStyle={legendStyle}
        key='legend'
        content={(props) => Formatters.renderLegendContent(chartConfig, props)} />
    );
    retVal.push(this.renderChartItems(chartConfig));

    // return
    return retVal;
  }

  renderChartItems(chartConfig) {
    if(chartConfig.type == 'pie') {
      return this.renderPies(chartConfig);
    }
    return chartConfig.items.map((itemConfig, idx) => {
      let label = null;
      if(itemConfig.lastPointLabel) {
        label = <Label onlyLastPoint={true}
          dataKey={itemConfig.dataKey}
          stroke={itemConfig.color}
          points={this.props.stats.points[chartConfig.dataKey]}
        />
      }
      let props = {
        type: "monotone",
        key: 'item-' + itemConfig.dataKey,
        isAnimationActive: false,
        dot: false,
        activeDot: null,
        strokeWidth: 2,
        connectNulls: true,
        label: label,
        dataKey: itemConfig.dataKey
      }
      if(chartConfig.type == 'bar') {
        props.fill = itemConfig.color;
      } else {
        props.stroke = itemConfig.color;
      }
      if(chartConfig.type == 'area') {
        props.fill = itemConfig.color;
      }
      let Item = Line;
      if(chartConfig.type == 'bar') {
        Item = Bar;
      } else if(chartConfig.type == 'area') {
        Item = Area;
      } else if(chartConfig.type == 'pie') {
        Item = Pie;
      }
      return <Item {...props} />
    });
  }

  renderPies(chartConfig) {
    let chartData = this.props.stats.points[chartConfig.dataKey];
    let pieData = [];
    chartConfig.items.forEach(item => {
      pieData.push({
        name: item.label,
        value: chartData[item.dataKey],
        color: item.color
      });
    });
    return <Pie key={'pie'} dataKey={'value'}
      isAnimationActive={false} label={true}
      data={pieData} cx={'50%'} cy={'50%'}>
      {
        pieData.map((entry, idx) => <Cell key={'cell-' + idx} fill={entry.color} />)
      }
    </Pie>
  }

  renderCursor(chartConfig) {
    if(this.isShowingTooltipContents(chartConfig)) {
      let customizedCursorLabel = <CustomizedCursorLabel
        activeX={this.state.activeX}
        chartWidth={this.state.chartWidth}
      />
    return <ReferenceLine stroke='#CCC' x={this.state.activeX}
        strokeWidth={2}
        label={customizedCursorLabel}
      />
    }
  }

  isShowingTooltipContents(chartConfig) {
    if(chartConfig != this.state.activeChartConfig) {
      return false;
    }
    if(Object.keys(this.state.activeTooltipContents) == 0) {
      return false;
    }
    return true;
  }

  handleLock() {
    let m = {
      type: 'webViewBridge.lock'
    }
    sendToBridge(m);
  }

  handleUnlock() {
    let m = {
      type: 'webViewBridge.unlock'
    };
    sendToBridge(m);
  }

  getDomain() {
    return [TICKS[0], TICKS[TICKS.length - 1]]
  }
}

let sendToBridge = (json) => {
  if(window.WebViewBridge != null) {
    window.WebViewBridge.send(JSON.stringify(json));
  }
}

let mapStateToProps = (state) => {
  return {
    stats: state.stats
  };
};

let mapActionsToProps = (dispatch) => bindActionCreators({
  getPoints: statsActions.getPoints
}, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(ChartPage);

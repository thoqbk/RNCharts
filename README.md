# Using Recharts in React Native project

### 1. Introduction to Recharts:
Recharts is a chart library built with React and D3. Recharts supports many kinds of chart such as AreaChart, BarChart, LineChart, and PieChart. The strength of Recharts is easy to extend and customize. For example, we can change active cursor, legend, and tick in Axises to our own component and styling. Following is an example of how to customize tick in XAxis:

```javascript
const CustomizedAxisTick = React.createClass({
  render () {
    const {x, y, stroke, payload} = this.props;
   	return <g transform={`translate(${x},${y})`}>
   	    <text x={0} y={0} dy={16}
   	        textAnchor="end" fill="#666"
            transform="rotate(-35)">
            {payload.value}
        </text>
    </g>
  }
});

const SimpleLineChart = React.createClass({
    render () {
  	    return  <LineChart>
  	        <XAxis dataKey="name" tick={<CustomizedAxisTick/>}/>
  	        <YAxis/>
  	        <CartesianGrid />
  	        <Line type="monotone" dataKey="pv" />
        </LineChart>
    }
});
```
Find more examples here http://recharts.org/#/en-US/examples and full Recharts API here http://recharts.org/#/en-US/api

### 2. Project Structure:
In my React Native project, I add ‘web' directory for React project which uses Recharts library:

![Structure](https://github.com/thoqbk/RNCharts/blob/master/resources/structure.png)

In development, web part runs at port 9000 and loaded by React Native code by Webview Bridge component (https://github.com/alinz/react-native-webview-bridge) . I choose Webview Bridge over built-in Webview (https://facebook.github.io/react-native/docs/webview.html) because it supports communication between React Native and Web part. For example, when a user clicks on a custom button in chart component we want to change the screen to another Scene or when he clicks on Navigation Button, chart content will be changed. All these things can do with Webview Bridge. Below is an example of how to work with Webview Bridge:

In Web part: listen and send a message to React Native part:
```javascript
if (WebViewBridge) {
    WebViewBridge.onMessage = function (message) {
        console.log(message)
    };
    WebViewBridge.send("hello from webview");
}
```
In React Native part: listen and send a message to Web part:
```javascript
let Sample = React.createClass({
    onBridgeMessage(message) {
        const { webviewbridge } = this.refs;
        switch (message) {
            case "hello from webview":
                webviewbridge.sendToBridge("hello from react-native");
                break;
        }
    },
    render() {
        return <WebViewBridge
            ref="webviewbridge"
            onBridgeMessage={this.onBridgeMessage.bind(this)}
            source={{uri: "http://localhost:9000"}}
        />
  }
});
```

### 3. Responsive design for charts:
To make the app works with wide range of devices, charts must be responsive design. In ChartPage component, need to listen “window resize” event and store screen width in component state:
```javascript
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
```

chartWidth will be set to width property to render responsive chart in ChartPage.renderChart function:
```javascript
// File: web/ui/page/ChartPage.jsx
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
```

And unregister before component unmount:
```javascript
// File: web/ui/page/ChartPage.jsx
componentWillUnmount() {
    $(window).off('resize');
}
```

After all, here’re the results:
Line Chart and Bar Chart:

![Line Chart and Bar Chart](https://github.com/thoqbk/RNCharts/blob/master/resources/charts-1.png)

AreaChart and PieChart:

![AreaChart and PieChart](https://github.com/thoqbk/RNCharts/blob/master/resources/charts-2.png)

### 4. Patch Recharts to support iOS gesture:
There's a difference between touch gesture in iOS and Android. In Android, Webview component can react with both vertical and horizontal at the same time, but in iOS, it cannot. This makes moving chart cursor in iOS very difficult. If user touches and moves the cursor a bit not horizontal, it will turn the move to Webview scrollbar instead of keeping moving the chart cursor.

My solution is patch Recharts to lock Webview scrollbar while user is using chart cursor and release it when he finishes.
In file web/ui/components/recharts/generateCategoricalChart.js, I add some functions to listen to touch events to detect whether user is using chart cursor or not. If they start using chart cursor, send lock message to Webview Bridge:
generateCategoricalChart.js

```javascript
// File: web/ui/components/recharts/generateCategoricalChart.js
this.handleTouchMove = function (e) {};
this.handleTouchStart = function(e) {}
this.handleTouchEnd = function() {}

this.lock = function() {
    window.locked = true;
    if(self.props.lock != null) {
        self.props.lock();
    }
}

this.unlock = function() {
    window.locked = false;
    if(self.props.unlock != null) {
        self.props.unlock();
    }
}
```

In ChartScene.js, store 'locked' value in component state and set it to WebViewBridge.scrollEnabled:
```javascript
// File: screens/ChartScreen.js
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
```
Run `web/patch-recharts.sh` to replace original `generateCategoricalChart.js` file in recharts library.

### 5. Deployment
If your app is analysis app with many charts I recommend you to deploy web part in a server and load it in React Native remotely. By doing this, when the charts are updated user no need to re-install the app to have the latest version of charts.
Otherwise, if chart is only small part of the app you should build the web part then load index.html and bundle.js from internal device file system.

### 6. My project
Visit and fork my project at https://github.com/thoqbk/RNCharts or contact me by thoqbk@gmail.com for further information.

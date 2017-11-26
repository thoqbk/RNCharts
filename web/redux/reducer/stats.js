import _ from 'lodash';

const defaultPoints = {
  revenue: [],
  ordersCount: [],
  profit: [],
  productsCount: [],
  barChartData: [],
  areaChartData: [],
  pieChartData: {}
}

let cloneDefaultPoints = () => {
  return JSON.parse(JSON.stringify(defaultPoints));
}

const initialState = {
  loading: false,
  points: cloneDefaultPoints()
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'stats.getPoints': {
      return getPoints(state, action);
    }
    default: {
      return state;
    }
  }
}

let getPoints = (state, action) => {
  return {
    ...state,
    points: loadPoints()
  }
}

// Utils -----------------------------------------------------------------------
let loadPoints = () => {
  let points = {
    ...require('../../config/sampleLineChartData.js').default
  }
  points.barChartData = require('../../config/sampleBarChartData.js').default
  points.areaChartData = require('../../config/sampleAreaChartData.js').default
  points.pieChartData = require('../../config/samplePieChartData.js').default
  for(let key of Object.keys(points)) {
    let data = points[key];
    if(!Array.isArray(data) || data.length == 0) {
      continue;
    }
    // change point.id to number. Ex: '10:20' to 10 * 60 + 20 = 620
    for(let point of data) {
      if(point.id == null) {
        continue;
      }
      let oldIdParts = point.id.split('\:');
      point.id = parseInt(oldIdParts[0]) * 60 + parseInt(oldIdParts[1]);
    }
  }
  return points;
}

import config from "../../config/app.js";
import queryString from 'query-string';

let getPoints = () => {
  return {
    type: 'stats.getPoints'
  }
}

export default {
  getPoints
}

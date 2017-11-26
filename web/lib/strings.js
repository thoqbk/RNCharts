import config from '../config/app.js';

/**
 * Is empty, null or all spaces string
 */
let isEmpty = (s) => {
	return s == null || (s + '').replace(/\s/g, "").length == 0;
};

/**
 * Convert string or number to pretty format
 * Example: 1000 to 1,000
 */
const TO_PRETTY_SEPERATOR = '.';
const TO_PRETTY_NA = 'NA';

let toPretty = (count) => {
  if (count == null || count.toString().match(/^\-?[0-9]+(\.[0-9]+)?$/) == null) {
    return TO_PRETTY_NA;
  }
	count = Math.round(count);
  return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, TO_PRETTY_SEPERATOR);
};

let isInt = (n) => {
    return Number(n) === n && n % 1 === 0;
}

let isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
}

let textWidth = (text, font) => {
    var canvas = textWidth.canvas || (textWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

window.d3TextWidthCache = {};

let d3TextWidth = (text, fontFamily, fontSize) => {
	let key = text + '-' + fontFamily + '-' + fontSize;
	if(window.d3TextWidthCache[key] != null) {
		return window.d3TextWidthCache[key];
	}
	let retVal = 0;
	d3.select('#temp-svg-text-width')
		.append('g')
    .selectAll('.dummyText')
    .data([text])
    .enter()
    .append("text")
    .attr("font-family", fontFamily)
    .attr("font-size", fontSize + 'px')
    .text(d => d)
    .each(function(e, i) {
      retVal = this.getComputedTextLength();
      this.remove();
    });
	window.d3TextWidthCache[key] =  retVal;
	return retVal;
}

export default {
  isEmpty,
  toPretty,
	isInt,
	isFloat,
	textWidth,
	d3TextWidth
}

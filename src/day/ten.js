import text from '../resources/day_ten.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);
	var ranges = {};
	ranges = generateRange(data, ranges, 'x');
	ranges = generateRange(data, ranges, 'y');
	console.log(ranges);
	var map = [];
	for(var y = 0; y < ranges.y.total; y++){
		map.push([]);
		for(var x = 0; x < ranges.x.total; x++){
			map[y][x] = '0';
		}
	}
	console.log(map);

	// Object.keys(data).forEach(key => {
	//
	// });

	return map.toString();
}

function generateRange(data, ranges, coord){
	ranges[coord] = rangeFind(data, coord);
	if(ranges[coord].min <= -1){
		ranges[coord].offset = ranges[coord].min*-1;
		ranges[coord].total = ranges[coord].offset+ranges[coord].max;
	}
	return ranges;
}

function rangeFind(data, subprop){
	var array = Object.keys( data ).map(function ( key ) { return data[key].position[subprop]; });
	var min = Math.min.apply( null, array );
	var max = Math.max.apply( null, array );
	return {min, max}
}

function processData(input) {
	var data = {};
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(!c.empty(lines[i])){
			var brackets = /<([^>]+)>/g;
			var lineData = lines[i].match(brackets);
			var position = lineData[0].replace(/\<|>|\s/g,'').split(',');
			var velocity = lineData[1].replace(/\<|>|\s/g,'').split(',')
			data[i] = {
				position:{x:position[0],y:position[1]},
				velocity:{x:velocity[0],y:velocity[1]}
			};
		}
	}
	return data;
}

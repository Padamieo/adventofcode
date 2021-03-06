import text from '../resources/day_ten.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);

	var found = findMoment(data);
	console.log(found.at, 'part:2 moment the word is seen');

	//setup part one for visual
	var newData = produce(data, found.at, found.info);
	var map = [];
	for(var y = 0; y <= found.info.y.total; y++){
		map.push([]);
		for(var x = 0; x <= found.info.x.total; x++){
			map[y][x] = '_';
		}
	}
	for(var i = 0; i < newData.length; i++){
		var y = newData[i].y;
		var x = newData[i].x;
		map[y][x] = '#';
	}

	console.log(findExitMoment(data), 'unrelated all signals leave');

	// part one produced in dom.
	return visualise(map);
}

function produce(data, i, info){
	var newData = [];
	Object.keys(data).forEach(key => {
		var pos = calculateVelocityPosition(data[key], i);
		var x = pos.x + info.x.offset;
		var y = pos.y + info.y.offset;
		newData.push({x,y});
	});
	return newData;
}

//incorrectly developed function to find when flares leave
function findExitMoment(data){
	var ranges = {};
	var found = undefined;
	var i = 0;
	var bail = false;
	var startRange = {};
	var dataCopy = data;
	while(bail === false){
		if(i === 0){
			var range = generateRangesArray(dataCopy, i);
			var x = minMaxFind(range.x);
			var y = minMaxFind(range.y);
			startRange['x'] = x;
			startRange['y'] = y;
		}else{
			Object.keys(dataCopy).forEach(key => {
				var pos = calculateVelocityPosition(dataCopy[key], i);
				var inXrange = (pos.x < startRange.x.max && pos.x > startRange.x.min);
				var inYrange = (pos.y < startRange.y.max && pos.y > startRange.y.min);
				if(inXrange == false || inYrange == false){
					delete dataCopy[key];
				}
			});
			if(Object.keys(dataCopy).length <= 0){
				found = i;
				bail = true;
			}
		}
		if(i === 100000){
			console.log('bail out ERROR');
			bail = true;
		}
		i++;
	}
	return found;
}

function generateRangesArray(data, i){
	var x = [];
	var y = [];
	Object.keys(data).forEach(key => {
		var pos = calculateVelocityPosition(data[key], i);
		x.push(pos.x);
		y.push(pos.y);
	});
	return {x, y};
}

function findMoment(data){
	var ranges = {};
	var found = undefined;
	var i = 0;
	var bail = false;
	while(bail === false){

		var range = generateRangesArray(data, i);
		var x = appendOffsetTotal(minMaxFind(range.x));
		var y = appendOffsetTotal(minMaxFind(range.y));

		var area = x.total + y.total;
		ranges[i] = { x, y, area };

		if(i !== 0){
			if(ranges[i].area > ranges[i-1].area){
				bail = true;
				found = i-1;
			}
		}
		i++;
	}
	return {at:found, info:ranges[found]};
}

function calculateVelocityPosition(data, i){
	var x = data.position.x;
	if(i != 0){
		var vx = data.velocity.x*i;
		var x = x+vx;
	}
	var y = data.position.y;
	if(i != 0){
		var vy = data.velocity.y*i;
		var y = y+vy;
	}
	return {x, y};
}

function visualise(map){
	var string = '';
	for(var y = 0; y < map.length; y++){
		string += '<p>';
		for(var x = 0; x < map[y].length; x++){
			string += map[y][x];
		}
		string += '</p>';
	}
	return string;
}

function appendOffsetTotal(range){
	range.offset = range.min*-1;
	range.total = range.offset+range.max;
	return range;
}

function minMaxFind(array){
	var min = Math.min.apply( null, array );
	var max = Math.max.apply( null, array );
	return {min, max};
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
				position:{x:parseInt(position[0]),y:parseInt(position[1])},
				velocity:{x:parseInt(velocity[0]),y:parseInt(velocity[1])}
			};
		}
	}
	return data;
}

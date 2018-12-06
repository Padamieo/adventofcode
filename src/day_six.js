import text from './resources/day_six.txt';
import common from 'common';
const c = new common();

export default function init() {

	const data = processData(text);
	// console.log(data);
	var mapped = map(data);
	// console.log(mapped);
	var reMapped = fillIn(mapped);

	var string = '';
	for(var x = 0; x < mapped.length; x++){
		string = string + '<p>';
		for(var y = 0; y < mapped[x].length; y++){
			string = string + mapped[x][y];
		}
		string = string + '</p>';
	}
	return string;
}

function fillIn(mapped, data){
	for(var x = 0; x < mapped.length; x++){
		for(var y = 0; y < mapped[x].length; y++){
			if(mapped[x][y] === '.'){

			}
		}
	}
}

function map(data){
	//console.log(data);
	var map = [];
	var maxX = findMax('x', data);
	var maxY = findMax('y', data);
	console.log(maxX, maxY);

	// var yArray = Array(maxX).fill([]);
	// var map = Array(maxY).fill([]);
	console.log(data);

	for(var x = 0; x <= maxX; x++){
		map.push([]);
		for(var y = 0; y <= maxY; y++){
			map[x].push('.');
		}
	}

	for(var i = 0; i < data.length; i++){
		map[data[i].x][data[i].y] = String.fromCharCode('A'.charCodeAt() + i);
	}
	console.log(map);
	return map;
}

function findMax(ofProp, inData){
	var max = inData.reduce((prev, current) => (prev[ofProp] > current[ofProp]) ? prev : current );
	return max[ofProp];
}

function processData(input) {
	var data = [];
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(!c.empty(lines[i])){
			var line = lines[i].split(', ');
			data.push({x:parseInt(line[0]), y:parseInt(line[1])});
		}
	}
	return data;
}

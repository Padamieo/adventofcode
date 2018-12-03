import text from './resources/day_three.txt';

export default function init() {
	var data = processData(text);
	var cloth = createEmptyClothGrid(data);
	cloth = populateClothRequests(cloth, data);

	var count = 0;
	for(var x = 0; x < cloth.length; x++){
		for(var y = 0; y < cloth[x].length; y++){
			if(cloth[x][y].length >= 2){
				count++;
			}
		}
	}
	console.log(count, 'overlaping square inches of fabric');

	var badIds = getOverlapingIds(cloth);
	var ids = [];
	for(var i = 0; i < data.length; i++){
		ids.push(data[i].id);
	}
	var difference = ids.filter(x => !badIds.includes(x));
	console.log(difference, 'id of cut with no overlap');

	return '';
}

function getOverlapingIds(cloth){
	var overlapingIds = [];
	for(var x = 0; x < cloth.length; x++){
		for(var y = 0; y < cloth[x].length; y++){
			if(cloth[x][y].length >= 2){
				for(var e = 0; e < cloth[x][y].length; e++){
					if(overlapingIds.includes(cloth[x][y][e]) === false){
						overlapingIds.push(cloth[x][y][e]);
					}
				}
			}
		}
	}
	return overlapingIds;
}

function populateClothRequests(cloth, data){
	for(var i = 0; i < data.length; i++){
		for(var x = 0; x < data[i].w; x++){
			for(var y = 0; y < data[i].h; y++){
				cloth[data[i].x+x][data[i].y+y].push(data[i].id);
			}
		}
	}
	return cloth;
}

function processData(input) {
	var data = [];
	var lines = processLines(input);
	for(var i = 0; i < lines.length; i++){
		var line = lines[i].split(' ');
		var id = line[0].replace('#','');
		var coordinates = line[2].split(',');
		var dimensions = line[3].split('x');
		data.push({
			id:parseInt(id),
			x:parseInt(coordinates[0]),
			y:parseInt(coordinates[1]),
			w:parseInt(dimensions[0]),
			h:parseInt(dimensions[1])
		});
	}
	return data;
}

function processLines(input) {
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(lines[i] === undefined || lines[i] === '' || lines[i] === null ){
			lines.splice(i, 1);
		}
	}
	return lines;
}

function findBiggest(data, position, offset){
	var max = 0;
	for(var i = 0; i < data.length; i++){
		var entry = data[i];
		if(entry[position]+entry[offset] >= max){
			max = entry[position]+entry[offset];
		}
	}
	return max;
}

function createEmptyClothGrid(data){
	var maxX = findBiggest(data, 'x', 'w');
	var maxY = findBiggest(data, 'y', 'h');
	var cloth = [];
	for(var x = 0; x < maxX; x++){
		cloth.push([]);
		for(var y = 0; y < maxY; y++){
			cloth[x].push([]);
		}
	}
	return cloth;
}

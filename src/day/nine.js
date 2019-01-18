import text from '../resources/day_nine.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);

	var players = {};
	for(var i = 0; i < data.players; i++){
		players[i] = [0];
	}
	console.log(players);

	var marbelArray = [0];
	// var eArr = marbelArray[Symbol.iterator]();
	var index = 0;
	var bail = false;
	var count = 0;
	while(bail === false){
		console.log(index >= marbelArray.length, index, marbelArray.length);
		if(index > marbelArray.length){
			index = marbelArray.length-(index+2);
			console.log(index);
		}else{
			index = index+2;
		}

		marbelArray.splice(index, 0, marbelArray.length);

		count++;

		if(count === 3){
			bail = true;
		}
	}
	console.log(marbelArray);

	//console.log(marbelArray);
	return 'what';
}

function processData(input) {
	var data = {};
	var entries = input.split(' ');
	data.players = 2;//entries[0];
	data.points = 23;//entries[6];
	return data;
}

import text from '../resources/day_nine.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);

	var marbelArray = [0];
	var end = true;
	for(var i = 0; i < data.players; i++){
		if(end){
			marbelArray.splice(0, 0, i+1);
		}else{
			marbelArray.splice(marbelArray.length, 0, i+1);
		}
		end = !end;
	}
	console.log(marbelArray);
	// var i = 0;
	// while( i <= 100){
	//
	// 	i++;
	// }
	return 'what';
}

function processData(input) {
	var data = {};
	var entries = input.split(' ');
	data.players = 2;//entries[0];
	data.points = 23;//entries[6];
	return data;
}

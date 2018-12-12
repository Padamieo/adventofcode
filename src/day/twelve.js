import text from '../resources/day_twelve.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);
	console.log(data);
	var generations = 2;
	for(var i = 1; i < generations; i++){
		var previousePots = data.pots[i-1];
		var newPotsPreped = givePotsRoomToGrow(previousePots);
		var newPotsGrowth = processGeneration(newPotsPreped, data);
		console.log(newPotsGrowth);
		data.pots.push(newPotsGrowth);
	}
	// var string = 'asdasddasdasdsddda';
	// console.log(findPatternIndexes([], string, 'a', 0), 'a');

	return 'a';
}

function findPatternIndexes(array, string, search, offset){
	var a = string.indexOf(search, offset);
	if(a !== -1){
		array.push(a);
		if(a <= string.length){
			var b = findPatternIndexes(array, string, search, a+1);
			if(b !== undefined){
				b.concat(a);
			}
		}
	}
	return array;
}


function processGeneration(pots, data){
	//var newPotsGrowth = pots;
	//data.patterns.length


	for(var i = 0; i < data.patterns.length; i++){
		var pattern = data.patterns[i].pattern;
		var result = data.patterns[i].result;
		//console.log(result);
		var r = pots.match(pattern);
		var arr = findPatternIndexes([], pots, pattern, 0);
		if(arr.length > 0){
			console.log(pattern, arr);
			for(var  e = 0; e < arr.length; e++){
				pots = replaceAt(pots, arr[e]+2, pattern);
			}
		}

	}
	//console.log(data.patterns);
	return pots;
}

function findFirstHash(string, reverse = false){
	if(reverse){
		for(var i = string.length; i > string.length-3; i--){
			if(string[(i-string.length)+string.length-1] === '#'){
				return string.length-i;
			}
		}
		return 3;
	}else{
		for(var i = 0; i < 3; i++){
			if(string[i] === '#'){
				return i;
			}
		}
	}
}

function addDots(string, amount, prepend = false){
	var stringDots = '';
	for(var i = 0; i < amount; i++){
		stringDots += '.';
	}
	return (prepend ? string + stringDots : stringDots + string);
}

function givePotsRoomToGrow(string){
	string = (string[0] === '#' ? "..." + string :
	addDots(string, (3 - findFirstHash(string))) );
	string = (string[string.length-1] === '#' ? string + "..." :
	addDots(string, (3 - findFirstHash(string, true)), true) );
	return string;
}

function processData(input) {
	var data = {};
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(!c.empty(lines[i])){
			if(lines[i].includes("initial state:")){
				data['pots'] = [lines[i].replace(/[a-zA-Z\:\s]+/g,'')];
			}
			if(lines[i].includes("=>")){
				var breakdown = lines[i].split('=>');
				var pattern = breakdown[0].replace(/[\s]+/g,'');
				var result = breakdown[1].replace(/[\s]+/g,'');
				if(data['patterns']){
					data['patterns'].push({pattern,result});
				}else{
					data['patterns'] = [{pattern,result}];
				}
			}
		}
	}
	return data;
}

function replaceAt(string, index, replacement) {
	return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
}

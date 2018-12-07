import text from '../resources/day_seven.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);
	var length = Object.keys(data).length;
	var startLetter = findPotentialStartLetter(data);
	var string = [];
	string.push(startLetter);
	var b = currentBlocks(startLetter, data);
	string = stringIt(string, b, data);

	console.log(string);
	//var string = c.getLetter(25);
	var aa = string.toString();
	return aa.replace(',','');
}

function stringIt(string, array, data){
	for(var i = 0; i < array.length; i++){
		string.push(array[i]);
		var a = currentBlocks(array[i], data);
		console.log(string);
		//string.push(',');
	}
	return string;
}

function currentBlocks(startLetter, data){
	var blockers = [];
	Object.keys(data).forEach(key => {
		if(data[key].blockedBy.includes(startLetter)){
			blockers.push(key);
		}
	});
	return blockers.sort();
}

function findPotentialStartLetter(data){
	var letters = [];
	var alphabet = c.alphabetArray(false);
	for(var i = 0; i < alphabet.length; i++){
		if(!data[alphabet[i]]){
			letters.push(alphabet[i]);
		}
	}
	return letters[0];
}

function processData(input) {
	var data = {};
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(!c.empty(lines[i])){
			var line = lines[i].split(' ');
			if(!data[line[7]]){
				data[line[7]] = {blockedBy:[line[1]]};
			}else{
				var current = data[line[7]].blockedBy;
				current.push(line[1]);
				data[line[7]] = {blockedBy:current};
			}
		}
	}
	return data;
}

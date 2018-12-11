import text from '../resources/day_two.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);
	var two = findOccurances(2, data);
	var three = findOccurances(3, data);
	var total = two * three;
	console.log(total, 'Part:1 checksum of occurances');

	var matching = '';
	var matchingByOneLetter = findMatchingByDegreeOf(data, 1);
	if(matchingByOneLetter.length === 2){
		matching = returnOnlyMatching(matchingByOneLetter[0], matchingByOneLetter[1]);
		console.log(matching, 'Part:2 matching characters of closes strings');
	}
	
	return matching;
}

function findMatchingByDegreeOf(data, of = 0){
	return data.filter(function(aline) {
		var filtered = data.filter(function(bline) {
			if(aline !== bline){
				var points = 0;
				for(var l = 0; l < aline.length; l++){
					if(aline[l] == bline[l]){
						points++;
					}
				}
				if(points >= aline.length-of){
					return bline;
				}
			}
		});
		if(filtered.length > 0){
			return filtered;
		}
	});
}

function returnOnlyMatching(lineOne, lineTwo){
	var string = '';
	for(var l = 0; l < lineOne.length; l++){
		if(lineOne[l] === lineTwo[l]){
			string += lineOne[l];
		}
	}
	return string;
}

function processData(input) {
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(c.empty(lines[i])){
			lines.splice(i, 1);
		}
	}
	return lines;
}

function stringAnalysis(string){
	// console.log(i, 'string', string, string.length);
	var comparison = [];
	var values = [];
	for(var i = 0; i < string.length; i++){
		var letter = string.charAt(i);
		if(comparison.includes(letter)){
			if (values.some(e => e.letter === letter)) {
				var entry = values.findIndex((e => e.letter === letter));
				values[entry].times++;
			}else{
				values.push({letter, times:2});
			}
		}
		comparison.push(letter);
	}
	return values;
}

function findOccurances(of, inData) {
	var occurances = 0;
	for(var i = 0; i < inData.length; i++){
		var v = stringAnalysis(inData[i]);

		var test = 0;
		for(var s = 0; s < v.length; s++){
			if(v[s].times === of){
				test++;
			}
		}
		if(test >= 1){
			occurances++;
		}
		// console.log(inData[i], v, occurances);
	}
	return occurances;
}

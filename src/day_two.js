import text from './resources/day_two.txt';

export default function sayHello() {
	var data = processData(text);
	//console.log(data);
	console.log(data.length);
	var two = findOccurances(2, data);
	console.log(two);
	// var three = findOccurances(3, data);
	// console.log(three);
	//console.log(two * three, 'something');
	// var repeat = frequencyHit(0, data);
	// console.log(repeat, 'first hit frequency to repeat');
}

function processData(input) {
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(lines[i] === undefined || lines[i] === '' || lines[i] === null ){
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
		console.log(inData[i], v, occurances);
	}
	//console.log(occurances);
	return occurances;
}

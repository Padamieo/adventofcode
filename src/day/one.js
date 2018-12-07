import text from '../resources/day_one.txt';

export default function sayHello() {
	var data = processData(text);
	var endFrequency = findFrequency(0, data);
	console.log(endFrequency, 'end frequency after changes');
	var repeat = frequencyHit(0, data);
	console.log(repeat, 'first hit frequency to repeat');
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

function findFrequency(start, data) {
	var end = start;
	for(var i = 0; i < data.length; i++){
		end = (end + parseInt(data[i]));
	}
	return end;
}

function frequencyHit(start, data) {
	var end = start;
	var pastFrequencies = [];
	var found = 0;
	var times = 0;
	while (found === 0) {
		console.log('processing');
		for(var i = 0; i < data.length; i++){
			end = (end + parseInt(data[i]));
			if(pastFrequencies.includes(end)){
				return end;
			}
			pastFrequencies.push(end);
		}
		times++;
	}
	return end;
}

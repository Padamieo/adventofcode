import text from './resources/day_six.txt';

export default function init() {
	const data = processData(text);
	console.log(data);


	return '';
}

function map(data){
	
}

function processData(input) {
	var data = [];
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(!empty(lines[i])){
			var line = lines[i].split(', ');
			data.push({x:line[0], y:line[1]});
		}
	}
	return data;
}

function empty(line){
	return (line === undefined || line === '' || line === null );
}

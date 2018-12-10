import text from '../resources/day_ten.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);
	console.log(data);
	return 'ten';
}

function processData(input) {
	var data = {};
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(!c.empty(lines[i])){
			var brackets = /<([^>]+)>/g;
			var lineData = lines[i].match(brackets);
			data[i] = {
				position:lineData[0].replace(/\<|>|\s/g,'').split(','),
				velocity:lineData[1].replace(/\<|>|\s/g,'').split(','),
			};
		}
	}
	return data;
}

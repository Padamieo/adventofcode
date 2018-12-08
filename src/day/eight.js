import text from '../resources/day_eight.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);
	return 'what';
}

function getCurrentNode(entries){
	var childNodes = entries[0];
	var metadataAmount = entries[1];
	var metadataEntries = [];
	for(var i = entries.length-metadataAmount; i < entries.length; i++){
		metadataEntries.push(entries[i]);
	}
	entries.splice(entries.length-metadataAmount, metadataAmount);
	entries.splice(0, 2);
	return {childNodes, metadataAmount, metadataEntries};
}

function processData(input) {
	var data = {};
	var entries = input.split(' ');
	console.log(entries.length);
	var i = 0;
	while(entries.length <= 0){
		data[i] = getCurrentNode(entries);
		console.log(entries.length);
		i++;
	}
	console.log(entries.length);
	for(var i = 0; i < entries.length; i++){
		if(!c.empty(entries[i])){
			//data[line[7]]
			// var line = lines[i].split(' ');
			// if(!data[line[7]]){
			// 	data[line[7]] = {blockedBy:[line[1]]};
			// }else{
			// 	var current = data[line[7]].blockedBy;
			// 	current.push(line[1]);
			// 	data[line[7]] = {blockedBy:current};
			// }
		}
	}
	return data;
}

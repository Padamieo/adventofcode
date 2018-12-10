import text from '../resources/day_eight.txt';
import common from '../common';
const c = new common();

export default function init() {
	var data = processData(text);
	var total = 0;
	Object.keys(data).forEach(key => {
		total += data[key].metadataEntriesTotal;
	});
	console.log(total);
	return 'what';
}

function getCurrentNode(entries, end){
	var childNodes = entries[0];
	var metadataAmount = entries[1];
	var metadataEntries = [];
	var metadataEntriesTotal = 0;
	if(end){
		for(var i = entries.length-metadataAmount; i < entries.length; i++){
			var entryInt = parseInt(entries[i]);
			metadataEntries.push(entryInt);
			metadataEntriesTotal += entryInt;
		}
		if(metadataAmount !== 0){
			entries.splice(entries.length-metadataAmount, metadataAmount);
		}
		entries.splice(0, 2);
	}else{
		//entries.splice(0, 2);
		for(var i = 2; i < metadataAmount+2; i++){
			var entryInt = parseInt(entries[i]);
			metadataEntries.push(entryInt);
			metadataEntriesTotal += entryInt;
		}
		console.log(childNodes, metadataAmount, metadataEntries, metadataEntriesTotal);
		entries.splice(0, metadataAmount+2);
	}
	return {childNodes, metadataAmount, metadataEntries, metadataEntriesTotal};
}

function processData(input) {
	var data = {};
	var entries = input.split(' ').map(n => parseInt(n));
	var i = 0;
	var bail = true;
	var end = true;
	while( bail == true){
		data[i] = getCurrentNode(entries, end);
		end = !end;
		i++;
		//console.log(entries.length);
		if(entries.length <= 1 ){
			bail = false;
		}
	}
	return data;
}

import text from './resources/day_four.txt';

export default function init() {
	var data = processData(text);
	var a = buildGuardInfo(data);
	var guardInfo = test(data, a);
	console.log('');
	return '';
}

function test(data, guardInfo){
	for(var i = 270; i < guardInfo.length; i++){
		var startStamp = guardInfo[i].stamp;
		var index = data.findIndex(e => e.stamp === startStamp);
		//console.log(data[index]);
		//for(var i = data[index]; i < lines.length; i++){
		var iterate = 0;
		var bail = 0;
		var time = 0;
		console.log('new');
		while (bail <= 1) {
			if(data[index+iterate].state === 'start'){
				bail++;
			}else{
				if(data[index+iterate].state === 'falls'){
					var time = data[index+iterate].minutes;
				}
				if(data[index+iterate].state === 'wakes'){
					var r = (data[index+iterate].minutes - time);
					console.log(time, data[index+iterate].minutes);
					console.log(r);
				}
			}
			console.log(data[index+iterate]);
			iterate++;
		}
	}
	return guardInfo;
}

function buildGuardInfo(data){
	var startTimes = data.filter(e => e.guardId);
	var guardInfo = startTimes.map(e => {
		if(e.guardId){
			return {
				guardId:e.guardId,
				stamp:e.stamp,
			};
		}
	});
	return guardInfo;
}

function processData(input) {
	var data = [];
	var lines = processLines(input);
	for(var i = 0; i < lines.length; i++){
		var p = {};
		var line = lines[i].split(' ');
		if(line[2].includes('Guard')){
			p.state = 'start'
		}else{
			p.state = line[2];
		}
		if(line[3].includes('#')){
			p.guardId = line[3].replace('#','');
		}
		var date = line[0].replace('[','').split('-');
		p.year = date[0];
		p.month = date[1];
		p.day = date[2];
		var time = line[1].replace(']','').split(':');
		p.hours = time[0];
		p.minutes = time[1];
		p.stamp = date[0]+date[1]+date[2]+time[0]+time[1];
		data.push(p);
	}
	data.sort((a, b) => a.stamp.localeCompare(b.stamp));
	return data;
}

function processLines(input) {
	var lines = input.split('\n');
	for(var i = 0; i < lines.length; i++){
		if(lines[i] === undefined || lines[i] === '' || lines[i] === null ){
			lines.splice(i, 1);
		}
	}
	return lines;
}

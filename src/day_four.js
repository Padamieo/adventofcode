import text from './resources/day_four.txt';

export default function init() {
	var data = processData(text);
	var guards = buildGuardInfo(data);
	//console.log(data[1107]);
	var final = [];
	Object.keys(guards).forEach(key => {
		//console.log(key, guards[key]);
		// if(key !== '1319'){
		// 	return;
		// }

		for(var i = 0; i < guards[key].stamps.length; i++){
			var startStamp = guards[key].stamps[i];
			var index = data.findIndex(e => e.stamp === startStamp);
			//console.log(index, data, guards[key]);
			var b = test(index, data, guards[key]);
			// console.log(b);
			//console.log(guards[key].stamps[i]);
		}
	});

	console.log('');
	return '';
}

function test(index, data, guardInfo){
		var i = 0;
		var bail = 0;
		var time = 0;

		while (bail <= 1) {
			if(index+i === data.length){
				return;
			}

			if(data[index+i].state === 'start'){
				bail++;
			}else{
				if(data[index+i].state === 'falls'){
					var minutes = data[index+i].minutes;
					var hours = data[index+i].hours;
					var days = data[index+i].day;
					//console.log(data[index+iterate]);
				}
				if(data[index+i].state === 'wakes'){
					var r_minutes = (data[index+i].minutes - minutes);
					var r_hours = (data[index+i].hours - hours);
					var r_days = (data[index+i].day - days);
					//console.log(time, data[index+i].minutes);

					if(r_hours !== 0){
						console.log(r_minutes, r_hours, r_days);
					}
					//console.log(guardInfo);
					if(!guardInfo.times){
						guardInfo.times = [r_minutes];
					}else{
						guardInfo.times = [r_minutes];
					}

					//console.log(data[index+iterate]);
				}
			}

			i++;
		}

	//return guardInfo;
}

function buildGuardInfo(data){
	var startTimes = data.filter(e => e.guardId);
	var guardInfo = {};
	startTimes.map(e => {
		if(e.guardId){
			if(guardInfo[e.guardId]){
				var array = guardInfo[e.guardId].stamps;
				array.push(e.stamp);
				guardInfo[e.guardId] = {stamps:array};
			}else{
				guardInfo[e.guardId] = {stamps:[e.stamp]};
			}
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

import text from '../resources/day_seventeen.txt';
import common from '../common';
const c = new common();

class Sixteen {
	init(){
		this.data = this.processData(text);
		console.log(this.data);
		return 'seventeen';
	};

	processData(input) {
		var data = [];
		var lines = input.split('\n');
		for(var i = 0; i < lines.length; i++){
			if(!c.empty(lines[i])){
				var lineArray = lines[i].split(',');
				data = this.buildGroundLineData(
					data,
					lineArray[0][0],
					parseInt(lineArray[0].replace(/[^0-9]/g, '')),
					this.deFormatLineInfo(lineArray[1])
				);
			}
		}
		return data;
	}

	buildGroundLineData(data, xy, value, array){
		for(var i = parseInt(array[0]); i < parseInt(array[1]); i++){
			data.push((xy === 'x' ? {x:value, y: i} : {y:value, x: i}));
		}
		return data;
	}

	deFormatLineInfo(linePart){
		return linePart.split('..').map(e => e.replace(/[^0-9]/g, ''));
	}



}
export default new Sixteen;

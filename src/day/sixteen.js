import text from '../resources/day_sixteen.txt';
import common from '../common';
const c = new common();

class Sixteen {
	init(){
		this.data = this.processData(text);
		console.log(this.data);
		return 'sixteen';
	};

	processData(input) {
		var guide = [];
		var data = [];
		var temp = {};
		var storeGuide = false;
		var lines = input.split('\n');

		for(var i = 0; i < lines.length; i++){
			var line = lines[i];
			if(!c.empty(line)){
				if((line.search(/Before:/g) === 0)){
					temp = {};
					storeGuide = true;
				}
				if(storeGuide){
					if((line.search(/Before:/g) === 0)){
						temp['before'] = this.extratLineData(line);
					}else	if((line.search(/After:/g) === 0)){
						temp['after'] = this.extratLineData(line);;
						guide.push(temp);
						storeGuide = false;
					}else{
						temp['data'] = line.split(' ');
					}
				}else{
					var v = line.split(' ');
					data.push(v);
				}
			}
		}
		return {data, guide};
	}

	extratLineData(line){
		var lineArray = line.split(' ');
		var array = lineArray.map(
			e => e.replace(/[^0-9]/g, '')
		).filter(	e => {
			if(!c.empty(e)){
				return e;
			}
		});
		return array;
	}

}
export default new Sixteen;

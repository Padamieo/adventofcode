import text from '../resources/day_thirteen.txt';
import common from '../common';
const c = new common();

class Thirteen {
	init(){
		this.height = 0;
		this.width = 0;
		this.countLimit = false;
		this.limit = 300;
		this.data = this.processData(text);

		var info = this.travelTracks(this.reportFirstCrashLocation);
		console.log(info, 'Part:1 first crash location');

		var lastCarts = this.travelTracks(this.reportRemainingCart);
		console.log(lastCarts, 'Part:2 last carts location');

		return this.visualise(this.tracks, lastCarts[0]);
	};

	setupData(){
		this.carts = this.data.carts;
		this.tracks = this.data.tracks;
	}

	travelTracks(func){
		this.setupData();
		var data = {};
		var bail = false;
		var count = 0;
		while(bail === false){
			this.carts.filter( c => c.y < c.y );
			for(var i = 0; i < this.carts.length; i++){
				var crashReport = this.moveCart(this.carts[i], i);
				if(crashReport){
					var passedFunc = func.bind(this);
					var outcome = passedFunc(crashReport[0]);
					if(outcome){
						bail = outcome.bail;
						data = outcome.data;
					}else{
						bail = true;
					}
				}
			}
			if(this.countLimit){
				if(count >= this.limit){
					bail = true;
				}
			}
			count++;
		}
		//data.count = count;
		return data;
	}

	reportFirstCrashLocation(crashReport){
		var data = {x:crashReport.x,y:crashReport.y};
		return {bail:true,data};
	}

	reportRemainingCart(crashReport){
		this.removeCrashedCarts(crashReport);
		var bail = false;
		if(this.carts.length === 2 ){
			console.log('starting:countLimit');
			this.countLimit = true;
		}else if(this.carts.length <= 1 ){
			bail = true;
			var data = this.carts[0];
		}
		return {bail,data}
	}

	removeCrashedCarts(crashReport){
		var x = crashReport.x;
		var y = crashReport.y;
		this.carts = this.carts.filter(c => {
			if(!(c.x === x && c.y === y)){
				return c;
			}
		});
	}

	processData(input) {
		var tracks = [];
		var carts = [];
		var lines = this.cleanUpRaw(input.split('\n'));
		for(var y = 0; y < lines.length; y++){
			var line = lines[y];
			if(!c.empty(line)){
				for(var x = 0; x < line.length; x++){
					if(!c.empty(line[x]) && (line[x].search(/\s/g) !== 0)){
						if(this.cartCheck(line[x])){
							var icon = this.simpleTrackUnder(line[x]);
							tracks.push({x,y,icon});
							carts.push({x,y,icon:line[x],dir:0});
						}else{
							tracks.push({x,y,icon:line[x]});
						}
					}
				}
			}
		}
		return {carts, tracks};
	}

	getItem(x,y,element = 'tracks'){
		return this[element].filter((e) => {
			if(e){
				if(e.x === x && e.y === y){
					return e;
				}
			}
		});
	}

	getNextTrack(x,y,icon){
		var nt = [];
		if(icon.search(/>/g) === 0){
			var nt = this.getItem(x+1,y);
		}else if(icon.search(/</g) === 0){
			var nt = this.getItem(x-1,y);
		}else if(icon.search(/v/g) === 0){
			var nt = this.getItem(x,y+1);
		}else if(icon.search(/\^/g) === 0){
			var nt = this.getItem(x,y-1);
		}
		return nt;
	}

	moveCart(cart, i){
		var nt = this.getNextTrack(cart.x,cart.y,cart.icon);
		var pcc = [];
		if(nt.length >= 1){
			pcc = this.getItem(nt[0].x,nt[0].y,'carts');
			if(nt[0].icon === '+'){
				this.carts[i].icon = this.switchCrossDir(cart.icon, cart.dir);
				this.carts[i].dir = (cart.dir+1 > 2 ? 0 : cart.dir+1);
			}else if(nt[0].icon.match(/[\\/]/g)){
				this.carts[i].icon = this.switchSlashDir(cart.icon, nt[0].icon);
			}
			this.carts[i].x = nt[0].x;
			this.carts[i].y = nt[0].y;
		}
		if(pcc.length >= 1){
			return pcc;
		}
	}

	switchSlashDir(icon, d){
		var r = undefined;
		if(icon.search(/>/g) === 0){
			r = (d === '/' ? '^' : 'v' );
		}else if(icon.search(/</g) === 0){
			r = (d === '/' ? 'v' : '^' );
		}else if(icon.search(/v/g) === 0){
			r = (d === '/' ? '<' : '>' );
		}else if(icon.search(/\^/g) === 0){
			r = (d === '/' ? '>' : '<' );
		}
		return r;
	}

	switchCrossDir(icon, d){
		var r = undefined;
		if(icon.search(/>/g) === 0){
			if(d === 0){
				r = '^';
			}else if(d === 2){
				r = 'v';
			}
		}else if(icon.search(/</g) === 0){
			if(d === 0){
				r = 'v';
			}else if(d === 2){
				r = '^';
			}
		}else if(icon.search(/v/g) === 0){
			if(d === 0){
				r = '>';
			}else if(d === 2){
				r = '<';
			}
		}else if(icon.search(/\^/g) === 0){
			if(d === 0){
				r = '<';
			}else if(d === 2){
				r = '>';
			}
		}
		return ( r ? r : icon );
	}

	cleanUpRaw(lines){
		for(var i = 0; i < lines.length; i++){
			if(c.empty(lines[i])){
				lines.splice(i, 1);
			}else{
				if(lines[i].length > this.width){
					this.width = lines[i].length;
				}
			}
		}
		this.height = lines.length;
		return lines;
	}

	// workes provide track below is not +
	simpleTrackUnder(icon){
		if(icon.search(/>/g) === 0){
			return '-';
		}else if(icon.search(/</g) === 0){
			return '-';
		}else if(icon.search(/v/g) === 0){
			return '|';
		}else if(icon.search(/\^/g) === 0){
			return '|';
		}
	}

	cartCheck(input){
		return (input.search(/\^|v|<|>/g) === 0);
	}

	visualise(data, showCrash = false){
		var string = '';
		string += '<pre>';
		for(var y = 0; y < this.height; y++){
			string += '<p>';
			for(var x = 0; x < this.width; x++){
				var cart = this.getItem(x,y,'carts');
				if(cart.length >= 1){
					if(showCrash){
						string += (showCrash.x === x && showCrash.y === y ? showCrash.icon : cart[0].icon );
					}else{
						string += cart[0].icon;
					}
				}else{
					var track = this.getItem(x,y);
					if(track.length >= 1){
						string += track[0].icon;
					}else{
						string += ' ';
					}
				}
			}
			string += '</p>';
		}
		string += '</pre>';
		return string;
	}

}
export default new Thirteen;

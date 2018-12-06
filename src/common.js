export default class Common {

	log(value){
		console.log(value);
	}

	empty(line){
		return (line === undefined || line === '' || line === null );
	}
}

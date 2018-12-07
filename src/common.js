export default class Common {

	log(value){
		console.log(value);
	}

	empty(line){
		return (line === undefined || line === '' || line === null );
	}

	getLetter(i, startLetter = 'A'){
		return String.fromCharCode(startLetter.charCodeAt() + i);
	}

	alphabetArray(lower = true){
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		return	(lower ? alphabet : alphabet.toUpperCase() ).split('');
	}
}

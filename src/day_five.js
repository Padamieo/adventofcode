import text from './resources/day_five.txt';

export default function init() {
	const data = processData(text);

	var purgeResult = purge(data);
	console.log(purgeResult.length, '10972 remainig units after processing');

	var letterPurgedResults = {};
	var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
	for(var i = 0; i < alphabet.length; i++){
		const stringArray = [...data];
		const remainingStringArray = removeLetter(alphabet[i].toString(), stringArray);
		var purgedArray = purge(remainingStringArray);
		letterPurgedResults[purgedArray.length] = {letter:alphabet[i]};
	}
	var bestLetterForPurge = Object.keys(letterPurgedResults)[0]
	console.log(bestLetterForPurge, 'asdasdasdasdasdasd');
	return '';
}

function removeLetter(letter, array){
	return array.filter(e => (e.toString() !== letter.toString() && e.toString() !== letter.toString().toUpperCase() ));
}

function processData(input) {
	var lines = input.split('\n');
	var data = lines[0].split("");
	return data;
}

function purge(stringArray){
	for(var i = 0; i < stringArray.length; i++){
		var letter = stringArray[i];
		var letterNext = stringArray[i+1];
		if(!letterNext){
			return stringArray;
		}
		if(letter.toUpperCase() === letterNext.toUpperCase()){
			if(isLowerCase(letter) && isUpperCase(letterNext) || isUpperCase(letter) && isLowerCase(letterNext)){
				stringArray.splice(i, 2);
				i = (i === 0 ? -1 : i-2);
			}
		}
	}
	return stringArray;
}

function isUpperCase(c){
	return (c === c.toUpperCase());
}

function isLowerCase(c){
	return (c === c.toLowerCase());
}

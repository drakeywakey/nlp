let fs = require('fs');
let nlp = require('compromise');

fs.readFile('stopwords.txt', 'utf8', (err, stopwords) => {
	fs.readFile('waPoTelescope.txt', 'utf8', (err, data) => {
		if (err) console.error(err);
		
		let textInfo = nlp(data);
		let stopArr = stopwords.split('\r\n');
		let allTerms = textInfo.terms().out('array');
		
		//probably could refactor to filter && get frequencies all in one shot
		//but let's get it working first. 
		let terms = allTerms.filter((term) => {
			return stopArr.indexOf(term) === -1;
		});
		
		let frequencies = {};
		
		terms.forEach((term) => {
			if (frequencies[term]) {
				frequencies[term]++;
			}
			else {
				frequencies[term] = 1;
			}
		});
		
		let sentences = textInfo.sentences().out('array');
		
		//console.log(terms);
		//console.log(nlp(data).terms().sort('frequency').unique().out('array'));
		//let sentences = data.split(/[\.\?\!]/);
		//for (let i = 0; i < sentences.length; i++) {
			//console.log('sentence ' + i + ': ' + sentences[i]);
		//}
	});
});
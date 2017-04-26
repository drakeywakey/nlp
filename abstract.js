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
		
		// each sentence has weight equal to the sum of
		// the frequency of each word in the sentence,
		// ignoring stopwords
		let weights = [];
		let sentenceData = textInfo.sentences();
		let sentences = sentenceData.out('array');
		sentences.forEach((sentence) => {
			let weight = 0;
			let sentTerms = nlp(sentence).terms().out('array');
			sentTerms.forEach((sentTerm) => {
				if (terms.indexOf(sentTerm) > -1) {
					weight += frequencies[sentTerm];
				}
			});
			weights.push(weight);
		});
		// now weights is an array of the 'importance' of each sentence
		// the highest entry in the array means the sentence at that index
		// is most important, and so on
		
		// this can also be done better. BUT.
		// now we know the weight of the most important sentences, so
		// we can take the top entries in the sorted weight array
		// and search for their weights in the unsorted
		// and display the sentences at those "heaviest" indices
		let weightSort = weights.slice().sort((a,b) => {
			return b - a;
		});
		
		let result = '';
		for (let i = 0; i < 4; i++) {
			let weight = weightSort[i];
			//this needs to be improved too -- what if duplicate weights?
			let index = weights.indexOf(weight);
			result += sentenceData.data()[index].text;
			result += '\r\n';
		}
		
		console.log(result);
		//console.log(weightSort);
		//console.log(sentenceData.data()[sentences.length - 2].text);
		//console.log(sentences[sentences.length - 2]);
		//console.log(weights);
		//console.log(terms);
		//console.log(nlp(data).terms().sort('frequency').unique().out('array'));
		//let sentences = data.split(/[\.\?\!]/);
		//for (let i = 0; i < sentences.length; i++) {
			//console.log('sentence ' + i + ': ' + sentences[i]);
		//}
	});
});
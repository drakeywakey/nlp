let nlp = require('compromise');
let fs = require('fs');

// Tokenizing text --------------------------------
let text = 'Hi there! My name is Drake. I like to be lazy. What do you like?';
let sentences = nlp(text).sentences().data(); //sentence tokenize
let words = nlp(text).terms().data(); //word tokenize

fs.readFile('/stopwords.txt', 'utf8', (err, data) => {
    if (err) throw err;
    
});

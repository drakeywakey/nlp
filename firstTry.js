let nlp = require('compromise');

let word = nlp('dinosaur');
word.nouns().toPlural();

console.log(word.out('text'));

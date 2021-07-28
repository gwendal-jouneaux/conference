var fs = require('fs');

const evaluate = require('./visitor').evaluate;
var data = fs.readFileSync('./models.md', 'utf8');

//console.log('\n' + data + '\n\n');
let jsonObj = evaluate(data);
console.log(jsonObj);
console.log(JSON.stringify(jsonObj));
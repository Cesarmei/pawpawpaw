const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory: '+totalMemory+'\nFree Memory: '+freeMemory);

//Template string
//ES6 / ES2015: ECMAScript 6

console.log(`\nTotal Memory: ${totalMemory} \nFree Memory: ${freeMemory}`);
//console.log(`Free Memory: ${freeMemory}`);
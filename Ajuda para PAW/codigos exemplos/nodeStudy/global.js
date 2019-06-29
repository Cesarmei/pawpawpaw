/*
global objects in JS
console.log
clearTimeout()
setTimeout()
setInterval()
clearInterval()
*/

/*no browser--> global objects
window.console.log
*/

var message='' //nao é global
//window.message --> apenas no browser
//global.setTimeout --> global object no nodeJS

console.log(global.message);
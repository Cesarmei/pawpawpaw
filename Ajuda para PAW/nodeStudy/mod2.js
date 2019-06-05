//(function (exports, require, module, __filename, __dirname){
//node executa o nosso codigo dentro desta função
//mesmo nao estando visivel no codigo
//require é local

console.log(__filename);
console.log(__dirname);

var url = 'http://mylogger.io/log';

function log(message){
    //send an http request
    console.log(message)
}


module.exports=log;


//})
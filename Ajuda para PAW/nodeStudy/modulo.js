//logging messages

var url = 'http://mylogger.io/log';

function log(message){
    //send an http request
    console.log(message)
}

//exportar funçao deste modulo (fica publico)
//module.exports.log = log;
//exportar variavel deste modulo com outro nome (fica publico)
//module.exports.endPoint = url;
//exportar apenas uma função
module.exports=log;


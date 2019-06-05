//importar modulo (require retorna object)
//recomendado usar const para nao alterar o valor de logger
const logger = require('./mod2.js');
//ou require('./modulo') pois assume a extensao js

//module.exports.log = log;
//logger.log('message')

//module.exports=log;
logger('message');
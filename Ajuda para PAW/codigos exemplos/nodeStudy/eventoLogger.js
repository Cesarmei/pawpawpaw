const EventEmitter = require('events');
// nao é nessário -> const emitter = new EventEmitter();

const log = require('./paraEventosLogger');
const logger = new log();
//logger.log('message');

//listener
logger.on('messageLogged',(arg) =>{
    console.log('Listener called',arg);
});

logger.log('message do eventoLogger');
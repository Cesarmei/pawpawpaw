//argumentos de eventos

const EventEmitter = require('events');

//objeto instanciado da classe EventEmitter
const emitter = new EventEmitter();

//metodo para registar/ouvir o sinal do evento
emitter.on('messageLogged',(arg) =>{
    console.log('Listener called',arg);
});

emitter.on('logged',(arg) =>{
    console.log('eu ouvi!',arg);
});

//metodo para criar(dar sinal) de um evento
emitter.emit('messageLogged',{id: 1, url:'http//' });

//evento de logging (data:message)
emitter.emit('logged',{data:'pedro'});

//{id: 1, url:'http//'} --> argumentos em objeto

/*
arrow funcion
    (argumento) =>
*/
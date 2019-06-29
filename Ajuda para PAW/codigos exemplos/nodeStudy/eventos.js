//sinal que algo aconteceu

//classe Event Emitter
const EventEmitter = require('events');
/*
    se o nome da variavel começar com 
    maíscula indinca que é uma classe
*/

//objeto instanciado da classe EventEmitter
const emitter = new EventEmitter();

//metodo para registar/ouvir o sinal do evento
emitter.on('messageLogged',function(){
    console.log('Listener called');
});

//metodo para criar(dar sinal) de um evento
emitter.emit('messageLogged');



/*
emitter.on = emitter.addListener

emitter.addListener('messageLogged',function(){
    console.log('Listener called');
});*/
const EventEmitter = require('events');
var url = 'http://mylogger.io/log';


/*como temos emitter diferentes (dois objetos)
nao é possivel captar o sinal de evento do ficheiro
paraEventosLogger sendo assim teremos de criar uma
classe logger para ter um emitter "global".
Temos de criar o método construtor.
*/


//faz extend para ter todas as capacidades do EventEmitter
class Logger extends EventEmitter{
    //nao precisa de ter function no nome
    //funções na classe sao metas
     log(message){
        //send an http request
        console.log(message);
        /*
        visto que faz extend do EventEmitter
        pode ser usado o "this", já nao sendo
        necessário uma variavel da classe EventEmitter
        */
        this.emit('messageLogged',{id: 1, url:'http//' });
    
    }
}

//Exportar a classe
module.exports=Logger;
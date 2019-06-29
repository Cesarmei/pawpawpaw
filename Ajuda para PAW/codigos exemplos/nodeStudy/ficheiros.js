//metodos assincronos para ficheiros
const fs = require('fs');

//reader no diretorio em que se encontra este ficheiro
const files =fs.readdirSync('./');
console.log(files);

//callback - outra maneira assincrona

/*fs.readdir('./',function(err,files){
    if (err) console.log('error',err);
    else console.log('Result ', files);
});*/


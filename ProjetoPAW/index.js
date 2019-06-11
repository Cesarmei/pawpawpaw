//criar servidor
const http = require('http');

//web server (http faz extend de EventEmitter)
const server = http.createServer(function(req,res){
    if(req.url==='/'){
        res.write('hello!');
        res.end();
    }
    //mais rotas
    if(req.url==='/api/courses'){
        //array de objetos JSON
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});
server.listen(3000);

console.log('listening on port 3000...')
//sempre que ha uma conexao ao server ele cria um evento


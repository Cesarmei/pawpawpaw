const http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pug = require('pug');
const mongoose = require('mongoose');


//app.set('view engine',pug);


//Initialize express
const app = express(); 


//var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb:localhost:27017/paw_tp')
    .then(() => console.log('conectado com sucesso!'))
    .catch((err) => console.error(err));






//imports from local modules
const userSchema = require('./Mongoose/schemas/utilizador.js');
const artigosSchema = require('./Mongoose/schemas/artigos.js');
const leilaoSchema = require('./Mongoose/schemas/leilao.js');
const licitaçaoSchema = require('./Mongoose/schemas/licitaçoes.js');

const artigosRouter = require("./routes/artigos.js");
const leilaoRouter = require("./routes/leilao.js");
const licitaçaoRouter = require("./routes/licitaçao.js");
const utilizadorRouter = require("./routes/utilizador.js");

const {
    mongoBD
} = require('./Mongoose/mongoConnect.js');

/*Initialize mongo Module
let mongoBD = new mongoConnect('paw_tp');

const User = mongoConnect.connect(userSchema, 'utilizadores');
*/


//Setup view engine
app.set('view engine', 'pug');
app.set('views', './views');





var utilizadoresRouter = require('./routes/utilizador');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(_dirname,'public')));

app.use('/bootstrap',express.static(_dirname+'/node_modules/bootstrap/dist/css/'));
app.use('/',main);

app.use('/utilizadores',utilizadoresRouter);
app.use('/artigosRouter',artigosRouter);
app.use('/artigosRouter',leilaoRouter);
app.use('/artigosRouter',licitacaoRouter);

//catch 404 and forward to error handler
app.use(function(req,res,next){
    next(createError(404));
});

//error handler
app.use(function(err,req,res,next){
    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error page
    res.status(err.status || 500);
    res.render('error');
});

module. exports = app;

//**************************************SERVER*********************************
//criar servidor


//web server (http faz extend de EventEmitter)
const server = http.createServer(function(req,res){
    if(req.url==='/'){
        res.write('All systems: green!');
        res.end();
    }
});
server.listen(3000);

console.log('listening on port 3000...')
//sempre que ha uma conexao ao server ele cria um evento


var createError = require('http-erros');
var express = require('express');
var path = require('path');
var cookieParser = require('cookieParser');
var logger = require('morgan');

var utilizadoresRouter = require('./routes/products');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongosse.connect('mongodb:localhost:27017/paw_tp')
    .then(() => console.log('conectado com sucesso!'))
    .catch((err) => console.error(err));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(_dirname,'public')));

app.use('/api/utilizadores',utilizadoresRouter);
app.use('/api/artigosRouter',artigosRouter);

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
const http = require('http');

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


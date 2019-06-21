const http = require('http');
var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');

//imports from local modules
const userSchema = require('./Mongoose/schemas/utilizador');
const artigosSchema = require('./Mongoose/schemas/artigos');
const leilaoSchema = require('./Mongoose/schemas/leilao');
const licitaçaoSchema = require('./Mongoose/schemas/licitaçoes');


//definir routes
const artigosRouter = require('./routes/artigos');
const leilaoRouter = require('./routes/leilao');
const licitaçaoRouter = require('./routes/licitaçao');
const utilizadoresRouter = require('./routes/utilizador');
const indexRouter = require('./routes/index');


//Initialize express
const app = express();


//DB config
const {
    mongoBD
} = require('./Mongoose/mongoConnect');


mongoose.connect('mongodb://localhost:27017/paw_tp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });



//Setup view engine
app.use(expressLayouts);
app.use(express.static('views'));
app.set('view engine', 'ejs');
//app.set('views', './views');

//ROUTES

app.use('/',require('./routes/index'));
app.use('/users', utilizadoresRouter);
/*
app.use('/users', utilizadoresRouter);
app.use('/artigos', artigosRouter);
app.use('/leilao', leilaoRouter);
app.use('/licitaçao', licitaçaoRouter);
app.use('/',indexRouter);
*/

//BODYPARCER
app.use(bodyParser.urlencoded({ extended: false }));




//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(_dirname,'public')));   // dirname nao ta definido

//app.use('/bootstrap',express.static(_dirname+'/node_modules/bootstrap/dist/css/'));  -> dirname nao ta definido


//catch 404 and forward to error handler

/*
app.use(function (req, res, next) {
    next(createError(404));
});
*/
//error handler

/*
app.use(function (err, req, res, next) {
    //set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error page
    res.status(err.status || 500);
    res.render('error');
});
*/

module.exports = app;



app.listen(console.log('Server started on port 3000'));


//**************************************SERVER*********************************
//criar servidor


//web server (http faz extend de EventEmitter)
/*const server = http.createServer(function(req,res){
    if(req.url==='/'){
        res.write('All systems: green!');
        res.end();
    }
});
server.listen(3000);

console.log('listening on port 3000...')
//sempre que ha uma conexao ao server ele cria um evento
*/
const http = require('http');
var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
//const expressLayouts = require('express-ejs-layouts');

//imports from local modules
const userSchema = require('./models/user');
const telemoveisSchema = require('./models/telemovel');
const leilaoSchema = require('./models/leilao');
const licitacaoSchema = require('./models/licitacao');


//definir routes
const telemoveisRouter = require('./routes/telemoveis');
const leilaoRouter = require('./routes/leilao');
const licitacaoRouter = require('./routes/licitacao');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');


//Initialize express
const app = express();


//DB config
const {
    mongoBD
} = require('./mongoConnect');


mongoose.connect('mongodb://localhost:27017/paw_tp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });



//Setup view engine


//BODYPARCER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//ROUTES

app.use('/',require('./routes/index'));
app.use('/users', usersRouter);
/*
app.use('/users', usersRouter);
app.use('/telemoveis', telemoveisRouter);
app.use('/leilao', leilaoRouter);
app.use('/licitacao', licitacaoRouter);
app.use('/',indexRouter);
*/



//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(_dirname,'public')));   // dirname nao ta definido

//app.use('/bootstrap',express.static(_dirname+'/node_modules/bootstrap/dist/css/'));  -> dirname nao ta definido


module.exports = app;



app.listen(console.log('Server started on port 3000'));


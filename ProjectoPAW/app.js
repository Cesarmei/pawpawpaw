const http = require('http');
var createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

//jquery
var $ = require('jquery');

//Initialize express
const app = express();

//passport
require('./config/passport')(passport);


//mongoDB
mongoose.connect('mongodb://localhost:27017/paw_tp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection failed:'));

//Front-end
app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.static(__dirname + '/public/'));

//BODYPARSER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Connect flash
app.use(flash());

//Gloval vars for erros
app.use((req,res,next) => {
    res.locals.sucessAlert = req.flash('sucessAlert');
    res.locals.errorAlert = req.flash('errorAlert');
    res.locals.error = req.flash('error');
    //user do momento
    res.locals.currentUser=req.user;
    //tlmv
    res.locals.myTlmv = req.telemovel;
    next();
});

//ROUTES
app.use('/',require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/leiloes',require('./routes/telemoveis'));

/*
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
*/

//export
module.exports = app;

//SERVER
var server = app.listen(3000, function(){
    console.log('Server started on port 3000');
});



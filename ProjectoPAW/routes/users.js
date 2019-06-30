var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersController");
const bcrypt = require('bcryptjs');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017/paw_tp';

mongo.connect('mongodb://localhost:27017/paw_tp', (err, client) => {
  // Client returned
  var db = client.db('users');
});

//user model
const User = require('../models/user')

//login page
router.get('/login', (req,res) => res.render('login'));

//register page
router.get('/register', (req,res) => res.render('register'));

//register handle
router.post('/register',(req,res) => {
    const{nome, password} = req.body;
    let errors=[];

//check required fields
if(!nome || !password ){
    errors.push({ msg: 'Preencha todos os campos!'});
}


//check pass length (6 min)
if(password.length<6){
    errors.push({msg: 'Password tem que ter no minimo 6 caracteres.'});
}

if(errors.length > 0){
    res.render('register',{
        errors,
        nome,
        password
    });
}else{
    let tipo='user';
    let numProdSubmetidos=0;
    let leiloesGanhos=0;
    //validation passed
    User.findOne({ nome: nome})
        .then(user =>{
            if(user){
                //user exists
                errors.push({msg:'Nome ja registado!'})
                res.render('register',{
                    errors,
                    nome,
                    password
                });
            }else{
                const newUser = new User({
                    nome,
                    password,
                    tipo,
                });
               
                //hash password
                bcrypt.genSalt(10,(err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err)  throw err;
                        //set password to hashed
                        newUser.password=hash;
                        //save user
                        newUser.save()
                            .then(newUser => {
                                //guardar user
                                mongo.connect(url, function(err,db){
                                    assert.equal(null,err);
                                    db.collection('users').insertOne(item, function(err,result){
                                        assert.equal(null,error);
                                        console.log('user criado!');
                                        db.close();
                                    });
                                });
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                }));
            }
        });
}

});


//*********** */API REST*****************************++++

/*GET lista de users */
router.get('/users',usersController.getusers);
//POST
router.post('/users',usersController.createUtlz);
//GET
router.get('/user/:_id',usersController.getUmuser);
//PUT
router.put('/user/:_id',usersController.updateuser);
//DELETE
router.delete('/user/:_id',usersController.deleteuser);
//PARAM
router.param('_id',usersController.getuserById);

module.exports = router;
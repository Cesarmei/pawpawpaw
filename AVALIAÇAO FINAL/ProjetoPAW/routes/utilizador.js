var express = require('express');
var router = express.Router();
var utilizadoresController = require("../controllers/utilizadoresController");
const bcrypt = require('bcryptjs');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

var url = 'mongodb://localhost:27017/paw_tp';

mongo.connect('mongodb://localhost:27017/paw_tp', (err, client) => {
  // Client returned
  var db = client.db('utilizadores');
});

//user model
const User = require('../Mongoose/schemas/utilizador')

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
    let tipo='Utilizador';
    let numProdSubmetidos=0;
    let leiloesGanhos=0;
    //validation passed
    User.findOne({ nome: nome})
        .then(user =>{
            if(user){
                //user exists
                errors.push({msg:'Name is already registered'})
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
                    numProdSubmetidos,
                    leiloesGanhos
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
                                    db.collection('utilizadores').insertOne(item, function(err,result){
                                        assert.equal(null,error);
                                        console.log('utilizador criado!');
                                        db.close();
                                    });
                                });
                                res.redirect('/utilizadores/login');
                            })
                            .catch(err => console.log(err));
                }));
            }
        });
}

});


//*********** */API REST*****************************++++

/*GET lista de utilizadores */
router.get('/utilizadores',utilizadoresController.getUtilizadores);
//POST
router.post('/utilizadores',utilizadoresController.createUtlz);
//GET
router.get('/utilizador/:id_user',utilizadoresController.getUmUtilizador);
//PUT
router.put('/utilizador/:id_user',utilizadoresController.updateUtilizador);
//DELETE
router.delete('/utilizador/:id_user',utilizadoresController.deleteUtilizador);
//PARAM
router.param('id_user',utilizadoresController.getUtilizadorById);

module.exports = router;
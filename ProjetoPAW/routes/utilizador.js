var express = require('express');
var router = express.Router();
var utilizadoresController = require("../controllers/utilizadoresController");


//login page
router.get('/login', (req,res) => res.render('login'));

//register page
router.get('/register', (req,res) => res.render('register'));

//register handle
router.post('/register',(req,res) => {
    const{nome, genero, password, password2 } = req.body;
    let errors=[];

//check required fields
if(!nome || !genero || !password || !password2){
        errors.push({ msg: 'please fill in all fields'});
    }

//check passwords match
if(passowrd !== passoword2){
    errors.push({msg: 'Passwords não são iguais!'});
}

//check pass length (6 min)
if(password.length<6){
    errors.push({msg: 'Password tem que ter no minimo 6 caracteres.'});
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
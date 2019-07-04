var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersController");
const { forwardAuthenticated} = require('../config/auth');
var User = require("../models/user");

//login page
router.get('/login', forwardAuthenticated,(req,res) => res.render('login'));

//register page
router.get('/register',forwardAuthenticated, (req,res) => res.render('register'));

//POST - registar user
router.post('/register', usersController.createUser);

//POST - login user
router.post('/login', usersController.loginUser);

//GET - logout
router.get('/logout',  usersController.logoutUser);

//GET lista de users 
router.get('/all',usersController.getUsers);

//PARAM & GET - por id
router.get('/:id',usersController.getOneUser);
router.param('id',usersController.getUserById);



//PUT
router.put('/:username',usersController.updateUser);
//DELETE
router.delete('/:username',usersController.deleteUser);


//GET - buscar dados do utilizador que esteja logado
router.get('/user_data', usersController.getUserData);

module.exports = router;
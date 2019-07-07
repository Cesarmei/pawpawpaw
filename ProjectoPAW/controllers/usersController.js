var moongoose = require("moongoose");
var User = require("../models/user");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { logOrNot } = require('../config/auth');

//****************User*******************************************

//array das funções
var UserController = {};

//Criar novo User
UserController.createUser = function (req,res,next){	
    const{username, nome, password,tipo} = req.body;
	let errors=[];
	
	//verificar campos obrigatorios
	if(!username || !nome || !password){
		errors.push({msg:'Preencha todos os campos!'});
	}
	//verificar tamanho da pass
	if(password.length < 6){
		errors.push({msg:'password tem de conter 6 caracteres!'});
	}
	//se tiver erros...
	if(errors.length > 0){
		res.render('register',{
			errors,
			username,
			nome,
			password,
			tipo
		});
	}else{
		User.findOne({username:username})
			.then(user => {
				if(user){
					//utilizador existe
					errors.push({msg:'Utilizador ja existe!'});
					res.render('register',{
						errors,
						username,
						nome,
						password,
						tipo
					});
				}else{
					const newUser = new User({
						username:username,
						nome:nome,
						password:password,
						tipo:tipo
					});
					//Hash Password
					bcrypt.genSalt(12,(err, salt) =>
						bcrypt.hash(newUser.password,salt, (err,hash) => {
							if(err) throw err;
							//password pass a hash
							newUser.password = hash;
							//guardar o utilizador
							newUser.save()
								.then(user => {
									req.flash('sucessAlert','Registado! Pode fazer login.');
									res.redirect('/users/login');
								})
								.catch(err => console.log(err));
					}));		
				}
			});
	}
}


//Efetuar login
UserController.loginUser = function(req,res,next){
	
	const{username, password} = req.body;
	var checkPass;
	var checkUserName;
	let errors=[];
	//verificar se os campos não estão vazios
	if(!username || !password){
		errors.push({msg:'Não está a introduzir dados!'});
		//req.flash('error','Não está a introduzir dados!.');
	}	


	//se tiver erros
	if(errors.length > 0){
		res.render('login',{
			errors,
			username,
			password
		});
		//senao faz login adequado após ler o tipo de user
		}else{
		var checkUser = req.body.username;
		User.findOne({username:checkUser})
			.then(user => {
				if(user.tipo==='utilizador'){
					passport.authenticate('local', {
						successRedirect: '/dashboardUser',
						failureRedirect: '/users/login',
						failureFlash: true
					})(req, res, next);
					//req.flash('sucessAlert','Login efetuado!');
				}else if(user.tipo==='funcionario'){
					passport.authenticate('local', {
						successRedirect: '/dashboardFunc',
						failureRedirect: '/users/login',
						failureFlash: true
					})(req, res, next);
					//req.flash('sucessAlert','Login efetuado!');
				}else if(user.tipo==='admin'){
					passport.authenticate('local', {
						successRedirect: '/dashboardAdmin',
						failureRedirect: '/users/login',
						failureFlash: true
					})(req, res, next);
					//req.flash('sucessAlert','Login efetuado!');
				}		
			})
			.catch(err => console.log(err));
	}
}



//Efetuar logout
UserController.logoutUser = function(req,res){
	req.logout();
	req.flash('sucessAlert','Logout concluído');
	res.redirect('/users/login');
}

//atualizar user
UserController.updateUser = function (req, res, next) {
	User.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, user) {
		if (err) {
			next(err);
		} else {
			res.json(user);
		}
	});
};


//apagar user
UserController.deleteUser = function (req, res, next) {
	res.user.remove(function (err) {
		if (err) {
			next(err);
		} else {
			res.json(req.user);
		}
	});
};

//Buscar todos os users
UserController.getUsers = function(req,res,next){
	User.find((err,users) => {
		if(err){
			next(err);
		}else{
			res.json(users);
		}
	});
}

//buscar um id
UserController.getOneUser = function(req,res){
	res.json(res.user);
};

//buscar user pelo id
UserController.getUserById = function(req,res,next,id){
	User.findOne({_id:id},(err,user) =>{
		if (err){
			next(err);
		}else{
			res.user=user;
			next();
		}
	});
};

//buscar um username
UserController.getOneUsername = function(req,res){
	res.json(res.user);
};

//buscar user pelo username
UserController.getUserByUsername = function(req,res,next,username){
	User.findOne({username:username},(err,user) =>{
		if (err){
			next(err);
		}else{
			res.user=user;
			next();
		}
	});
};




//get user loged in
UserController.getUserData = function(req,res,user){
	if (req.user === undefined) {
		// The user is not logged in
		res.json({});
	} else {
		res.json({
			username: req.user
		});
	}
};




//export do modulo
module.exports = UserController;
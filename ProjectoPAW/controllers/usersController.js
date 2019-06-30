var moongoose = require("moongoose");
var User = require("../models/User");




//****************User*******************************************


var UserController = {};

//Criar User
UserController.createUser = function (req,res,next){
	var user = new User(req.body);

	user.save(function (err){
		if(err){
			next(err);
		}else{
			res.json(user);
		}
	});
};

//atualizar User
UserController.updateUser = function(req,res,next){
	User.findByIdAndUpdate(req.body._id,req.body,{new: true}, function(err,user){
		if(err){
			next(err);
		}else{
			res.json(user);
		}
	});
};


//Apagar User
UserController.deleteUser = function (req,res,next){
	req.user.remove(function (err){
		if(err){
			next(err);
		}else{
			res.json(req.user);
		}
	});
};

//Buscar todos os users
UserController.getUsers = function(req,res,next){
	User.find(function(err,user){
		if(err){
			next(err);
		}else{
			res.json(user);
		}
	});
};

//buscar um User
UserController.getOneUser = function(req,res){
	res.json(req.user);
};

UserController.findOneUser = function(req,res){
	res.json(req.user);
};

UserController.getUserById = function(req,res){
	res.json(req.user);
	User.findById(req.body._id,req.body,{new: true}, function(err,user){
		if(err){
			next(err);
		}else{
			res.json(user);
		}
	});
};


//export do modulo
module.exports = UserController;
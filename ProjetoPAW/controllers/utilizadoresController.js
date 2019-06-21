var moongoose = require("moongoose");
var Utilizador = require("../Mongoose/schemas/utilizador");




//****************UTILIZADOR*******************************************


var utilizadorController = {};

//Criar utilizador
utilizadorController.createUtlz = function (req,res,next){
	var user = new Utilizador(req.body);

	user.save(function (err){
		if(err){
			next(err);
		}else{
			res.json(utilizador);
		}
	});
};

//atualizar utilizador
utilizadorController.updateUtilizador = function(req,res,next){
	Utilizador.findByIdAndUpdate(req.body.id_user,req.body,{new: true}, function(err,utilizador){
		if(err){
			next(err);
		}else{
			res.json(utilizador);
		}
	});
};


//Apagar utilizador
utilizadorController.deleteUtilizador = function (req,res,next){
	req.user.remove(function (err){
		if(err){
			next(err);
		}else{
			res.json(req.utilizador);
		}
	});
};

//Buscar todos os utilizadores
utilizadorController.getUtilizadores = function(req,res,next){
	Utilizador.find(function(err,utilizadores){
		if(err){
			next(err);
		}else{
			res.json(utilizadores);
		}
	});
};

//buscar um utilizador
utilizadorController.getUmUtilizador = function(req,res){
	res.json(req.utilizador);
};


utilizadorController.getUtilizadorById = function(req,res){
	res.json(req.utilizador);
	Utilizador.findById(req.body.id_user,req.body,{new: true}, function(err,utilizador){
		if(err){
			next(err);
		}else{
			res.json(utilizador);
		}
	});
};


//export do modulo
module.exports = utilizadorController;
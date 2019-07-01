var moongoose = require("moongoose");
var Telemovel = require("../models/telemovel");




//****************TELEMOVEIS*******************************************


var telemovelController = {};

//Criar telemovel
telemovelController.createTelemovel = function (req,res,next){
	var tlmv = new Telemovel(req.body);

	tlmv.save(function (err){
		if(err){
			next(err);
		}else{
			res.json(tlmv);
		}
	});
};

//atualizar telemovel
telemovelController.updateTelemovel = function(req,res,next){
	Telemovel.findByIdAndUpdate(req.body._id,req.body,{new: true}, function(err,tlmv){
		if(err){
			next(err);
		}else{
			res.json(tlmv);
		}
	});
};


//remover telemovel
telemovelController.removeTelemovel = function (req,res,next){
	req.tlmv.remove(function (err){
		if(err){
			next(err);
		}else{
			res.json(req.tlmv);
		}
	});
};

//Buscar todos os telemoveis
telemovelController.getTelemoveis = function(req,res,next){
	Telemovel.find(function(err,tlmv){
		if(err){
			next(err);
		}else{
			res.json(tlmv);
		}
	});
};

//buscar um telemovel
telemovelController.getTelemovel = function(req,res){
	res.json(req.telemovel);
};


telemovelController.getTelemovelById = function(req,res){
	res.json(req.tlmv);
	Telemovel.findById(req.body._id,req.body,{new: true}, function(err,tlmv){
		if(err){
			next(err);
		}else{
			res.json(tlmv);
		}
	});
};


//export do modulo
module.exports = telemovelController;
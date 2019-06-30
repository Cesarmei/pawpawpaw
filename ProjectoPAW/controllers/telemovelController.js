var moongoose = require("moongoose");
var Telemovel = require("../models/telemovel");




//****************TELEMOVEIS*******************************************


var telemovelController = {};

//Criar telemovel
exports.createTelemovel = function (req,res,next){
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
exports.updateTelemovel = function(req,res,next){
	Telemovel.findByIdAndUpdate(req.body._id,req.body,{new: true}, function(err,tlmv){
		if(err){
			next(err);
		}else{
			res.json(tlmv);
		}
	});
};


//remover telemovel
exports.removeTelemovel = function (req,res,next){
	req.tlmv.remove(function (err){
		if(err){
			next(err);
		}else{
			res.json(req.tlmv);
		}
	});
};

//Buscar todos os telemoveis
exports.getTelemoveis = function(req,res,next){
	Telemovel.find(function(err,tlmv){
		if(err){
			next(err);
		}else{
			res.json(tlmv);
		}
	});
};

//buscar um telemovel
exports.getTelemovel = function(req,res){
	res.json(req.telemovel);
};


exports.getTelemovelById = function(req,res){
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
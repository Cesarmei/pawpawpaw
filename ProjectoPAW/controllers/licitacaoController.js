var moongoose = require("moongoose");
var Licitacao = require("../models/licitacao");




//****************LICITAcAO*******************************************


var licitacaoController = {};

//Criar licitacao
licitacaoController.createLicitacao = function (req,res,next){
	var licitacao = new Licitacao(req.body);

	licitacao.save(function (err){
		if(err){
			next(err);
		}else{
			res.json(licitacao);
		}
	});
};

//atualizar licitacao
licitacaoController.updateLicitacao = function(req,res,next){
	Licitacao.findByIdAndUpdate(req.body._id,req.body,{new: true}, function(err,licitacao){
		if(err){
			next(err);
		}else{
			res.json(licitacao);
		}
	});
};


//Apagar licitacao
licitacaoController.deleteLicitacao = function (req,res,next){
	req.licitacao.remove(function (err){
		if(err){
			next(err);
		}else{
			res.json(req.licitacao);
		}
	});
};

//Buscar todos os licitacao
licitacaoController.getLicitacao = function(req,res,next){
	Licitacao.find(function(err,licitacoes){
		if(err){
			next(err);
		}else{
			res.json(licitacao);
		}
	});
};

//buscar um licitacao
licitacaoController.getLicitacao = function(req,res){
	res.json(req.licitacao);
};

//buscar leilao por ID
licitacaoController.getLicitacaoById = function(req,res){
	res.json(req.licitacao);
	Leilao.findById(req.body._id,req.body,{new: true}, function(err,licitacao){
		if(err){
			next(err);
		}else{
			res.json(licitacao);
		}
	});
};


//export do modulo
module.exports = licitacaoController;
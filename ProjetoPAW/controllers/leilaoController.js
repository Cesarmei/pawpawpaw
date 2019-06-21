var moongoose = require("moongoose");
var Leilao = require("../Mongoose/schemas/leilao");




//****************LEILAO*******************************************


var leilaoController = {};

//Criar leilao
leilaoController.createLeilao = function (req,res,next){
	var leilao = new Leilao(req.body);

	leilao.save(function (err){
		if(err){
			next(err);
		}else{
			res.json(leilao);
		}
	});
};

//atualizar leilao
leilaoController.updateLeilao = function(req,res,next){
	Leilao.findByIdAndUpdate(req.body.id_leilao,req.body,{new: true}, function(err,leilao){
		if(err){
			next(err);
		}else{
			res.json(leilao);
		}
	});
};


//Apagar leilao
leilaoController.deleteLeilao = function (req,res,next){
	req.leilao.remove(function (err){
		if(err){
			next(err);
		}else{
			res.json(req.leilao);
		}
	});
};

//Buscar todos os leiloes
leilaoController.getLeiloes = function(req,res,next){
	Artigo.find(function(err,leiloes){
		if(err){
			next(err);
		}else{
			res.json(leiloes);
		}
	});
};

//buscar um leilao
leilaoController.getLeilao = function(req,res){
	res.json(req.leilao);
};

//buscar leilao por ID
leilaoController.getLeilaoById = function(req,res){
	res.json(req.leilao);
	Leilao.findById(req.body.id_leilao,req.body,{new: true}, function(err,leilao){
		if(err){
			next(err);
		}else{
			res.json(leilao);
		}
	});
};


//export do modulo
module.exports = leilaoController;
var moongoose = require("moongoose");
var Licitaçao = require("../Mongoose/schemas/licita\u00E7oes");




//****************LICITAÇAO*******************************************


var licitaçaoController = {};

//Criar licitaçao
licitaçaoController.createLicitaçao = function (req,res,next){
	var licitaçao = new Licitaçao(req.body);

	licitaçao.save(function (err){
		if(err){
			next(err);
		}else{
			res.json(licitaçao);
		}
	});
};

//atualizar licitacao
licitaçaoController.updateLicitaçao = function(req,res,next){
	Licitaçao.findByIdAndUpdate(req.body.id_lct,req.body,{new: true}, function(err,licitaçao){
		if(err){
			next(err);
		}else{
			res.json(licitaçao);
		}
	});
};


//Apagar licitacao
licitaçaoController.deleteLicitaçao = function (req,res,next){
	req.licitaçao.remove(function (err){
		if(err){
			next(err);
		}else{
			res.json(req.licitaçao);
		}
	});
};

//Buscar todos os licitacao
licitaçaoController.getLicitaçao = function(req,res,next){
	Licitaçao.find(function(err,licitaçoes){
		if(err){
			next(err);
		}else{
			res.json(licitaçao);
		}
	});
};

//buscar um licitacao
licitaçaoController.getLicitaçao = function(req,res){
	res.json(req.licitaçao);
};

//buscar leilao por ID
licitaçaoController.getLicitaçaoById = function(req,res){
	res.json(req.licitaçao);
	Leilao.findById(req.body.id_lct,req.body,{new: true}, function(err,licitaçao){
		if(err){
			next(err);
		}else{
			res.json(licitaçao);
		}
	});
};


//export do modulo
module.exports = licitaçaoController;
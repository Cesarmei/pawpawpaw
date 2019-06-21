var moongoose = require("moongoose");
var Artigo = require("../Mongoose/schemas/artigos");




//****************ARTIGO*******************************************


var artigoController = {};

//Criar artigo
exports.createArtigo = function (req,res,next){
	var artigo = new Artigo(req.body);

	artigo.save(function (err){
		if(err){
			next(err);
		}else{
			res.json(artigo);
		}
	});
};

//atualizar artigo
exports.updateArtigo = function(req,res,next){
	Artigo.findByIdAndUpdate(req.body.id_art,req.body,{new: true}, function(err,artigo){
		if(err){
			next(err);
		}else{
			res.json(artigo);
		}
	});
};


//Apagar artigo
exports.deleteArtigo = function (req,res,next){
	req.artigo.remove(function (err){
		if(err){
			next(err);
		}else{
			res.json(req.artigo);
		}
	});
};

//Buscar todos os artigos
exports.getArtigos = function(req,res,next){
	Artigo.find(function(err,artigos){
		if(err){
			next(err);
		}else{
			res.json(artigos);
		}
	});
};

//buscar um artigo
exports.getArtigo = function(req,res){
	res.json(req.artigo);
};


exports.getArtigoById = function(req,res){
	res.json(req.artigo);
	Artigo.findById(req.body.id_art,req.body,{new: true}, function(err,artigo){
		if(err){
			next(err);
		}else{
			res.json(artigo);
		}
	});
};


//export do modulo
//module.exports = artigoController;
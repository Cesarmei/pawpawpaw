var moongoose = require("moongoose");
var Telemovel = require("../models/telemovel");
//jquery
var $ = require('jquery');
//ajax
/*
$.ajax({
    url: '/users/user_data',
    dataType: 'json',
    method: 'GET',
    data: { "now" : true }
});*/



//****************TELEMOVEIS*******************************************


var telemovelController = {};

//Criar telemovel
telemovelController.registerTelemovel = function (req,res,next){
	const{marca, modelo,descricao,preçoInicial,dataFim,estado} = req.body;
	var imagem;
	let errors=[];

	//get user loged in
	const user = req.user.username;
	//console.log(req.user);

	//verificar se os campos não estão vazios
	if(!marca|| !modelo || !descricao || !preçoInicial || !user || !dataFim || !estado){
		errors.push({msg:'Não está a introduzir dados!'});
		//req.flash('error','Não está a introduzir dados!.');
	}
	
	//se nao tiver imagem, guarda uma imagem a dizer "sem imagem"
	if(!imagem){
		imagem='http://bit.do/semimagemdotlmv';
	}

	console.log('meteu imagem');
	//se tiver erros
	if(errors.length > 0){
		console.log('tem erros');
		res.render('criarTelemovel',{
			errors,
			marca,
			modelo,
			descricao,
			preçoInicial,
			user,
			dataFim,
			imagem,
			estado,
		});
		//senao cria novo telemovel
		}else{
			//NAO ESTA ADICIONAR USER
			console.log(user);
			const newTelemovel = new Telemovel({
				marca:marca,
				modelo:modelo,
				descricao:descricao,
				preçoInicial:preçoInicial,
				user:user,
				dataFim:dataFim,
				imagem:imagem,
				estado:estado
			});
			//guardar o telemovel
			newTelemovel.save()
			.then(tlmv => {
				req.flash('sucessAlert','Telemovel enviado para avaliaçao.');
				res.redirect('/dashboardUser');
				//res.status(200);
			})
			.catch(err => console.log(err));				
		}
};


//remover telemovel em leilao 
telemovelController.cancelLeilao = function (req,res,next){
	//tlmv.estado="terminado";
	Telemovel.findByIdAndUpdate(req.body._id,req.body,{new:true},function(err,tlmv){
	if(err){
		next(err);
	}else{
		req.flash('sucessAlert','Leilao terminado.');
		res.json(tlmv);
		//res.redirect('/dashboardUser');
		
	}
	});							
};

//Buscar todos os telemoveis
telemovelController.getTelemoveis = function(req,res,next){
	Telemovel.find(function (err,tlmvs){
		if(err){
			next(err);
		}else{
			res.json(tlmvs);
		}
	});
};

//Buscar todos os telemoveis em leilao
telemovelController.getLeiloes = function(req,res,next){
	Telemovel.find({estado:'avaliado'},function (err,tlmv){
		if(err){
			next(err);
		}else{
			res.json(tlmv);
			}
	});
};

//buscar um telemovel por id
telemovelController.getTelemovel = function(req,res){
	res.json(res.tlmv);
};

//buscar o id do telemovel
telemovelController.getTelemovelById = function(req,res,next,id){
	Telemovel.findOne({_id:id},(err,tlmv) =>{
		if (err){
			next(err);
		}else{
			res.tlmv=tlmv;
			next();
		}
	});
};




//export do modulo
module.exports = telemovelController;
var moongoose = require("moongoose");
var Telemovel = require("../models/telemovel");
//jquery
var $ = require('jquery');
const mongoose = require('mongoose');
//ajax
/*
$.ajax({
    url: '/users/user_data',
    dataType: 'json',
    method: 'GET',
    data: { "now" : true }
});*/



//****************telemovel*******************************************


var telemovelController = {};

//Criar telemovel
telemovelController.registerTelemovel = function (req, res, next) {
	const { marca, modelo, descricao, preçoInicial, dataFim, estado } = req.body;
	var imagem = req.body.imagem;
	let errors = [];
	var ultimaLct=0;
	//get user loged in
	const user = req.user.username;
	//console.log(req.user);

	//instanciar array de licitacoes
	var licitacoes= [{
		licitacao:0,
		user:''
	}]

	//verificar se os campos não estão vazios
	if (!marca || !modelo || !descricao || !preçoInicial || !user || !dataFim || !estado) {
		errors.push({ msg: 'Não está a introduzir dados!' });
		//req.flash('error','Não está a introduzir dados!.');
	}

	//se nao tiver imagem, guarda uma imagem a dizer "sem imagem"
	if (!imagem) {
		imagem = 'http://bit.do/semimagemdotlmv';
	}
	//se tiver erros
	if (errors.length > 0) {
		res.render('criarTelemovel', {
			marca,
			modelo,
			descricao,
			preçoInicial,
			user,
			dataFim,
			imagem,
			estado
		});
		//senao cria novo telemovel
	} else {
		const newTelemovel = new Telemovel({
			marca: marca,
			modelo: modelo,
			descricao: descricao,
			preçoInicial: preçoInicial,
			user: user,
			dataFim: dataFim,
			imagem: imagem,
			estado: estado,
			licitacoes: licitacoes,
			ultimaLct:ultimaLct
			
		});
		//guardar o telemovel
		newTelemovel.save()
			.then(tlmv => {
				req.flash('sucessAlert', 'Telemovel enviado para avaliaçao.');
				res.redirect('/dashboardUser');
				//res.status(200);
			})
			.catch(err => console.log(err));
	}
};


//remover telemovel em leilao 
telemovelController.cancelLeilao = function (req, res, next) {
	//tlmv.estado="terminado";
	Telemovel.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, tlmv) {
		if (err) {
			next(err);
		} else {
			req.flash('sucessAlert', 'Leilao terminado.');
			res.json(tlmv);
			//res.redirect('/dashboardUser');

		}
	});
};



//Buscar todos os telemovel em leilao
telemovelController.getLeiloes = function (req, res, next) {
	Telemovel.find({ estado: 'avaliado' }, function (err, tlmv) {
		if (err) {
			next(err);
		} else {
			res.json(tlmv);
		}
	});
};

//buscar um telemovel por id
telemovelController.getTelemovel = function (req, res) {
	res.json(res.tlmv);
};

//buscar o id do telemovel
telemovelController.getTelemovelById = function (req, res, next, id) {
	Telemovel.findOne({ _id: id }, (err, tlmv) => {
		if (err) {
			next(err);
		} else {
			res.tlmv = tlmv;
			next();
		}
	});
};

//*********************************LICITAÇOES******************************/
//Criar telemovel
telemovelController.licitarLeilao = function (req, res, next) {
	const valor = req.body.valor;
	const user = req.body.user;
	var leilao = mongoose.Types.ObjectId(req.body.leilao);


	/*
	//verificar valor da licitacao
	if (leilao.preçoInicial >= valor) {
		errors.push({ msg: 'Tem de licitar com um valor maior!' });
		res.render('licitarLeilao');
		req.flash('errorAlert', 'Licitacao baixa!');
	}else{
		if(leilao.ultimaLct >= valor){
			errors.push({ msg: 'Tem de licitar com um valor maior!' });
			res.render('licitarLeilao');
			req.flash('errorAlert', 'Licitacao baixa!');
		}
	}*/

	
	var licitacoes= [{
		licitacao:valor,
		user:user
	}]

	var ultimaLct = valor;

	
	Telemovel.updateOne({ _id: leilao },
		{ $push: { licitacoes: licitacoes }, ultimaLct:ultimaLct},
		function (error, result) {
			if (error) {
				console.log(error);
			} else {
				req.flash('sucessAlert', 'Licitacao concluída');
				res.redirect('/dashboardUser')
			}
		});

};




//Aceitar leilao pendente (propor preço inicial)
telemovelController.givePrice = function (req, res, next) {
	const valor = req.body.valor;
	var leilao = mongoose.Types.ObjectId(req.body.leilao);
	var preçoInicial = valor;
	var estado = 'recebido';
	Telemovel.updateOne({ _id: leilao },
		{ preçoInicial: preçoInicial, estado: estado },
		function (error, result) {
			if (error) {
				console.log(error);
			} else {
				req.flash('sucessAlert', 'Aguarda resposta do vendedor');
				res.redirect('/dashboardFunc')
			}
		});
}


//Terminar leiloes ativos
telemovelController.terminarLeilao = function (req, res, next) {
	var leilao = mongoose.Types.ObjectId(req.body.leilao);
	var estado = 'terminado';
	Telemovel.updateOne({ _id: leilao },
		{ estado: estado },
		function (error, result) {
			if (error) {
				console.log(error);
			} else {
				req.flash('sucessAlert', 'Leilao terminado');
				res.redirect('/dashboardFunc')
			}
		});
}


//Rejeitar leiloes (Funcionario)
telemovelController.rejeitarLeilaoFunc = function (req, res, next) {
	var leilao = mongoose.Types.ObjectId(req.body.leilao);
	var estado = 'recusado';
	Telemovel.updateOne({ _id: leilao },
		{ estado: estado },
		function (error, result) {
			if (error) {
				console.log(error);
			} else {
				req.flash('sucessAlert', 'Leilao recusado');
				res.redirect('/dashboardFunc')
			}
		});
}

//Rejeitar leiloes 
telemovelController.rejeitarLeilao = function (req, res, next) {
	var leilao = mongoose.Types.ObjectId(req.body.leilao);
	var estado = 'recusado';
	Telemovel.updateOne({ _id: leilao },
		{ estado: estado },
		function (error, result) {
			if (error) {
				console.log(error);
			} else {
				req.flash('sucessAlert', 'Leilao recusado');
				res.redirect('/dashboardUser')
			}
		});
}


//Aceitar leilao pendente
telemovelController.aceitarLeilao = function (req, res, next) {
	var leilao = mongoose.Types.ObjectId(req.body.leilao);
	var estado = 'avaliado';
	Telemovel.updateOne({ _id: leilao },
		{ estado: estado },
		function (error, result) {
			if (error) {
				console.log(error);
			} else {
				req.flash('sucessAlert', 'Leilao ativo!');
				res.redirect('/dashboardUser')
			}
		});
}

//Buscar todas as telemovel
telemovelController.getLicitacoes = function (req, res, next) {
	telemovel.find(function (err, licitacoes) {
		if (err) {
			next(err);
		} else {
			res.json(licitacoes);
		}
	});
};

//Buscar todas as licitacões de um leilao (id)
telemovelController.getLicitacoesById = function (req, res, next) {
	var leilao = req.body;
	console.log(leilao);
	telemovel.find({ leilao: leilao._id }, function (err, licitacoes) {
		if (err) {
			next(err);
		} else {
			res.render('todasLicitacoes', {
				licitacoes: licitacoes,
				leilao: leilao
			})
		}
	})
};

//buscar um telemovel
telemovelController.getLicitacao = function (req, res) {
	res.json(req.telemovel);
};

//buscar telemovel por ID
telemovelController.getLicitacaoById = function (req, res) {
	telemovel.findOne({ _id: id }, (err, telemovel) => {
		if (err) {
			next(err);
		} else {
			res.telemovel = telemovel;
			next();
		}
	});
};


//export do modulo
module.exports = telemovelController;
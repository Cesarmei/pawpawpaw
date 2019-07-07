var moongoose = require("moongoose");
var Licitacao = require("../models/licitacao");
const tlmvs = require('../models/telemovel');



//****************LICITAcAO*******************************************


var licitacaoController = {};

//Criar licitacao
licitacaoController.createLicitacao = function (req, res, next) {
	const { valor, user, leilao } = req.body;
	let errors = [];

	//verificar se os campos não estão vazios
	if (!valor || !user || !leilao) {
		errors.push({ msg: 'Não está a introduzir dados!' });
	}

	//se tiver erros
	if (errors.length > 0) {
		res.render('criarLicitacao', {
			valor,
			user,
			leilao
		});
		//senao cria nova licitacao
	} else {
		const newLicitacao = new Licitacao({
			valor: valor,
			user: user,
			leilao: leilao
		});
		//guardar a licitacao realizada
		newLicitacao.save()
			.then(lct => {
				req.flash('sucessAlert', 'Telemovel enviado para avaliaçao.');
				res.redirect('/:id/info');
				//res.status(200);
			})
			.catch(err => console.log(err));
	}
};


//Buscar todas as licitacao
licitacaoController.getLicitacoes = function (req, res, next) {
	Licitacao.find(function (err, licitacoes) {
		if (err) {
			next(err);
		} else {
			res.json(licitacoes);
		}
	});
};

//Buscar todas as licitacões de um leilao (id)
licitacaoController.getLicitacoesById = function (req, res, next) {
	var leilao = req.body;
	console.log(leilao);
	Licitacao.find({ leilao: leilao._id }, function (err, licitacoes) {
		if (err) {
			next(err);
		} else {
			res.render('todasLicitacoes', {
				licitacoes: licitacoes,
				leilao:leilao
			})
		}
	})
};

//buscar um licitacao
licitacaoController.getLicitacao = function (req, res) {
	res.json(req.licitacao);
};

//buscar licitacao por ID
licitacaoController.getLicitacaoById = function (req, res) {
	Licitacao.findOne({ _id: id }, (err, licitacao) => {
		if (err) {
			next(err);
		} else {
			res.licitacao = licitacao;
			next();
		}
	});
};


//export do modulo
module.exports = licitacaoController;
var express = require('express');
var router = express.Router();
var licitacaoController = require("../controllers/licitacaoController");
//const telemoveisController = require("../controllers/telemovelController");
const { authenticationTrue } = require('../config/auth');

//********************************** LICITAR ***************************************/

/*GET lista de licitacões */
router.get('/licitacao',licitacaoController.getLicitacao);


//GET - Pagina de registo de uma nova licitação
router.get('/:id/createLicitacao',authenticationTrue,(req, res) => res.render('createLicitacao'));

//POST - regista nova licitação
router.post('/:id/createLicitacao',licitacaoController.createLicitacao);

//GET
router.post('/:id/licitacoes',licitacaoController.getLicitacoesById);
//GET
router.get('/licitacao/:_id',licitacaoController.getLicitacao);
//PARAM
router.param('_id',licitacaoController.getLicitacaoById);
//router.param('_id',telemoveisController.getTelemovelById);

module.exports = router;
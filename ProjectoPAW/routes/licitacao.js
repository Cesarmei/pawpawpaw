var express = require('express');
var router = express.Router();
var licitacaoController = require("../controllers/licitacaoController");

/*GET lista de licitacões */
router.get('/licitacao',licitacaoController.getLicitacao);
//POST
router.post('/licitacao',licitacaoController.createLicitacao);
//GET
router.get('/licitacao/:_id',licitacaoController.getLicitacao);
//PUT
router.put('/licitacão/:_id',licitacaoController.updateLicitacao);
//DELETE
router.delete('/licitacão/:_id',licitacaoController.deleteLicitacao);
//PARAM
router.param('_id',licitacaoController.getLicitacaoById);

module.exports = router;
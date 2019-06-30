var express = require('express');
var router = express.Router();
var leilaoController = require("../controllers/leilaoController.js");

/*GET lista de leiloes */
router.get('/leilao',leilaoController.getLeilao);
//POST
router.post('/leilao',leilaoController.createLeilao);
//GET
router.get('/leilao/:_id',leilaoController.getLeilao);
//PUT
router.put('/leilao/:_id',leilaoController.updateLeilao);
//DELETE
router.delete('/utilizador/:_id',leilaoController.deleteLeilao);
//PARAM
router.param('_id',leilaoController.getLeilaoById);

module.exports = router;
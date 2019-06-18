var express = require('express');
var router = express.Router();
var leilaoController = require("../controllers/leilaoController.js");

/*GET lista de leiloes */
router.get('/leilao',leilaoController.getLeilao);
//POST
router.post('/leilao',leilaoController.createLeilao);
//GET
router.get('/leilao/:id_leilao',leilaoController.getLeilao);
//PUT
router.put('/leilao/:id_leilao',leilaoController.updateLeilao);
//DELETE
router.delete('/utilizador/:id_leilao',leilaoController.deleteLeilao);
//PARAM
router.param('id_leilao',leilaoController.getLeilaoById);
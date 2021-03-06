var express = require('express');
var router = express.Router();
var licitaçaoController = require("../controllers/licita\u00E7aoController");

/*GET lista de licitações */
router.get('/licitaçao',licitaçaoController.getLicitaçao);
//POST
router.post('/licitaçao',licitaçaoController.createLicitaçao);
//GET
router.get('/licitaçao/:id_lct',licitaçaoController.getLicitaçao);
//PUT
router.put('/licitação/:id_lct',licitaçaoController.updateLicitaçao);
//DELETE
router.delete('/licitação/:id_lct',licitaçaoController.deleteLicitaçao);
//PARAM
router.param('id_lct',licitaçaoController.getLicitaçaoById);

module.exports = router;
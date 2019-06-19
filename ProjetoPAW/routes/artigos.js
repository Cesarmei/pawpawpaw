var express = require('express');
var router = express.Router();
var artigosController = require("../controllers/artigosController");

/*GET lista de artigos */
router.get('/artigos',artigosController.getArtigos);
//POST
router.post('/artigos',artigosController.createArtigo);
//GET
router.get('/artigos/:id_art',artigosController.getArtigo);
//PUT
router.put('/artigos/:id_art',artigosController.updateArtigo);
//DELETE
router.delete('/artigos/:id_art',artigosController.deleteArtigo);
//PARAM
router.param('id_art',artigosController.getArtigoById);

module.exports = router;


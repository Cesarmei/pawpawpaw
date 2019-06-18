var express = require('express');
var router = express.Router();
var artigosController = require("../controllers/artigoController.js");

/*GET lista de artigos */
router.get('/artigos',artigosController.getArtigos);
//POST
router.post('/artigos',artigosController.createArtigo);
//GET
router.get('/artigo/:id_art',artigosController.getArtigo);
//PUT
router.put('/artigo/:id_art',artigosController.updateArtigo);
//DELETE
router.delete('/artigo/:id_art',artigosController.deleteArtigo);
//PARAM
router.param('id_art',artigosController.getArtigoById);
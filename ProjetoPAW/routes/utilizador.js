var express = require('express');
var router = express.Router();
var utilizadoresController = require("../controllers/utilizadoresController.js");

/*GET lista de utilizadores */
router.get('/utilizadores',utilizadoresController.getUtilizadores);
//POST
router.post('/utilizadores',utilizadoresController.createUtlz);
//GET
router.get('/utilizador/:id_user',utilizadoresController.getUmUtilizador);
//PUT
router.put('/utilizador/:id_user',utilizadoresController.updateUtilizador);
//DELETE
router.delete('/utilizador/:id_user',utilizadoresController.deleteUtilizador);
//PARAM
router.param('id_user',utilizadoresController.getUtilizadorById);
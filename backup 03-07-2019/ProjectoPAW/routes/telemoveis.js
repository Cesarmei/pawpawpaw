const express = require('express');
const router = express.Router();
const telemoveisController = require("../controllers/telemovelController");
const { authenticationTrue } = require('../config/auth');

//GET - Criação de telemoveis
router.get('/register', authenticationTrue, (req,res) => res.render('criarTelemovel'));

//GET lista de telemoveis
router.get('/telemoveis',telemoveisController.getTelemoveis);
//POST
router.post('/register',authenticationTrue, telemoveisController.registerTelemovel);

//PUT
router.put('/cancelLeilao/:_id',telemoveisController.cancelLeilao);

//PUT
//router.put('/telemoveis/:_id',telemoveisController.updateTelemovel);
//DELETE
router.delete('/telemoveis/:_id',telemoveisController.cancelLeilao);

//GET & PARAM - buscar telemovel/leilao por id
router.get('/:_id',telemoveisController.getTelemovel);
router.param('_id',telemoveisController.getTelemovelById);



//*************API REST*************

//GET lista de telemoveis em leilao
//router.get('/leiloes',telemoveisController.getLeiloes);

//GET - Obter o lance mais alto de um leilão num determinado momento


//PUT - Efetuar um lance num telemóvel em leilão


//*************API REST*************

module.exports = router;
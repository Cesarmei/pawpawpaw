const express = require('express');
const router = express.Router();
const telemoveisController = require("../controllers/telemovelController");
const { authenticationTrue } = require('../config/auth');
var User = require("../models/user");
const tlmvs = require('../models/telemovel');


//GET - Criação de telemoveis
router.get('/register', authenticationTrue, (req, res) => res.render('criarTelemovel'));


//GET - Buscar leiloes pendentes
router.get('/:username/userLeiloesPendentes',authenticationTrue, (req, res) => {
        var userCheck = req.user.username;
        //mostrar telemoveis por avaliar
        tlmvs.find({ estado:{$in: ['enviado','avaliado']},user:{$gte:userCheck} }, function (err, tlmv) {
            if (err) {
                next(err);
            } else {
                //res.json(tlmv);
                res.render('userLeiloesPendentes', {
                    leiloes: tlmv
                });
            }
        });
});


//GET - Buscar leiloes do user
router.get('/:username/userLeiloes',authenticationTrue, (req, res) => {
        var userCheck = req.user.username;
        tlmvs.find({ id: req.body._id,user:{$gte:userCheck}}, function (err, tlmv) {
            if (err) {
                next(err);
            } else {
                //res.json(tlmv);
                res.render('userLeiloes', {
                    leiloes: tlmv
                });
            }
        });
});




//GET lista de telemoveis
router.get('/telemoveis', telemoveisController.getTelemoveis);
//POST
router.post('/register', authenticationTrue, telemoveisController.registerTelemovel);

//PUT
router.put('/cancelLeilao/:_id', telemoveisController.cancelLeilao);

//PUT
//router.put('/telemoveis/:_id',telemoveisController.updateTelemovel);

//TERMINAR LEILAO
router.delete('/telemoveis/:_id', telemoveisController.cancelLeilao);


//GET & PARAM - buscar telemovel/leilao por id
router.get('/:_id', telemoveisController.getTelemovel);
router.param('_id', telemoveisController.getTelemovelById);



//*************API REST*************

//GET lista de telemoveis em leilao
//router.get('/leiloes',telemoveisController.getLeiloes);

//GET - Obter o lance mais alto de um leilão num determinado momento


//PUT - Efetuar um lance num telemóvel em leilão


//*************API REST*************

module.exports = router;
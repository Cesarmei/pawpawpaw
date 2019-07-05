const express = require('express');
const router = express.Router();
const telemoveisController = require("../controllers/telemovelController");
const { authenticationTrue } = require('../config/auth');
var User = require("../models/user");
const tlmvs = require('../models/telemovel');


//GET - Criação de telemoveis
router.get('/register', authenticationTrue, (req, res) => res.render('criarTelemovel'));


//GET - Buscar leiloes pendentes
router.get('/:username/userLeiloesPendentes', (req, res) => {
    User.find({ username: req.body.username }, function (err, user) {
        //mostrar telemoveis por avaliar
        tlmvs.find({ estado: 'enviado' }, function (err, tlmv) {
            if (err) {
                next(err);
            } else {
                //console.log(tlmv);
                //res.json(tlmv);
                res.render('userLeiloesPendentes', {
                    leiloes: tlmv
                });
            }
        });
    });
});


//GET - Buscar leiloes do user
router.get('/userLeiloes', (req, res) => {
    User.find({ username: req.body.username }, function (err, user) {
        //mostrar telemoveis por avaliar
        tlmvs.find({ id: req.body._id }, function (err, tlmv) {
            if (err) {
                next(err);
            } else {
                //console.log(tlmv);
                //res.json(tlmv);
                res.render('userLeiloes', {
                    leiloes: tlmv
                });
            }
        });
    });
});



//GET - pagina do telemovel
router.get('/:_id/info', (req, res) => {
    //User.find({ user: req.body.user }, function (err, user) {
        tlmvs.find({ id: req.body._id }, function (err, tlmv) {
            if (err) {
                next(err);
            } else {
                console.log(tlmv);
                //res.json(tlmv);
                res.render('info', {
                    phone: tlmv
                    //user:user
                });
            }
        });
    //});
});

//GET lista de telemoveis
router.get('/telemoveis', telemoveisController.getTelemoveis);
//POST
router.post('/register', authenticationTrue, telemoveisController.registerTelemovel);

//PUT
router.put('/cancelLeilao/:_id', telemoveisController.cancelLeilao);

//PUT
//router.put('/telemoveis/:_id',telemoveisController.updateTelemovel);
//DELETE
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
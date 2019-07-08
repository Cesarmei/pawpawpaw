const express = require('express');
const router = express.Router();
const telemoveisController = require("../controllers/telemovelController");
const { authenticationTrue } = require('../config/auth');
var User = require("../models/user");
const tlmvs = require('../models/telemovel');



//*********************************LEILOES******************************/

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


//GET - Buscar leiloes pendentes dos users
router.get('/validarLeiloesPendentes',authenticationTrue, (req, res) => {
    //mostrar telemoveis por avaliar
    tlmvs.find({ estado:'enviado' }, function (err, tlmv) {
        if (err) {
            next(err);
        } else {
            //res.json(tlmv);
            res.render('validarLeiloesPendentes', {
                leiloes: tlmv
            });
        }
    });
});

//GET - Buscar leiloes para terminar
router.get('/terminarLeiloes',authenticationTrue, (req, res) => {
    tlmvs.find({ estado:'avaliado' }, function (err, tlmv) {
        if (err) {
            next(err);
        } else {
            //res.json(tlmv);
            res.render('terminarLeiloes', {
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



//*********************************Licitaçoes******************************/


/*GET lista de licitacões */
router.get('/licitacao',telemoveisController.getLicitacao);


//GET & POST - Pagina de registo de uma nova licitação
router.get('/:id/createLicitacao',authenticationTrue,(req, res) => res.render('createLicitacao'));
router.post('/:id/createLicitacao',telemoveisController.createLicitacao);

//GET & POST - Dar o preço inicial (funcionario)
router.get('/:id/giveprice',authenticationTrue,(req, res) => {
    var id_tlmv= req.params.id;
    res.render('giveprice',{id_tlmv:id_tlmv});
});
router.post('/givePrice',telemoveisController.givePrice);

//GET & POST - Terminar Leilao (funcionario)
router.get('/:id/terminar',authenticationTrue,(req, res) => {
    var id_tlmv= req.params.id;
    res.render('terminar',{id_tlmv:id_tlmv});
});
router.post('/terminar',telemoveisController.terminarLeilao);

//GET
router.post('/:id/licitacoes',telemoveisController.getLicitacoesById);
//GET
router.get('/licitacao/:_id',telemoveisController.getLicitacao);
//PARAM
router.param('_id',telemoveisController.getLicitacaoById);
//router.param('_id',telemoveisController.getTelemovelById);



module.exports = router;
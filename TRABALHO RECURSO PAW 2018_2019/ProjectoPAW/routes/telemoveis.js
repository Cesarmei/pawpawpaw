const express = require('express');
const router = express.Router();
const telemoveisController = require("../controllers/telemovelController");
const { authenticationTrue } = require('../config/auth');
var User = require("../models/user");
const tlmvs = require('../models/telemovel');
var usersController = require("../controllers/usersController");


//*********************************LEILOES******************************/

//GET - Criação de telemoveis
router.get('/register', authenticationTrue, (req, res) => res.render('criarTelemovel'));


//GET - Buscar leiloes pendentes
router.get('/:username/userLeiloesPendentes',authenticationTrue, (req, res) => {
        var userCheck = req.user.username;
        //mostrar telemoveis por avaliar
        tlmvs.find({ estado:'recebido',user:{$gte:userCheck} }, function (err, tlmv) {
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


//GET lista de telemoveis
router.get('/telemoveis', telemoveisController.getLeiloes);

//GET - Pagina de registo de uma nova licitação
router.post('/licitarAPI',telemoveisController.getLicitarLeila);


//*********************************Licitaçoes******************************/


/*GET lista de licitacões */
router.get('/licitacao',telemoveisController.getLicitacao);


//GET & POST - Pagina de registo de uma nova licitação
router.get('/:username/licitar/:id',authenticationTrue,(req, res) => {
    var id_tlmv=req.params.id;
    var user_name =req.params.username;
    tlmvs.find({ _id:id_tlmv}, function (err, tlmv) {
        if (err) {
          next(err);
        } else {
          res.render('licitar', {
            user_name: user_name,
            id_tlmv:id_tlmv
          })
        }
      })
    //res.render('licitar',{user_name:user_name, id_tlmv:id_tlmv});
});
router.post('/licitar',telemoveisController.licitarLeilao);

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


//GET & POST - Rejeitar Leilao 
router.get('/:id/rejeitar',authenticationTrue,(req, res) => {
    var id_tlmv= req.params.id;
    res.render('rejeitar',{id_tlmv:id_tlmv});
});
router.post('/rejeitar',telemoveisController.rejeitarLeilao);


//GET & POST - Rejeitar Leilao (funcionário)
router.get('/:id/rejeitarFunc',authenticationTrue,(req, res) => {
    var id_tlmv= req.params.id;
    res.render('rejeitarFunc',{id_tlmv:id_tlmv});
});
router.post('/rejeitarFunc',telemoveisController.rejeitarLeilaoFunc);

var leiloes;
//GET - Todas as licitaçoes de um leilao
router.get('/:id/todasLicitacoes',authenticationTrue,(req,res)=>{
    var id_tlmv = req.params.id;
    tlmvs.find({_id:id_tlmv}, function (err, tlmv) {
        if (err) {
          next(err);
        } else {
            //console.log(tlmv);
          res.render('todasLicitacoes', {
            username: req.user.username,
            leiloes:tlmv
          })
        }
      })
});


//GET
router.post('/:id/licitacoes',telemoveisController.getLicitacoesById);
//GET
router.get('/licitacao/:_id',telemoveisController.getLicitacao);
//PARAM
router.param('_id',telemoveisController.getLicitacaoById);
//router.param('_id',telemoveisController.getTelemovelById);


//PARAM & GET - buscar username
router.get('/:username',usersController.getOneUsername);
router.param('username',usersController.getUserByUsername);



//GET lista de telemoveis em leilao
//router.get('/leiloes',telemoveisController.getLeiloes);
//GET - Obter o lance mais alto de um leilão num determinado momento
//PUT - Efetuar um lance num telemóvel em leilão


module.exports = router;
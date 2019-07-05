const express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const router = express.Router();
const { authenticationTrue, forwardAuthenticated } = require('../config/auth');
const tlmvs = require('../models/telemovel');
var leiloes;


//***************Funções */

var requiresAdmin = function () {
  return [
    ensureLoggedIn('/users/login'),
    function (req, res, next) {
      if (req.user && req.user.tipo === "admin")
        next();
      else
        res.send(401, 'Unauthorized');
    }
  ]
};

//*************ROUTES */




//main page
router.get('/', forwardAuthenticated, (req, res) =>{
  //mostrar telemoveis em leilao
  tlmvs.find({ estado: 'avaliado' }, function (err, tlmv) {
    if (err) {
      next(err);
    } else {
      //console.log(tlmv);
      res.render('main', {
        leiloes: tlmv
      });
    }
  });
});//res.render('main'));

// Dashboard User
router.get('/dashboardUser', authenticationTrue, (req, res) => {
  //mostrar telemoveis em leilao
  tlmvs.find({ estado: 'avaliado' }, function (err, tlmv) {
    if (err) {
      next(err);
    } else {
      //console.log(tlmv);
      res.render('dashboardUser', {
        username:req.user.username,
        leiloes: tlmv
      })
    }
  });
});



// Dashboard Admin
//router.all('/dashboardAdmin/*',requiresAdmin);
router.get('/dashboardAdmin', authenticationTrue,(req, res) =>
  res.render('dashboardAdmin', {
    username: req.user.username
  })
);

// Dashboard Funcionario
router.get('/dashboardFunc', authenticationTrue, (req, res) =>
  res.render('dashboardFunc', {
    username: req.user.username
  })
);



module.exports = router;
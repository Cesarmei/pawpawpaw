const express = require('express');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const router = express.Router();
const { authenticationTrue, forwardAuthenticated } = require('../config/auth');
const tlmvs = require('../models/telemovel');
var leiloes;

//*************ROUTES */

//main page
router.get('/', forwardAuthenticated, (req, res) => {
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
});

// Dashboard User
router.get('/dashboardUser', authenticationTrue, (req, res) => {
  //mostrar telemoveis em leilao
  if (req.user.tipo === 'utilizador') {
    var userCheck = req.user.username;
    tlmvs.find({ estado: 'avaliado', user: { $ne: userCheck } }, function (err, tlmv) {
      if (err) {
        next(err);
      } else {
        res.render('dashboardUser', {
          username: req.user.username,
          leiloes: tlmv
        })
      }
    })
  } else {
    res.redirect('/users/login');
  }
});


// Dashboard Admin
router.get('/dashboardFunc', authenticationTrue, (req, res) => {
  //mostrar telemoveis terminados
  if (req.user.tipo === 'funcionario') {
    var userCheck = req.user.username;
    tlmvs.find({ estado: 'terminado', user: { $ne: userCheck } }, function (err, tlmv) {
      if (err) {
        next(err);
      } else {
        res.render('dashboardFunc', {
          username: req.user.username,
          leiloes: tlmv
        })
      }
    })
  } else {
    res.redirect('/users/login');
  }
});

// Dashboard Admin
router.get('/dashboardAdmin', authenticationTrue, (req, res) => {
  if (req.user.tipo === 'admin') {
    res.render('dashboardAdmin', {
      username: req.user.username
    })
  } else {
    res.redirect('/users/login');
  }
});



module.exports = router;
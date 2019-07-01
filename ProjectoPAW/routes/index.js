const express = require('express');
const router = express.Router();
const {authenticationTrue,forwardAuthenticated} = require('../config/auth');

//main page
router.get('/', (req,res) => res.render('main'));


// Dashboard User
router.get('/dashboardUser',forwardAuthenticated,(req, res) =>
  res.render('dashboardUser', {
    username: req.user.username
  })
);

// Dashboard Admin
router.get('/dashboardAdmin',authenticationTrue, (req, res) =>
  res.render('dashboardAdmin', {
    username: req.user.username
  })
);

// Dashboard Funcionario
router.get('/dashboardFunc',authenticationTrue, (req, res) =>
  res.render('dashboardFunc', {
    username: req.user.username
  })
);



module.exports = router;
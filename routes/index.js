var express = require('express');
var router = express.Router();
var login = require('../models/login');

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/home', function (req,res,next) {

  res.render('index');
});


router.post('/home', function (req,res,next) {
    console.log(req.body);
    var user_name = req.body.username;
    var pass = req.body.password;
  login.getUserDetails(function(err,login){

    if(login.username == user_name && login.password == pass){
      res.json({msg:"user found",s:1});
    }
    else{
      res.json({msg:"password mismatch or user not found",s:0});
    }

  });
});

module.exports = router;

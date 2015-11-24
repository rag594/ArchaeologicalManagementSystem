var express = require('express');
var router = express.Router();
var login = require('../models/login');

router.get('/', function (req, res, next) {

    res.render('index');
});


router.post('/', function (req, res, next) {

    login.getUserDetails(req.body, function (err, login) {


        if (login) {

            res.json({msg: "user found", s: 1});
        }
        else {

            res.json({msg: "password mismatch or user not found", s: 0});
        }

    });
});

module.exports = router;

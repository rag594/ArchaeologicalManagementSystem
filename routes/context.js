var express = require('express');
var router = express.Router();
var context = require('../models/context');


router.get('/add', function (req, res) {

    res.render('context');
});

router.get('/',function(req,res,next){

    context.getContext(function(err,context){

        if(err){
            res.json({msg:err});
        }

        else{
            res.json({detailsOfContext:context});
        }
    });
});


router.post('/add', function (req, res, next) {

    context.addContext(req.body, function (err,context) {

        if(err){
            res.json({msg:err});
        }
        else{
            res.json({msg:"new context added"});
        }
    });
});
module.exports = router;
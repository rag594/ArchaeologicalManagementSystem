var express = require('express');
var router = express.Router();
var context = require('../models/context');

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

module.exports = router;
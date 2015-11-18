var express = require('express');
var router = express.Router();
var funds = require('../models/fundingDetails');

router.get('/list', function (req,res,next) {

    res.render('fundlist');
});
router.get('/',function(req,res,next){

    funds.getFundingDetails(function(err,funds){

        if(err){
            res.json({msg:err});
        }

        else{
            res.json({fundDetails:funds});
        }
    });
});

router.get('/listOfInvestor',function(req,res,next){

    funds.listOfInvestors(function (err, funds) {

        if(err){
            res.json({msg:err});
        }

        else{
            res.json({listOfInvestors:funds});
        }
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var site = require('../models/siteDetails');
var lot = require('../models/lot');

router.get('/add',function(req,res,next){
   res.render('site');
});


router.get('/addSurveyDetails', function (req, res, next) {
   res.render('survey');
});

router.get('/addNewLot', function (req,res,next) {

        res.render('lot');
});

router.get('/',function(req,res,next){

    site.getSiteDetails(function(err,site){

        if(err){
            res.json({msg:err});
        }

        else{
            res.json({siteDetails:site});
        }
    });
});

router.get('/listOfSites', function (req,res,next) {

    site.listOfSites(function(err,site){
        if(err){
            res.json({msg:err});
        }

        else{
            res.json({listOfSites:site});
        }
    });
});

router.get('/listOfMethods', function (req,res,next) {

    site.getSurveyMethods(function (err,site) {

        if(err){
            res.json({msg:err});
        }

        else{
            res.json({surveymethods:site});
        }
    });
});
router.post('/add',function(req,res,next){

    site.setSiteDetails(req.body,function(err,site){
       if(err){
           res.json({msg:err});
       }
        else{
           res.json({msg:"Site details updated"});
       }
    });
});


router.post('/addSurveyDetails', function (req,res,next) {

    site.addSurveyDetails(req.body, function (err,site) {

        if(err){
            res.json({msg:err});
        }
        else{
            res.json({msg:"survey measurements added"});
        }
    });
});


router.post('/addNewLot', function (req,res,next) {

    lot.addLot(req.body, function (err,lot) {
        if(err){
            res.json({msg:err});
        }
        else{
            res.json({msg:"New lot added"});
        }
    });
});
module.exports = router;
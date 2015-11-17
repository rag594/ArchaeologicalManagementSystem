var express = require('express');
var router = express.Router();
var artifact = require('../models/artifact');

router.get('/addArtifact', function (req,res,next) {
    res.render('artifact');
});

router.get('/',function(req,res,next){

    artifact.getAllArtifacts(function(err,artifact){

        if(err){
            res.json({msg:err});
        }

        else{
            res.json({detailsOfArtifact:artifact});
        }
    });
});

router.post('/addArtifact', function (req,res,next) {

    artifact.addNewArtifact(req.body, function (err,artifact) {
        if(err){
            res.json({msg:err});
        }
        else{
            res.json({msg:"New artifact added"});
        }
    });
});

module.exports = router;
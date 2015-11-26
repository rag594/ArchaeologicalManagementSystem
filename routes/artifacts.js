var express = require('express');
var router = express.Router();
var artifact = require('../models/artifact');
var fs = require('fs');

router.get('/getArtifact', function (req,res,next) {

    res.render('artifactByProject');
});

router.get('/getArtifactByDate', function (req,res,next) {

    res.render('artifactsByDate');
});

router.get('/addArtifact', function (req,res,next) {
    res.render('artifact');
});

router.get('/list',function(req,res,next){
   res.render('artifactlist');
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
    console.log("ggu");
    console.log(req.file,req.body);

    var old_path = __dirname+"/../public/images/" + req.file.filename;
    console.log(old_path);
    var new_path = __dirname+"/../public/images/"+ req.file.originalname;
    console.log(new_path);
    fs.rename(old_path,new_path, function (err) {

        if(err){
            res.json({msg:"Error uploading file"});
        }

        else{
            artifact.addNewArtifact(req, function (err,artifact) {
                if(err){
                    res.json({msg:err});
                }
                else{
                    res.json({msg:"New artifact added"});
                }
            });
        }
    });
});

router.post('/getArtifactByLot', function (req,res,next) {

    artifact.getArtifactsByLot(req.body, function (err, artifact) {
        if(err){
            res.json({msg:err});
        }
        else{
            res.json({artifactbyLot:artifact});
        }
    })
});


router.post('/getArtifactByDate', function (req,res,next) {
    artifact.getArtifactByDate(req.body, function (err,artifact) {

        if(err){
            res.json({msg:err});
        }
        else{
            res.json({artifactByDate:artifact});
        }
    });
});

module.exports = router;
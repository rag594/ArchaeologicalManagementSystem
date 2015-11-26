var express = require('express');
var router = express.Router();
var artifact = require('../models/artifact');
var fs = require('fs');

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

module.exports = router;
var express = require('express');
var router = express.Router();
var project = require('../models/project');

router.get('/add', function (req, res, next) {
    res.render('project');
});


router.post('/add', function (req, res, next) {

    project.addProject(req.body, function (err, project) {
        if (err) {
            console.log(err);
            res.json({msg: err});
        }
        else {
            console.log("done");
            res.json({msg: "project has been added"});
        }
    })
});

router.get('/listOfProjects', function (req, res, next) {

    project.listOfProjects(function (err, project) {

        if (err) {
            res.json({msg: err});
        }

        else {
            res.json({detailsOfProjects: project});
        }
    });
});

router.get('/projectDetails',function(req,res,next){
   project.projectDetails(function(err,project){
       if(err){
           res.json({msg:err});
       }
       else{
           res.json({projectdetails:project});
       }
   }) ;
});




module.exports = router;
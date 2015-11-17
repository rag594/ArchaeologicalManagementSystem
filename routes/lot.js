var express = require('express');
var router = express.Router();
var lot = require('../models/lot');


router.get('/getLot', function (req, res, next) {
   lot.getLot(function (err, lot) {
       if(err){
           res.json({msg:err});
       }

       else{
           res.json({listOfLots:lot});
       }
   }) ;

});

module.exports = router;
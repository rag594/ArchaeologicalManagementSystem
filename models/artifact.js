var mysql = require('mysql');
var cfg = require('../config');
var async = require('async');

var conn = mysql.createConnection(cfg.mysql);

function getAllArtifacts(cb){

    cfg.pool.getConnection(function(err,conn){

        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
    var query = "Select a.object_type,a.recorde_name,a.date,a.description,a.latitude,a.longitude,l.lot_id from artifact_desc as a " +
                "INNER JOIN artifac as l on l.artifact_id = a.artifact_id";

    conn.query(query,function(err,rows){
        conn.release();
       if(err){
           cb(err,null);
       }
        else{
           cb(null,rows);
       }
    });

    });
}


function addNewArtifact(param,cb){
    //console.log(param);
    cfg.pool.getConnection(function (err, conn) {
        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        async.waterfall([

            function (callback) {
                conn.query("Insert into photo_logs values(?,?,?,?)", ['',param.body.date,param.file.originalname,'artifact'], (err, rows) => {
                    console.log("1",err);
                    callback(err, rows);
                });
            },

            function(rows, callback){
                console.log(rows.insertId);
                conn.query("Insert into artifact_desc SET ?", {
                    artifact_id:'',
                    object_type:param.body.object_type,
                    recorde_name:param.body.recorde_name,
                    date:param.body.date,
                    description:param.body.description,
                    latitude:param.body.latitude,
                    longitude:param.body.longitude,
                    photo_id: rows.insertId
                }, (err, rows) => {
                    console.log("2",err);
                    callback(err, rows);
                });
            },
            function(rows, callback){

                conn.query("Insert into artifac SET ?", {
                    artifact_id: rows.insertId,
                    lot_id: param.body.lot_id
                }, (err, rows) => {
                    callback(err, rows);
                });
            }
        ], function(err, results) {
            conn.release();
            cb(err, results);
        });
    });
}




module .exports = {
    getAllArtifacts:getAllArtifacts,
    addNewArtifact:addNewArtifact
};
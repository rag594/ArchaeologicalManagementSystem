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
                "INNER JOIN artifact as l on l.artifact_id = a.artifact_id";

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
    console.log(param);
    cfg.pool.getConnection(function (err, conn) {
        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        async.waterfall([
            (callback) => {
                conn.query("Insert into artifact_desc values(?,?,?,?,?,?,?)", ['',param.object_type,param.recorde_name,param.date,param.description,param.latitude, param.longitude], (err, rows) => {
                    callback(err, rows);
                });
            },
            (rows, callback) => {

                conn.query("Insert into artifac SET ?", {
                    artifact_id: rows.insertId,
                    lot_id: param.lot_id
                }, (err, rows) => {
                    callback(err, rows);
                });
            }
        ], (err, results) => {
            conn.release();
            cb(err, results);
        });
    });
}




module .exports = {
    getAllArtifacts:getAllArtifacts,
    addNewArtifact:addNewArtifact
};
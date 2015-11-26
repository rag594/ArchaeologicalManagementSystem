var mysql = require('mysql');
var cfg = require('../config');

var conn = mysql.createConnection(cfg.mysql);

function getContext(cb){

    cfg.pool.getConnection(function (err, conn) {

        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query = "Select * from context";

        conn.query(query, function (err,rows) {

            if(err){
                cb(err,null);
            }
            else{
                cb(null,rows);
            }
        });
    });
}

function addContext(param,cb){
    cfg.pool.getConnection(function (err, conn) {
        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query = "Insert into context values(?,?)";

        conn.query(query,[param.context,''], function (err,rows) {

            if(err){
                cb(err,null);
            }
            else{
                cb(null,rows);
            }
        });
    });
}

module.exports = {
    getContext:getContext,
    addContext:addContext
};
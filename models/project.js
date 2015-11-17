var mysql = require('mysql');
var cfg = require('../config');
var async = require('async');

var conn = mysql.createConnection(cfg.mysql);


function listOfProjects(cb) {
    cfg.pool.getConnection(function (err,conn) {

        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query = "Select p.princ_invest,p.pro_name,p.pro_direc,i.comp_name FROM project as p " +
                    "INNER JOIN investor as i on p.invest_id = i.invest_id";

        conn.query(query, function (err, rows) {
            conn.release();
            if (err) {
                cb(err, null);
            }

            else {
                cb(null, rows);
            }
        });
    });
}

function addProject(param, cb) {

    cfg.pool.getConnection(function(err,conn) {
        if(err){
            console.log(err);
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query = "Insert into project values(?,?,?,?,?,?)";

        var l = ['', param.princ_invest, param.pro_name, param.pro_direc, parseInt(param.comp_name), parseInt(param.amount_invest)];

        conn.query(query, l, function (err, rows) {

            conn.release();
            if (err) {
                console.log(err);
                cb(err, null);
            }
            else {
                console.log("done");
                cb(null, rows);
            }
        });
    });
}


function projectDetails(cb) {

    cfg.pool.getConnection(function (err,conn) {

        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query = "Select p.pno,p.pro_name from project as p";

        conn.query(query, function (err, rows) {
            conn.release();
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, rows);
            }
        });
    });

}


module.exports = {

    listOfProjects: listOfProjects,
    addProject: addProject,
    projectDetails:projectDetails
};
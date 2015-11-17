var mysql = require('mysql');
var cfg = require('../config');
var async = require('async');

var conn = mysql.createConnection(cfg.mysql);


function getSiteDetails(cb) {

    cfg.pool.getConnection(function (err, conn) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query = "Select s.field_site_no,s.start_date,s.end_date,s.pno,s.latitude,s.longitude,s.location_name,su.length,su.breadth from site_survey as s " +
            "INNER JOIN survey_unit as su on s.field_site_no = su.field_site_no";

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

function getsiteNamesById(cb) {
    cfg.pool.getConnection(function (err, conn) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query = "Select f.field_site_no,f.location_name from site_survey as f";

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

function getSurveyMethods(cb) {

    cfg.pool.getConnection(function (err, conn) {

        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query = "Select * from methods";
        conn.query(query, function (err, rows) {

            if (err) {
                cb(err, null);
            }
            else {
                cb(null, rows);
            }
        });
    });
}

function setSiteDetails(param, cb) {
    cfg.pool.getConnection(function (err, conn) {
        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        async.waterfall([
            (callback) => {
                conn.query("Insert into site_survey values(?,?,?,?,?,?,?)", ['', param.start_date, param.end_date, param.pno, param.latitude, param.longitude, param.location_name], (err, rows) => {
                    callback(err, rows);
                });
            },
            (rows, callback) => {
                conn.query("Insert into context_methods_used SET ?", {
                    context_id: param.cno,
                    field_site_no: rows.insertId
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


function addSurveyDetails(param, cb) {

    cfg.pool.getConnection(function (err, conn) {

        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        async.waterfall([
            (callback) => {
                conn.query("Insert into survey_unit values(?,?,?,?)", [param.length, param.breadth, param.fno, ''], (err, rows) => {
                    callback(err, rows);
                });
            },
            (rows, callback) => {
                conn.query("Insert into methods_used SET ?", {
                    survey_unit_id: rows.insertId,
                    method_id: param.mno
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


module.exports = {

    getSiteDetails: getSiteDetails,
    setSiteDetails: setSiteDetails,
    listOfSites: getsiteNamesById,
    getSurveyMethods: getSurveyMethods,
    addSurveyDetails: addSurveyDetails
};
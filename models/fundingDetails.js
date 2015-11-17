var mysql = require('mysql');
var cfg = require('../config');


var conn = mysql.createConnection(cfg.mysql);

function fundingDetails(cb) {

    cfg.pool.getConnection(function(err,conn){

        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
    var query = "Select i.comp_name,p.pro_name,p.amount_invest from investor as i " +
                "INNER JOIN project as p on i.invest_id = p.invest_id";

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


function listOfInvestors(cb){
    cfg.pool.getConnection(function(err,conn) {

        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query = "Select * from investor";

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
    getFundingDetails:fundingDetails,
    listOfInvestors:listOfInvestors
};
var mysql = require('mysql');
var cfg = require('../config');

var conn = mysql.createConnection(cfg.mysql);


function getUserDetails(cb) {

    cfg.pool.getConnection(function (err, conn) {

        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query = "Select username,password from login";
        conn.query(query, function (err, rows) {
            conn.release();
            if (err) {
                console.log(err);
                cb(err, null);
            }
            else {
                cb(null, rows);
            }
        });
    });
}

module.exports = {
    getUserDetails: getUserDetails
};
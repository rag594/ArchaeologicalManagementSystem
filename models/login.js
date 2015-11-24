var mysql = require('mysql');
var cfg = require('../config');

var conn = mysql.createConnection(cfg.mysql);


function getUserDetails(param, cb) {

    cfg.pool.getConnection(function (err, conn) {

        if (err) {

            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query = "Select * from login where username = ? and password = ?";

        conn.query(query, [param.username, param.password], function (err, rows) {
            conn.release();

            if (err) {

                console.log(err);
                cb(err, null);
            }

            else if (rows[0]) {

                cb(null, rows[0]);
            }

            else {

                cb("user not found!!!", null);

            }
        });
    });
}

module.exports = {
    getUserDetails: getUserDetails
};
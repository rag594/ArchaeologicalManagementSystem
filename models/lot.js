var mysql = require('mysql');
var cfg = require('../config');

var conn = mysql.createConnection(cfg.mysql);


function makeNewlot(param, cb) {

    cfg.pool.getConnection(function (err, conn) {

        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query = "Insert into lot values(?,?,?,?,?)";
        conn.query(query, [param.max_depth, '', parseInt(param.fno), parseInt(param.cno), param.lot_name], function (err, rows) {
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

function getLotById(cb) {
    cfg.pool.getConnection(function (err, conn) {

        if (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query = "Select lot_id,lot_name from lot";
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


function getLotBySite(param,cb){
    console.log(param);
    cfg.pool.getConnection(function (err, conn) {

        if(err){
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query = "Select lot_id,lot_name from lot where field_site_no = ?";

        conn.query(query,[parseInt(param.field_site_no)], function (err,rows) {
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

module.exports = {
    addLot: makeNewlot,
    getLot: getLotById,
    getLotBySite:getLotBySite
};
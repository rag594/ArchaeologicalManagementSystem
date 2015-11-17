var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 100,
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "archaeological"

});

module.exports = {
    pool:pool,
  mysql:
  {
      host:"localhost",
      port:8889,
      user:"root",
      password:"root",
      database:"archaeological"
  }
};
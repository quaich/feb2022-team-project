//database connection
/*var pg = require('pg');
var conn = pg.createConnection({
  host: 'postgres', // Replace with your host name
  user: 'localhost',      // Replace with your database username
  password: 'root',      // Replace with your database password
  database: 'antiquestore',
  port: 5432, // // Replace with your database Name
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;

*/


// load the pg module
// the pg.pool module retunrs a class
// database connection configuartion  code
const Pool = require("pg").Pool;

// database connection
const db = new Pool({

  user: "postgres",
  host: "localhost",
  database: "antiquestore",
  password: "root",
  port: 5432,
});

db.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

module.exports = db;

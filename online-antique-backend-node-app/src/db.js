// load the pg module
// the pg.pool module retunrs a class

const Pool = require("pg").Pool;

//console.log(Pool);
// create object of Pool
//set up the configuration of your PostgreSQL connection.

const pool = new Pool({

  user: "postgres",
  host: "localhost",
  database: "antiquestore",
  password: "root",
  port: 5432,
});

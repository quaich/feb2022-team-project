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
module.exports = db;
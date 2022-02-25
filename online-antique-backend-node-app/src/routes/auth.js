const express = require("express");
const db = require("../db/connection");
const router = express.Router();
router.use(express.json());

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const connection = db;
    const statement = `SELECT * FROM users WHERE username = '${username}' AND passwd = '${password}'`;

    connection.query(statement, (error, data) => {
        const result = {};
        if (data.length != 0) {
            result["status"] = "success";
            result["data"] = data.rows;
        } else {
            result["status"] = "error";
            result["error"] = error;
        }
        console.log(result);
        res.send(result);

    });

});
router.get("", (req, res) => {
    res.send("Welcome to GET method from router");
});


module.exports = router;




const express = require("express");
const db = require("../utils/db.js");

const router = express.Router();
router.use(express.json());

router.post("/login", (req, res) => {
    console.log("ll")
    const { username, password } = req.body;
    const statement = `SELECT EXISTS(SELECT * FROM users WHERE username = '${username}' AND passwd = '${password}')`;
    db.makeQuery(statement).then(result => {
        console.log(result.rows[0].exists);
        if (result.rows[0].exists == true){
            res.send(JSON.stringify({status: "Success", message: username}))
        }
        else {
            res.send(JSON.stringify({status: "Failure", message: username}))
        };
    })
});


router.get("", (req, res) => {
    res.send("Welcome to GET method from router");
});

module.exports = router;




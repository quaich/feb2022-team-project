const express = require("express");
const decdb = require("../utils/db.js");
const jwt = require('jsonwebtoken');
const fs = require("fs");

const router = express.Router();
router.use(express.json());

router.post("/login", (req, res) => {
    loginRoute(req, res);
}); /**
    const { username, password } = req.body;
    const statement = `SELECT EXISTS(SELECT * FROM users WHERE username = '${username}' AND passwd = '${password}')`;
    db.makeQuery(statement).then(result => {
        return(result.rows[0].exists)

        if (result.rows[0].exists == true){
            res.send(JSON.stringify({status: "Success", message: username}))
        }
        else {
            res.send(JSON.stringify({status: "Failure", message: username}))
        };
    })
});*/


router.get("", (req, res) => {
    res.send("Welcome to GET method from router");
});

module.exports = router;



const RSA_PRIVATE_KEY = fs.readFileSync('./src/private.key');

function loginRoute(req, res) {

    username = req.body.username,
    password = req.body.password;

    statement = `SELECT EXISTS(SELECT * FROM users WHERE username = '${username}' AND passwd = '${password}')`;
    decdb.makeQuery(statement).then(result => {
        if (result.rows[0].exists == true) {
            statement = `SELECT userId, administrator FROM users WHERE username = '${username}'`;
            decdb.makeQuery(statement).then(result => {
                console.log(result.rows[0]);
                userId = String(result.rows[0].userid);
                admin = String(result.rows[0].administrator)
                jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                    algorithm: 'RS256',
                    expiresIn: 2629746, // one month
                    subject: admin,
                });
                console.log(jwtBearerToken)       
                //res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});
                
                res.status(200).json({
                    idToken: jwtBearerToken, 
                    expiresIn: 120,
                    subject: {"userid": userId,"admin": admin}
                  });
            })
        }
        else {
            // send status 401 Unauthorized
            res.sendStatus(401); 
        }
    })
}

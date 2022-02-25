const connection = require("../db/connection");
async function makeQuery(statement){
        result = {}
        res = connection.query(statement);

        if (res.length != 0) {
            result["status"] = "success";
            result["data"] = res.rows;
        } else {
            result["status"] = "error";
            result["error"] = error;
        }
        return await Promise.resolve(res);
}

module.exports.makeQuery = makeQuery;
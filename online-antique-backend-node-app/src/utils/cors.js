// middleaware - to enable CORS at server-side

module.exports = {
    insCors: function (req, res, next){
        console.log("within cors configuration middleware");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        next();
      }
};
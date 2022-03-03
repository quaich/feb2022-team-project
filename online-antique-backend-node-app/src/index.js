const express = require("express");
// import route in app.js
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products.js");
const cors = require("./utils/cors.js");
// call the function
const app = express();

// for every incoming request, will parse data from bytes into JSON object &
// vice-versa for every reponse JSON into bytes
// Will work with POST and PUT/PATCH
app.use(express.json());

app.use((req, res, next) => {
    cors.insCors(req, res, next);
});

// custom middleware
app.use((req, res, next) => {
  console.log("Incoming Request Middleware");
  console.log(req.body);
  next();
});

// middleware - use()
app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/products", productRoute);  

app.listen(3000, () => {
  console.log("Server Listening on Port 3000");
});
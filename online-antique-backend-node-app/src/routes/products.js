const express = require("express");
// import pg package in this file

const router = express.Router();

// default route
router.get("", (req, res) => {
  res.send({ "productId:": 1000, productname: "Laptop", productprice: 78000 });
});

module.exports = router;

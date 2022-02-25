const express = require("express");
// import pg package in this file
const db = require("../utils/db.js");
const router = express.Router();
router.use(express.json());

// default route
router.get("", (req, res) => {
  console.log("products moment");
});


router.post("/add", (req, res) => {
  const{productName, productDescription, productImage, subCatagoryId, price} = req.body;
  const statement = `INSERT INTO product(productName, productDescription, productImage, subCatagoryId, price) VALUES ('${productName}', '${productDescription}', '${productImage}', '${subCatagoryId}', ${price});`
  db.makeQuery(statement).then(result => {res.send(result)});
});


router.post("/add/discount", (req, res) => {
  const{productName, discountPercent} = req.body;
  db.makeQuery(`SELECT price FROM product WHERE productName = '${productName}'`)
    .then(result => {
        nPrice = (1 - discountPercent / 100) * result.rows[0].price;
        const statement = `UPDATE product SET discountPercent = ${discountPercent}, discountPrice = ${nPrice} WHERE productName = '${productName}';`;
        console.log(statement);
        db.makeQuery(statement).then(result => {
            console.log(result);
            res.send(result);
        });
  });
});

module.exports = router;

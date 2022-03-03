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
  db.makeQuery(statement).then(result => {
    res.send(result)});
});

router.get("/get"), (req, res) => {
  console.log("poop");
  res.send("hello there");

}

router.post("/add/discount", (req, res) => {
  const{productName, discountPercent, discountPrice} = req.body;
  db.makeQuery(`SELECT price FROM product WHERE productName = '${productName}'`)
    .then(result => {
        if (discountPrice == ''){ 
          nPrice = (1 - discountPercent / 100) * result.rows[0].price;
          nPercent = discountPercent;
        }
        else { 
          nPrice = discountPrice;
          nPercent = discountPrice / result.rows[0].price
        }
        const statement = `UPDATE product SET discountPercent = ${nPercent}, discountPrice = ${nPrice} WHERE productName = '${productName}';`;
        console.log(statement);
        db.makeQuery(statement).then(result => {
          res.send(JSON.stringify({status: success}));
        });
  });
});

router.post("/add/discount/category", (req, res) => {
  const {subCategoryName, discountPercent } = req.body;

  db.makeQuery(`SELECT subcategoryid FROM subcategories WHERE subcategoryname = '${subCategoryName}';`).then(result => {
    console.log(result);
    lookupResult = result.rows[0].subcategoryid;
    statement = `UPDATE product SET discountPercent = ${discountPercent}, discountPrice = price * (1 - (${discountPercent}.0 / 100.0)) WHERE subCategoryId = ${lookupResult};`;

    console.log(statement);
    db.makeQuery(statement).then(result => {
        res.send(JSON.stringify({status: "success"}));
    });
  });


}); 




module.exports = router;



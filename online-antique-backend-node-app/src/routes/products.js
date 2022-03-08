const express = require("express");
// import pg package in this file
const decdb = require("../utils/db.js");
const db = require('../db/connection');

const router = express.Router();
router.use(express.json());

//Declan's /add post req
router.post("/add", (req, res) => {
  const{productName, productDescription, productImage, subCategoryId, price, stock} = req.body;
  const statement = `INSERT INTO product(productName, productDescription, productImage, subcategoryId, price, stock, categoryId) VALUES ('${productName}', '${productDescription}', '${productImage}', ${subCategoryId}, ${price}, ${stock}, 2);`
  console.log(statement)
  decdb.makeQuery(statement).then(result => {
    res.send(JSON.stringify({status: `Updated Rows: ${result.rowCount}`}));
})})  ; 


router.post("/add/discount", (req, res) => {
  const{productName, discountPercent, discountPrice} = req.body;
  decdb.makeQuery(`SELECT price FROM product WHERE productName = '${productName}'`)
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
        decdb.makeQuery(statement).then(result => {
          res.send(JSON.stringify({status: `Updated Rows: ${result.rowCount}`}));
        });
  });
});

router.post("/add/discount/category", (req, res) => {
  const {subCategoryName, discountPercent } = req.body;

  decdb.makeQuery(`SELECT subcategoryid FROM subcategories WHERE subcategoryname = '${subCategoryName}';`).then(result => {
    lookupResult = result.rows[0].subcategoryid;
    statement = `UPDATE product SET discountPercent = ${discountPercent}, discountPrice = price * (1 - (${discountPercent}.0 / 100.0)) WHERE subCategoryId = ${lookupResult};`;

    decdb.makeQuery(statement).then(result => {
        console.log(result.rowCount);
        res.send(JSON.stringify({status: `Updated Rows: ${result.rowCount}`}));
    });
  });


}); 

//==================================================
// get() method to fetch product data from db
// =================================================

router.get("/", (req, res) => {
  let query = 'select * from product';
  //console.log("hello");
db.query(query,(err, result) => {
  console.log(result);
  if(err){
    console.log('error', err);
  }if(result.length != 0){
    res.send(result.rows);
  }
})
});

//============================================================
// get single id from db
//============================================================

router.get("/:id", (req, res) => {

const productid  = parseInt(req.params.id);
console.log("productid", productid);
const connection = db;
connection.query(
  "SELECT * from product where productid=$1",[productid],
    (error, data) => {
    const result = {};
    if (error) {
    return res.send('Internal Error');
    } 
    return res.json(data.rows);
    });
});

//===================================================
// post() method for product table 
//===================================================
/** 
router.post('/create', (req, res, next) => {

const product = req.body;
let insertQuery = `insert into product(productname, productdescription, productimage, subcategoryid, price, stock)
                   values('${product.productname}', '${product.productdescription}', '${product.productimage}', '${product.subcategoryid}', '${product.price}', '${product.stock}')`

db.query(insertQuery, (err, result) => {
    if (!err) {
        res.send('Insertion was successful');
        res.send(result.rows);
    } else { console.log(err.message) }
});
db.end;
});*/

//=======================================================
// put() method for product table
//=======================================================
/** 
router.put('/:id', (req, res) => {
let product = req.body;
let updateQuery = `update product
                   set
                   productname = '${product.productname}',
                   productdescription='${product.productdescription}',
                   productimage = '${product.productimage}',
                   subcategoryid = '${product.subcategoryid}',
                   price = '${product.price}',
                   discountpercent= '${product.discountpercent}',
                   discountprice= '${product.discountprice}',
                   reviewscore= '${product.reviewscore}',
                   stock= '${product.stock}'
                   where productid = ${product.productid}`

db.query(updateQuery, (err, result) => {
    if (!err) {
        res.send('Update was successful')
    } else { console.log(err.message) }
});
db.end;
});
//============================================================
// delete() method in product table
//============================================================

router.delete('/:id', (req, res) => {

let deleteQuery = `delete from product where productid= ${req.params.id}`

db.query(deleteQuery, (err, result) => {
    if (!err) {
        res.send('Deletion of data is successful')
    } else { console.log(err.message) }
});
db.end;
});*/


module.exports = router;
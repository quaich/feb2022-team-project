const express = require("express");
// import pg package in this file
const db = require('../db/connection');
const router = express.Router();

//===================================================
// get() method to fetch order data from db
// =================================================

router.get("/", (req, res) => {
  let query = 'select * from categories';
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
// get single id data of category table from db
//============================================================

// router.get("/category/:id", (req, res) => {

//   const categoryid  = parseInt(req.params.id);
//   console.log("categoryid", categoryid);
//   const connection = db;
//   connection.query(
//     "SELECT * from categories where categoryid=$1",[categoryid],
//       (error, data) => {
//       const result = {};
//       if (error) {
//       return res.send('Internal Error');
//       } 
//       return res.json(data.rows);
//       });
//   });

//============================================================
// get products by category from DB
//============================================================

router.get("/:id", (req, res) => {
  const categoryid  = parseInt(req.params.id);
  console.log("categoryid", categoryid);
  const connection = db;
  connection.query(
    "select product.productid, product.productname, product.productdescription, product.productimage, product.price, product.discountpercent, categories.categoryid from product inner join categories on categories.categoryid = product.categoryid where categories.categoryid = $1",
      [categoryid],
      (error, data) => {
      const result = {};
      if (error) {
      return res.send('Internal Error');
      } 
      return res.json(data.rows);
      });
  });
  
/** 
//===================================================
// post() method for categories table 
//===================================================

router.post('/create', (req, res, next) => {

  const categories = req.body;
  let insertQuery = `insert into categories(categoryname, categorydescription, categoryimage)
                     values('${categories.categoryname}', '${categories.categorydescription}', '${categories.categoryimage}')`

  db.query(insertQuery, (err, result) => {
      if (!err) {
          res.send('Insertion of data is successful');
          res.send(result.rows);
      } else { console.log(err.message) }
  });
  db.end;
});

//=======================================================
// put() method for categories table
//=======================================================

router.put('/:id', (req, res) => {
  let categories = req.body;
  let updateQuery = `update categories
                     set
                     categoryname = '${categories.categoryname}',
                     categorydescription='${categories.categorydescription}',
                     categoryimage = '${categories.categoryimage}'
                     where categoryid = ${categories.categoryid}`

  db.query(updateQuery, (err, result) => {
      if (!err) {
          res.send('Update data successful')
      } else { console.log(err.message) }
  });
  db.end;
});
//============================================================
// delete() method in product table
//============================================================

router.delete('/:id', (req, res) => {

  let deleteQuery = `delete from categories where categoryid= ${req.params.id}`

  db.query(deleteQuery, (err, result) => {
      if (!err) {
          res.send('Deletion of data is successful')
      } else { console.log(err.message) }
  });
  db.end;
});*/


module.exports = router;

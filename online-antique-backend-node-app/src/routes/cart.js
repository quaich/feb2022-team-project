const express = require("express");

const router = express.Router();
router.use(express.json());

const decdb = require("../utils/db.js");

router.post("/order", (req, res) => {
    const productId = req.body.productid;
    const username = req.body.username;
    const counts = {};
    var maxId = 0;
    var totalPrice = 0.0;

    for (const num of productId) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
        if (num > maxId){
            maxId = num;
        }
    }

    decdb.makeQuery(`INSERT INTO orders DEFAULT VALUES RETURNING orderid;`).then(result => {
        orderid = result.rows[0].orderid
        console.log(orderid, counts[1]);        
        for(let i = 1; i < maxId; i++){
            if (counts[i] != undefined) {
                const statement = `INSERT INTO cartitem (orderid, productid, quantity) VALUES (${orderid}, ${i}, ${counts[i]});`;
                console.log(statement);
                decdb.makeQuery(statement).then(result => {
                    const pricelookup = `SELECT price FROM product WHERE productId = ${i}`
                    console.log(pricelookup, counts[i]);
                    decdb.makeQuery(pricelookup).then(result => { 
                        totalPrice += result.rows[0].price * counts[i];

                    });
                });
            }
        }
        const userlookup = `SELECT userid FROM users WHERE username = '${username}'`
        console.log(userlookup);
        decdb.makeQuery(userlookup).then(result => { 
            console.log(totalPrice);
            const insert = `UPDATE orders SET totalPrice = ${totalPrice}, userId = ${result.rows[0].userid} WHERE orderId = ${orderid};`
            decdb.makeQuery(insert).then(result => {            
                if(result.rowCount > 0){
                    res.send(JSON.stringify({status: `Order placed Successfully! ${totalPrice} has been taken from your piggy bank.`}));
                }
            });
        });
    });
});
/*
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
      });*/
      
module.exports = router;

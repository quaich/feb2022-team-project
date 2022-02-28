const client = require('../db/connection.js')
const express = require('express');

const router = express.Router();
router.use(express.json());



router.get('/cart1', (req, res) => {
    client.query(`Select * from cartitem`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})


router.get('/cart1/:id', (req, res) => {
    client.query(`Select * from cartitem where cartitemid=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})


router.post('/cart', (req, res, next) => {
    const cart = req.body;
    let insertQuery = `insert into cartitem(cartitemid, orderid, productid, quantity, productdetails) 
                       values(${cart.cartitemid}, ${cart.orderid}, ${cart.productid}, ${cart.quantity}, '${cart.productdetails}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful');
            res.send(result.rows);
        } else { console.log(err.message) }
    })
    client.end;
})

router.put('/cart/:id', (req, res) => {
    let cart = req.body;
    let updateQuery = `update cartitem
                       set 
                       orderid= '${cart.orderid}',
                       productid = '${cart.productid}',
                       quantity = '${cart.quantity}',
                       productdetails = '${cart.productdetails}'
                       where cartitemid = ${req.params.id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        } else { console.log(err.message) }
    })
    client.end;
})

router.delete('/cart/:id', (req, res) => {
    let insertQuery = `delete from cartitem where cartitemid= ${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        } else { console.log(err.message) }
    })
    client.end;
})

module.exports = router;
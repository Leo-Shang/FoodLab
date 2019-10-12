var express = require('express');
var router = express.Router();
const HttpStatus = require('http-status-codes');

var pool = require('../database/pool');
var Errors = require('./errors.js');

/* GET home page. */
router.get('/:user_id', async (req, res) => {
    var user_id = req.params.user_id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'select i.item_id, i.item_name, p.regular_price, sci.quantity,p.promotion_price from shopping_cart sc left join shopping_cart_item sci on sc.shopping_cart_id = sci.shopping_cart_id left join item i on i.item_id = sci.item_id left join price p on sci.item_id = p.item_id where sc.customer_id = $1 order by p.posted_time desc';
            const data = await connection.query(query, [user_id]);
            if (!data) {
              throw new Errors.InternalServerError('no data found');
            }
            res.setHeader("Content-Type", "application/json");
            res.json( data.rows );
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
});

// order_item:this.state.list,
//           user_id:this.state.user_id,
//           subtotal:subtotal,
//           tax:total-subtotal,
//           total:total,
//           distance:0,
//           shippment:10,

router.post('/:user_id/post', async (req, res) => {
    console.log("I am in post request.")
    // const id                = req.params.id;
    const subtotal         = req.body.subtotal;
    const user_id      = req.body.user_id;
    const total =req.body.total;
    const distance = req.body.distance;
    const shippment = req.body.shippment;
    const tax = req.body.tax;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    console.log('arry: ' + shippment);
    console.log('id: ' + '$1');
    try {
        const connection = await pool.connect();
        try {
            const customer_query = `insert into order_list(ordered_time, delivery_time, customer_id, subtotal, distance, delivery_fee, tax, total) values($1,$1,$2,$3,$4,$5,$6,$7)`;
            // console.log('username: ' + user_name + ', password: ' + password);
            await connection.query(customer_query,[dateTime,user_id,subtotal,distance,shippment,tax,total]); 

        //     const address_query =   `update address
        //                             set street_name=$2, city_name=$3, province_name=$4,
        //                             apt_number=$5, buzz_code=$6, postal_code=$7
        //                             where address.address_id=$1`;
        //     await connection.query(address_query, [id, street_name, city_name, province_name, apt_number, buzz_code, postal_code]);
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
});


module.exports = router;


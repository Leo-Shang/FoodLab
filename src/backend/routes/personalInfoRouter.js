var express = require('express');
var router = express.Router();
const HttpStatus = require('http-status-codes');

var pool = require('../database/pool');
var Errors = require('./errors.js');

// For path starting with "/personalinfo"
router.get('/:id/myaccount', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT * from customer where customer.customer_id = $1';
            const data = await connection.query(query, [id]);
            if (!data) {
                throw new Errors.InternalServerError('no data found');
            }
            res.setHeader("Content-Type", "application/json");
            res.json( data.rows[0] );
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
});

router.get('/:id/editaccountinfo', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT * from customer join address on customer.customer_id = $1 and customer.address_id = address.address_id ' +
                'join credit_card_info on credit_card_info.credit_card_id = customer.credit_card_id';
            const data = await connection.query(query, [id]);
            if (!data) {
                throw new Errors.InternalServerError('no data found');
            }
            res.setHeader("Content-Type", "application/json");
            res.json( data.rows[0] );
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
});

router.post('/:id/editaccountinfo', async (req, res) => {
    console.log("I am in post request.")
    const id                = req.params.id;
    const user_name         = req.body.user_name;
    const password          = req.body.password;
    const phone             = req.body.phone;
    const email             = req.body.email;
    const street_name       = req.body.street_name;
    const city_name         = req.body.city_name;
    const province_name     = req.body.province_name;
    const apt_number        = req.body.apt_number;
    const buzz_code         = req.body.buzz_code;
    const postal_code       = req.body.postal_code;

    console.log('username: ' + user_name + ', password: ' + password + ', phone: ' + phone + ', email: ' + email);
    console.log('id: ' + id);
    try {
        const connection = await pool.connect();
        try {
            const customer_query = `update customer set user_name=$2, password=$3, phone=$4, email=$5 where customer_id=$1`;
            console.log('username: ' + user_name + ', password: ' + password);
            await connection.query(customer_query, [id, user_name, password, phone, email]); 

            const address_query =   `update address
                                    set street_name=$2, city_name=$3, province_name=$4,
                                    apt_number=$5, buzz_code=$6, postal_code=$7
                                    where address.address_id=$1`;
            await connection.query(address_query, [id, street_name, city_name, province_name, apt_number, buzz_code, postal_code]);
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
});

router.get('/:id/orderhistory', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT * FROM customer join order_list on customer.customer_id = $1 and order_list.customer_id = ' +
                'customer.customer_id join order_item on order_item.order_id = order_list.order_id join item ON order_item.item_id ' +
                '= item.item_id order by order_list.order_id';
            const data = await connection.query(query, [id]);
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

router.get('/:id/myshoppingcart', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT item.item_id ,item.img, item.item_name, regular_price, member_price, promotion_price, quantity, ' +
                'price.posted_time from customer join shopping_cart on customer.customer_id = $1 and shopping_cart.customer_id = ' +
                'customer.customer_id join shopping_cart_item on shopping_cart_item.shopping_cart_id = shopping_cart.shopping_cart_id' +
                ' join item on shopping_cart_item.item_id = item.item_id join price on item.item_id = price.item_id ' +
                'group by item.item_id, price.posted_time, price.regular_price, price.member_price, price.promotion_price, shopping_cart_item.quantity ' +
                'order by item.item_id, price.posted_time desc;';

            const data = await connection.query(query, [id]);
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

router.get('/:id/favoriterecipe', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT * from customer join favourite_recipe on customer.customer_id = $1 and favourite_recipe.customer_id = ' +
                'customer.customer_id join recipe on recipe.recipe_id = favourite_recipe.recipe_id';
            const data = await connection.query(query, [id]);
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

router.get('/:id/securityinfo', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT * from customer where customer.customer_id = $1';
            const data = await connection.query(query, [id]);
            if (!data) {
                throw new Errors.InternalServerError('no data found');
            }
            res.setHeader("Content-Type", "application/json");
            res.json( data.rows[0] );
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
});

router.get('/:id/paymentinfo', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT * from customer join credit_card_info on customer.customer_id = $1 and credit_card_info.credit_card_id = ' +
                'customer.credit_card_id';
            const data = await connection.query(query, [id]);
            if (!data) {
                throw new Errors.InternalServerError('no data found');
            }
            res.setHeader("Content-Type", "application/json");
            res.json( data.rows[0] );
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
});

router.get('/:id/trackorder', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT * from order_list join customer on order_list.customer_id = $1 and customer.customer_id = ' +
                'order_list.customer_id join address on address.address_id = customer.customer_id';
            const data = await connection.query(query, [id]);
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


module.exports = router;
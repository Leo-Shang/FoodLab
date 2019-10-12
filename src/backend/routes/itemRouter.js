'use strict';

var express = require('express');
var router = express.Router();

const HttpStatus = require('http-status-codes');

var pool = require('../database/pool');
var Errors = require('./errors.js');

// get all items
router.get('/', async (req, res) => {
    console.log('item router');
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT item_id, item_name, img FROM item ORDER BY item_id ASC;';
            const data = await connection.query(query);
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

router.get('/onsale', async (req, res) => {
    console.log('on sale item router');
    try {
        const connection = await pool.connect();
        try {
            const query = `WITH tb AS
                            (SELECT * FROM price as p
                                NATURAL JOIN item as i 
                                ORDER BY RANDOM() ASC LIMIT 5)
                            SELECT * FROM tb`;

            const data = await connection.query(query);
            if (!data) {
                throw new Errors.InternalServerError('no data found');
            }
            res.setHeader("Content-Type", "application/json");
            res.json( data.rows );
        } finally {
            connection.release();
        }
    } catch (err) { 
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    } 
});

router.get('/viewhistory', async (req, res) => {
    console.log('view history item router');
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT item_id as i_id, item_name as name FROM item ORDER BY i_id ASC;';
            const data = await connection.query(query);
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

// get item by id
router.get('/:item_id', async (req, res) => {
    var item_id = req.params.item_id;
    console.log(item_id);
    try {
        const connection = await pool.connect();
        try {
            const query = `select * from item i 
            left join nutrition_table n on i.nutrition_id = n.nutrition_id 
            left join price p on i.item_id = p.item_id 
            where i.item_id = $1 
            ORDER BY posted_time ASC`;
            const data = await connection.query(query, [item_id]);
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
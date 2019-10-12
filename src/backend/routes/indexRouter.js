'use strict';

var express = require('express');
var router = express.Router();

const HttpStatus = require('http-status-codes');

var pool = require('../database/pool');
var Errors = require('./errors.js');

/* GET home page. */
router.get('/', async (req, res) => {
  console.log('index router');
    try {
        const connection = await pool.connect();
        try {
            const query = 'SELECT NOW();';
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

module.exports = router;



var express = require('express');
var router = express.Router();

const HttpStatus = require('http-status-codes');

var pool = require('../database/pool');
var Errors = require('./errors.js');

// get all recipes
router.get('/', async (req, res) => {
    console.log('all recipes router');
    try {
        const connection = await pool.connect();
        try {
            const query = `SELECT * FROM recipe`;
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

// get a specific recipe by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log("recipe router: " + id);

    try {
        const connection = await pool.connect();
        try {
            const query = `SELECT * FROM recipe_item join recipe on recipe.recipe_id = $1 and recipe_item.recipe_id = recipe.recipe_id
                join notes on recipe_item.recipe_id = notes.recipe_id
                join item on recipe_item.item_id = item.item_id
                join customer on notes.customer_id = customer.customer_id`;
            const data = await connection.query(query, [id]);
            if (!data) {
                throw new Errors.InternalServerError('no data found');
            }
            console.log(data.rows);
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

    // pool.query('SELECT * FROM item ORDER BY item_id ASC', (err, data) => {
    //     if (err) {
    //         console.log(err);
    //         throw err;
    //     };
    //     res.setHeader("Content-Type", "application/json");
    //     res.status(200).json(data.rows);
    // });

router.post('/:id', async (req, res) => {

    const id = req.params.id;
    try {
        const connection = await pool.connect();
        try {
            const query = 'INSERT INTO notes (notes_id, customer_id, note, recipe_id, posted_time) VALUES (32, 35, $1, id, GETDATE()) ';
            const data = await connection.query(query, [req.body.value]);
            if (error) {
                throw error;
                console.log(err);
            }
            res.setHeader("Content-Type", "application/json");
            res.status(201).send(`User added with ID`);
            res.json(data.rows);
        } finally {
            connection.release();
        }
    } catch (err) {
            console.log(err);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: err, message: err.message});
    }
});






/*
post a new user

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}


router.post('/api/v1/todos', (req, res, next) => {
  const results = [];
  // Grab data from http request
  const data = {text: req.body.text, complete: false};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO items(text, complete) values($1, $2)',
    [data.text, data.complete]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM items ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


router.post('/:id', function(req, res){
    const id = req.params.id;
    client.query('INSERT INTO favourite_recipe (favourite_recipe_id, recipe_id, customer_id) VALUES (302, 11, 11)',
        (err, results) => {
        if (err) {
            throw err
        }
        console.log(id);
        res.status(200).send(`User modified with ID: ${id}`)
        res.json(results.row);
    });

});

 */

module.exports = router;
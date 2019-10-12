'use strict';

const config = require('../config');
const { Client } = require('pg');
const { db: { host, port, db, user, password } } = config;

const connectionString = process.env.DATABASE_URL || `postgresql://${user}:${password}@${host}:${port}/${db}`

// console.log(connectionString);

const client = new Client({
    connectionString: connectionString,
});

module.exports = client;
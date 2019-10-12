'use strict';

const config = require('../config');
const { Pool } = require('pg');
const { db: { host, port, db, user, password } } = config;
const connectionString = process.env.DATABASE_URL || `postgresql://${user}:${password}@${host}:${port}/${db}`

// console.log(connectionString);

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;
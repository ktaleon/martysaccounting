const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '234432',
    host: 'localhost',
    port: 5432,
    database: 'capstone',
});

module.exports = pool;  
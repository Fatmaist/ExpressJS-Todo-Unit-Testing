const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'List_Todo',
    password: 'fat12',
    port: 5432,
})

module.exports = pool
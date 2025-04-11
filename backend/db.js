var mySql = require('mysql2');

const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'railway_reservations',
})

module.exports = db;
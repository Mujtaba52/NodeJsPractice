// const mysql = require("mysql2");

// const pool = mysql.createPool({
//     host : 'localhost',
//     user: 'root',
//     database: 'new_schema1',
//     password: '12345678'
// })

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const seq = new Sequelize('new_schema1','root','12345678',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = seq;
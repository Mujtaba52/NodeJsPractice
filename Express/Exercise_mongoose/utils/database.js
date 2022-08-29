const mongodb= require('mongodb')
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect= (callback)=>{
    MongoClient.connect('mongodb+srv://Mujhassan786:connect4@mycluster.fvgee7z.mongodb.net/?retryWrites=true&w=majority')
    .then(result=>{
        console.log('Connected')
        _db = result.db();
        callback();       //result is the client obj that gives us access to the database
    })
    .catch(err=>{
        console.log(err)
    })
}

const getdb = ()=>{
    if(_db)
    {
        return _db;
    }
    throw error;
}
// exports.mongoConnect=mongoConnect;
// exports.getdb=getdb;
module.exports={mongoConnect,getdb}







// const mysql = require("mysql2");

// const pool = mysql.createPool({
//     host : 'localhost',
//     user: 'root',
//     database: 'new_schema1',
//     password: '12345678'
// })

// module.exports = pool.promise();

// const Sequelize = require('sequelize');

// const seq = new Sequelize('new_schema1','root','12345678',{
//     dialect:'mysql',
//     host:'localhost'
// })
//module.exports = seq;

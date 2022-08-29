const Sequelize = require('sequelize');

const seq = require('../utils/database');

const Product = seq.define('product',{
    id :{
        type : Sequelize.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey:true
    },
    title:Sequelize.STRING,
    price : {
        type: Sequelize.DOUBLE,
        allowNull:false
    },
    imageUrl : {
        type: Sequelize.STRING,
        allowNull:false
    },
    description :{
        type: Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Product


























// const path = require("path");
// const fs= require("fs")


// class product{
    
//     constructor(n)
//     {
//         this.name=n;
//     }

//     static save(){
//         const p = path.join(path.dirname(require.main.filename),'data','products.json')
//         const products=[];
//         fs.readFile(p,(err,data)=>{
//             if(!err)
//             {
                
//             }
//         })
        
//     }
// }
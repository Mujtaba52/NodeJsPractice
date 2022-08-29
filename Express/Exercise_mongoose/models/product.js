const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type :string,
        required:true
    },
    price:{
        type :Number,
        required : true
    },
    imageUrl:{
        type: string
    },
    description:{
        type :string
    },
    UserId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    }
})

module.exports = mongoose.model("product",ProductSchema)    //in mongoose we export the model






// class product{
//     constructor(title,price,imageUrl,description){
//         this.title=title
//         this.price=price
//         this.imageUrl=imageUrl
//         this.description=description
//     }
    
//     save(){
//         const db= getdb();
//         return db.collection('products')
//         .insertOne(this)
//         .then((result)=>{
//             console.log(result)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }

// }


// const Product = seq.define('product',{
//     id :{
//         type : Sequelize.INTEGER,
//         allowNull: false,
//         autoIncrement : true,
//         primaryKey:true
//     },
//     title:Sequelize.STRING,
//     price : {
//         type: Sequelize.DOUBLE,
//         allowNull:false
//     },
//     imageUrl : {
//         type: Sequelize.STRING,
//         allowNull:false
//     },
//     description :{
//         type: Sequelize.STRING,
//         allowNull:false
//     }
// })

// module.exports = Product


























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
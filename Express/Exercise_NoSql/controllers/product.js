
const product = require('../models/product');

module.exports.getproductList = (req,res)=>{

    res.send("List of products")
}

module.exports.createProduct = (req,res)=>{
    console.log(req.body);
    const title =req.body.title;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const description = req.body.description;
    const prod= new product(title,price,imgUrl,description)
    prod
    .save()
    .then(()=>{
        console.log("created product")
        res.status(200)
    })
    .catch(()=>{

    })
}


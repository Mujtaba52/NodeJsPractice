const Product = require('../models/product')

module.exports.getproductList = (req,res)=>{
    Product.findAll()
    .then((products)=>{
        res.status(200).send(products)
    }).catch(error=>{
        console.log(error)
    })
    // res.send("List of products")
}


module.exports.createProduct = (req,res,next)=>{
    console.log(req.body);
    const title =req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imgUrl;
    const description = req.body.description;
    Product.create({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description
    }).then(result=>{
        console.log(result)
        res.status(200).send();
    })
    .catch(error=>{
        console.log(error)
    })
}

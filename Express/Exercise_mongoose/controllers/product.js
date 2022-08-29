
const Product = require('../models/product');

module.exports.getproductList = (req,res)=>{
     Product.find().then((list)=>{
        const arr = list;
        res.status(200).send(arr)
    })
    .catch(()=>{

    })
    
}

module.exports.getproduct = (req,res)=>{
    const id = req.params.id;
    Product.findById(id).then(product=>{
        console.log(product);
        res.status(200).send(product);
    })
   
}

module.exports.deleteproduct = (req,res)=>{
    const id = req.params.id;
    Product.findByIdAndDelete(id).then(product=>{
        console.log(product);
        res.status(200).send(product);
    })
   
}

module.exports.updateproduct = (req,res)=>{
    const id = req.params.id;
    console.log(id)
    const title = req.body.title;
    const price =req.body.price
    const imageUrl = req.body.imgUrl
    const  description = req.body.description

    Product.findByIdAndUpdate(id, {
        title,
        imageUrl,
        price,
        description,
      })
        .then(product => res.status(200).send(product))
        .catch(err => console.log(err));
}


module.exports.createProduct = (req,res)=>{
    console.log(req.body);
    const product =new Product({title :req.body.title,
        price :req.body.price,
        imgUrl : req.body.imgUrl,
        description : req.body.description,
        UserId : req.user._id
    })
    product.save()
    .then(product=>{
        console.log("created product")
        res.status(200).send(product)
    })
    .catch(()=>{

    })
}

module.exports.addtocart = (req,res)=>{

    Product.addtocart(req.body)


}

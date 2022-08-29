const User = require('../models/user')
const Product = require('../models/product');

module.exports.createUser=(req,res)=>{
    console.log(req.body);
    const user =  new User({
        name: req.body.name,
        email: req.body.email,
        cart: req.body.cart
    })
    user.save().then(user=>{
        console.log(user);
        res.status(200).send(user);
    })
}

module.exports.getUsers = (req,res)=>{
    User.find().then(users=>{
        res.status(200).send(users);
    })
}

module.exports.addtocart = (req,res)=>{
    const ProdId = req.body.id;
    console.log(ProdId)
    Product.findById(ProdId)
    .then((prod)=>{
        console.log(prod)
        req.user.addToCart(prod);
        res.status(200).send(prod)
    })

}
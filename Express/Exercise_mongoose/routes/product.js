const express = require("express");
const { homedir } = require("os");
const app = express();
const path = require("path")
const productController = require("../controllers/product")
const router = express.Router();

router.get('/products',productController.getproductList)

router.get('/product/:id',productController.getproduct)

router.post('/product/:id',productController.deleteproduct)

router.patch('/product/update/:id',productController.updateproduct)

router.post('/product',productController.createProduct)

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','home.html'))
})


module.exports=router
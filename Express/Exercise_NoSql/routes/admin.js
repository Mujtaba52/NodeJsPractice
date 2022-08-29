const express = require("express");
const { homedir } = require("os");
const app = express();
const path = require("path")
const adminController = require("../controllers/product")
const router = express.Router();

router.get('/products',adminController.getproductList)

router.post('/product',adminController.createProduct)

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','home.html'))
})


module.exports=router
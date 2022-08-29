const express = require("express")

const router = express.Router();
const userController= require("../controllers/user")

router.post('/user',userController.createUser );

router.get('/users',userController.getUsers );

router.post('/users/addtocart',userController.addtocart)

module.exports= router;
import express from "express";
const router = express.Router();
import * as userController from "../controllers/User"
import * as Validator from "../validators/userValidation"
import {auth} from "../middleware/authorization"
// const bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({ extended: true }));


router.post('/user/signup',Validator.SignUpValidator,userController.creatNewUser)

router.get('/form/signup',userController.formSignup);

router.post('/form/signup',Validator.SignUpValidator,userController.formSignupPost);

router.get('/user/users',auth,userController.getallUser)



export {router};

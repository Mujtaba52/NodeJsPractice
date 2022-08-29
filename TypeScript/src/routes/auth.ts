import express,{Request,Response} from "express";
const router = express.Router();
import * as authcontroller from "../controllers/Auth";
import * as validator from "../validators/userValidation"
import {auth} from "../middleware/authorization"

router.post('/login',validator.SignInValidator,authcontroller.UserLogIn);

router.get('/logout',auth,authcontroller.UserLogOut);

router.get('/logoutAll',auth,authcontroller.UserLogOutAll);




export {router}
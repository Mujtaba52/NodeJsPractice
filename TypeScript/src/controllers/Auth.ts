import {Request,Response} from "express";
import bcrypt from "bcrypt";
import {User,IUser} from "../models/users";
import * as auth from "../lib/Auth"


const UserLogIn = async (req:Request,res:Response)=>{
  try{
    const password = req.body.password;
    const email = req.body.email;
    const responseObj =await auth.UserLogIn(email,password,res);
    console.log(responseObj)
    res.send(responseObj);
  }
  catch(e){
    res.status(500).send({status: e}) 
  }
    
    
}

const UserLogOut = (req:Request, res:Response) => {
    auth.UserLogOut(req,res);
  }
  
  const UserLogOutAll = (req:Request, res:Response) => {
    auth.UserLogOutAll(req,res);
  }
  


export {UserLogIn,UserLogOut,UserLogOutAll}




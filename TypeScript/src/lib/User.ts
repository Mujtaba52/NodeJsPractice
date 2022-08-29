import express,{Request,Response} from "express";
import { any } from "webidl-conversions";
import { IGetUserAuthInfoRequest } from "../types/types";
import {User,IUser,role} from "../models/users";
import * as bcrypt from "bcrypt"
import { Task,Itask } from "../models/tasks";
import { logger } from "../logger";


const creatNewUser = async (req:IGetUserAuthInfoRequest,res:Response)=>{
    if(req.user?.userRole===role.ADMIN){
    const userFound= await User.findOne({email:req.body.email})
        console.log(userFound);
        if(userFound){
            logger.info("New User not created as user already exists in the database")
           return res.status(409).send({error: "User already exists"})
        }
        const hashedpassword= await bcrypt.hash(req.body.password,12)
            const user =  new User<IUser>({
                name: req.body.name,
                email: req.body.email,
                password: hashedpassword
            })
            const myUser = await user.save()
            console.log(myUser);
            logger.info("New User has been created")
            return res.status(200).send(myUser);
        }
        res.status(401).send({error:"You are not authorized for this action"});
}
const formSignup = (req:Request, res:Response) => {
    res.sendFile(process.cwd()+'/utils/new.html')
  };


const formSignupPost = async (req:Request, res:Response) => {
        const name = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const taskId = req.session.taskToBeAssigned;

        const hashedpassword = await bcrypt.hash(password,12)
        const user =  new User<IUser>({
            name: name,
            email: email,
            password: hashedpassword
        })
        const myUser = await user.save()
        console.log(myUser);
        const task = await Task.findById(taskId)
        if(task){
            task.assignedUser =myUser._id
            return task.save()
        }
        console.log("name " + req.body.username) 
        res.status(200).send({status : "Success!"})
  };

  const getallUser=  async (req:Request, res:Response) =>{
    const {page=1,limit=5}=req.query;
    if(req.session.isLoggedIn && req.session.user?.userRole===role.ADMIN){
        const result = await User.find().limit(Number(limit)).skip((Number(page)-1)*Number(limit))
        return res.status(200).send(result);
  }
  res.status(401).send({error: "You are not authorized for this action"});

}

export {
    creatNewUser,
    formSignup,
    formSignupPost,
    getallUser
}
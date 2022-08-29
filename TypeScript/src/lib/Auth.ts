import {Request,Response} from "express";
import {User,IUser} from "../models/users";
import {IGetUserAuthInfoRequest} from "../types/types"
import bcrypt from "bcrypt";
import { error } from "console";


const UserLogIn = async (email:string,password:string,res:Response)=>{
    
    try{
        const user = await User.findOne({email})
        if(!user)return { error: 'Invalid Username or Password'};

        const passwordMatch = await bcrypt.compare(password,user.password)   
        if(passwordMatch){
            user.generateToken();
            return (user.getPublicProfile())
        }    
        return { error: 'Invalid Username or Password' }
    }
    catch{
        throw "Internal server error"
    }
           

}

const UserLogOut = async (req:IGetUserAuthInfoRequest, res:Response) => {
    try{
        req.user.tokens = req.user.tokens.filter((token:any)=>{
            return token.token !== req.token
        })
        await req.user.save();
        res.status(200).send({status: "user logged out"})
    }
    catch{
        res.status(500).send({status: "Internal server error"})
    }
    


    // console.log(req.session.isLoggedIn)
    // if( req.session.isLoggedIn){
    //     return req.session.destroy(err => {
    //         return res.status(200).send({status: "user logged out"})
    //       });
    //     }
    
}
    
  
const UserLogOutAll = async (req:IGetUserAuthInfoRequest, res:Response) => {

    try{
        req.user.tokens =[];
        await req.user.save();
        res.status(200).send({status: "All users logged out"})
    }
    catch{
        res.status(500).send({status: "Internal server error"})
    }
}

export {UserLogIn,UserLogOut,UserLogOutAll}

